const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { restrictedBerlinTime, assertAllowedTime, assertEnvironment,
  assertPagesConfiguration, artifactFiles, stageArtifactTree } = require('./deploy-github-pages');

test('Berlin working-hour boundaries use CET and CEST, independently of process timezone', () => {
  for (const [iso, blocked] of [
    ['2026-10-29T07:59:59Z', false], ['2026-10-29T08:00:00Z', true],
    ['2026-10-29T16:59:59Z', true], ['2026-10-29T17:00:00Z', false],
    ['2026-07-01T06:59:59Z', false], ['2026-07-01T07:00:00Z', true],
    ['2026-07-01T15:59:59Z', true], ['2026-07-01T16:00:00Z', false],
    ['2026-10-31T08:00:00Z', false], ['2026-11-01T08:00:00Z', false],
    ['2026-11-02T08:00:00Z', true],
  ]) assert.equal(restrictedBerlinTime(new Date(iso)), blocked, iso);
  assert.throws(() => assertAllowedTime(new Date('2026-10-29T08:00:00Z')), /blocked/);
  assert.throws(() => restrictedBerlinTime(new Date('invalid')), /Invalid clock/);
});

test('staging selection and commit-date overrides cannot enter the publisher', () => {
  assertEnvironment({});
  assertEnvironment({ REACT_APP_SITE_ENV: 'production' });
  for (const env of [{ REACT_APP_SITE_ENV: 'staging' }, { REACT_APP_SITE_ENV: 'preview' },
    { GIT_AUTHOR_DATE: '' }, { GIT_COMMITTER_DATE: '2020-01-01' }, { GIT_INDEX_FILE: '/tmp/other-index' }]) {
    assert.throws(() => assertEnvironment(env));
  }
});

test('the existing production Pages branch, custom domain and HTTPS cannot change', () => {
  const pages = { build_type: 'legacy', source: { branch: 'gh-pages', path: '/' },
    cname: 'www.nanowiss.com', https_enforced: true };
  assertPagesConfiguration(pages);
  for (const patch of [{ build_type: 'workflow' }, { source: { branch: 'master', path: '/' } },
    { source: { branch: 'gh-pages', path: '/docs' } }, { cname: 'staging.nanowiss.com' },
    { https_enforced: false }]) assert.throws(() => assertPagesConfiguration({ ...pages, ...patch }));
});

test('artifact staging preserves the source index and excludes source files while retaining exact built bytes', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'nanowiss-publisher-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const git = args => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  git(['init', '-q']);
  fs.writeFileSync(path.join(root, 'source-only.txt'), 'keep this out of the publication');
  git(['add', 'source-only.txt']);
  const before = fs.readFileSync(path.join(root, '.git/index'));
  const build = path.join(root, 'build');
  fs.mkdirSync(build);
  fs.writeFileSync(path.join(build, '.nojekyll'), '');
  fs.writeFileSync(path.join(build, 'index.html'), 'nanoWISS · Türkçe\n');
  const files = artifactFiles(build);
  const tree = stageArtifactTree(root, build, path.join(root, '.git'), path.join(root, 'temporary.index'), files);
  assert.deepEqual(fs.readFileSync(path.join(root, '.git/index')), before);
  assert.deepEqual(git(['ls-tree', '--name-only', tree]).trim().split('\n'), ['.nojekyll', 'index.html']);
  assert.equal(git(['show', `${tree}:index.html`]), 'nanoWISS · Türkçe\n');
  fs.symlinkSync(path.join(root, 'source-only.txt'), path.join(build, 'leak'));
  assert.throws(() => artifactFiles(build), /symlink/);
});

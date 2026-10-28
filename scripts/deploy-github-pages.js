#!/usr/bin/env node

// The owner authorized GitHub Pages for nanoWISS production only (28 Oct 2026).
// Invoke through npm run deploy, whose predeploy performs build:release.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');

const EXPECTED_ORIGIN = 'https://github.com/batikanor/nanowiss.git';
const DOMAIN = 'www.nanowiss.com';
const NAME = 'BATIKAN BORA ORMANCI';
const EMAIL = 'batikanor@gmail.com';
const REF = 'refs/heads/gh-pages';

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function restrictedBerlinTime(date = new Date()) {
  requireCondition(date instanceof Date && Number.isFinite(date.getTime()), 'Invalid clock value.');
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', hourCycle: 'h23',
  }).formatToParts(date).map(part => [part.type, part.value]));
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(parts.weekday)
    && Number(parts.hour) >= 9 && Number(parts.hour) < 18;
}

function assertAllowedTime(date = new Date()) {
  requireCondition(!restrictedBerlinTime(date),
    'Publishing is blocked Monday–Friday, 09:00–18:00 Europe/Berlin. Do not override commit dates.');
}

function assertEnvironment(env = process.env) {
  for (const key of ['GIT_AUTHOR_DATE', 'GIT_COMMITTER_DATE']) {
    requireCondition(!Object.prototype.hasOwnProperty.call(env, key), `${key} must be unset.`);
  }
  requireCondition(!env.REACT_APP_SITE_ENV || env.REACT_APP_SITE_ENV === 'production',
    'Only an empty or production REACT_APP_SITE_ENV may publish to GitHub Pages.');
  for (const key of ['GIT_DIR', 'GIT_WORK_TREE', 'GIT_INDEX_FILE', 'GIT_COMMON_DIR']) {
    requireCondition(!env[key], `${key} must be unset when invoking the publisher.`);
  }
}

function command(root, program, args, options = {}) {
  return execFileSync(program, args, {
    cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024,
    timeout: 120000, stdio: ['ignore', 'pipe', 'inherit'],
    ...options,
  });
}

function assertPagesConfiguration(pages) {
  requireCondition(pages.build_type === 'legacy' && pages.source?.branch === 'gh-pages'
    && pages.source?.path === '/' && pages.cname === DOMAIN && pages.https_enforced === true,
  'Existing Pages settings must remain gh-pages /, www.nanowiss.com, HTTPS enforced.');
}

function artifactFiles(build) {
  const files = [];
  function walk(directory) {
    for (const name of fs.readdirSync(directory).sort()) {
      const absolute = path.join(directory, name);
      const relative = path.relative(build, absolute).split(path.sep).join('/');
      const stat = fs.lstatSync(absolute);
      requireCondition(!stat.isSymbolicLink(), `Artifact symlink is forbidden: ${relative}`);
      requireCondition(name !== '.git' && name !== 'node_modules' && !name.startsWith('.env'),
        `Unexpected private artifact path: ${relative}`);
      if (stat.isDirectory()) walk(absolute);
      else {
        requireCondition(stat.isFile(), `Artifact must contain only ordinary files: ${relative}`);
        const data = fs.readFileSync(absolute);
        files.push({ path: relative, bytes: data.length,
          sha256: crypto.createHash('sha256').update(data).digest('hex'),
          blob: crypto.createHash('sha1').update(`blob ${data.length}\0`).update(data).digest('hex') });
      }
    }
  }
  walk(build);
  return files.sort((a, b) => a.path.localeCompare(b.path));
}

// A separate index protects the source checkout; blob checks catch filters or
// line-ending conversion that would change the verified built bytes.
function stageArtifactTree(root, build, gitDir, indexPath, files) {
  const env = { ...process.env, GIT_INDEX_FILE: indexPath };
  command(root, 'git', ['read-tree', '--empty'], { env });
  command(build, 'git', [`--git-dir=${gitDir}`, `--work-tree=${build}`, 'add', '--all', '--', '.'], { env });
  const entries = command(root, 'git', ['ls-files', '--stage', '-z'], { env }).split('\0').filter(Boolean);
  const expected = new Map(files.map(file => [file.path, file]));
  requireCondition(entries.length === files.length, 'Staged artifact file count differs from its manifest.');
  for (const entry of entries) {
    const match = /^(100644|100755) ([0-9a-f]{40}) 0\t([\s\S]+)$/.exec(entry);
    requireCondition(match && expected.get(match[3])?.blob === match[2],
      'Staged bytes differ from the artifact manifest; refusing publication.');
    expected.delete(match[3]);
  }
  requireCondition(expected.size === 0, 'Some artifact paths were not staged.');
  return command(root, 'git', ['write-tree'], { env }).trim();
}

function publish() {
  const root = fs.realpathSync(path.resolve(__dirname, '..'));
  const git = (...args) => command(root, 'git', args).trim();
  const gh = endpoint => JSON.parse(command(root, 'gh', ['api', endpoint]));
  assertEnvironment();
  assertAllowedTime();
  requireCondition(fs.realpathSync(git('rev-parse', '--show-toplevel')) === root,
    'Run from the committed source checkout, not a nested candidate or generated directory.');
  const sourceCommit = git('rev-parse', '--verify', 'HEAD');
  const assertCleanSource = () => {
    requireCondition(git('status', '--porcelain=v1', '--untracked-files=all') === '',
      'Source checkout must be completely clean and committed.');
    requireCondition(git('rev-parse', 'HEAD') === sourceCommit, 'Source HEAD changed during publication.');
  };
  const assertOrigin = () => {
    requireCondition(git('remote', 'get-url', 'origin') === EXPECTED_ORIGIN
      && git('remote', 'get-url', '--push', '--all', 'origin') === EXPECTED_ORIGIN,
    'Origin fetch and push URLs must be exactly the authorized nanoWISS repository.');
  };
  const assertIdentity = () => {
    assertEnvironment();
    requireCondition(git('config', 'user.name') === NAME && git('config', 'user.email') === EMAIL,
      'Configure the exact personal nanoWISS Git identity before publishing.');
    for (const kind of ['GIT_AUTHOR_IDENT', 'GIT_COMMITTER_IDENT']) {
      requireCondition(git('var', kind).startsWith(`${NAME} <${EMAIL}> `),
        `Effective ${kind} differs from the personal repository identity.`);
    }
  };
  assertCleanSource();
  assertOrigin();
  assertIdentity();
  requireCondition(git('rev-parse', '--show-object-format') === 'sha1', 'Unexpected Git object format.');
  requireCondition(git('config', 'core.hooksPath') === '.githooks', 'The normal .githooks path must be active.');
  const hook = path.join(root, '.githooks/pre-push');
  fs.accessSync(hook, fs.constants.X_OK);
  requireCondition(fs.readFileSync(hook, 'utf8').includes('npm run brand:check'),
    'The executable pre-push brand review must be present.');
  requireCondition(gh('user').login === 'batikanor', 'Use the personal batikanor GitHub account.');
  requireCondition(gh('repos/batikanor/nanowiss').permissions?.push === true, 'GitHub push permission is required.');
  const pages = gh('repos/batikanor/nanowiss/pages');
  assertPagesConfiguration(pages);
  command(root, 'npm', ['run', 'legal:check'], { stdio: 'inherit' });
  command(root, 'npm', ['run', 'brand:check'], { stdio: 'inherit' });
  const details = JSON.parse(fs.readFileSync(path.join(root, 'src/content/legal-details.json'), 'utf8'));
  requireCondition(details.privacy.hosting.service === 'github-pages', 'Production disclosures must describe GitHub Pages.');

  const build = path.join(root, 'build');
  const index = fs.readFileSync(path.join(build, 'index.html'));
  requireCondition(index.length > 0, 'The production index is empty.');
  for (const entry of ['404.html', 'impressum/index.html', 'datenschutz/index.html',
    'nanowiss/impressum/index.html', 'nanowiss/datenschutz/index.html']) {
    requireCondition(fs.readFileSync(path.join(build, entry)).equals(index), `Stale or missing static entry: ${entry}`);
  }
  requireCondition(fs.readFileSync(path.join(build, 'CNAME'), 'utf8').trim() === DOMAIN, 'Wrong production CNAME.');
  requireCondition(fs.statSync(path.join(build, '.nojekyll')).isFile(), 'Missing .nojekyll.');
  requireCondition(!/^\s*Disallow:\s*\/\s*(?:#.*)?$/im.test(fs.readFileSync(path.join(build, 'robots.txt'), 'utf8')),
    'Production robots.txt must not disallow the whole website.');
  for (const file of artifactFiles(build).filter(file => file.path.endsWith('.html'))) {
    requireCondition(!/\bnoindex\b/i.test(fs.readFileSync(path.join(build, file.path), 'utf8')),
      `Production HTML contains noindex: ${file.path}`);
  }
  const manifest = JSON.parse(fs.readFileSync(path.join(build, 'asset-manifest.json'), 'utf8'));
  const mainPath = path.resolve(build, `.${manifest.files['main.js']}`);
  requireCondition(mainPath.startsWith(build + path.sep), 'Invalid main script path.');
  requireCondition(fs.readFileSync(mainPath, 'utf8').includes(details.privacy.hosting.logRetention),
    'The built bundle lacks the reviewed GitHub production disclosure. Rebuild production.');
  const builtAt = fs.statSync(path.join(build, 'index.html')).mtime;
  const commitTime = Number(git('show', '-s', '--format=%ct', sourceCommit)) * 1000;
  requireCondition(builtAt.getTime() >= commitTime, 'Build predates the committed source. Run npm run deploy.');
  for (const file of git('ls-files', '-z').split('\0').filter(Boolean)) {
    requireCondition(fs.statSync(path.join(root, file)).mtimeMs <= builtAt.getTime(),
      `Source is newer than the build: ${file}. Rebuild the clean source checkout.`);
  }
  assertCleanSource();
  fs.writeFileSync(path.join(build, 'release.json'), JSON.stringify({
    schema: 1, builtAtUTC: builtAt.toISOString(), sourceCommit,
  }, null, 2) + '\n');

  const receiptDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nanowiss-pages-release-'));
  const receiptPath = path.join(receiptDir, 'receipt.json');
  const receipt = { schema: 1, createdAtUTC: new Date().toISOString(), sourceCommit,
    status: 'preparing', productionURL: `https://${DOMAIN}/`, pagesConfiguration: pages,
    reviewRecords: { emailAgreement: details.privacy.emailService.agreementReview,
      hostingRoles: details.privacy.hosting.processingRoleReview, privacyReviewBasis: details.privacy.reviewBasis } };
  const saveReceipt = () => fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2) + '\n', { mode: 0o600 });
  console.log(`Private publication receipt: ${receiptPath}`);
  try {
    const remoteParent = () => {
      const output = git('ls-remote', '--exit-code', '--heads', 'origin', REF);
      const match = /^([0-9a-f]{40})\s+refs\/heads\/gh-pages$/.exec(output);
      requireCondition(match, 'The existing gh-pages parent could not be established.');
      return match[1];
    };
    const parent = remoteParent();
    receipt.previousPagesCommit = parent;
    git('fetch', '--no-tags', 'origin', REF);
    requireCondition(git('rev-parse', 'FETCH_HEAD') === parent, 'Remote changed during fetch; start again.');
    const backup = path.join(receiptDir, 'previous-production.tar');
    git('archive', '--format=tar', `--output=${backup}`, parent);
    fs.chmodSync(backup, 0o600);
    receipt.previousArtifact = { path: backup,
      sha256: crypto.createHash('sha256').update(fs.readFileSync(backup)).digest('hex') };
    const files = artifactFiles(build);
    receipt.artifactFiles = files.map(({ blob, ...file }) => file);
    const gitDir = git('rev-parse', '--absolute-git-dir');
    const tree = stageArtifactTree(root, build, gitDir, path.join(receiptDir, 'artifact.index'), files);
    receipt.artifactTree = tree;
    assertCleanSource();
    assertIdentity();
    assertAllowedTime();
    receipt.commitCreatedAtUTC = new Date().toISOString();
    const commit = git('commit-tree', tree, '-p', parent, '-m', `Publish nanoWISS website from ${sourceCommit}`);
    receipt.pagesCommit = commit;
    receipt.status = 'commit-created-not-pushed';
    saveReceipt();
    assertOrigin();
    assertPagesConfiguration(gh('repos/batikanor/nanowiss/pages'));
    requireCondition(remoteParent() === parent, 'Remote gh-pages changed; refusing to push.');
    assertCleanSource();
    requireCondition(JSON.stringify(artifactFiles(build)) === JSON.stringify(files), 'Build changed after staging.');
    assertIdentity();
    assertAllowedTime();
    // Use the source worktree so its normal pre-push hook runs. No force push.
    command(root, 'git', ['push', '--porcelain', 'origin', `${commit}:${REF}`], { stdio: 'inherit' });
    receipt.status = 'pushed-awaiting-pages-verification';
    receipt.pushedAtUTC = new Date().toISOString();
    saveReceipt();
    requireCondition(remoteParent() === commit, 'Push returned but remote differs; inspect the recorded commit before retrying.');
    console.log(`Pushed ${commit}. Verify the Pages workflow and live release.json before reporting deployment complete.`);
  } catch (error) {
    receipt.error = error.message;
    if (receipt.status !== 'pushed-awaiting-pages-verification') receipt.status = 'failed-or-unconfirmed';
    saveReceipt();
    throw error;
  }
}

if (require.main === module) {
  try { publish(); } catch (error) { console.error(`Publication stopped: ${error.message}`); process.exitCode = 1; }
}

module.exports = { restrictedBerlinTime, assertAllowedTime, assertEnvironment,
  assertPagesConfiguration, artifactFiles, stageArtifactTree };

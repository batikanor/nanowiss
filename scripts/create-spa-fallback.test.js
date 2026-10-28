const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { createSpaFallback } = require('./create-spa-fallback');

function temporaryBuild(t) {
  const build = fs.mkdtempSync(path.join(os.tmpdir(), 'nanowiss-pages-test-'));
  t.after(() => fs.rmSync(build, { recursive: true, force: true }));
  return build;
}

function publicEntryFiles(build) {
  return fs.readdirSync(build, { recursive: true })
    .filter(file => file.endsWith('index.html'))
    .sort();
}

test('company and legal pages have exact SPA entries without changing assets or the custom domain', t => {
  const build = temporaryBuild(t);
  const index = Buffer.from('<!doctype html><html lang="en"><body>nanoWISS · Türkçe<script src="/static/main.js"></script></body></html>');
  fs.writeFileSync(path.join(build, 'index.html'), index);
  fs.mkdirSync(path.join(build, 'static'));
  fs.writeFileSync(path.join(build, 'static/main.js'), 'window.release = "current";');
  fs.writeFileSync(path.join(build, 'CNAME'), 'www.nanowiss.com\n');

  assert.equal(createSpaFallback(build), 13);
  const entries = publicEntryFiles(build);
  assert.deepEqual(entries, [
    'agrowiss/index.html', 'datenschutz/index.html', 'impressum/index.html', 'index.html',
    'nanowiss/agrowiss/index.html', 'nanowiss/datenschutz/index.html', 'nanowiss/impressum/index.html',
    'nanowiss/index.html', 'nanowiss/products/index.html', 'nanowiss/social-impact/index.html',
    'nanowiss/team/index.html', 'products/index.html', 'social-impact/index.html', 'team/index.html',
  ]);
  for (const entry of [...entries, '404.html']) {
    assert.deepEqual(fs.readFileSync(path.join(build, entry)), index, entry);
  }
  assert.equal(fs.readFileSync(path.join(build, '.nojekyll'), 'utf8'), '');
  assert.equal(fs.readFileSync(path.join(build, 'static/main.js'), 'utf8'), 'window.release = "current";');
  assert.equal(fs.readFileSync(path.join(build, 'CNAME'), 'utf8'), 'www.nanowiss.com\n');
  assert.equal(fs.existsSync(path.join(build, 'alternative')), false);
  assert.equal(fs.existsSync(path.join(build, 'nanowiss/alternative')), false);
});

test('a repeated build refreshes direct entries and the fallback to the latest release', t => {
  const build = temporaryBuild(t);
  fs.writeFileSync(path.join(build, 'index.html'), '<script src="/old.js"></script>');
  createSpaFallback(build);

  const latest = '<script src="/latest.js"></script>';
  fs.writeFileSync(path.join(build, 'index.html'), latest);
  createSpaFallback(build);

  for (const entry of [...publicEntryFiles(build), '404.html']) {
    assert.equal(fs.readFileSync(path.join(build, entry), 'utf8'), latest, entry);
  }
});

test('an incomplete build fails before creating deployable-looking fallback files', t => {
  const build = temporaryBuild(t);
  fs.writeFileSync(path.join(build, 'CNAME'), 'www.nanowiss.com\n');

  assert.throws(() => createSpaFallback(build), /build\/index\.html does not exist/);
  assert.deepEqual(fs.readdirSync(build), ['CNAME']);
});

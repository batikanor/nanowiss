#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const scanTargets = [
  'src/App.js',
  'src/components',
  'public/index.html',
  'public/manifest.json',
];

const forbidden = [
  { pattern: /\bwebgl\b/i, message: 'Do not advertise WebGL in user-facing copy.' },
  { pattern: /\bthree\.js\b/i, message: 'Do not advertise Three.js in user-facing copy.' },
  { pattern: /website behaves/i, message: 'Do not make the website itself the message.' },
  { pattern: /product hero/i, message: 'Avoid web-design jargon like product hero.' },
  { pattern: /client-side/i, message: 'Do not advertise client-side implementation details.' },
  { pattern: /static[- ]hosting/i, message: 'Do not advertise hosting implementation details.' },
  { pattern: /pointer[- ]reactive/i, message: 'Do not advertise interaction implementation details.' },
  { pattern: /gaussian\s+splat/i, message: 'Do not advertise rendering techniques.' },
  { pattern: /\bprocedural\s+splats?\b/i, message: 'Do not advertise rendering techniques.' },
  { pattern: /\bsplat\s+(lab|garden)\b/i, message: 'Do not expose rendering-tech labels as page copy.' },
  { pattern: /route is designed/i, message: 'Do not describe hidden routes as routes.' },
];

const implementationLineAllowlist = [
  /new THREE\.WebGLRenderer/,
  /import .*three/,
  /from 'three'/,
  /const .*Splat/,
  /function .*Splat/,
  /className="[^"]*splat/i,
  /className={`[^`]*splat/i,
  /path="\/alternative/i,
  /path: '\/alternative/i,
  /AlternativeSplat/i,
  /SplatGardenCanvas/,
  /SplatProductCanvas/,
  /createSplatTexture/,
  /award-splat-garden/,
  /splat-page/,
  /splat-shell/,
  /splat-reference/,
  /splat-notes/,
  /splat-canvas/,
  /react-router-dom/,
  /client-side routing/,
];

function walk(target) {
  const absolute = path.join(root, target);
  if (!fs.existsSync(absolute)) return [];
  const stat = fs.statSync(absolute);
  if (stat.isFile()) return [absolute];
  return fs.readdirSync(absolute).flatMap((entry) => walk(path.join(target, entry)));
}

function shouldScan(file) {
  return /\.(js|jsx|html|json)$/.test(file);
}

function isAllowedImplementationLine(line) {
  return implementationLineAllowlist.some((pattern) => pattern.test(line));
}

const failures = [];

for (const target of scanTargets) {
  for (const file of walk(target).filter(shouldScan)) {
    const relative = path.relative(root, file);
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, index) => {
      if (isAllowedImplementationLine(line)) return;
      forbidden.forEach(({ pattern, message }) => {
        if (pattern.test(line)) {
          failures.push({
            file: relative,
            line: index + 1,
            text: line.trim(),
            message,
          });
        }
      });
    });
  }
}

if (failures.length > 0) {
  console.error('Brand copy check failed.');
  console.error('User-facing copy must be about nanoWISS, not the web implementation.\n');
  failures.forEach((failure) => {
    console.error(`${failure.file}:${failure.line} ${failure.message}`);
    console.error(`  ${failure.text}`);
  });
  process.exit(1);
}

console.log('Brand copy check passed.');

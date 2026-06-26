#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, '..', 'build');
const indexPath = path.join(buildDir, 'index.html');
const fallbackPath = path.join(buildDir, '404.html');

if (!fs.existsSync(indexPath)) {
  console.error('Cannot create SPA fallback: build/index.html does not exist.');
  process.exit(1);
}

fs.copyFileSync(indexPath, fallbackPath);
console.log('Created build/404.html for GitHub Pages SPA routing.');

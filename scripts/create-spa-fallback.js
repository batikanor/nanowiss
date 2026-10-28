#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// GitHub Pages serves directory indexes with a successful status. Keep this
// list limited to public company pages and their existing legacy aliases.
const companyRoutes = [
  'impressum',
  'datenschutz',
  'team',
  'products',
  'agrowiss',
  'social-impact',
];
const directRoutes = [
  ...companyRoutes,
  'nanowiss',
  ...companyRoutes.map(route => `nanowiss/${route}`),
];

function createSpaFallback(buildDir) {
  const indexPath = path.join(buildDir, 'index.html');

  if (!fs.existsSync(indexPath)) {
    throw new Error('Cannot create SPA entries: build/index.html does not exist.');
  }

  fs.copyFileSync(indexPath, path.join(buildDir, '404.html'));
  for (const route of directRoutes) {
    const routeDir = path.join(buildDir, route);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.copyFileSync(indexPath, path.join(routeDir, 'index.html'));
  }
  fs.writeFileSync(path.join(buildDir, '.nojekyll'), '');
  return directRoutes.length;
}

if (require.main === module) {
  try {
    const count = createSpaFallback(path.resolve(__dirname, '..', 'build'));
    console.log(`Created ${count} direct page entries, 404.html and .nojekyll for GitHub Pages.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { createSpaFallback };

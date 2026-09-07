// Post-export fix for Cloudflare Pages static hosting:
// Next.js static export emits default-locale pages under /en, but the site's
// canonical URLs are unprefixed (/, /guide, ...). This script mirrors the
// English pages to the root and adds 301 redirects from /en/* so both URL
// forms resolve and SEO weight consolidates on the unprefixed URLs.
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(import.meta.dirname, '..', 'out');
const EN = path.join(OUT, 'en');

if (!fs.existsSync(EN)) {
  console.error('postexport: out/en missing — run next build first');
  process.exit(1);
}

// 1. Mirror every en page (html + txt RSC payload) to the root.
function copyTree(srcDir, destDir) {
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const src = path.join(srcDir, entry.name);
    const dest = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(dest, { recursive: true });
      copyTree(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}
copyTree(EN, OUT);

// 2. Root index directly serves the English home (no meta-refresh hop).
fs.copyFileSync(path.join(OUT, 'en.html'), path.join(OUT, 'index.html'));

// 3. 301 the prefixed English URLs onto the canonical root URLs.
const pages = [];
(function collect(dir, base = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) collect(path.join(dir, entry.name), rel);
    else if (entry.name.endsWith('.html')) pages.push(rel.replace(/\.html$/, ''));
  }
})(EN);
const rules = ['/en / 301', ...pages.map((p) => `/en/${p} /${p} 301`)].join('\n');
fs.writeFileSync(path.join(OUT, '_redirects'), rules + '\n');

console.log(`postexport: mirrored ${pages.length} EN pages to root, wrote _redirects`);

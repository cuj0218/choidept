import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
const og = await readFile(new URL('../public/og.svg', import.meta.url), 'utf8');
const favicon = await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8');
const robots = await readFile(new URL('../robots.txt', import.meta.url), 'utf8');
const sitemap = await readFile(new URL('../sitemap.xml', import.meta.url), 'utf8');

test('ships the stable positioning and canonical metadata', () => {
  assert.match(html, /모두가 AI를/);
  assert.match(html, /쉽게,/);
  assert.match(html, /28K\+/);
  assert.match(html, /15M\+/);
  assert.match(html, /32/);
  assert.match(html, /<link rel="canonical" href="https:\/\/choidept\.com\/"/);
  assert.match(html, /<title>CHOI DEPT\. — 모두가 AI를 쉽게, 최피티<\/title>/);
});

test('contains semantic persona and portfolio landmarks', () => {
  for (const id of ['persona-panel', 'proof-ledger', 'selected-work', 'experience', 'profile', 'contact']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.equal((html.match(/data-persona=/g) ?? []).length, 4);
  assert.match(html, /role="tablist"/);
  assert.match(html, /aria-live="polite"/);
});

test('loads the browser controller as a module', () => {
  assert.match(html, /<script type="module" src="\/script\.js"><\/script>/);
});

test('defines brand tokens, persona accents, responsive layouts, and reduced motion', () => {
  for (const token of ['--ink: #111111', '--ivory: #f7f4ec', '--cobalt: #3157ff']) {
    assert.ok(css.toLowerCase().includes(token));
  }
  for (const selector of ['[data-accent="creator"]', '[data-accent="beauty"]', '[data-accent="student"]', '[data-accent="kkami"]']) {
    assert.ok(css.includes(selector));
  }
  assert.match(css, /@media \(max-width: 768px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /:focus-visible/);
});

test('uses absolute share metadata and the apex domain', () => {
  assert.match(html, /property="og:image" content="https:\/\/choidept\.com\/public\/og\.svg"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.equal(html.includes('www.choidept.com'), false);
});

test('keeps share artwork self-resolving and crawl metadata canonical', () => {
  const characterHref = og.match(/<image href="([^"]+)"/)?.[1];

  assert.equal(characterHref, '../assets/characters/dark.webp');
  assert.equal(
    new URL(characterHref, 'https://choidept.com/public/og.svg').href,
    'https://choidept.com/assets/characters/dark.webp',
  );
  assert.match(favicon, /aria-label="CHOI DEPT favicon"/);
  assert.doesNotMatch(favicon, /<(?:image|use)\b|(?:href|url)\s*=/);
  assert.equal(robots, 'User-agent: *\nAllow: /\n\nSitemap: https://choidept.com/sitemap.xml\n');
  assert.equal(
    sitemap,
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://choidept.com/</loc></url>\n</urlset>\n',
  );
});

test('keeps the short desktop hero and mobile headline inside the viewport', () => {
  assert.match(html, /<br class="hero__mobile-break">/);
  assert.match(html, /class="hero__desktop-space"/);
  assert.match(css, /overflow-x:\s*clip/);
  assert.match(css, /min-height:\s*min\(650px,\s*calc\(100svh - 230px\)\)/);
  assert.match(css, /grid-template-rows:\s*auto minmax\(0,\s*1fr\) auto/);
  assert.match(css, /height:\s*min\(44svh,\s*430px\)/);
  assert.match(css, /\.hero__mobile-break\s*\{\s*display:\s*none/);
  assert.match(css, /@media \(max-width: 768px\)[\s\S]*\.hero__mobile-break\s*\{\s*display:\s*block/);
});

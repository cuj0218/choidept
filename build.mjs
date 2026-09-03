import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('index.html', 'dist/index.html');
await cp('design-tokens.css', 'dist/design-tokens.css');
await cp('styles.css', 'dist/styles.css');
await cp('script.js', 'dist/script.js');
await cp('portfolio-data.js', 'dist/portfolio-data.js');
await cp('ui-state.js', 'dist/ui-state.js');
await cp('assets', 'dist/assets', { recursive: true });
await cp('public', 'dist/public', { recursive: true });
await cp('robots.txt', 'dist/robots.txt');
await cp('sitemap.xml', 'dist/sitemap.xml');
console.log('Built CHOI DEPT static site to dist/');

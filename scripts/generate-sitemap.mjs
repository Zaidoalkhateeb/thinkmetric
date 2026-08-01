import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { categories, siteUrl } from '../src/data/siteContent.js';
import { products } from '../src/data/products.js';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sitemapPath = resolve(projectRoot, 'public/sitemap.xml');

const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/products', changefreq: 'weekly', priority: '0.9' },
  ...categories.map((category) => ({ path: `/products/${category.slug}`, priority: '0.8' })),
  ...products.map((product) => ({ path: `/products/detail/${product.slug}`, priority: '0.6' })),
  { path: '/about', priority: '0.7' },
  { path: '/contact', priority: '0.7' },
];

function renderUrl({ path, changefreq, priority }) {
  const fields = [`<loc>${siteUrl}${path}</loc>`];
  if (changefreq) fields.push(`<changefreq>${changefreq}</changefreq>`);
  fields.push(`<priority>${priority}</priority>`);
  return `  <url>${fields.join('')}</url>`;
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(renderUrl),
  '</urlset>',
  '',
].join('\n');

if (process.argv.includes('--check')) {
  const current = await readFile(sitemapPath, 'utf8');
  if (current.replaceAll('\r\n', '\n') !== sitemap) {
    console.error('public/sitemap.xml is stale. Run `npm run sitemap`.');
    process.exitCode = 1;
  } else {
    console.log(`Sitemap is current (${routes.length} routes).`);
  }
} else {
  await writeFile(sitemapPath, sitemap, 'utf8');
  console.log(`Generated sitemap with ${routes.length} routes.`);
}

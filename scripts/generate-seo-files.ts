/**
 * Génère public/sitemap.xml et public/robots.txt à partir du contenu du site.
 * Exécuté automatiquement avant `npm start` et `npm run build` (Node ≥ 22.18 : TypeScript natif).
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { NEWS } from '../src/app/core/content/news.ts';
import { SITE, SITEMAP_PAGES } from '../src/app/core/site.config.ts';

const publicDir = join(import.meta.dirname, '..', 'public');
const today = new Date().toISOString().slice(0, 10);
const latestNews = NEWS[0]?.updated ?? NEWS[0]?.date ?? today;

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (char) => `&#${char.charCodeAt(0)};`);

const absolute = (path: string) => (path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`);

const urls = [
  ...SITEMAP_PAGES.map((page) => ({
    loc: absolute(page.path),
    lastmod: page.path === '/' || page.path === '/actualites' ? latestNews : today,
    changefreq: page.changefreq,
    priority: page.priority,
  })),
  ...NEWS.map((article) => ({
    loc: absolute(`/actualites/${article.slug}`),
    lastmod: article.updated ?? article.date,
    changefreq: 'yearly',
    priority: 0.6,
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE.url}/sitemap.xml
`;

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap);
writeFileSync(join(publicDir, 'robots.txt'), robots);
console.log(`✔ sitemap.xml (${urls.length} URL) et robots.txt générés dans public/`);

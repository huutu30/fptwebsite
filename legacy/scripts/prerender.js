/**
 * Pre-render script — Chạy sau vite build để sinh HTML tĩnh cho mỗi route.
 * 
 * Flow:
 *   1. vite build          → dist/ (client bundle)
 *   2. vite build --ssr    → dist/server/ (server bundle)
 *   3. node prerender.js   → Ghi HTML tĩnh vào dist/
 * 
 * Không cần thêm package nào — chỉ dùng Node.js built-in.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { SITE_URL } from '../src/config/site.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SERVER_ENTRY = path.join(DIST, 'server', 'entry-server.js');

/**
 * Trích xuất Helmet tags từ rendered HTML.
 * Helmet render title/meta/link/script inline trong component tree.
 * Ta extract ra → chuyển vào <head>, xóa khỏi body.
 * 
 * Cách nhận biết: Helmet tags nằm ngay đầu rendered HTML,
 * trước <div class="app-container"> (vì Helmet render trước tree).
 */
function extractAndClean(html) {
  // Tìm vị trí bắt đầu nội dung thực (đầu component tree)
  const appStart = html.indexOf('<div class="app-container">');
  if (appStart === -1) {
    return { cleanHtml: html, headTags: '' };
  }

  // Phần đầu = Helmet rendered tags
  const helmetSection = html.substring(0, appStart);
  // Phần sau = nội dung trang thực
  const cleanHtml = html.substring(appStart);

  // Extract title từ helmet section
  let title = '';
  const titleMatch = helmetSection.match(/<title[^>]*>(.*?)<\/title>/);
  if (titleMatch) {
    title = titleMatch[1];
  }

  // Extract tất cả meta tags
  const metas = [];
  const metaRegex = /<meta[^>]*\/?>/gi;
  let m;
  while ((m = metaRegex.exec(helmetSection)) !== null) {
    metas.push(m[0]);
  }

  // Extract link tags (canonical, preload)
  const links = [];
  const linkRegex = /<link[^>]*\/?>/gi;
  while ((m = linkRegex.exec(helmetSection)) !== null) {
    links.push(m[0]);
  }

  // Extract JSON-LD scripts
  const scripts = [];
  const scriptRegex = /<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi;
  while ((m = scriptRegex.exec(helmetSection)) !== null) {
    scripts.push(m[0]);
  }

  // Build head injection string
  const headParts = [];
  if (metas.length > 0) headParts.push(...metas);
  if (links.length > 0) headParts.push(...links);
  if (scripts.length > 0) headParts.push(...scripts);

  return {
    cleanHtml,
    title,
    headTags: headParts.join('\n    '),
  };
}

async function prerender() {
  console.log('\n🚀 Pre-rendering bắt đầu...\n');

  // 1. Import server bundle (dùng pathToFileURL cho Windows)
  const { render, getRoutes } = await import(pathToFileURL(SERVER_ENTRY).href);

  // 2. Đọc template HTML từ client build
  const templatePath = path.join(DIST, 'index.html');
  const template = fs.readFileSync(templatePath, 'utf-8');

  // 3. Thu thập tất cả routes
  const routes = getRoutes();
  console.log(`📋 Tổng cộng ${routes.length} routes cần pre-render:\n`);

  let success = 0;
  let failed = 0;

  for (const route of routes) {
    try {
      // 4. Render route thành HTML
      const { html } = render(route);

      // 5. Extract Helmet tags + clean body
      const { cleanHtml, title, headTags } = extractAndClean(html);

      // 6. Build final page
      let page = template;

      // Inject clean HTML vào <div id="root">
      page = page.replace(
        '<div id="root"></div>',
        `<div id="root">${cleanHtml}</div>`
      );

      // Inject Helmet title (thay thế title gốc)
      if (title) {
        page = page.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
      }

      // Inject Helmet meta/link/script vào <head>
      if (headTags) {
        // Xóa meta tags cũ từ template (sẽ được thay thế bởi Helmet tags)
        page = page.replace(/<meta name="description"[^>]*>/, '');
        page = page.replace(/<meta name="keywords"[^>]*>/, '');
        page = page.replace(/<meta name="robots"[^>]*>/, '');
        page = page.replace('</head>', `    ${headTags}\n  </head>`);
      }

      // 7. Tạo thư mục và ghi file
      const routePath = route === '/' ? '/index' : route;
      const filePath = path.join(DIST, routePath, 'index.html');
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, page);

      success++;
      console.log(`  ✅ ${route}`);
    } catch (err) {
      failed++;
      console.error(`  ❌ ${route} — ${err.message}`);
    }
  }

  // 8. Auto-generate sitemap.xml + robots.txt từ danh sách routes
  generateSitemap(routes);
  generateRobotsTxt();

  // 9. Cleanup — xóa server bundle (không cần deploy)
  fs.rmSync(path.join(DIST, 'server'), { recursive: true, force: true });

  console.log(`\n🏁 Pre-render hoàn tất: ${success} thành công, ${failed} lỗi.\n`);

  if (failed > 0) {
    process.exit(1);
  }
}


/**
 * Tự động sinh sitemap.xml từ danh sách routes.
 * Priority: trang chủ = 1.0, danh mục = 0.9, sản phẩm = 0.8,
 * tin tức = 0.7, địa phương = 0.8, hỗ trợ/about = 0.5
 */
function generateSitemap(routes) {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  function getPriority(route) {
    if (route === '/trang-chu') return '1.0';
    if (route.startsWith('/internet/ca-nhan') || route.startsWith('/internet/gia-dinh') ||
        route.startsWith('/internet/game-thu') || route.startsWith('/internet/doanh-nghiep') ||
        route.startsWith('/internet/wifi-7')) return '0.9';
    if (route.startsWith('/internet/')) return '0.8';
    if (route.startsWith('/giai-tri/') || route.startsWith('/thiet-bi/')) return '0.8';
    if (route.startsWith('/lap-internet-wifi/')) return '0.8';
    if (route === '/tin-tuc') return '0.7';
    if (route.startsWith('/tin-tuc/')) return '0.6';
    return '0.5';
  }

  function getChangefreq(route) {
    if (route === '/trang-chu' || route === '/tin-tuc') return 'daily';
    if (route.startsWith('/tin-tuc/')) return 'monthly';
    if (route.startsWith('/internet/') || route.startsWith('/lap-internet-wifi/')) return 'weekly';
    return 'monthly';
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const route of routes) {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${route}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${getChangefreq(route)}</changefreq>\n`;
    xml += `    <priority>${getPriority(route)}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  const sitemapPath = path.join(DIST, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml);
  console.log(`\n🗺️  Sitemap generated: ${routes.length} URLs → dist/sitemap.xml`);
}

/**
 * Auto-generate robots.txt với domain từ config.
 */
function generateRobotsTxt() {
  const content = `User-agent: *\nAllow: /\nDisallow: /assets/*\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  const robotsPath = path.join(DIST, 'robots.txt');
  fs.writeFileSync(robotsPath, content);
  console.log(`🤖 robots.txt generated → dist/robots.txt`);
}

prerender().catch(err => {
  console.error('💥 Pre-render thất bại:', err);
  process.exit(1);
});

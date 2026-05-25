import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function scrapeNews() {
  console.log('Khởi động Puppeteer...');
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Hàm tạo slug
  function toSlug(str) {
    str = str.toLowerCase();     
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
    str = str.replace(/([^0-9a-z-\s])/g, '');
    str = str.replace(/(\s+)/g, '-');
    str = str.replace(/^-+/g, '');
    str = str.replace(/-+$/g, '');
    return str;
  }
  
  await page.setViewport({ width: 1280, height: 800 });
  
  console.log('Đang truy cập trang tin tức FPT...');
  await page.goto('https://fpt.vn/tin-tuc', { waitUntil: 'networkidle2', timeout: 60000 });
  
  const links = await page.evaluate(() => {
    const urls = new Set();
    document.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && href.includes('/tin-tuc/') && href.endsWith('.html')) {
        urls.add(href.startsWith('http') ? href : `https://fpt.vn${href}`);
      }
    });
    return Array.from(urls).slice(0, 8);
  });
  
  console.log(`Tìm thấy ${links.length} bài viết. Bắt đầu crawl chi tiết...`);
  
  const newsData = [];
  
  for (let i = 0; i < links.length; i++) {
    const url = links[i];
    console.log(`[${i+1}/${links.length}] Đang crawl: ${url}`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      // wait a bit for dynamic content
      await new Promise(r => setTimeout(r, 2000));
      
      const articleData = await page.evaluate(() => {
        const cleanText = (txt) => txt ? txt.replace(/\s+/g, ' ').trim() : '';
        
        const titleEl = document.querySelector('h1') || document.querySelector('.article-title');
        const title = titleEl ? cleanText(titleEl.textContent) : '';
        
        const dateEl = document.querySelector('.article-date') || document.querySelector('.time') || document.querySelector('.news-detail-time');
        let date = dateEl ? cleanText(dateEl.textContent) : '';
        if (!date) {
            const match = document.body.innerHTML.match(/\d{2}\/\d{2}\/\d{4}/);
            if (match) date = match[0];
        }
        
        const catEl = document.querySelector('.article-category') || document.querySelector('.breadcrumb a:last-of-type');
        const category = catEl ? cleanText(catEl.textContent) : 'Tin tức FPT';
        
        const descEl = document.querySelector('.sapo') || document.querySelector('.article-desc');
        let desc = descEl ? cleanText(descEl.textContent) : '';
        if (!desc) {
            const metaDesc = document.querySelector('meta[name="description"], meta[property="og:description"]');
            if (metaDesc) desc = cleanText(metaDesc.getAttribute('content'));
        }
        
        let image = '';
        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) image = ogImage.getAttribute('content');
        
        const content = [];
        
        // Lấy tất cả các thẻ p, h2, h3, img theo đúng thứ tự xuất hiện trong DOM
        const elements = document.querySelectorAll('p, h2, h3, figure img, .fptvn-ckor--content img, .detail-content img');
        
        // Để tránh trùng lặp ảnh (ví dụ querySelectorAll có thể lấy trùng nếu img nằm trong figure),
        // ta dùng một Set để lưu các node img đã xử lý.
        const processedNodes = new Set();
        
        // Hoặc cách chuẩn xác hơn: Tìm container chính rồi mới querySelectorAll
        const container = document.querySelector('.news-detail-body') || document.querySelector('.detail-content') || document.body;
        const allElements = container.querySelectorAll('p, h2, h3, img');
        
        allElements.forEach(el => {
            if (processedNodes.has(el)) return;
            processedNodes.add(el);
            
            const tag = el.tagName.toLowerCase();
            
            // Bỏ qua elements trong header, footer, nav
            if (el.closest('header') || el.closest('footer') || el.closest('nav') || el.closest('.sidebar')) return;

            if (tag === 'p') {
                const txt = cleanText(el.textContent);
                // Bỏ qua các đoạn text rác, cookie, bản quyền
                if (txt.length < 10 || 
                    txt.includes('Chính sách Cookies') || 
                    txt.includes('FPT Telecom sẽ sử dụng cookie') ||
                    txt.includes('Giấy chứng nhận ĐKDN') ||
                    txt.includes('hotrokhachhang@fpt.com')) return;
                    
                content.push({ type: 'paragraph', text: txt });
            } else if (tag === 'h2' || tag === 'h3') {
                const txt = cleanText(el.textContent);
                if (txt.length > 5) {
                    content.push({ type: 'heading', text: txt });
                }
            } else if (tag === 'img') {
                // Bỏ qua ảnh quá nhỏ, icon, logo
                if (el.width < 100 && el.width > 0) return; // width > 0 để tránh bỏ qua ảnh chưa load (width=0)
                
                let src = el.getAttribute('src') || el.getAttribute('data-src');
                if (src && !src.includes('logo') && !src.includes('icon') && !src.includes('svg')) {
                    if (!src.startsWith('http')) {
                        src = src.startsWith('/') ? `https://fpt.vn${src}` : `https://fpt.vn/${src}`;
                    }
                    
                    let caption = '';
                    const nextEl = el.nextElementSibling;
                    if (nextEl && (nextEl.tagName.toLowerCase() === 'em' || nextEl.classList.contains('caption'))) {
                        caption = cleanText(nextEl.textContent);
                    } else {
                         // Nếu nằm trong figure thì caption có thể ở figcaption
                         const figure = el.closest('figure');
                         if (figure) {
                             const figcaption = figure.querySelector('figcaption');
                             if (figcaption) caption = cleanText(figcaption.textContent);
                         }
                    }
                    
                    content.push({ type: 'image', src, caption });
                }
            }
        });
        
        return { title, date, category, desc, image, content };
      });
      
      if (articleData.title) {
          const id = i + 1;
          newsData.push({
            id: id,
            slug: `${toSlug(articleData.title)}-${id}.html`,
            ...articleData
          });
      }
      
    } catch (e) {
      console.error(`Lỗi khi crawl ${url}:`, e.message);
    }
  }
  
  await browser.close();
  
  if (newsData.length > 0) {
      const outputPath = path.join(process.cwd(), 'src/data/newsData.js');
      const fileContent = `// File này được tự động tạo từ script crawl dữ liệu fpt.vn\n\nexport const NEWS_DATA = ${JSON.stringify(newsData, null, 2)};\n`;
      fs.writeFileSync(outputPath, fileContent, 'utf-8');
      console.log(`Đã lưu ${newsData.length} bài viết vào ${outputPath}`);
  }
}

scrapeNews().catch(console.error);

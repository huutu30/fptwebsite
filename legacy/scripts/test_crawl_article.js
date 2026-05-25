import * as cheerio from 'cheerio';

async function crawlArticle() {
  const url = 'https://fpt.vn/tin-tuc/nguoi-viet-doi-cach-dung-internet-nha-mang-vao-cuoc-dua-moi-14401.html';
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const title = $('h1').first().text().trim() || $('title').text().trim();
  // Usually the sapo (description) is a bold paragraph or the first paragraph or an element with class sapo
  const desc = $('.sapo').text().trim() || $('meta[name="description"]').attr('content') || '';
  
  // Try to find category and date
  const date = $('.time').text().trim() || $('.date').text().trim() || '';
  const category = $('.category').text().trim() || 'Tin tức';
  
  // Find main image
  let image = $('meta[property="og:image"]').attr('content') || '';
  if (!image) {
    image = $('.article-content img').first().attr('src') || '';
  }
  
  // Find content blocks
  const content = [];
  $('.detail-content p, .detail-content h2, .detail-content h3, .detail-content img').each((i, el) => {
    const tagName = el.tagName.toLowerCase();
    if (tagName === 'p') {
      const text = $(el).text().trim();
      if (text) content.push({ type: 'paragraph', text });
    } else if (tagName === 'h2' || tagName === 'h3') {
      const text = $(el).text().trim();
      if (text) content.push({ type: 'heading', text });
    } else if (tagName === 'img') {
      const src = $(el).attr('src');
      let caption = $(el).next().hasClass('caption') ? $(el).next().text().trim() : '';
      if (!caption && $(el).parent().is('figure')) {
          caption = $(el).parent().find('figcaption').text().trim();
      }
      if (src) content.push({ type: 'image', src, caption });
    }
  });

  // If detail-content is not found, fallback to another common class
  if (content.length === 0) {
    $('#content p, #content h2, #content img, .content p, .content h2, .content img, .post-content p, .post-content h2, .post-content img').each((i, el) => {
      const tagName = el.tagName.toLowerCase();
      if (tagName === 'p') {
        const text = $(el).text().trim();
        if (text) content.push({ type: 'paragraph', text });
      } else if (tagName === 'h2' || tagName === 'h3') {
        const text = $(el).text().trim();
        if (text) content.push({ type: 'heading', text });
      } else if (tagName === 'img') {
        const src = $(el).attr('src');
        if (src) content.push({ type: 'image', src });
      }
    });
  }

  console.log(JSON.stringify({ title, desc, date, category, image, content_length: content.length }, null, 2));
}

crawlArticle();

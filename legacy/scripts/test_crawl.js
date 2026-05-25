import * as cheerio from 'cheerio';

async function crawl() {
  const url = 'https://fpt.vn/tin-tuc';
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const links = new Set();
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href.includes('/tin-tuc/') && href.endsWith('.html')) {
      links.add(href.startsWith('http') ? href : `https://fpt.vn${href}`);
    }
  });

  console.log("Found links:", Array.from(links).slice(0, 10));
}

crawl();

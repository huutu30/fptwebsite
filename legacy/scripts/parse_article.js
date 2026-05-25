import * as cheerio from 'cheerio';
import fs from 'fs';

const html = fs.readFileSync('article2.html', 'utf8');
const $ = cheerio.load(html);

console.log("Title: ", $('h1').text().trim());

const contentBlocks = [];
$('.fptvn-ckor--content p, .fptvn-ckor--content h2, .fptvn-ckor--content h3, .fptvn-ckor--content img').each((i, el) => {
    const tag = el.tagName.toLowerCase();
    if (tag === 'p') {
        const text = $(el).text().trim();
        if (text) contentBlocks.push({ type: 'paragraph', text });
    } else if (tag === 'h2' || tag === 'h3') {
        const text = $(el).text().trim();
        if (text) contentBlocks.push({ type: 'heading', text });
    } else if (tag === 'img') {
        const src = $(el).attr('src');
        if (src) contentBlocks.push({ type: 'image', src });
    }
});

console.log("Found blocks:", contentBlocks.length);
console.log(JSON.stringify(contentBlocks.slice(0, 5), null, 2));

// check for sapo/description
const desc = $('.sapo').text().trim() || $('meta[property="og:description"]').attr('content') || '';
console.log("Desc:", desc);

// check for date
let date = $('.article-date').text().trim() || $('.news-detail-time').text().trim() || $('.time').text().trim() || '';
if (!date) {
    // maybe try to find text like xx/xx/xxxx
    const match = html.match(/\d{2}\/\d{2}\/\d{4}/);
    if (match) date = match[0];
}
console.log("Date:", date);

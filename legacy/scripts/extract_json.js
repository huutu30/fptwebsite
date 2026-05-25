import * as cheerio from 'cheerio';
import fs from 'fs';

const html = fs.readFileSync('article2.html', 'utf8');
const $ = cheerio.load(html);

$('script[type="application/json"], script#__NEXT_DATA__').each((i, el) => {
    console.log("Found JSON script with id", $(el).attr('id'));
    const content = $(el).html();
    fs.writeFileSync(`script_${i}.json`, content);
});

// also look for Vue or Nuxt data
$('script').each((i, el) => {
    const content = $(el).html();
    if (content.includes('window.__NUXT__')) {
        console.log("Found Nuxt data");
        fs.writeFileSync('nuxt_data.js', content);
    }
});

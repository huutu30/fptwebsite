import puppeteer from 'puppeteer';

async function debug() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  await page.goto('https://fpt.vn/tin-tuc/cach-doi-ten-tren-google-meet-bang-may-tinh-va-dien-thoai-nhanh-nhat-14390.html', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2000));
  
  const contentData = await page.evaluate(() => {
     let longestText = '';
     let longestClass = '';
     
     document.querySelectorAll('div, article, section').forEach(el => {
         const text = el.innerText;
         if (text && text.length > longestText.length && text.length < 10000) {
             longestText = text;
             longestClass = el.className;
         }
     });
     
     // Let's find all paragraphs and get their parent's class
     const parentClasses = new Set();
     document.querySelectorAll('p').forEach(p => {
         if(p.innerText.length > 50) {
             parentClasses.add(p.parentElement.className);
         }
     });
     
     return { longestClass, parentClasses: Array.from(parentClasses) };
  });
  
  console.log(contentData);
  await browser.close();
}

debug().catch(console.error);

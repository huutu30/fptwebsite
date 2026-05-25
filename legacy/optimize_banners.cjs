const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const downloadImage = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      const data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    }).on('error', reject);
  });
};

const images = [
  // Banners
  { url: 'https://hi-static.fpt.vn/sys/shop/prod/2026-05-05/69f946dd13884_uu-dai-lap-mang-giam-50000-vnd-fpt.png', name: 'banner_1.webp', type: 'banner' },
  { url: 'https://hi-static.fpt.vn/sys/shop/prod/2026-05-08/69fdb4a3a067a_gioi-thieu-ban-moi-nhan-300k.jpg', name: 'banner_2.webp', type: 'banner' },
  { url: 'https://hi-static.fpt.vn/sys/shop/prod/2026-05-15/6a06bf94a53b0_1920X717.jpg', name: 'banner_3.webp', type: 'banner' },
  { url: 'https://hi-static.fpt.vn/sys/shop/prod/2026-04-16/69e041bf8f173_1_1920x717%20%283%29.jpg', name: 'banner_4.webp', type: 'banner' },
  { url: 'https://hi-static.fpt.vn/sys/shop/prod/2026-05-05/69f9b4c70ca43_uu-dai-1-trieu-3-camera-fpt.jpg', name: 'banner_5.webp', type: 'banner' },
  { url: 'https://hi-static.fpt.vn/sys/shop/prod/2026-05-13/6a046076700ba_mo-ruong-nhan-qua-hi-fpt.png', name: 'banner_6.webp', type: 'banner' },
  // Product Cards
  { url: 'https://hi-static.fpt.vn/sys/shop/prod/2025-12-01/692d2536e31ea_FPT%20Play%20Premium.png', name: 'fpt_play_premium.webp', type: 'card' },
  { url: 'https://hi-static.fpt.vn/sys/shop/prod/2026-05-15/6a06c5c4e2879_G%C3%B3i%20V.VIP%201-UU%20DAI%2030%25.jpg', name: 'fpt_vvip_1.webp', type: 'card' },
  { url: 'https://hi-static.fpt.vn/sys/shop/prod/2026-05-15/6a06c5b7174f8_G%C3%B3i%20V.VIP%202-1250x902%20%281%29.jpg', name: 'fpt_vvip_2.webp', type: 'card' },
  { url: 'https://hi-static.fpt.vn/sys/shop/prod/2026-05-15/6a06cc4ab950f_318x421%20%281%29.jpg', name: 'fpt_promo_banner.webp', type: 'card' },
];

async function processImages() {
  const dir = path.join(__dirname, 'public', 'images', 'optimized');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const img of images) {
    try {
      console.log(`Downloading ${img.url}...`);
      const buffer = await downloadImage(img.url);
      
      let sharpInstance = sharp(buffer);
      
      if (img.type === 'banner') {
        // Resize banners to a reasonable width (1200px)
        sharpInstance = sharpInstance.resize({ width: 1200, withoutEnlargement: true });
      } else {
        // Resize cards to max width 600px
        sharpInstance = sharpInstance.resize({ width: 600, withoutEnlargement: true });
      }

      await sharpInstance
        .webp({ quality: 80, effort: 6 })
        .toFile(path.join(dir, img.name));

      console.log(`Saved optimized ${img.name}`);
    } catch (e) {
      console.error(`Error processing ${img.name}:`, e);
    }
  }
}

processImages();

import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure directories exist
const dirs = [
  path.join(__dirname, 'public/images/hardware'),
  
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const assets = [
  // --- HARDWARE IMAGES (Will be converted to WebP) ---
  { url: 'https://hi-static.fpt.vn/sys/shop/prod/2025-12-07/69353d34ac88e_1734947657_AX3000CV2%20%281%29.png', dest: 'public/images/hardware/modem-wifi-6.webp', convertWebp: true },
  { url: 'https://hi-static.fpt.vn/sys/shop/prod/2025-12-07/69353d36839cc_1738730831_ont1port.png', dest: 'public/images/hardware/ont-1-port.webp', convertWebp: true },
  { url: 'https://hi-static.fpt.vn/sys/shop/prod/2025-12-07/69353d38a24a1_1734374306_AccessPointAX1500C.png', dest: 'public/images/hardware/access-point.webp', convertWebp: true },
  { url: 'https://hi-static.fpt.vn/sys/shop/prod/2025-12-07/69353d5f35971_1734375849_FPTPlayBox650%20%281%29.png', dest: 'public/images/hardware/fpt-play-box.webp', convertWebp: true },
  { url: 'https://hi-static.fpt.vn/sys/shop/prod/2026-01-12/6964c2141dfad_G%C3%B3i-Premium.png', dest: 'public/images/hardware/fpt-play-vvip.webp', convertWebp: true },
  { url: 'https://hi-static.fpt.vn/sys/shop/prod/2025-12-07/69353d483f474_goi-the-thao-ngoai-hang-anh.png', dest: 'public/images/hardware/ngoai-hang-anh.webp', convertWebp: true },

  // --- MISSING HARDWARE IMAGES (Will be converted to WebP) ---
  { url: 'https://wifi.fpt.net/wp-content/uploads/2021/03/er-x-01_1024x1024.png', dest: 'public/images/hardware/thiet-bi-can-bang-tai.webp', convertWebp: true },
  { url: 'https://hi-static.fpt.vn/sys/shop/prod/2025-08-19/68a36365b603e_Ultra-fast.png', dest: 'public/images/hardware/ultra-fast.webp', convertWebp: true },
  { url: 'https://hi-static.fpt.vn/sys/shop/prod/2025-08-19/68a3d68660dc9_dich-vu-f-safe.png', dest: 'public/images/hardware/f-safe.webp', convertWebp: true },
  { url: 'https://s3-api.fpt.vn/fptvn-storage/2025-04-03/1743678037_2.png', dest: 'public/images/hardware/zplay.webp', convertWebp: true },
  { url: 'https://mangfpt.vn/wp-content/uploads/2025/11/Internet-Hub-BE12000Z.jpg', dest: 'public/images/hardware/modem-wifi-7.webp', convertWebp: true },
  { url: 'https://mangfpt.vn/wp-content/uploads/2025/11/Internet-Hub-BE6500C.jpg', dest: 'public/images/hardware/mesh-wifi-7.webp', convertWebp: true },


];

const downloadBuffer = (url) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://fpt.vn/',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    };

    https.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download, status code: ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
};

async function processAll() {
  console.log(`Bắt đầu tải ${assets.length} file ảnh...\n`);

  for (const item of assets) {
    const fileName = path.basename(item.dest);
    const destPath = path.join(__dirname, item.dest);

    try {
      console.log(`⬇️ Downloading: ${fileName}`);
      const buffer = await downloadBuffer(item.url);

      if (item.convertWebp) {
        await sharp(buffer)
          .webp({ quality: 80, alphaQuality: 100 })
          .toFile(destPath);
        console.log(`✅ Converted & Saved: ${item.dest}`);
      } else {
        fs.writeFileSync(destPath, buffer);
        console.log(`✅ Saved: ${item.dest}`);
      }
    } catch (err) {
      console.error(`❌ Lỗi khi xử lý ${fileName}:`, err.message);
    }
  }

  console.log('\n🎉 Hoàn thành việc tải toàn bộ ảnh assets!');
}

processAll();

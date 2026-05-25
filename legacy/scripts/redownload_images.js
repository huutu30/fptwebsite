/**
 * Script tải lại ảnh từ nguồn gốc (git history) với kích thước 624x450.
 * Kích thước này đủ sắc nét cho cả desktop (hiển thị 546x394) và mobile retina (312x225 x2).
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import sharp from 'sharp';
import crypto from 'crypto';

const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const BANNER_PREFIX = '69e041bf8f173';

// Get original URLs from git history
const oldProductData = execSync('git show 80fb1f6:src/data/productData.js', { encoding: 'utf8' });
const oldNewsData = execSync('git show 80fb1f6:src/data/newsData.js', { encoding: 'utf8' });

const urlRegex = /"(https?:\/\/[^"]+\.(?:jpg|jpeg|png)(?:\?[^"]*)?)"/gi;

// Build a mapping: hash → original URL
const urlMap = {};
let match;
for (const content of [oldProductData, oldNewsData]) {
  const regex = new RegExp(urlRegex.source, urlRegex.flags);
  while ((match = regex.exec(content)) !== null) {
    const url = match[1];
    const hash = crypto.createHash('md5').update(url).digest('hex').substring(0, 8);
    const originalName = path.basename(new URL(url).pathname);
    const cleanName = originalName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
    const filename = `${cleanName}_${hash}.webp`;
    urlMap[filename] = url;
  }
}

console.log(`Found ${Object.keys(urlMap).length} image URLs from git history\n`);

async function downloadAndResize(filename, url) {
  const outputPath = path.join(PUBLIC_IMAGES_DIR, filename);
  
  try {
    const response = await axios({ url, responseType: 'arraybuffer', timeout: 15000 });
    const buffer = Buffer.from(response.data, 'binary');
    
    const isBanner = filename.includes(BANNER_PREFIX);
    
    // Banner: keep at 1920x717 with quality 75
    // Products: resize to 624x450 with quality 78
    if (isBanner) {
      await sharp(buffer)
        .resize(1920, 717, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(outputPath);
    } else {
      await sharp(buffer)
        .resize(624, 450, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(outputPath);
    }
    
    const size = fs.statSync(outputPath).size;
    console.log(`[OK] ${filename} (${Math.round(size/1024)} KiB)`);
  } catch (err) {
    console.error(`[ERROR] ${filename}: ${err.message}`);
  }
}

async function main() {
  console.log('Re-downloading and resizing images from original sources...\n');
  
  // Get list of current webp files that need replacing
  const currentFiles = fs.readdirSync(PUBLIC_IMAGES_DIR).filter(f => f.endsWith('.webp'));
  
  let processed = 0;
  for (const file of currentFiles) {
    if (urlMap[file]) {
      await downloadAndResize(file, urlMap[file]);
      processed++;
    } else {
      console.log(`[SKIP] ${file} — no original URL found`);
    }
  }
  
  console.log(`\n✅ Done! Re-downloaded ${processed} images at proper quality.`);
}

main();

/**
 * Script resize ảnh lần 2 — target kích thước mobile chính xác.
 * Banner: 750x280 (mobile viewport)
 * Product cards: 312x225 (mobile) * 2 retina = 624x450 → nhưng vẫn quá to
 * Giảm xuống 400x300 cho tối ưu mobile
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images_v2');

const BANNER_PREFIX = '69e041bf8f173';
// Mobile product cards display at ~312x225, x1.5 retina = 468x338
const PRODUCT_WIDTH = 468;
const PRODUCT_HEIGHT = 338;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function resizeImage(filePath) {
  const filename = path.basename(filePath);
  const outputPath = path.join(OUTPUT_DIR, filename);
  
  try {
    const metadata = await sharp(filePath).metadata();
    
    // Skip banner — keep as-is (already optimized at 1920x717)
    if (filename.includes(BANNER_PREFIX)) {
      fs.copyFileSync(filePath, outputPath);
      console.log(`[SKIP] ${filename} (banner — keep full size)`);
      return 0;
    }
    
    // Skip SVG, PNG that are small
    if (!filename.endsWith('.webp')) {
      fs.copyFileSync(filePath, outputPath);
      return 0;
    }
    
    if (metadata.width <= PRODUCT_WIDTH && metadata.height <= PRODUCT_HEIGHT) {
      fs.copyFileSync(filePath, outputPath);
      console.log(`[SKIP] ${filename} (${metadata.width}x${metadata.height})`);
      return 0;
    }
    
    const originalSize = fs.statSync(filePath).size;
    
    await sharp(filePath)
      .resize(PRODUCT_WIDTH, PRODUCT_HEIGHT, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ quality: 75 })
      .toFile(outputPath);
    
    const newSize = fs.statSync(outputPath).size;
    const saved = originalSize - newSize;
    console.log(`[RESIZED] ${filename}: ${metadata.width}x${metadata.height} → fit ${PRODUCT_WIDTH}x${PRODUCT_HEIGHT} (saved ${(saved/1024).toFixed(1)} KiB)`);
    return saved;
    
  } catch (err) {
    console.error(`[ERROR] ${filename}:`, err.message);
    try { fs.copyFileSync(filePath, outputPath); } catch(e) {}
    return 0;
  }
}

async function main() {
  const files = fs.readdirSync(IMAGES_DIR).filter(f => f.endsWith('.webp'));
  console.log(`Found ${files.length} WebP images to check...\n`);
  
  let totalSaved = 0;
  for (const file of files) {
    totalSaved += await resizeImage(path.join(IMAGES_DIR, file));
  }
  
  console.log(`\n✅ Done! Total saved: ${(totalSaved / 1024).toFixed(1)} KiB`);
  console.log(`\nTo apply: run these commands:`);
  console.log(`  Remove-Item public\\images\\*.webp -Force`);
  console.log(`  Copy-Item public\\images_v2\\*.webp public\\images\\ -Force`);
  console.log(`  Remove-Item -Recurse -Force public\\images_v2`);
}

main();

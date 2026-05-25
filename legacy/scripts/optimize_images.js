/**
 * Script tự động tải ảnh từ URL ngoài, nén sang WebP và thay thế link trong code.
 * 
 * Cách chạy: node scripts/optimize_images.js
 * 
 * Yêu cầu: npm install sharp axios (đã cài sẵn trong project)
 */

import fs from 'fs';
import path from 'path';
import axios from 'axios';
import sharp from 'sharp';
import crypto from 'crypto';

const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const DATA_FILES = [
  path.join(process.cwd(), 'src', 'data', 'productData.js'),
  path.join(process.cwd(), 'src', 'data', 'newsData.js')
];

// Ensure public/images exists
if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
  fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
}

async function downloadAndConvert(url) {
  try {
    const response = await axios({
      url,
      responseType: 'arraybuffer',
      timeout: 10000,
    });
    
    const buffer = Buffer.from(response.data, 'binary');
    
    // Generate a short hash for the filename to prevent duplicates/long names
    const hash = crypto.createHash('md5').update(url).digest('hex').substring(0, 8);
    const originalName = path.basename(new URL(url).pathname);
    const cleanName = originalName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
    
    const newFilename = `${cleanName}_${hash}.webp`;
    const outputPath = path.join(PUBLIC_IMAGES_DIR, newFilename);
    
    // Skip if already converted
    if (fs.existsSync(outputPath)) {
      console.log(`[SKIP] Already exists: ${newFilename}`);
      return `/images/${newFilename}`;
    }
    
    // Convert to webp
    await sharp(buffer)
      .webp({ quality: 80 }) // 80 is a good balance between size and quality
      .toFile(outputPath);
      
    console.log(`[OK] Converted: ${newFilename}`);
    return `/images/${newFilename}`;
  } catch (err) {
    console.error(`[ERROR] Failed to process ${url}:`, err.message);
    return null;
  }
}

async function processFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find all https image URLs ending in .jpg, .jpeg, .png
  const urlRegex = /"(https?:\/\/[^"]+\.(?:jpg|jpeg|png)(?:\?[^"]*)?)"/gi;
  let match;
  const urlsToProcess = new Set();
  
  while ((match = urlRegex.exec(content)) !== null) {
    urlsToProcess.add(match[1]);
  }
  
  console.log(`Found ${urlsToProcess.size} unique images in ${path.basename(filePath)}`);
  
  const urlMap = {};
  
  for (const url of urlsToProcess) {
    console.log(`Processing: ${url}`);
    const newLocalPath = await downloadAndConvert(url);
    if (newLocalPath) {
      urlMap[url] = newLocalPath;
    }
  }
  
  // Replace URLs in content
  let updatedContent = content;
  let replaceCount = 0;
  for (const [oldUrl, newUrl] of Object.entries(urlMap)) {
    const regex = new RegExp(`"${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g');
    updatedContent = updatedContent.replace(regex, `"${newUrl}"`);
    replaceCount++;
  }
  
  if (replaceCount > 0) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Successfully updated ${replaceCount} image URLs in ${path.basename(filePath)}`);
  }
}

async function main() {
  console.log("Starting image optimization...");
  for (const file of DATA_FILES) {
    await processFile(file);
  }
  console.log("Optimization complete!");
}

main();

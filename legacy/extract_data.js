import fs from 'fs';
import { PRODUCT_DATA } from './src/data/productData.js';

let output = '';

const formatPrice = (price) => {
  if (typeof price === 'number') return price.toLocaleString('vi-VN');
  if (typeof price === 'object') {
    return `hcm ${price.hcm.toLocaleString('vi-VN')}  tinh ${price.tinh.toLocaleString('vi-VN')}`;
  }
  return price || 'Liên hệ';
};

const formatFeatures = (features) => {
  if (!features) return '';
  if (Array.isArray(features)) {
    return features.map(f => `\t${f}`).join('\n');
  }
  return `\t${features}`;
};

for (const [category, products] of Object.entries(PRODUCT_DATA)) {
  output += `========== NHÓM: ${category.toUpperCase()} ==========\n\n`;
  for (const product of products) {
    output += `tên gói: ${product.name}\n`;
    output += `giá: ${formatPrice(product.price)}\n`;
    
    let speed = [];
    if (product.dl) speed.push(`${product.dl}`);
    if (product.ul) speed.push(`${product.ul}`);
    let speedStr = speed.length > 0 ? speed.join('/') : '';
    if (speedStr) output += `tốc độ: ${speedStr}\n`;
    
    let features = product.features || product.details || product.equipment;
    if (features) {
      output += `mô tả:\n${formatFeatures(features)}\n`;
    }
    output += '\n';
  }
}

fs.writeFileSync('all_products_data.txt', output, 'utf-8');
console.log('Đã tạo file all_products_data.txt thành công!');

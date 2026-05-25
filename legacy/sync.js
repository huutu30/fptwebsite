import fs from 'fs';
import { PRODUCT_DATA } from './src/data/productData.js';

const text = fs.readFileSync('all_products_data.txt', 'utf-8');

// Parse text
const groups = {};
let currentGroup = '';
let currentItem = null;

const lines = text.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith('========== NHÓM:')) {
    currentGroup = line.match(/NHÓM: (.*?) ==/)[1].toLowerCase();
    groups[currentGroup] = [];
    continue;
  }
  
  if (line.startsWith('tên gói:')) {
    if (currentItem) {
      groups[currentGroup].push(currentItem);
    }
    currentItem = { name: line.replace('tên gói:', '').trim(), features: [] };
    continue;
  }
  
  if (line.startsWith('giá:')) {
    const pStr = line.replace('giá:', '').trim();
    if (pStr.includes('hcm')) {
      const match = pStr.match(/hcm\s*([\d\.]+)\s*tinh\s*([\d\.]+)/);
      if (match) {
        currentItem.price = {
          hcm: parseInt(match[1].replace(/\./g, '')),
          tinh: parseInt(match[2].replace(/\./g, ''))
        };
      } else {
        currentItem.price = pStr;
      }
    } else {
      currentItem.price = parseInt(pStr.replace(/\./g, '')) || pStr;
    }
    continue;
  }
  
  if (line.startsWith('tốc độ:')) {
    const sStr = line.replace('tốc độ:', '').trim();
    const parts = sStr.split('/');
    if (parts.length === 2) {
      currentItem.dl = parts[0].trim();
      currentItem.ul = parts[1].trim();
    }
    continue;
  }
  
  if (line.startsWith('mô tả:')) {
    // Read following lines that start with tab or space until next 'tên gói' or 'NHÓM' or empty line
    while (i + 1 < lines.length) {
      const nextLine = lines[i+1];
      if (nextLine.startsWith('tên gói:') || nextLine.startsWith('==========') || nextLine.trim() === '') {
        break;
      }
      if (nextLine.trim()) {
        currentItem.features.push(nextLine.trim());
      }
      i++;
    }
    continue;
  }
}
if (currentItem && currentGroup) {
  groups[currentGroup].push(currentItem);
}

// Now merge with PRODUCT_DATA
const mergedData = {};
for (const key of Object.keys(PRODUCT_DATA)) {
  const originalList = PRODUCT_DATA[key];
  const newList = groups[key] || [];
  
  mergedData[key] = originalList.map(orig => {
    // Find matching item in newList
    const match = newList.find(n => n.name.toLowerCase() === orig.name.toLowerCase());
    if (match) {
      const updated = { ...orig, ...match };
      // if it originally used details or equipment, replace them with features
      delete updated.details;
      delete updated.equipment;
      delete updated.targets;
      return updated;
    }
    return orig; // fallback
  });
  
  // If there are new items in newList that weren't in orig
  for (const n of newList) {
    if (!originalList.find(o => o.name.toLowerCase() === n.name.toLowerCase())) {
      // It's a new item! Assign an ID based on name
      const id = n.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      mergedData[key].push({ id, ...n });
    }
  }
}

// Now generate the JS string
let jsString = `
// Cố gắng tự động tối ưu SEO bằng cách thêm alt cho hình ảnh
const autoOptimizeSEO = (products) => {
  return products.map((item) => {
    let opt = { ...item };
    if (!opt.alt && opt.name) opt.alt = \`\${opt.name} - Internet FPT\`;
    if (!opt.path) {
      opt.path = \`/\${(opt.name || "")
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-z0-9-]/g, "")}\`;
    }
    opt.btnTitle = \`Đăng ký gói \${opt.name} ngay hôm nay\`;
    return opt;
  });
};

export const PRODUCT_DATA = {
`;

for (const [key, list] of Object.entries(mergedData)) {
  const isAuto = ['ca_nhan', 'gia_dinh', 'doanh_nghiep', 'the_thao', 'f_game', 'wifi7_plans'].includes(key);
  if (isAuto) {
    jsString += `  ${key}: autoOptimizeSEO([\n`;
  } else {
    jsString += `  ${key}: [\n`;
  }
  
  for (const item of list) {
    jsString += `    {\n`;
    for (const [k, v] of Object.entries(item)) {
      if (k === 'features' && Array.isArray(v)) {
        jsString += `      features: [\n`;
        for (const f of v) {
          jsString += `        "${f.replace(/"/g, '\\"')}",\n`;
        }
        jsString += `      ],\n`;
      } else if (typeof v === 'object' && v !== null) {
        jsString += `      ${k}: ${JSON.stringify(v)},\n`;
      } else if (typeof v === 'string') {
        jsString += `      ${k}: "${v.replace(/"/g, '\\"')}",\n`;
      } else {
        jsString += `      ${k}: ${v},\n`;
      }
    }
    jsString += `    },\n`;
  }
  
  if (isAuto) {
    jsString += `  ]),\n`;
  } else {
    jsString += `  ],\n`;
  }
}

jsString += `};\n`;

fs.writeFileSync('src/data/productData.js', jsString, 'utf-8');
console.log('Update successful');

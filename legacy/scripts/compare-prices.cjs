/**
 * ============================================================
 *  COMPARE GIÁ: productData.js ↔ fpt.vn
 * ============================================================
 * 
 * BƯỚC 1: Mở trang fpt.vn/internet/ca-nhan hoặc /gia-dinh 
 *         trên Chrome, nhấn F12 → Console, paste đoạn JS bên 
 *         dưới (hoặc file extract-fpt-prices.js) rồi Enter.
 *         → Nó sẽ tự copy JSON vào clipboard.
 * 
 * BƯỚC 2: Tạo file scripts/fpt-live-prices.json, paste nội 
 *         dung JSON vào.
 * 
 * BƯỚC 3: Chạy: node scripts/compare-prices.cjs
 * 
 * ============================================================
 *  TÙY CHỌN:
 *    --cat=gia_dinh    Lọc theo category
 *    --mismatch        Chỉ hiện gói có giá khác
 *    --match           Chỉ hiện gói giá khớp
 *    --missing         Chỉ hiện gói thiếu (chưa có trong local)
 * ============================================================
 */

const fs = require('fs');
const path = require('path');

// --- Parse args ---
const args = process.argv.slice(2);
const showMismatch = args.includes('--mismatch');
const showMatch = args.includes('--match');
const showMissing = args.includes('--missing');
const catFilter = args.find(a => a.startsWith('--cat='))?.split('=')[1] || null;

// --- Load FPT live prices ---
const livePath = path.join(__dirname, 'fpt-live-prices.json');
if (!fs.existsSync(livePath)) {
  console.error(`
❌  Chưa có file fpt-live-prices.json!

📋  Hướng dẫn nhanh:
    1. Mở Chrome → vào trang fpt.vn/internet/ca-nhan (hoặc /gia-dinh)
    2. Nhấn F12 → tab Console
    3. Paste nội dung file scripts/extract-fpt-prices.js rồi Enter
    4. Dữ liệu đã được copy vào clipboard
    5. Tạo file scripts/fpt-live-prices.json → paste vào → save
    6. Chạy lại: node scripts/compare-prices.cjs
  `);
  process.exit(1);
}

let liveData;
try {
  liveData = JSON.parse(fs.readFileSync(livePath, 'utf-8'));
} catch (e) {
  console.error('❌ Lỗi parse fpt-live-prices.json:', e.message);
  process.exit(1);
}

// --- Load local productData ---
const filePath = path.join(__dirname, '..', 'src', 'data', 'productData.js');
let fileContent = fs.readFileSync(filePath, 'utf-8');
fileContent = fileContent.replace(/^export\s+const/m, 'const');
fileContent = fileContent.replace(/^import\s.+$/gm, '');

const script = `
function autoOptimizeSEO(arr) { return arr; }
${fileContent}
module.exports = { PRODUCT_DATA };
`;

const tmpPath = path.join(__dirname, '_tmp_compare.cjs');
fs.writeFileSync(tmpPath, script);

let PRODUCT_DATA;
try {
  delete require.cache[require.resolve(tmpPath)];
  PRODUCT_DATA = require(tmpPath).PRODUCT_DATA;
} catch (e) {
  console.error('❌ Lỗi parse productData.js:', e.message);
  process.exit(1);
} finally {
  fs.unlinkSync(tmpPath);
}

// --- Build local lookup: normalized name → { hcm, tinh, category } ---
const localLookup = {};
for (const [category, products] of Object.entries(PRODUCT_DATA)) {
  if (!Array.isArray(products)) continue;
  for (const item of products) {
    const key = normalize(item.name);
    const hcm = typeof item.price === 'object' ? item.price.hcm : item.price;
    const tinh = typeof item.price === 'object' ? item.price.tinh : item.price;
    localLookup[key] = { name: item.name, hcm, tinh, category };
  }
}

// --- Compare ---
const fmt = (s, w) => (s + '').padEnd(w);
const fmtR = (s, w) => (s + '').padStart(w);
const fmtPrice = (p) => p != null ? Number(p).toLocaleString('vi-VN') + 'đ' : 'N/A';

console.log('\n' + '═'.repeat(120));
console.log('  📊  SO SÁNH GIÁ: productData.js ↔ fpt.vn');
console.log('═'.repeat(120));
console.log(`  📅  Dữ liệu FPT live: ${liveData._meta?.timestamp || 'không rõ'}`);
console.log(`  🌐  Trang nguồn: ${liveData._meta?.url || 'không rõ'}`);
console.log(`  📍  Vùng: ${liveData._meta?.region || 'không rõ'}`);
console.log('');

// Table header
console.log(
  '  ' + fmt('Tên gói (FPT.vn)', 35) +
  fmtR('FPT.vn', 12) +
  fmtR('Local HCM', 12) +
  fmtR('Local Tỉnh', 12) +
  fmtR('Chênh HCM', 11) +
  '  ' + fmt('Status', 14) +
  fmt('Category', 18)
);
console.log('  ' + '─'.repeat(116));

let matchCount = 0, mismatchCount = 0, missingCount = 0;

const liveProducts = liveData.products || [];
for (const live of liveProducts) {
  const key = normalize(live.name);
  const local = localLookup[key] || findFuzzy(live.name, localLookup);

  if (catFilter && local && local.category !== catFilter) continue;

  let status, chenhHcm;
  if (!local) {
    status = '🆕 MISSING';
    chenhHcm = '-';
    missingCount++;
  } else {
    const livePrice = live.price;
    const localHcm = local.hcm;
    if (livePrice === localHcm) {
      status = '✅ MATCH';
      chenhHcm = '0';
      matchCount++;
    } else {
      const diff = (localHcm || 0) - (livePrice || 0);
      chenhHcm = (diff > 0 ? '+' : '') + Number(diff).toLocaleString('vi-VN');
      status = '❌ MISMATCH';
      mismatchCount++;
    }
  }

  // Filter
  if (showMismatch && status !== '❌ MISMATCH') continue;
  if (showMatch && status !== '✅ MATCH') continue;
  if (showMissing && status !== '🆕 MISSING') continue;

  console.log(
    '  ' + fmt(live.name.substring(0, 33), 35) +
    fmtR(fmtPrice(live.price), 12) +
    fmtR(local ? fmtPrice(local.hcm) : '-', 12) +
    fmtR(local ? fmtPrice(local.tinh) : '-', 12) +
    fmtR(chenhHcm, 11) +
    '  ' + fmt(status, 14) +
    fmt(local?.category || '-', 18)
  );
}

console.log('  ' + '─'.repeat(116));

// Summary
console.log('\n  📈  TỔNG KẾT:');
console.log(`     Tổng gói trên FPT.vn:  ${liveProducts.length}`);
console.log(`     ✅ Giá khớp:           ${matchCount}`);
console.log(`     ❌ Giá lệch:           ${mismatchCount}` + (mismatchCount > 0 ? '  ← cần cập nhật!' : ''));
console.log(`     🆕 Chưa có local:      ${missingCount}` + (missingCount > 0 ? '  ← gói mới trên FPT!' : ''));
console.log('═'.repeat(120) + '\n');

// --- Helpers ---
function normalize(name) {
  return (name || '')
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function findFuzzy(name, lookup) {
  const n = normalize(name);
  // Try exact
  if (lookup[n]) return lookup[n];
  // Try partial match
  for (const [key, val] of Object.entries(lookup)) {
    if (key.includes(n) || n.includes(key)) return val;
  }
  // Try first word match
  const words = n.split(' ').filter(w => w.length > 2);
  for (const [key, val] of Object.entries(lookup)) {
    const matchWords = words.filter(w => key.includes(w));
    if (matchWords.length >= Math.ceil(words.length * 0.7)) return val;
  }
  return null;
}

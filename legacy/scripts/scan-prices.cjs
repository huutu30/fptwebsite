/**
 * Script scan nhanh giá tổng quan trong productData.js
 * 
 * Chạy: node scripts/scan-prices.cjs
 * 
 * Tùy chọn:
 *   --same     Chỉ hiển thị các gói có giá HCM = Tỉnh (cần sửa)
 *   --diff     Chỉ hiển thị các gói có giá HCM ≠ Tỉnh (đã đúng)
 *   --cat=xxx  Lọc theo category (ví dụ: --cat=gia_dinh)
 *   --csv      Xuất dạng CSV
 */

const fs = require('fs');
const path = require('path');

// --- Parse args ---
const args = process.argv.slice(2);
const showSameOnly = args.includes('--same');
const showDiffOnly = args.includes('--diff');
const csvMode = args.includes('--csv');
const catFilter = args.find(a => a.startsWith('--cat='))?.split('=')[1] || null;

// --- Read & extract PRODUCT_DATA ---
const filePath = path.join(__dirname, '..', 'src', 'data', 'productData.js');
let fileContent = fs.readFileSync(filePath, 'utf-8');

// Remove ES module syntax so we can eval
fileContent = fileContent.replace(/^export\s+const/m, 'const');
fileContent = fileContent.replace(/^import\s.+$/gm, '');

// Add autoOptimizeSEO stub if not defined
const script = `
function autoOptimizeSEO(arr) { return arr; }
${fileContent}
module.exports = { PRODUCT_DATA };
`;

const tmpPath = path.join(__dirname, '_tmp_scan.cjs');
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

// --- Scan & collect ---
const rows = [];
let totalProducts = 0;
let sameCount = 0;
let diffCount = 0;
let staticCount = 0;

for (const [category, products] of Object.entries(PRODUCT_DATA)) {
  if (catFilter && category !== catFilter) continue;
  if (!Array.isArray(products)) continue;

  for (const item of products) {
    totalProducts++;
    const name = item.name || item.id || '(no name)';
    let hcm, tinh, status;

    if (typeof item.price === 'object' && item.price !== null) {
      hcm = item.price.hcm;
      tinh = item.price.tinh;
      if (hcm === tinh) {
        status = '⚠️  SAME';
        sameCount++;
      } else {
        status = '✅ DIFF';
        diffCount++;
      }
    } else {
      hcm = item.price;
      tinh = item.price;
      status = '📌 STATIC';
      staticCount++;
    }

    // Filter
    if (showSameOnly && status !== '⚠️  SAME') continue;
    if (showDiffOnly && status !== '✅ DIFF') continue;

    rows.push({ category, name, hcm, tinh, status, diff: (hcm || 0) - (tinh || 0) });
  }
}

// --- Output ---
if (csvMode) {
  console.log('Category,Name,HCM,Tinh,Diff,Status');
  rows.forEach(r => {
    console.log(`${r.category},${r.name},${r.hcm || ''},${r.tinh || ''},${r.diff},${r.status.replace(/[^\w]/g, '')}`);
  });
} else {
  // Header
  console.log('\n' + '═'.repeat(110));
  console.log('  📊  SCAN GIÁ PRODUCT DATA - Tổng quan');
  console.log('═'.repeat(110));

  if (catFilter) console.log(`  🔍  Lọc category: ${catFilter}`);
  if (showSameOnly) console.log('  🔍  Chỉ hiển thị: giá HCM = Tỉnh (cần kiểm tra)');
  if (showDiffOnly) console.log('  🔍  Chỉ hiển thị: giá HCM ≠ Tỉnh');
  console.log('');

  // Table header
  const fmt = (s, w) => (s + '').padEnd(w);
  const fmtR = (s, w) => (s + '').padStart(w);

  console.log(
    '  ' + fmt('Category', 20) + fmt('Tên gói', 38) + fmtR('HCM', 12) + fmtR('Tỉnh', 12) + fmtR('Chênh', 10) + '  ' + fmt('Status', 12)
  );
  console.log('  ' + '─'.repeat(106));

  let lastCat = '';
  rows.forEach(r => {
    if (r.category !== lastCat) {
      if (lastCat) console.log('  ' + '─'.repeat(106));
      lastCat = r.category;
    }
    const catLabel = r.category === lastCat && rows.filter(x => x.category === r.category).indexOf(r) > 0 ? '' : r.category;
    const hcmStr = r.hcm != null ? Number(r.hcm).toLocaleString('vi-VN') + 'đ' : 'N/A';
    const tinhStr = r.tinh != null ? Number(r.tinh).toLocaleString('vi-VN') + 'đ' : 'N/A';
    const diffStr = r.diff !== 0 ? (r.diff > 0 ? '+' : '') + Number(r.diff).toLocaleString('vi-VN') : '0';
    console.log(
      '  ' + fmt(catLabel, 20) + fmt(r.name.substring(0, 36), 38) + fmtR(hcmStr, 12) + fmtR(tinhStr, 12) + fmtR(diffStr, 10) + '  ' + r.status
    );
  });

  console.log('  ' + '─'.repeat(106));

  // Summary
  console.log('\n  📈  TỔNG KẾT:');
  console.log(`     Tổng sản phẩm:    ${totalProducts}`);
  console.log(`     ✅ Giá khác nhau:  ${diffCount}`);
  console.log(`     ⚠️  Giá giống nhau: ${sameCount}` + (sameCount > 0 ? '  ← cần kiểm tra!' : ''));
  console.log(`     📌 Giá cố định:    ${staticCount} (không phân vùng)`);
  console.log('═'.repeat(110) + '\n');
}

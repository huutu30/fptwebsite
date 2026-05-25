import { PROVINCE_PRICES } from './provincePrices.js';

/**
 * Lấy giá sản phẩm theo tỉnh/thành đang được chọn.
 *
 * Logic:
 * 1. Nếu item.price là số (camera, V.VIP, premium...) → dùng luôn, giá cố định toàn quốc
 * 2. Nếu item.price là object {hcm, tinh} → tra bảng PROVINCE_PRICES[activeCity][item.id]
 *    - Nếu có → trả về giá chính xác của tỉnh đó
 *    - Nếu không → fallback về item.price[region] (hcm hoặc tinh theo vùng miền cũ)
 *
 * @param {object} item - Đối tượng sản phẩm (cần có id, price)
 * @param {string} activeCity - Slug tỉnh thành hiện tại (vd: 'ha-noi', 'an-giang')
 * @param {string} region - Vùng miền ('hcm' hoặc 'tinh') - dùng làm fallback
 * @returns {number} Giá hiển thị (VNĐ)
 */
export function getProductPrice(item, activeCity, region = 'tinh') {
  const rawPrice = item?.price;
  if (!rawPrice && rawPrice !== 0) return 0;

  // 1. Giá cố định (camera, V.VIP, premium) - số nguyên
  if (typeof rawPrice === 'number') return rawPrice;

  // 2. Giá theo vùng miền - object {hcm, tinh, ...}
  if (typeof rawPrice === 'object') {
    // Thử tra bảng giá crawl theo tỉnh thành
    const provinceTable = PROVINCE_PRICES[activeCity];
    if (provinceTable && item.id && provinceTable[item.id] !== undefined) {
      return provinceTable[item.id];
    }

    // Fallback: dùng giá vùng miền cũ
    return rawPrice[region] ?? rawPrice['tinh'] ?? rawPrice['hcm'] ?? 0;
  }

  return 0;
}

/**
 * 🔧 PASTE VÀO CHROME DEVTOOLS > SOURCES > SNIPPETS > CTRL+ENTER
 * 
 * Trang: fpt.vn/internet/ca-nhan hoặc fpt.vn/internet/gia-dinh
 */

(() => {
  const products = [];

  // Tìm tất cả card sản phẩm - thử nhiều selector
  const cards = document.querySelectorAll(
    '.swiper-slide, .package-card, .product-card, [class*="CardProduct"], [class*="cardProduct"], [class*="productCard"]'
  );

  // Nếu không tìm thấy, thử tìm qua h3 (tên sản phẩm)
  let elements = cards.length > 0 ? cards : [];
  
  if (elements.length === 0) {
    // Fallback: tìm tất cả container chứa tên + giá
    const allH3 = document.querySelectorAll('h3');
    allH3.forEach(h3 => {
      const parent = h3.closest('article, [class*="card"], [class*="Card"], [class*="slide"], .swiper-slide, [class*="product"]');
      if (parent && !products.some(p => p._el === parent)) {
        const name = h3.textContent.trim();
        if (!name || name.length < 3) return;

        // Tìm giá trong parent
        let price = null;
        const allText = parent.textContent;
        const priceMatch = allText.match(/([\d.,]+)đ\s*\/tháng/);
        if (priceMatch) {
          price = parseInt(priceMatch[1].replace(/[.,]/g, ''));
        } else {
          // Tìm element có class chứa "price"
          const priceEl = parent.querySelector('[class*="price"], [class*="Price"]');
          if (priceEl) {
            const pt = priceEl.textContent.replace(/[^\d]/g, '');
            if (pt) price = parseInt(pt);
          }
        }

        // Tìm tốc độ
        let dl = null, ul = null;
        const speedMatch = allText.match(/(\d+\s*(?:Mbps|Gbps))/gi);
        if (speedMatch && speedMatch.length >= 2) {
          dl = speedMatch[0].trim();
          ul = speedMatch[1].trim();
        }

        // Tìm ảnh
        const img = parent.querySelector('img');
        const image = img ? img.src : null;

        // Tìm features
        const lis = parent.querySelectorAll('li');
        const features = Array.from(lis).map(l => l.textContent.trim()).filter(t => t.length > 5);

        products.push({ name, price, dl, ul, features, image, _el: parent });
      }
    });
  } else {
    elements.forEach(card => {
      const nameEl = card.querySelector('h3, h4, [class*="name"], [class*="title"]');
      if (!nameEl) return;
      const name = nameEl.textContent.trim();
      if (!name || name.length < 3) return;

      let price = null;
      const priceMatch = card.textContent.match(/([\d.,]+)đ\s*\/tháng/);
      if (priceMatch) {
        price = parseInt(priceMatch[1].replace(/[.,]/g, ''));
      } else {
        const priceEl = card.querySelector('[class*="price"], [class*="Price"]');
        if (priceEl) {
          const pt = priceEl.textContent.replace(/[^\d]/g, '');
          if (pt) price = parseInt(pt);
        }
      }

      let dl = null, ul = null;
      const speedMatch = card.textContent.match(/(\d+\s*(?:Mbps|Gbps))/gi);
      if (speedMatch && speedMatch.length >= 2) {
        dl = speedMatch[0].trim();
        ul = speedMatch[1].trim();
      }

      const img = card.querySelector('img');
      const image = img ? img.src : null;

      const lis = card.querySelectorAll('li');
      const features = Array.from(lis).map(l => l.textContent.trim()).filter(t => t.length > 5);

      products.push({ name, price, dl, ul, features, image });
    });
  }

  // Xóa _el và trùng lặp
  const seen = new Set();
  const unique = products.filter(p => {
    delete p._el;
    if (seen.has(p.name)) return false;
    seen.add(p.name);
    return true;
  });

  const result = {
    _meta: {
      url: window.location.href,
      timestamp: new Date().toISOString(),
      region: document.querySelector('[class*="region"], [class*="location"], [class*="Region"]')?.textContent?.trim() || 'unknown',
      totalCards: unique.length,
    },
    products: unique,
  };

  const json = JSON.stringify(result, null, 2);

  // Copy to clipboard
  navigator.clipboard.writeText(json).then(() => {
    console.log(`✅ Đã copy ${unique.length} sản phẩm vào clipboard!`);
    console.log('📋 Paste vào file: scripts/fpt-live-prices.json');
  }).catch(() => {
    console.log(json);
    console.log('\n⚠️  Không tự copy được. Hãy select all + copy output JSON phía trên.');
  });

  console.table(unique.map(p => ({
    name: p.name,
    price: p.price ? p.price.toLocaleString('vi-VN') + 'đ' : 'N/A',
    dl: p.dl || '-',
  })));
})();

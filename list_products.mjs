import { PRODUCT_DATA } from './data/productData.js';

const allProducts = {};

for (const [key, val] of Object.entries(PRODUCT_DATA)) {
  if (Array.isArray(val)) {
    val.forEach(p => {
      allProducts[p.id] = {
        name: p.name,
        category: key,
        originalPrice: p.price
      };
    });
  }
}

console.log(JSON.stringify(allProducts, null, 2));

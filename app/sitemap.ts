import { MetadataRoute } from 'next';
import { PRODUCT_DATA } from '@/data/productData';
import { NEWS_DATA } from '@/data/newsData';
import { CITY_DATA } from '@/data/cityData';

const BASE_URL = 'https://fptlapmang.id.vn';

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Static paths
  const staticPaths = [
    '',
    '/trang-chu',
    '/internet/ca-nhan',
    '/internet/gia-dinh',
    '/internet/game-thu',
    '/internet/doanh-nghiep',
    '/internet/wifi-7',
    '/giai-tri/fpt-play',
    '/thiet-bi/camera',
    '/thiet-bi/smarthome',
    '/tin-tuc',
    '/ho-tro',
    '/chinh-sach-bao-mat',
    '/gioi-thieu',
    '/lien-ket-thanh-vien',
    '/khach-hang-doi-tac',
    '/tap-doan-fpt',
  ];

  const staticUrls = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: path === '' || path === '/trang-chu' ? 1.0 : 0.8,
  }));

  // 2. Dynamic product paths (/internet/[slug])
  const productSlugs: string[] = [];
  for (const products of Object.values(PRODUCT_DATA)) {
    if (Array.isArray(products)) {
      for (const p of products) {
        if (p.id) productSlugs.push(p.id);
      }
    }
  }

  const productUrls = productSlugs.map((slug) => ({
    url: `${BASE_URL}/internet/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. Dynamic news paths (/tin-tuc/[slug])
  const newsUrls = NEWS_DATA.map((article) => ({
    url: `${BASE_URL}/tin-tuc/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // 4. Dynamic local landing paths (/lap-internet-wifi/[city])
  const cityUrls = Object.keys(CITY_DATA).map((city) => ({
    url: `${BASE_URL}/lap-internet-wifi/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...productUrls, ...newsUrls, ...cityUrls];
}

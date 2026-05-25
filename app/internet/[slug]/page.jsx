import PackageDetailClient from "./PackageDetailClient";
import { PRODUCT_DATA } from "@/data/productData";

// Flat list index builder for server side metadata
function buildProductIndex() {
  const index = {};
  for (const products of Object.values(PRODUCT_DATA)) {
    if (!Array.isArray(products)) continue;
    for (const product of products) {
      index[product.id] = product;
    }
  }
  return index;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const productIndex = buildProductIndex();
  const product = productIndex[slug];

  if (!product) {
    return {
      title: "Không tìm thấy gói cước | FPT Telecom",
    };
  }

  const price = typeof product.price === 'object' ? product.price['hcm'] || product.price['tinh'] : product.price;
  const priceDisplay = (price || 0).toLocaleString('vi-VN');
  const currentMonth = new Date().toLocaleDateString('vi-VN', { month: '2-digit', year: 'numeric' });

  return {
    title: `Đăng ký ${product.name} FPT - ${product.dl || ''} | Khuyến mãi ${currentMonth}`,
    description: `Gói cước ${product.name} FPT Telecom chỉ từ ${priceDisplay}đ/tháng. Tốc độ ${product.dl || 'cao'}${product.ul ? ` / ${product.ul}` : ''}. Đăng ký lắp đặt ngay!`,
    openGraph: {
      images: [{ url: product.image }],
    }
  };
}

export default async function PackageDetailPage({ params }) {
  const { slug } = await params;
  return <PackageDetailClient slug={slug} />;
}

export async function generateStaticParams() {
  const productIndex = buildProductIndex();
  return Object.keys(productIndex).map((slug) => ({
    slug,
  }));
}

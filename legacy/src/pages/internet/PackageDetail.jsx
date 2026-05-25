import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Upload, Check, Clock, ShieldCheck, Settings, ChevronRight, Phone } from 'lucide-react';
import { PRODUCT_DATA } from '../../data/productData';
import { useRegisterModal } from '../../context/RegisterContext';
import SEOHead from '../../components/common/SEOHead';
import ProductCardSlider from '../../components/common/ProductCardSlider';
import styles from './PackageDetail.module.css';

const COMMON_FEATURES = [
  { icon: <Clock size={16} />, text: "Triển khai lắp đặt nhanh chóng trong 12 - 36 giờ" },
  { icon: <ShieldCheck size={16} />, text: "Hỗ trợ kỹ thuật 24/7. Miễn phí bảo trì trong suốt quá trình sử dụng" },
  { icon: <Settings size={16} />, text: "Quản lý cước, yêu cầu hỗ trợ và thanh toán dễ dàng qua ứng dụng Hi FPT" }
];

// Xây dựng flat list tất cả sản phẩm kèm category info
function buildProductIndex() {
  const index = {};
  const categoryMap = {
    ca_nhan: { label: 'Internet Cá Nhân', path: '/internet/ca-nhan' },
    gia_dinh: { label: 'Internet Gia Đình', path: '/internet/gia-dinh' },
    doanh_nghiep: { label: 'Internet Doanh Nghiệp', path: '/internet/doanh-nghiep' },
    f_game: { label: 'Internet Game Thủ', path: '/internet/game-thu' },
    the_thao: { label: 'Combo Thể Thao', path: '/internet/combo' },
    additional_home_packages: { label: 'Combo Truyền Hình', path: '/internet/gia-dinh' },
    camera_combos: { label: 'Camera FPT', path: '/thiet-bi/camera' },
    camera_don_le: { label: 'Camera FPT', path: '/thiet-bi/camera' },
    fpt_play_only: { label: 'FPT Play', path: '/giai-tri/fpt-play' },
    wifi7: { label: 'WiFi 7 SpeedX', path: '/internet/wifi-7' },
  };

  for (const [catKey, products] of Object.entries(PRODUCT_DATA)) {
    if (!Array.isArray(products)) continue;
    const catInfo = categoryMap[catKey] || { label: catKey, path: '/trang-chu' };
    for (const product of products) {
      const slug = product.id;
      if (!index[slug]) {
        index[slug] = { ...product, _slug: slug, _category: catInfo };
      }
    }
  }
  return index;
}

export default function PackageDetail({ region }) {
  const { slug } = useParams();
  const { openModal } = useRegisterModal();
  const [hardwareImgs, setHardwareImgs] = useState([]);

  const productIndex = useMemo(() => buildProductIndex(), []);
  const product = productIndex[slug];

  // Hardware extraction (tái sử dụng logic từ ProductDetailModal)
  useEffect(() => {
    if (!product) return;
    if (product.devices && product.devices.length > 0) {
      setHardwareImgs(product.devices);
      return;
    }

    const features = product.features || [];
    const allText = features.join(" ");
    const textLower = allText.toLowerCase();
    const newImgs = [];

    if (textLower.includes("modem") || textLower.includes("wi-fi") || product.dl) {
      newImgs.push({ src: '/images/hardware/modem-wifi-6.webp', label: 'Modem Wi-Fi 6' });
    }

    let apCount = 0;
    const apRegex = /(?:\d+-)?0?(\d+)\s*(?:thiết bị\s+)?(?:Access Point|Mesh)/gi;
    let m;
    while ((m = apRegex.exec(allText)) !== null) apCount += parseInt(m[1], 10);
    if (apCount === 0 && (textLower.includes("access point") || textLower.includes("mesh"))) apCount = 1;
    if (apCount > 0) {
      newImgs.push({ src: '/images/hardware/access-point.webp', label: apCount > 1 ? `0${apCount} Access Point` : 'Access Point' });
    }

    let boxCount = 0;
    const boxRegex = /(?:\d+-)?0?(\d+)\s*(?:thiết bị\s+)?(?:FPT Play Box|Play Box)/gi;
    while ((m = boxRegex.exec(allText)) !== null) boxCount += parseInt(m[1], 10);
    if (boxCount === 0 && (textLower.includes("play box") || (textLower.includes("fpt play") && !textLower.includes("app")))) boxCount = 1;
    if (boxCount > 0) {
      newImgs.push({ src: '/images/hardware/fpt-play-box.webp', label: boxCount > 1 ? `0${boxCount} FPT Play Box` : 'FPT Play Box' });
    }

    if (newImgs.length === 0) {
      newImgs.push({ src: '/images/hardware/modem-wifi-6.webp', label: 'Thiết bị FPT' });
    }

    setHardwareImgs(newImgs);
  }, [product]);

  // Scroll to top
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  // 404 fallback
  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Không tìm thấy gói cước</h1>
        <p>Gói cước bạn tìm không tồn tại hoặc đã ngưng cung cấp.</p>
        <Link to="/internet/ca-nhan" className={styles.backLink}>← Xem các gói cước Internet FPT</Link>
      </div>
    );
  }

  const price = typeof product.price === 'object' ? product.price[region] || product.price['tinh'] : product.price;
  const features = product.features || [];
  const priceDisplay = (price || 0).toLocaleString('vi-VN');

  // SEO Data
  const currentMonth = new Date().toLocaleDateString('vi-VN', { month: '2-digit', year: 'numeric' });
  const seoTitle = `Đăng ký ${product.name} FPT - ${product.dl || ''} | Khuyến mãi ${currentMonth}`;
  const seoDescription = `Gói cước ${product.name} FPT Telecom chỉ từ ${priceDisplay}đ/tháng. Tốc độ ${product.dl || 'cao'}${product.ul ? ` / ${product.ul}` : ''}. ${features.slice(0, 2).join('. ')}. Đăng ký lắp đặt ngay!`;

  // JSON-LD Product Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${product.name} - FPT Telecom`,
    "description": seoDescription,
    "brand": { "@type": "Brand", "name": "FPT Telecom" },
    "offers": {
      "@type": "Offer",
      "price": price || 0,
      "priceCurrency": "VND",
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "FPT Telecom" }
    }
  };

  // Breadcrumb JSON-LD
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Trang chủ", "item": "https://fpt-2026.vercel.app/trang-chu" },
      { "@type": "ListItem", "position": 2, "name": product._category.label, "item": `https://fpt-2026.vercel.app${product._category.path}` },
      { "@type": "ListItem", "position": 3, "name": product.name, "item": `https://fpt-2026.vercel.app/internet/${slug}` },
    ]
  };

  // Gợi ý sản phẩm liên quan (cùng category, trừ sản phẩm hiện tại)
  const relatedProducts = useMemo(() => {
    return Object.values(productIndex)
      .filter(p => p._category.path === product._category.path && p._slug !== slug)
      .slice(0, 6);
  }, [productIndex, product, slug]);

  return (
    <div className={styles.packagePage}>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath={`/internet/${slug}`}
        ogImage={product.image}
        ogType="product"
        keywords={`${product.name}, gói cước FPT, lắp mạng FPT, Internet FPT, ${product.dl}`}
        jsonLd={[jsonLd, breadcrumbLd]}
      />

      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <div className="container">
          <Link to="/trang-chu">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link to={product._category.path}>{product._category.label}</Link>
          <ChevronRight size={14} />
          <span>{product.name}</span>
        </div>
      </nav>

      <div className="container">
        {/* Main Content */}
        <div className={styles.detailGrid}>
          {/* Left: Product Image & Hardware */}
          <div className={styles.leftCol}>
            <div className={styles.productImageWrapper}>
              <img
                src={product.image}
                alt={product.alt || `Gói cước ${product.name} FPT Telecom`}
                className={styles.productImage}
              />
            </div>

            {/* Hardware Section */}
            {hardwareImgs.length > 0 && (
              <div className={styles.hardwareSection}>
                <h3 className={styles.sectionLabel}>Nhận thêm trong gói này</h3>
                <div className={styles.hardwareGrid}>
                  {hardwareImgs.map((img, idx) => (
                    <div key={idx} className={styles.hardwareItem}>
                      <div className={styles.hardwareImgWrap}>
                        <img src={img.src} alt={img.label} />
                      </div>
                      <span>{img.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className={styles.rightCol}>
            <h1 className={styles.productName}>{product.name}</h1>

            <div className={styles.priceBox}>
              <span className={styles.priceValue}>{priceDisplay}đ</span>
              <span className={styles.priceUnit}>/tháng</span>
            </div>

            {/* Speed */}
            {product.dl && product.ul && (
              <div className={styles.speedBox}>
                <span className={styles.speedLabel}>Tốc độ (Download / Upload)</span>
                <div className={styles.speedValues}>
                  <div className={styles.speedItem}>
                    <Download size={18} className={styles.dlIcon} />
                    <strong>{product.dl}</strong>
                  </div>
                  <div className={styles.speedItem}>
                    <Upload size={18} className={styles.ulIcon} />
                    <strong>{product.ul}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Features */}
            <div className={styles.featureSection}>
              <h3 className={styles.sectionLabel}>Thông tin chi tiết</h3>
              <ul className={styles.featureList}>
                {features.map((f, i) => (
                  <li key={i}>
                    <Check size={16} className={styles.checkIcon} />
                    <span>{f}</span>
                  </li>
                ))}
                {COMMON_FEATURES.map((cf, i) => (
                  <li key={`cf-${i}`} className={styles.commonFeature}>
                    {cf.icon}
                    <span>{cf.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className={styles.ctaGroup}>
              <button
                className={styles.btnRegister}
                onClick={() => openModal(product.name, product.id)}
              >
                Đăng ký ngay
              </button>
              <a href="tel:0387498332" className={styles.btnCall}>
                <Phone size={18} />
                Gọi tư vấn 0387498332
              </a>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className={styles.relatedSection}>
            <ProductCardSlider
              title="Gói cước tương tự"
              subtitle="Bạn cũng có thể quan tâm đến các gói cước sau"
              data={relatedProducts}
              region={region}
            />
          </section>
        )}
      </div>
    </div>
  );
}

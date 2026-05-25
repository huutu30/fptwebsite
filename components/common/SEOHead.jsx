import { Helmet } from 'react-helmet-async';
import { SITE_URL, SITE_NAME } from '../../config/site';
const DEFAULT_OG_IMAGE = '/images/69e041bf8f173_1_1920_953e52bd.webp';

/**
 * SEOHead — Component quản lý SEO metadata cho mỗi trang.
 * Tự động inject title, meta description, OG tags, canonical URL, JSON-LD schema.
 *
 * @param {string} title - Tiêu đề trang (tự nối thêm "| FPT Telecom")
 * @param {string} description - Mô tả trang cho meta description + OG
 * @param {string} canonicalPath - Đường dẫn canonical (ví dụ: "/internet/ca-nhan")
 * @param {string} ogImage - Ảnh OG (mặc định dùng banner chính)
 * @param {string} ogType - Loại OG: "website" | "product" | "article"
 * @param {string} keywords - Meta keywords (phụ trợ)
 * @param {object} jsonLd - Structured data JSON-LD (Product, BreadcrumbList, FAQ...)
 */
export default function SEOHead({
  title,
  description,
  canonicalPath = '',
  ogImage,
  ogType = 'website',
  keywords = '',
  jsonLd = null,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Lắp mạng Internet cáp quang, Truyền hình & Camera`;
  const fullUrl = canonicalPath ? `${SITE_URL}${canonicalPath}` : SITE_URL;
  const finalOgImage = ogImage || DEFAULT_OG_IMAGE;
  const ogImageUrl = finalOgImage.startsWith('http') ? finalOgImage : `${SITE_URL}${finalOgImage}`;

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="vi_VN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImageUrl} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}

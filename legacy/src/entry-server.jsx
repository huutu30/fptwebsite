import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider, HelmetData } from 'react-helmet-async';

// Layout & Common
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { RegisterProvider } from './context/RegisterContext';
import { ProductDetailProvider } from './context/ProductDetailContext';
import FloatingContact from './components/common/FloatingContact';
import SupportCTA from './components/common/SupportCTA';

// Pages — EAGER imports (không dùng lazy vì renderToString là synchronous)
import Home from './pages/home/Home';
import PrivacyPolicy from './pages/policy/PrivacyPolicy';
import AboutUs from './pages/about/AboutUs';
import LienKetThanhVien from './pages/about/LienKetThanhVien';
import KhachHangDoiTac from './pages/about/KhachHangDoiTac';
import TapDoanFPT from './pages/about/TapDoanFPT';
import Wifi7 from './pages/internet/Wifi7';
import CaNhan from './pages/internet/CaNhan';
import GiaDinh from './pages/internet/GiaDinh';
import GameThu from './pages/internet/GameThu';
import DoanhNghiep from './pages/internet/DoanhNghiep';
import FptPlay from './pages/giai-tri/FptPlay';
import Camera from './pages/smart-device/Camera';
import SmartHome from './pages/smart-device/SmartHome';
import Support from './pages/support/Support';
import NewsPage from './pages/news/NewsPage';
import ArticlePage from './pages/news/ArticlePage';
import PackageDetail from './pages/internet/PackageDetail';
import LocalLanding, { CITY_DATA } from './pages/local/LocalLanding';

// Data — để sinh dynamic routes
import { NEWS_DATA } from './data/newsData';
import { PRODUCT_DATA } from './data/productData';

/**
 * Thu thập TẤT CẢ routes (static + dynamic) tự động từ data.
 * Khi thêm bài viết, sản phẩm, thành phố mới → routes tự cập nhật.
 */
export function getRoutes() {
  // 1. Static routes
  const staticRoutes = [
    '/trang-chu',
    '/internet/wifi-7',
    '/internet/ca-nhan',
    '/internet/gia-dinh',
    '/internet/game-thu',
    '/internet/doanh-nghiep',
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

  // 2. Dynamic: tin tức (từ newsData.js)
  const newsRoutes = NEWS_DATA.map(n => `/tin-tuc/${n.slug}`);

  // 3. Dynamic: sản phẩm (từ productData.js) — deduplicate by id
  const productIds = new Set();
  for (const [, products] of Object.entries(PRODUCT_DATA)) {
    if (!Array.isArray(products)) continue;
    for (const p of products) {
      if (p.id) productIds.add(p.id);
    }
  }
  const productRoutes = [...productIds].map(id => `/internet/${id}`);

  // 4. Dynamic: tỉnh/thành (từ CITY_DATA)
  const cityRoutes = Object.keys(CITY_DATA).map(c => `/lap-internet-wifi/${c}`);

  return [...staticRoutes, ...newsRoutes, ...productRoutes, ...cityRoutes];
}

/**
 * Render một URL thành HTML string + helmet metadata.
 */
export function render(url) {
  // Derive activeCity & region từ URL (giống logic trong App.jsx)
  let activeCity = 'toan-quoc';
  const cityMatch = url.match(/^\/lap-internet-wifi\/([^/]+)/);
  if (cityMatch && CITY_DATA[cityMatch[1]]) {
    activeCity = cityMatch[1];
  }
  const region = (activeCity === 'hcm' || activeCity === 'ha-noi') ? 'hcm' : 'tinh';

  const helmetData = new HelmetData({});

  const html = renderToString(
    <HelmetProvider context={helmetData.context}>
      <RegisterProvider>
        <ProductDetailProvider>
          <StaticRouter location={url}>
            <div className="app-container">
              <Navbar region={region} activeCity={activeCity} setActiveCity={() => {}} />
              <FloatingContact />

              <main id="main-content" role="main" style={{ minHeight: '100vh' }}>
                <Routes>
                  <Route path="/" element={<Navigate to="/trang-chu" replace />} />
                  <Route path="/trang-chu" element={<Home region={region} activeCity={activeCity} />} />
                  <Route path="/internet/wifi-7" element={<Wifi7 region={region} />} />
                  <Route path="/internet/combo" element={<Navigate to="/giai-tri/fpt-play" replace />} />
                  <Route path="/internet/ca-nhan" element={<CaNhan region={region} />} />
                  <Route path="/internet/gia-dinh" element={<GiaDinh region={region} />} />
                  <Route path="/internet/game-thu" element={<GameThu region={region} />} />
                  <Route path="/internet/doanh-nghiep" element={<DoanhNghiep region={region} />} />
                  <Route path="/giai-tri/fpt-play" element={<FptPlay region={region} />} />
                  <Route path="/thiet-bi/camera" element={<Camera region={region} />} />
                  <Route path="/thiet-bi/smarthome" element={<SmartHome region={region} />} />
                  <Route path="/tin-tuc" element={<NewsPage />} />
                  <Route path="/tin-tuc/:slug" element={<ArticlePage />} />
                  <Route path="/ho-tro" element={<Support />} />
                  <Route path="/chinh-sach-bao-mat" element={<PrivacyPolicy />} />
                  <Route path="/gioi-thieu" element={<AboutUs />} />
                  <Route path="/lien-ket-thanh-vien" element={<LienKetThanhVien />} />
                  <Route path="/khach-hang-doi-tac" element={<KhachHangDoiTac />} />
                  <Route path="/tap-doan-fpt" element={<TapDoanFPT />} />
                  <Route path="/internet/:slug" element={<PackageDetail region={region} />} />
                  <Route path="/lap-internet-wifi/:city" element={<LocalLanding region={region} />} />
                </Routes>
              </main>

              <SupportCTA />
              <Footer />
            </div>
          </StaticRouter>
        </ProductDetailProvider>
      </RegisterProvider>
    </HelmetProvider>
  );

  return { html, helmet: helmetData.context.helmet };
}

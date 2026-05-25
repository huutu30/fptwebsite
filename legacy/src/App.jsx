import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { RegisterProvider } from './context/RegisterContext';
import { ProductDetailProvider } from './context/ProductDetailContext';
import RegisterModal from './components/common/RegisterModal';
import ProductDetailModal from './components/common/ProductDetailModal';
import FloatingContact from './components/common/FloatingContact';
import ScrollToTop from './components/common/ScrollToTop';
import SupportCTA from './components/common/SupportCTA';

// Lazy-load pages: giảm JS bundle ban đầu, chỉ tải khi user truy cập
const Home = lazy(() => import('./pages/home/Home'));
const PrivacyPolicy = lazy(() => import('./pages/policy/PrivacyPolicy'));
const AboutUs = lazy(() => import('./pages/about/AboutUs'));
const LienKetThanhVien = lazy(() => import('./pages/about/LienKetThanhVien'));
const KhachHangDoiTac = lazy(() => import('./pages/about/KhachHangDoiTac'));
const TapDoanFPT = lazy(() => import('./pages/about/TapDoanFPT'));
const Wifi7 = lazy(() => import('./pages/internet/Wifi7'));
const CaNhan = lazy(() => import('./pages/internet/CaNhan'));
const GiaDinh = lazy(() => import('./pages/internet/GiaDinh'));
const GameThu = lazy(() => import('./pages/internet/GameThu'));
const DoanhNghiep = lazy(() => import('./pages/internet/DoanhNghiep'));
const FptPlay = lazy(() => import('./pages/giai-tri/FptPlay'));
const Camera = lazy(() => import('./pages/smart-device/Camera'));
const SmartHome = lazy(() => import('./pages/smart-device/SmartHome'));
const Support = lazy(() => import('./pages/support/Support'));
const NewsPage = lazy(() => import('./pages/news/NewsPage'));
const ArticlePage = lazy(() => import('./pages/news/ArticlePage'));
const PackageDetail = lazy(() => import('./pages/internet/PackageDetail'));
const LocalLanding = lazy(() => import('./pages/local/LocalLanding'));

function App() {
  const [activeCity, setActiveCity] = useState(() => {
    if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/^\/lap-internet-wifi\/([^\/]+)/);
      if (match) return match[1];
      try {
        const saved = localStorage.getItem('fpt_active_city');
        if (saved) return saved;
      } catch(e) {}
    }
    return 'toan-quoc';
  });
  const region = (activeCity === 'hcm' || activeCity === 'ha-noi') ? 'hcm' : 'tinh';

  return (
    <RegisterProvider>
      <ProductDetailProvider>
        <Router>
          <ScrollToTop />
          <div className="app-container">
            <Navbar region={region} activeCity={activeCity} setActiveCity={setActiveCity} />
            
            <RegisterModal />
            <ProductDetailModal region={region} />
            <FloatingContact />

            <div id="global-loader" className="global-loader">
              <div className="global-loader-spinner"></div>
            </div>

            <main id="main-content" role="main" style={{ minHeight: '100vh' }}>
              <Suspense fallback={
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  minHeight: '60vh',
                  color: '#999'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      width: 40, height: 40, 
                      border: '3px solid #f3f3f3', 
                      borderTop: '3px solid #f57020', 
                      borderRadius: '50%', 
                      animation: 'spin 0.8s linear infinite',
                      margin: '0 auto 12px'
                    }} />
                    Đang tải...
                  </div>
                </div>
              }>
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
                  {/* About & Policy Pages */}
                  <Route path="/chinh-sach-bao-mat" element={<PrivacyPolicy />} />
                  <Route path="/gioi-thieu" element={<AboutUs />} />
                  <Route path="/lien-ket-thanh-vien" element={<LienKetThanhVien />} />
                  <Route path="/khach-hang-doi-tac" element={<KhachHangDoiTac />} />
                  <Route path="/tap-doan-fpt" element={<TapDoanFPT />} />
                  <Route path="/internet/:slug" element={<PackageDetail region={region} />} />
                  <Route path="/lap-internet-wifi/:city" element={<LocalLanding region={region} />} />
                </Routes>
              </Suspense>
            </main>
            <SupportCTA />
            <Footer />
          </div>
        </Router>
      </ProductDetailProvider>
    </RegisterProvider>
  );
}

export default App;

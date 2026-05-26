"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Phone, Menu, X, Wifi, Tv, Monitor, Headphones, Home } from 'lucide-react';
import { NAV_MENU, HOTLINE, iconMap } from '@/data/menuConfig';

import { useRegion } from '@/context/RegionContext';
import { CITY_DATA } from '@/data/cityData';

/**
 * Navbar - Thanh điều hướng chính (Next.js Client Component)
 * Layout: TopBar (hotline + vùng miền) | MainNav (logo + menu + search)
 * SEO: semantic HTML5, aria, schema.org, unique IDs
 */
export default function Navbar() {
  const { activeCity, region, changeCity } = useRegion();
  // Build CITY_MAP dynamically from CITY_DATA (35 tỉnh thành + toan-quoc)
  const CITY_MAP = Object.fromEntries(
    Object.entries(CITY_DATA).map(([key, val]) => [key, val.name])
  );
  const otherProvinces = Object.entries(CITY_DATA)
    .filter(([key]) => !['hcm', 'hcm-ngoai-thanh', 'ha-noi', 'ha-noi-ngoai-thanh', 'toan-quoc'].includes(key))
    .sort((a, b) => a[1].name.localeCompare(b[1].name, 'vi'));
  const [activeMega, setActiveMega] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleRegionSelect = (key) => {
    const dropdown = document.getElementById('region-dropdown');
    if (dropdown) dropdown.classList.remove('show');
    const mobileDropdown = document.getElementById('mobile-region-dropdown');
    if (mobileDropdown) mobileDropdown.classList.remove('show');
    setMobileOpen(false);

    // Show global loader
    const loader = document.getElementById('global-loader');
    if (loader) loader.classList.add('active');

    // Simulate loading before changing state and navigating
    setTimeout(() => {
      changeCity(key);
      
      if (pathname.startsWith('/lap-internet-wifi/')) {
        router.push(`/lap-internet-wifi/${key}`);
      }
      
      // Hide loader shortly after
      setTimeout(() => {
        if (loader) loader.classList.remove('active');
      }, 200);
    }, 300);
  };

  const getActiveTab = () => {
    if (!pathname) return 'home';
    if (pathname.startsWith('/internet') || pathname.startsWith('/wifi')) return 'internet';
    if (pathname.startsWith('/giai-tri') || pathname.startsWith('/truyen-hinh')) return 'tv';
    if (pathname.startsWith('/thiet-bi') || pathname.startsWith('/camera')) return 'device';
    if (pathname.startsWith('/ho-tro')) return 'support';
    return 'home'; // Trang chủ hoặc các trang khác
  };
  const activeTab = getActiveTab();


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setActiveMega(null);
      // Close region dropdown when clicking outside
      const regionWrapper = document.getElementById('topbar-region-wrapper');
      if (regionWrapper && !regionWrapper.contains(e.target)) {
        document.getElementById('region-dropdown')?.classList.remove('show');
      }
      
      // Close mobile region dropdown when clicking outside
      const mobileRegionWrapper = document.querySelector('.mobile-region-wrapper');
      if (mobileRegionWrapper && !mobileRegionWrapper.contains(e.target)) {
        document.getElementById('mobile-region-dropdown')?.classList.remove('show');
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`} ref={navRef} role="banner" id="site-header">

        {/* ===== TOP BAR: Hotline + Vùng miền ===== */}
        <div className="site-topbar" role="complementary" aria-label="Thông tin liên hệ">
          <div className="container topbar-inner">
            <a 
              href={`tel:${HOTLINE.replace(/\s/g, '')}`} 
              className="topbar-hotline" 
              id="topbar-hotline"
              title={`Gọi ngay ${HOTLINE} để được tư vấn miễn phí`}
            >
              <Phone size={14} aria-hidden="true" />
              <span>Hotline: <strong>{HOTLINE}</strong></span>
            </a>
          <div className="topbar-region-wrapper" id="topbar-region-wrapper">
              <button 
                className="topbar-location"
                onClick={() => {
                  const dropdown = document.getElementById('region-dropdown');
                  if (dropdown) dropdown.classList.toggle('show');
                }}
                aria-label={`Đổi khu vực – Hiện tại: ${CITY_MAP[activeCity]}`}
                title="Nhấn để chọn khu vực xem giá"
                id="btn-region"
              >
                <span>{CITY_MAP[activeCity]}</span>
                <ChevronDown size={12} aria-hidden="true" />
              </button>
               <div className="region-dropdown" id="region-dropdown">
                <span className="region-label">Xem giá theo khu vực</span>
                
                {/* 1. Nhóm Hồ Chí Minh */}
                <div className="region-group">
                  <div className="region-group-header">
                    <span>Hồ Chí Minh</span>
                  </div>
                  <button
                    className={`region-option-nested ${activeCity === 'hcm' ? 'active' : ''}`}
                    onClick={() => handleRegionSelect('hcm')}
                  >
                    Nội thành
                  </button>
                  <button
                    className={`region-option-nested ${activeCity === 'hcm-ngoai-thanh' ? 'active' : ''}`}
                    onClick={() => handleRegionSelect('hcm-ngoai-thanh')}
                  >
                    Ngoại thành
                  </button>
                </div>

                <div className="region-divider"></div>

                {/* 2. Nhóm Hà Nội */}
                <div className="region-group">
                  <div className="region-group-header">
                    <span>Hà Nội</span>
                  </div>
                  <button
                    className={`region-option-nested ${activeCity === 'ha-noi' ? 'active' : ''}`}
                    onClick={() => handleRegionSelect('ha-noi')}
                  >
                    Nội thành
                  </button>
                  <button
                    className={`region-option-nested ${activeCity === 'ha-noi-ngoai-thanh' ? 'active' : ''}`}
                    onClick={() => handleRegionSelect('ha-noi-ngoai-thanh')}
                  >
                    Ngoại thành
                  </button>
                </div>

                {/* 3. Các tỉnh thành khác */}
                <span className="region-label">Các tỉnh thành khác</span>
                {otherProvinces.map(([key, val]) => (
                  <button
                    key={key}
                    className={`region-option ${activeCity === key ? 'active' : ''}`}
                    onClick={() => handleRegionSelect(key)}
                  >
                    {val.name}
                  </button>
                ))}

                <div className="region-divider"></div>

                {/* 4. Toàn quốc */}
                <button
                  className={`region-option ${activeCity === 'toan-quoc' ? 'active' : ''}`}
                  onClick={() => handleRegionSelect('toan-quoc')}
                >
                  Toàn quốc
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== MAIN NAVBAR ===== */}
        <nav className="site-navbar" role="navigation" aria-label="Menu chính" itemScope itemType="https://schema.org/SiteNavigationElement">
          <div className="container navbar-inner">

            {/* LOGO */}
            <Link href="/trang-chu" className="site-logo" aria-label="Trang chủ FPT Telecom" title="Về trang chủ" id="site-logo" itemProp="url" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <img 
                src="/images/logo-ftel.svg" 
                alt="FPT Telecom Logo" 
                className="logo-img"
                itemProp="logo"
                width="140"
                height="36"
              />
              <span className="sr-only">FPT Telecom - Trang chủ</span>
            </Link>

            {/* HAMBURGER */}
            <button className="hamburger-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'} aria-expanded={mobileOpen} aria-controls="main-nav-menu" id="btn-hamburger">
              <Menu size={24} aria-hidden="true" />
            </button>

            {/* MOBILE LOCATION PILL */}
            <div className="mobile-region-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <button
                className="mobile-location-pill"
                onClick={() => {
                  const dropdown = document.getElementById('mobile-region-dropdown');
                  if (dropdown) dropdown.classList.toggle('show');
                }}
                aria-label={`Đổi khu vực – Hiện tại: ${CITY_MAP[activeCity]}`}
                id="btn-mobile-region"
              >
                <span>{CITY_MAP[activeCity]}</span>
                <ChevronDown size={12} aria-hidden="true" />
              </button>
              <div className="region-dropdown" id="mobile-region-dropdown" style={{ top: '100%', right: '0', left: 'auto', minWidth: '220px', width: 'max-content' }}>
                <span className="region-label">Xem giá theo khu vực</span>
                
                {/* 1. Nhóm Hồ Chí Minh */}
                <div className="region-group">
                  <div className="region-group-header">
                    <span>Hồ Chí Minh</span>
                  </div>
                  <button
                    className={`region-option-nested ${activeCity === 'hcm' ? 'active' : ''}`}
                    onClick={() => handleRegionSelect('hcm')}
                  >
                    Nội thành
                  </button>
                  <button
                    className={`region-option-nested ${activeCity === 'hcm-ngoai-thanh' ? 'active' : ''}`}
                    onClick={() => handleRegionSelect('hcm-ngoai-thanh')}
                  >
                    Ngoại thành
                  </button>
                </div>

                <div className="region-divider"></div>

                {/* 2. Nhóm Hà Nội */}
                <div className="region-group">
                  <div className="region-group-header">
                    <span>Hà Nội</span>
                  </div>
                  <button
                    className={`region-option-nested ${activeCity === 'ha-noi' ? 'active' : ''}`}
                    onClick={() => handleRegionSelect('ha-noi')}
                  >
                    Nội thành
                  </button>
                  <button
                    className={`region-option-nested ${activeCity === 'ha-noi-ngoai-thanh' ? 'active' : ''}`}
                    onClick={() => handleRegionSelect('ha-noi-ngoai-thanh')}
                  >
                    Ngoại thành
                  </button>
                </div>

                {/* 3. Các tỉnh thành khác */}
                <span className="region-label">Các tỉnh thành khác</span>
                {otherProvinces.map(([key, val]) => (
                  <button
                    key={key}
                    className={`region-option ${activeCity === key ? 'active' : ''}`}
                    onClick={() => handleRegionSelect(key)}
                  >
                    {val.name}
                  </button>
                ))}

                <div className="region-divider"></div>

                {/* 4. Toàn quốc */}
                <button
                  className={`region-option ${activeCity === 'toan-quoc' ? 'active' : ''}`}
                  onClick={() => handleRegionSelect('toan-quoc')}
                >
                  Toàn quốc
                </button>
              </div>
            </div>

            {/* MENU */}
            <div className={`nav-menu ${mobileOpen ? 'mobile-open' : ''}`} id="main-nav-menu">
              <div className="mobile-menu-header mobile-only">
                <span className="mobile-menu-title">Menu</span>
                <button className="close-menu-btn" onClick={() => setMobileOpen(false)} aria-label="Đóng menu">
                  <X size={24} aria-hidden="true" />
                </button>
              </div>
              <ul className="nav-links" role="menubar">
                {NAV_MENU.map((menu, i) => (
                  <li
                    key={menu.title}
                    className={`nav-li ${menu.hasMega ? 'has-mega' : ''}`}
                    role="none"
                    onMouseEnter={() => { if (window.innerWidth > 768 && menu.hasMega) setActiveMega(i); }}
                    onMouseLeave={() => { if (window.innerWidth > 768) setActiveMega(null); }}
                  >
                    {menu.hasMega ? (
                      <button
                        className={`nav-link ${activeMega === i ? 'active' : ''}`}
                        role="menuitem"
                        aria-haspopup="true"
                        aria-expanded={activeMega === i}
                        id={`nav-item-${i}`}
                        title={menu.seoTitle}
                        onClick={() => {
                          if (window.innerWidth <= 768) setActiveMega(activeMega === i ? null : i);
                        }}
                      >
                        {menu.title}
                        <ChevronDown size={13} className={`chevron-icon ${activeMega === i ? 'rotate' : ''}`} aria-hidden="true" />
                      </button>
                    ) : (
                      <Link
                        href={menu.path}
                        className="nav-link"
                        role="menuitem"
                        id={`nav-item-${i}`}
                        title={menu.seoTitle}
                        onClick={() => { setMobileOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                      >
                        {menu.title}
                      </Link>
                    )}

                    {/* MEGA MENU */}
                    {menu.hasMega && (
                      <div className={`mega-menu ${activeMega === i ? 'show' : ''}`} role="menu" aria-label={`Danh mục ${menu.title}`} id={`mega-menu-${i}`}>
                        <div className="container mega-grid">
                          {menu.categories.map((cat, cIdx) => {
                            const Icon = iconMap[cat.icon];
                            return (
                              <div className="mega-col" key={cIdx} role="group" aria-label={cat.label}>
                                <h3 className="mega-col-title">
                                  {Icon && <Icon size={18} style={{ color: cat.color }} aria-hidden="true" />}
                                  {cat.label}
                                </h3>
                                <ul className="mega-col-list" role="menu">
                                  {cat.items.map((sub, sIdx) => (
                                    <li key={sIdx} role="none">
                                      <Link href={sub.path} role="menuitem" title={sub.seoTitle || sub.name} onClick={() => { setMobileOpen(false); setActiveMega(null); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
                                        {sub.name}
                                        {sub.badge && <span className="mega-badge" aria-label={`Nhãn: ${sub.badge}`}>{sub.badge}</span>}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              {/* HOTLINE MOBILE */}
              <a href={`tel:${HOTLINE.replace(/\s/g, '')}`} className="nav-hotline-mobile mobile-only" id="mobile-hotline">
                <Phone size={16} aria-hidden="true" />
                <span>Gọi ngay: <strong>{HOTLINE}</strong></span>
              </a>
            </div>

          </div>
        </nav>
      </header>

      {/* ===== MOBILE BOTTOM NAV ===== */}
      <nav className="bottom-nav" role="navigation" aria-label="Menu nhanh" id="mobile-bottom-nav">
        <Link href="/trang-chu" className={`bottom-nav-item ${activeTab === 'home' ? 'center-item' : ''}`} id="bnav-trangchu" title="Trang chủ" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <Home size={20} aria-hidden="true" />
          <span>Trang chủ</span>
        </Link>
        <Link href="/internet/ca-nhan" className={`bottom-nav-item ${activeTab === 'internet' ? 'center-item' : ''}`} id="bnav-internet" title="Internet" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <Wifi size={22} aria-hidden="true" />
          <span>Internet</span>
        </Link>
        <Link href="/giai-tri/fpt-play" className={`bottom-nav-item ${activeTab === 'tv' ? 'center-item' : ''}`} id="bnav-tv" title="Truyền hình FPT Play" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <Tv size={20} aria-hidden="true" />
          <span>Truyền hình</span>
        </Link>
        <Link href="/thiet-bi/camera" className={`bottom-nav-item ${activeTab === 'device' ? 'center-item' : ''}`} id="bnav-device" title="Thiết bị thông minh" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <Monitor size={20} aria-hidden="true" />
          <span>Thiết bị</span>
        </Link>
        <Link href="/ho-tro" className={`bottom-nav-item ${activeTab === 'support' ? 'center-item' : ''}`} id="bnav-support" title="Liên hệ hỗ trợ" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <Headphones size={20} aria-hidden="true" />
          <span>Hỗ trợ</span>
        </Link>
      </nav>

      {/* OVERLAY */}
      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} aria-hidden="true" />}
    </>
  );
}

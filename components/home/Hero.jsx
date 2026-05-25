"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Globe, Tv, Camera, Home as HomeIcon } from 'lucide-react';
import { BANNER_DATA, QUICK_LINKS } from '@/data/productData';

// Map icon để hiển thị đúng loại dịch vụ trên thanh Quick Link
const iconMap = {
  internet: <Globe size={24} color="#f57020" />,
  fptplay: <Tv size={24} color="#f57020" />,
  camera: <Camera size={24} color="#f57020" />,
  smarthome: <HomeIcon size={24} color="#f57020" />
};

export default function Hero({ hideQuickLinks = false }) {
  const [index, setIndex] = useState(0);

  // Logic chuyển slide
  const nextSlide = useCallback(() => setIndex((prev) => (prev === BANNER_DATA.length - 1 ? 0 : prev + 1)), []);
  const prevSlide = useCallback(() => setIndex((prev) => (prev === 0 ? BANNER_DATA.length - 1 : prev - 1)), []);

  // Tự động chạy slide — trì hoãn 10s để đảm bảo LCP đo đúng Banner 1
  useEffect(() => {
    const delay = setTimeout(() => {
      const timer = setInterval(nextSlide, 5000);
      // Cleanup interval khi unmount
      return () => clearInterval(timer);
    }, 10000);
    return () => clearTimeout(delay);
  }, [nextSlide]);

  if (!BANNER_DATA || BANNER_DATA.length === 0) return null;

  return (
    <section style={styles.heroContainer}>
      {/* 1. SLIDER ẢNH TRÀN VIỀN — dùng CSS transition thay Framer Motion */}
      <div className="hero-slider" style={styles.slider}>
        <picture>
          {BANNER_DATA[index].mobileImage && (
            <source
              media="(max-width: 768px)"
              srcSet={BANNER_DATA[index].mobileImage}
              type="image/webp"
              width="800"
              height="300"
            />
          )}
          <img
            src={BANNER_DATA[index].image}
            alt={`Banner FPT Telecom ${index + 1}`}
            style={styles.slide}
            fetchPriority="high"
            loading="eager"
            width="1920"
            height="717"
          />
        </picture>

        {/* Nút điều hướng Arrow */}
        <button onClick={prevSlide} style={{ ...styles.navBtn, left: '20px' }} aria-label="Slide trước">
          <ChevronLeft color="#fff" aria-hidden="true" />
        </button>
        <button onClick={nextSlide} style={{ ...styles.navBtn, right: '20px' }} aria-label="Slide sau">
          <ChevronRight color="#fff" aria-hidden="true" />
        </button>

        {/* Chỉ số trang 1/4 chuẩn ảnh mẫu */}
        <div style={styles.pagination}>
          {index + 1} / {BANNER_DATA.length}
        </div>
      </div>

      {/* 2. THANH QUICK LINKS ĐÈ LÊN CHÂN BANNER */}
      {!hideQuickLinks && (
        <div className="container hero-quicklink-wrapper">
          <div className="hero-quicklink-bar">
            {QUICK_LINKS.map((item) => (
              <div 
                key={item.id} 
                className="hero-quicklink-item"
              >
                <div className="hero-quicklink-icon">
                  {iconMap[item.id] || <Globe size={24} color="#f57020" />}
                </div>
                <span className="hero-quicklink-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

const styles = {
  heroContainer: { width: '100%', position: 'relative', background: '#fff' },
  slider: { 
    width: '100%', 
    position: 'relative', 
    overflow: 'hidden' 
  },
  slide: { 
    width: '100%', 
    height: '100%', 
    objectFit: 'cover',
    objectPosition: 'center',
    transition: 'opacity 0.5s ease',
  },
  navBtn: {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.2)', border: 'none', width: '45px', height: '45px',
    borderRadius: '50%', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  pagination: {
    position: 'absolute', bottom: '80px', right: '50px',
    background: 'rgba(0,0,0,0.5)', color: '#fff', padding: '5px 15px',
    borderRadius: '20px', fontSize: '14px', zIndex: 10, fontWeight: 'bold'
  }
};
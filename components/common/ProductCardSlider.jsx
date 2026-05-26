"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, Download, Upload, Check } from 'lucide-react';
import { useRegisterModal } from '@/context/RegisterContext';
import { useProductDetail } from '@/context/ProductDetailContext';
import { useRegion } from '@/context/RegionContext';
import { getProductPrice } from '@/data/priceHelper';

/**
 * ProductCardSlider - Card slider tái sử dụng cho mọi section
 * Props:
 *  - title: tiêu đề section
 *  - subtitle: phụ đề (optional)
 *  - data: mảng sản phẩm
 *  - region: vùng miền hiện tại
 *  - badgeSub: dòng phụ trên banner overlay (optional, mặc định = tên gói)
 *  - customCardClass: class CSS bổ sung cho từng card
 */
export default function ProductCardSlider({ title, subtitle, data, badgeSub, customCardClass }) {
  const scrollRef = useRef(null);
  const { openModal } = useRegisterModal();
  const { openDetail } = useProductDetail();
  const pathname = usePathname();
  const { activeCity, region } = useRegion();

  const animationRef = useRef(null);

  // Reset scroll về đầu mỗi khi data thay đổi hoặc chuyển hướng (click lại tab/trang)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
    // Cleanup animation khi component unmount
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [pathname, data]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    const card = el.querySelector('.combo-card');
    if (!card) return;

    // Hủy animation cũ nếu người dùng bấm liên tục
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const gap = 20;
    const step = card.offsetWidth + gap;
    const distance = dir === 'left' ? -step : step;

    const start = el.scrollLeft;
    const duration = 500;
    let startTime = null;

    el.style.scrollSnapType = 'none';

    const easeOutCubic = (t) => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const nextScrollLeft = start + distance * easeOutCubic(progress);
      el.scrollLeft = nextScrollLeft;

      if (timeElapsed < duration) {
        animationRef.current = requestAnimationFrame(animateScroll);
      } else {
        el.scrollLeft = start + distance;
        el.style.scrollSnapType = '';
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animateScroll);
  };

  if (!data || data.length === 0) return null;

  return (
    <section className={`combo-sport-section ${customCardClass ? `section-${customCardClass}` : ''}`.trim()} aria-label={title}>
      {/* HEADER */}
      <div className="combo-sport-header">
        <div className="combo-sport-title-group">
          {title && <h2 className="combo-sport-title">{title}</h2>}
          {subtitle && <p className="combo-sport-subtitle">{subtitle}</p>}
        </div>
      </div>

      {/* CARD TRACK CONTAINER */}
      <div className="combo-sport-track-container">
        <button className="combo-nav-btn prev" onClick={() => scroll('left')} aria-label="Xem trước">
          <ChevronLeft size={24} />
        </button>

        <div className="combo-sport-track" ref={scrollRef}>
          {data.map((item) => {
            const price = getProductPrice(item, activeCity, region);
            const isPureCamera = item.id.startsWith('c2-') || item.id.startsWith('c3-') || item.id.startsWith('c5-') || item.id.startsWith('cam-');

            if (item.isBanner) {
              return (
                <article className={`combo-card banner-card ${customCardClass || ''}`.trim()} key={item.id} style={{ padding: 0, border: 'none', background: 'transparent', display: 'block' }}>
                  <a href={item.link || '#'} style={{ display: 'block', height: '100%' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                  </a>
                </article>
              );
            }

            return (
              <article className={`combo-card ${customCardClass || ''}`.trim()} key={item.id}>
                {/* BANNER IMAGE + OVERLAY */}
                <div className="combo-card-banner">
                  <img
                    src={item.image}
                    alt={item.alt || `${item.name} FPT Telecom`}
                    loading="lazy"
                    width="300"
                    height="180"
                  />

                  {item.promo && <span className="combo-promo-badge">{item.promo}</span>}
                </div>

                {/* CONTENT */}
                <div className="combo-card-body">
                  <h3 className="combo-card-name">{item.name}</h3>
                  <div className="combo-card-price">
                    <span className="combo-price-value">{(price || 0).toLocaleString('vi-VN')}đ</span>
                    {!isPureCamera && <span className="combo-price-unit">/tháng</span>}
                  </div>
                  {(item.id.includes('vvip') || item.id === 'premium-fpt-play') && (
                    <div className="combo-card-price-sub" style={{ fontSize: '12px', color: '#64748b', marginTop: '-4px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>(Đã bao gồm VAT)</span>
                      <span style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info" style={{ color: '#94a3b8' }}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                      </span>
                    </div>
                  )}

                  {/* SPEED BOX */}
                  {item.dl && item.ul && (
                    <div className="combo-speed-box">
                      <span className="combo-speed-label">Tốc độ (Download/Upload)</span>
                      <div className="combo-speed-row">
                        <div className="combo-speed-item">
                          <Download size={14} className="combo-speed-icon dl" aria-hidden="true" />
                          <span>{item.dl}</span>
                        </div>
                        <div className="combo-speed-item">
                          <Upload size={14} className="combo-speed-icon ul" aria-hidden="true" />
                          <span>{item.ul}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FEATURES */}
                  <ul className="combo-features">
                    {(item.features || item.details)?.map((f, i) => (
                      <li key={i}>
                        <Check size={15} className="combo-check-icon" aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* BUTTON */}
                  <div className="combo-card-actions" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                      onClick={() => openModal(item.name, item.id)}
                      className="combo-btn-primary"
                      title={`Đăng ký ${item.name} ngay hôm nay`}
                    >
                      Mua ngay
                    </button>
                    {!item.hideDetailBtn && (
                      <Link
                        href={`/internet/${item.id}`}
                        className="combo-btn-link"
                        title={`Xem chi tiết ${item.name}`}
                      >
                        Xem chi tiết
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <button className="combo-nav-btn next" onClick={() => scroll('right')} aria-label="Xem tiếp">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}

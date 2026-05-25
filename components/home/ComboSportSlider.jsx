"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Download, Upload, Check } from 'lucide-react';

/**
 * ComboSportSlider - Section Combo Internet + Truyền hình + Ngoại Hạng Anh
 * Design lấy cảm hứng từ FPT.vn: banner gradient → tên → giá → speed box → features → 2 buttons
 */
export default function ComboSportSlider({ data, region }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const w = el.offsetWidth * 0.75;
    el.scrollBy({ left: dir === 'left' ? -w : w, behavior: 'smooth' });
  };

  if (!data || data.length === 0) return null;

  return (
    <section className="combo-sport-section" aria-label="Combo Internet Truyền hình Ngoại Hạng Anh">
      {/* HEADER */}
      <div className="combo-sport-header">
        <div className="combo-sport-title-group">
          <h2 className="combo-sport-title">
            Combo Internet – Truyền hình – Ngoại Hạng Anh
          </h2>
          <p className="combo-sport-subtitle">
            Xem trọn vẹn Ngoại hạng Anh, La Liga, Champions League cùng Internet tốc độ cao
          </p>
        </div>
        <div className="combo-sport-nav">
          <button className="combo-nav-btn" onClick={() => scroll('left')} aria-label="Xem trước">
            <ChevronLeft size={22} />
          </button>
          <button className="combo-nav-btn" onClick={() => scroll('right')} aria-label="Xem tiếp">
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* CARD TRACK */}
      <div className="combo-sport-track" ref={scrollRef}>
        {data.map((item) => {
          const price = typeof item.price === 'object' ? (item.price[region] || item.price['tinh']) : item.price;

          return (
            <article className="combo-card" key={item.id}>
              {/* BANNER IMAGE + OVERLAY */}
              <div className="combo-card-banner">
                <img
                  src={item.image}
                  alt={item.alt || `Combo ${item.name} FPT Telecom`}
                  loading="lazy"
                  width="300"
                  height="180"
                />
                <div className="combo-card-overlay">
                  <span className="combo-card-badge-name">{item.name}</span>
                  <span className="combo-card-badge-sub">Internet – Truyền hình – Ngoại hạng Anh</span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="combo-card-body">
                {/* TÊN + GIÁ */}
                <h3 className="combo-card-name">{item.name}</h3>
                <div className="combo-card-price">
                  <span className="combo-price-value">{(price || 0).toLocaleString('vi-VN')}đ</span>
                  <span className="combo-price-unit">/tháng</span>
                </div>

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
                  {item.features?.slice(0, 3).map((f, i) => (
                    <li key={i}>
                      <Check size={15} className="combo-check-icon" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* BUTTONS */}
                <div className="combo-card-actions">
                  <Link
                    href={item.path || `/dang-ky?product=${encodeURIComponent(item.name)}`}
                    className="combo-btn-primary"
                    title={`Đăng ký ${item.name} ngay hôm nay`}
                  >
                    Đăng ký ngay
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

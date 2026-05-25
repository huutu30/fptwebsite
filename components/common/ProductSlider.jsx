"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRegion } from '@/context/RegionContext';
import { getProductPrice } from '@/data/priceHelper';

export default function ProductSlider({ title, data, showLocation }) {
  const scrollRef = useRef(null);
  const { region, activeCity } = useRegion();

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const cardWidth = current.offsetWidth / 4;
      current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  if (!data || data.length === 0) return null;

  return (
    <section className="fpt-slider-section">
      <div className="container">
        <div className="fpt-slider-header">
          <h2 className="fpt-main-title">
            {/* Nếu showLocation = true thì hiện kiểu chọn tỉnh, ngược lại hiện title thường */}
            {showLocation ? (
              <>
                Khám phá sản phẩm nổi bật tại{' '}
                <span 
                  className="fpt-location-badge" 
                  onClick={() => window.dispatchEvent(new CustomEvent('openLocationModal'))}
                  style={{ color: '#00408f', cursor: 'pointer', borderBottom: '2px dashed #cbd5e0' }}
                >
                  {region}
                </span>
              </>
            ) : (
              title
            )}
          </h2>
          <div className="fpt-nav-btns">
            <button className="fpt-nav-btn" onClick={() => scroll("left")}>
              <ChevronLeft size={24} />
            </button>
            <button className="fpt-nav-btn" onClick={() => scroll("right")}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="fpt-track-container" ref={scrollRef}>
        {data.map((item) => {
          const currentPrice = getProductPrice(item, activeCity, region);

          return (
            <div key={item.id} className="fpt-card-column">
              <div className="fpt-card-item">
                <div className="fpt-card-img">
                  {/* TỐI ƯU SEO: Thêm alt và loading lazy */}
                  <img
                    src={item.image}
                    alt={item.alt || item.name}
                    loading="lazy"
                  />
                  {(item.dl?.includes("Gbps") || item.isHot) && (
                    <span className="fpt-hot-badge">BÁN CHẠY</span>
                  )}
                </div>

                <div className="fpt-card-content">
                  <h3 className="fpt-item-name">{item.name}</h3>

                  <div className="fpt-price-row">
                    <span className="fpt-price-num">
                      {(currentPrice || 0).toLocaleString()}đ
                    </span>
                    <span className="fpt-price-unit">/tháng</span>
                  </div>

                  {item.dl && item.ul ? (
                    <div className="fpt-speed-visual">
                      <div className="fpt-speed-line">
                        <div className="fpt-speed-info">
                          <span>↓ Download</span>
                          <strong>{item.dl}</strong>
                        </div>
                        <div className="fpt-bar-bg">
                          <div
                            className="fpt-bar-fill dl-blue"
                            style={{
                              width: item.dl?.includes("Gbps") ? "100%" : "50%",
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="fpt-speed-line">
                        <div className="fpt-speed-info">
                          <span>↑ Upload</span>
                          <strong>{item.ul}</strong>
                        </div>
                        <div className="fpt-bar-bg">
                          <div
                            className="fpt-bar-fill ul-green"
                            style={{
                              width: item.ul?.includes("Gbps") ? "100%" : "50%",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="fpt-speed-placeholder">
                      <p>
                        {item.description ||
                          "Trải nghiệm dịch vụ đẳng cấp từ FPT Telecom"}
                      </p>
                    </div>
                  )}

                  <ul className="fpt-feature-list">
                    {item.features?.slice(0, 3).map((f, i) => (
                      <li key={i}>
                        <span className="fpt-check">✓</span> {f}
                      </li>
                    ))}
                  </ul>

                  {/* TỐI ƯU SEO: Chuyển button thành Link trỏ về trang đăng ký */}
                  <Link
                    // Nếu item.path bị undefined (do lỗi truyền data), nó sẽ tự tạo link chuẩn
                    href={
                      item.path ||
                      `/dang-ky?product=${encodeURIComponent(item.name)}`
                    }
                    title={item.btnTitle || `Đăng ký ${item.name}`}
                    className="fpt-btn-order"
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Đăng ký ngay
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

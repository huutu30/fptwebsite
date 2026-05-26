"use client";

import React from 'react';
import Link from 'next/link';
import { useRegisterModal } from '@/context/RegisterContext';
import { useRegion } from '@/context/RegionContext';
import { getProductPrice } from '@/data/priceHelper';
import { PRODUCT_DATA } from '@/data/productData';

export default function TechDevicesSection() {
  const { openModal } = useRegisterModal();
  const { activeCity, region } = useRegion();

  // Selected products: Camera IQ 4S, Camera Play 4, Combo 2 Camera (Trong - Ngoài), Combo 2 Camera Trong Nhà
  const selectedProductIds = ['cam-iq4s', 'cam-play4', 'c2-tn-nt', 'c2-tn'];
  
  // Flatten all products to search
  const allProducts = Object.values(PRODUCT_DATA).flat();
  const selectedProducts = selectedProductIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean);

  const bannerImageUrl = "https://hi-static.fpt.vn/sys/shop/prod/2026-05-23/6a111d8721a27_camera%20fpt%20tron%20yeu%20thuong.jpg";

  return (
    <section className="tech-devices-section" aria-label="Thiết bị công nghệ bán chạy nhất">
      <div className="combo-sport-header">
        <div className="combo-sport-title-group">
          <h2 className="combo-sport-title">Thiết bị công nghệ bán chạy nhất</h2>
        </div>
      </div>

      <div className="tech-devices-grid">
        {/* Banner Card */}
        <div className="tech-devices-banner-card">
          <Link href="/thiet-bi/camera" className="tech-devices-banner-link">
            <img 
              src={bannerImageUrl} 
              alt="Chọn Cam Nhà Trọn Yêu Thương - FPT Camera" 
              loading="lazy"
            />
          </Link>
        </div>

        {/* 4 Product Cards */}
        {selectedProducts.map((item) => {
          const price = getProductPrice(item, activeCity, region);
          
          return (
            <article className="tech-devices-card" key={item.id}>
              <div className="tech-devices-card-img-wrapper">
                <img 
                  src={item.image} 
                  alt={item.alt || `${item.name} FPT`} 
                  loading="lazy"
                />
              </div>
              <div className="tech-devices-card-body">
                <h3 className="tech-devices-card-name">{item.name}</h3>
                <div className="tech-devices-card-price">
                  {(price || 0).toLocaleString('vi-VN')}đ
                </div>
                <button 
                  onClick={() => openModal(item.name, item.id)}
                  className="tech-devices-btn"
                  title={`Đăng ký ${item.name} ngay hôm nay`}
                >
                  Mua ngay
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Centered view all link */}
      <div className="tech-devices-footer">
        <Link href="/thiet-bi/camera" className="tech-devices-view-all">
          Xem tất cả <span className="chevron">&gt;</span>
        </Link>
      </div>
    </section>
  );
}

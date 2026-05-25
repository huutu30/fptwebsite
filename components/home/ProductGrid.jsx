"use client";

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRegisterModal } from '@/context/RegisterContext';
import { useProductDetail } from '@/context/ProductDetailContext';

export default function ProductSlider({ title, data }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (!current) return;
    // Tính toán chiều rộng của 1 card để trượt đúng khoảng cách
    const cardWidth = current.offsetWidth / 4; 
    if (direction === 'left') {
      current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  if (!data || data.length === 0) return null;

  return (
    <section className="slider-section-container">
      <div className="container">
        <div className="slider-header-modern">
          <h2 className="title-fpt">{title}</h2>
          <div className="nav-actions">
            <button className="nav-btn-circle" onClick={() => scroll('left')}><ChevronLeft /></button>
            <button className="nav-btn-circle" onClick={() => scroll('right')}><ChevronRight /></button>
          </div>
        </div>
      </div>

      {/* Dùng chung 1 track cho cả PC/Mobile, chỉ khác tỉ lệ qua CSS */}
      <div className="slider-main-track" ref={scrollRef}>
        {data.map((item) => (
          <div key={item.id} className="slider-card-item">
            <ProductCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ item }) {
  const isGbps = item?.dl?.toLowerCase()?.includes('gbps');
  const { openModal } = useRegisterModal();
  const { openDetail } = useProductDetail();

  return (
    <div className="card-fpt-inner">
      <div className="img-wrapper">
        <img src={item.image} alt="" />
        {isGbps && <span className="hot-label">BÁN CHẠY</span>}
      </div>
      
      <div className="content-wrapper">
        <h3 className="product-name">{item.name}</h3>
        
        <div className="price-tag-row">
          <span className="num">{(item.price?.hcm || item.price || 0).toLocaleString()}đ</span>
          <span className="unit">/tháng</span>
        </div>

        {/* Thanh Speed ngang tối giản, cân đối */}
        <div className="speed-progress-area">
           <div className="labels">
             <span>Tốc độ tối đa</span>
             <strong>{item.dl}</strong>
           </div>
           <div className="bar-bg">
             <div className="bar-fill" style={{ width: isGbps ? '100%' : '60%' }}></div>
           </div>
           <small className="upload-text">Upload: {item.ul}</small>
        </div>

        <ul className="mini-features">
          {item.features?.slice(0, 3).map((f, i) => (
            <li key={i}><span>•</span> {f}</li>
          ))}
        </ul>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
          <button className="btn-fpt-order" onClick={() => openModal(item.name, item.id)}>Đăng ký ngay</button>
          <button className="combo-btn-link" onClick={() => openDetail(item)}>Xem chi tiết</button>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useEffect, useState } from 'react';
import { X, Check, Download, Upload, ShieldCheck, Clock, Settings } from 'lucide-react';
import { useProductDetail } from '@/context/ProductDetailContext';
import { useRegisterModal } from '@/context/RegisterContext';

const COMMON_FEATURES = [
  { icon: <Clock size={16} />, text: "Triển khai lắp đặt nhanh chóng trong 12 - 36 giờ" },
  { icon: <ShieldCheck size={16} />, text: "Hỗ trợ kỹ thuật 24/7. Miễn phí bảo trì trong suốt quá trình sử dụng" },
  { icon: <Settings size={16} />, text: "Quản lý cước, yêu cầu hỗ trợ và thanh toán dễ dàng qua ứng dụng Hi FPT" }
];

import { useRegion } from '@/context/RegionContext';
import { getProductPrice } from '@/data/priceHelper';

export default function ProductDetailModal() {
  const { region, activeCity } = useRegion();
  const { selectedProduct, closeDetail } = useProductDetail();
  const { openModal } = useRegisterModal();
  const [hardwareImgs, setHardwareImgs] = useState([]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProduct]);

  // Hardware Extractor: use explicit `devices` field if provided, else fallback to regex
  useEffect(() => {
    if (!selectedProduct) return;

    // ── Explicit devices list (preferred) ──────────────────────────────────────
    if (selectedProduct.devices && selectedProduct.devices.length > 0) {
      setHardwareImgs(selectedProduct.devices);
      return;
    }

    // ── Legacy regex extraction (fallback for products without devices field) ──
    const features = selectedProduct.features || selectedProduct.details || [];
    const allText = features.join(" ");
    const textLower = allText.toLowerCase();
    const newImgs = [];
    
    // 1. Modem Wi-Fi
    if (textLower.includes("modem") || textLower.includes("wi-fi") || selectedProduct.dl) {
      newImgs.push({ src: '/images/hardware/modem-wifi-6.webp', label: 'Modem Wi-Fi 6' });
    }
    
    // 2. Access Point / Mesh
    let apCount = 0;
    const apRegex = /(?:\d+-)?0?(\d+)\s*(?:thiết bị\s+)?(?:Access Point|Mesh)/gi;
    let m;
    while ((m = apRegex.exec(allText)) !== null) {
      apCount += parseInt(m[1], 10);
    }
    if (apCount === 0 && (textLower.includes("access point") || textLower.includes("mesh"))) apCount = 1;
    if (apCount > 0) {
      newImgs.push({ src: '/images/hardware/access-point.webp', label: apCount > 1 ? `0${apCount} Access Point` : 'Access Point' });
    }
    
    // 3. FPT Play Box
    let boxCount = 0;
    const boxRegex = /(?:\d+-)?0?(\d+)\s*(?:thiết bị\s+)?(?:FPT Play Box|Play Box)/gi;
    while ((m = boxRegex.exec(allText)) !== null) {
      boxCount += parseInt(m[1], 10);
    }
    if (boxCount === 0 && (textLower.includes("play box") || (textLower.includes("fpt play") && !textLower.includes("app")))) boxCount = 1;
    if (boxCount > 0) {
      newImgs.push({ src: '/images/hardware/fpt-play-box.webp', label: boxCount > 1 ? `0${boxCount} FPT Play Box` : 'FPT Play Box' });
    }
    
    // 4. Camera
    let camCount = 0;
    const camRegex = /(?:\d+-)?0?(\d+)\s*(?:thiết bị\s+)?(?:Camera|IQ4S|Play\s*4|Play\s*3)/gi;
    while ((m = camRegex.exec(allText)) !== null) {
      camCount += parseInt(m[1], 10);
    }
    if (camCount === 0 && (textLower.includes("camera") || textLower.includes("iq4s") || textLower.includes("play 4"))) camCount = 1;
    if (camCount > 0) {
      newImgs.push({ src: selectedProduct.image, label: camCount > 1 ? `0${camCount} Camera FPT` : 'Camera FPT' });
    }

    // 5. ONT Converter
    if (textLower.includes("ont") || textLower.includes("bộ chuyển đổi")) {
      newImgs.push({ src: '/images/hardware/ont-1-port.webp', label: 'Bộ chuyển đổi ONT' });
    }

    // 6. Gói dịch vụ V.VIP / Thể thao
    if (textLower.includes("v.vip") || textLower.includes("premium")) {
      newImgs.push({ src: '/images/hardware/fpt-play-vvip.webp', label: 'Gói Premium' });
    }
    if (textLower.includes("ngoại hạng anh") || textLower.includes("thể thao độc quyền")) {
      newImgs.push({ src: '/images/hardware/ngoai-hang-anh.webp', label: 'Ngoại hạng Anh' });
    }
    
    // Fallback if completely empty
    if (newImgs.length === 0) {
      newImgs.push({ src: '/images/hardware/modem-wifi-6.webp', label: 'Thiết bị FPT' });
    }
    
    setHardwareImgs(newImgs);
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const price = getProductPrice(selectedProduct, activeCity, region);
  const features = selectedProduct.features || selectedProduct.details || [];

  const handleRegisterClick = () => {
    closeDetail();
    openModal(selectedProduct.name, selectedProduct.id);
  };

  return (
    <div className="pd-modal-overlay" onClick={closeDetail}>
      <div className="pd-modal-content" onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button className="pd-modal-close" onClick={closeDetail}>
          <X size={24} />
        </button>

        {/* Header Banner */}
        <div className="pd-modal-header">
          <h2>Chi tiết gói cước</h2>
        </div>

        <div className="pd-modal-body">
          <div className="pd-card-main">
            <h3 className="pd-name">{selectedProduct.name}</h3>
            
            <div className="pd-price-row">
              <span className="pd-price">{(price || 0).toLocaleString('vi-VN')}đ</span>
              <span className="pd-unit">/tháng</span>
            </div>

            {selectedProduct.dl && selectedProduct.ul && (
              <div className="pd-speed-box">
                <span className="pd-speed-label">Tốc độ (Download/Upload)</span>
                <div className="pd-speed-values">
                  <div className="pd-speed-item">
                    <Download size={16} className="dl-icon" />
                    <strong>{selectedProduct.dl}</strong>
                  </div>
                  <div className="pd-speed-item">
                    <Upload size={16} className="ul-icon" />
                    <strong>{selectedProduct.ul}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pd-section">
            <h4 className="pd-section-title">Nhận thêm trong gói này</h4>
            <div className="pd-hardware-grid">
              {hardwareImgs.map((img, idx) => (
                <div key={idx} className="pd-hardware-item">
                  <div className="pd-hardware-img-wrapper">
                    <img src={img.src} alt={img.label} />
                  </div>
                  <span>{img.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pd-section">
            <h4 className="pd-section-title">Thông tin chi tiết</h4>
            <ul className="pd-feature-list">
              {features.map((f, i) => (
                <li key={i}>
                  <Check size={16} className="check-icon" />
                  <span>{f}</span>
                </li>
              ))}
              {COMMON_FEATURES.map((cf, i) => (
                <li key={`cf-${i}`} className="common-feature">
                  {cf.icon}
                  <span>{cf.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="pd-modal-footer">
          <button className="pd-btn-register" onClick={handleRegisterClick}>
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  );
}

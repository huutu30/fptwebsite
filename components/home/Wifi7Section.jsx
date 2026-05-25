"use client";

import React, { useState } from 'react';
import ProductCardSlider from '@/components/common/ProductCardSlider';
import { PRODUCT_DATA } from '@/data/productData';

export default function Wifi7Section() {
  const [activeTab, setActiveTab] = useState('speedx2');

  const tabs = [
    { id: 'speedx2', label: 'SpeedX2 (2Gbps)' },
    { id: 'speedx10', label: 'SpeedX10 (10Gbps)' },
  ];

  // Lọc data theo id của tab
  const getFilteredData = () => {
    if (activeTab === 'speedx2') {
      return PRODUCT_DATA.wifi7_plans.slice(0, 5);
    }
    return PRODUCT_DATA.wifi7_plans.slice(5, 10);
  };

  return (
    <div className="wifi7-section-wrapper">
      <div className="discovery-section" style={{ paddingBottom: 0 }}>
        <h2 className="discovery-title" style={{ textAlign: 'center', marginBottom: '10px' }}>
          SpeedX – Gói cước Wi-Fi 7 siêu tốc độ
        </h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
          Công nghệ Wi-Fi 7 thế hệ mới trên hạ tầng XGS-PON
        </p>
        
        <nav className="discovery-tabs" role="tablist" style={{ justifyContent: 'center', marginBottom: '20px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`discovery-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <ProductCardSlider
        data={getFilteredData()}
        badgeSub="Wi-Fi 7 · XGS-PON"
      />
    </div>
  );
}

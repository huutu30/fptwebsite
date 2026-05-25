import React from 'react';

export default function DiscoverySection({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'ca_nhan', label: 'Internet cá nhân' },
    { id: 'gia_dinh', label: 'Internet gia đình' },
    { id: 'game_thu', label: 'Internet game thủ' },
    { id: 'combo_camera', label: 'Combo Internet Camera' },
    { id: 'combo_truyen_hinh', label: 'Combo Internet Truyền hình' },
  ];

  return (
    <section className="discovery-section">
      <div className="container">
        <h2 className="discovery-title">
          Khám phá sản phẩm nổi bật tại <span className="blue-text">Hồ Chí Minh</span>
        </h2>
        
        <div className="tabs-wrapper">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
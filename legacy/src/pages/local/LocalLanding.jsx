import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SEOHead from '../../components/common/SEOHead';
import Home from '../home/Home';

// Data 10 tỉnh/thành lớn nhất
export const CITY_DATA = {
  'hcm': {
    name: 'TP. Hồ Chí Minh',
    shortName: 'TP.HCM',
    region: 'hcm',
  },
  'ha-noi': {
    name: 'Hà Nội',
    shortName: 'Hà Nội',
    region: 'hcm',
  },
  'da-nang': {
    name: 'Đà Nẵng',
    shortName: 'Đà Nẵng',
    region: 'tinh',
  },
  'hai-phong': {
    name: 'Hải Phòng',
    shortName: 'Hải Phòng',
    region: 'tinh',
  },
  'binh-duong': {
    name: 'Bình Dương',
    shortName: 'Bình Dương',
    region: 'tinh',
  },
  'dong-nai': {
    name: 'Đồng Nai',
    shortName: 'Đồng Nai',
    region: 'tinh',
  },
  'hai-duong': {
    name: 'Hải Dương',
    shortName: 'Hải Dương',
    region: 'tinh',
  },
  'quang-ninh': {
    name: 'Quảng Ninh',
    shortName: 'Quảng Ninh',
    region: 'tinh',
  },
  'khanh-hoa': {
    name: 'Khánh Hòa',
    shortName: 'Khánh Hòa',
    region: 'tinh',
  },
  'vung-tau': {
    name: 'Bà Rịa - Vũng Tàu',
    shortName: 'Vũng Tàu',
    region: 'tinh',
  },
  'toan-quoc': {
    name: 'Toàn quốc',
    shortName: 'Ngoại thành',
    region: 'tinh',
  },
};

export default function LocalLanding({ region: appRegion, setRegion }) {
  const { city } = useParams();
  const cityData = CITY_DATA[city];

  // Redirect nếu city không hợp lệ
  if (!cityData) {
    return <Navigate to="/trang-chu" replace />;
  }

  // Dùng region từ App state — user vẫn toggle được Nội thành/Toàn quốc
  const region = appRegion;
  const currentMonth = new Date().toLocaleDateString('vi-VN', { month: '2-digit', year: 'numeric' });

  // SEO
  const seoTitle = `Lắp mạng Internet FPT tại ${cityData.name} - Khuyến mãi tháng ${currentMonth}`;
  const seoDescription = `Đăng ký lắp đặt Internet FPT tại ${cityData.name}. Cáp quang tốc độ cao, Wi-Fi 6, lắp đặt trong 24h. Giá chỉ từ 195.000đ/tháng. Gọi ngay 0387498332!`;

  // JSON-LD LocalBusiness
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `FPT Telecom ${cityData.name}`,
    "description": seoDescription,
    "telephone": "0387498332",
    "url": `https://fpt-2026.vercel.app/lap-internet-wifi/${city}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityData.name,
      "addressCountry": "VN"
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "FPT Telecom",
      "url": "https://fpt.vn"
    }
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Trang chủ", "item": "https://fpt-2026.vercel.app/trang-chu" },
      { "@type": "ListItem", "position": 2, "name": `Lắp mạng FPT ${cityData.name}`, "item": `https://fpt-2026.vercel.app/lap-internet-wifi/${city}` },
    ]
  };

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath={`/lap-internet-wifi/${city}`}
        ogType="website"
        keywords={`lắp mạng FPT ${cityData.name}, Internet FPT ${cityData.shortName}, lắp wifi FPT ${cityData.name}, cáp quang FPT ${cityData.shortName}`}
        jsonLd={[jsonLd, breadcrumbLd]}
      />
      <Home region={region} activeCity={city} />
    </>
  );
}

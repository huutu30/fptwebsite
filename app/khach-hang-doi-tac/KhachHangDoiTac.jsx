"use client";

import React, { useEffect, useState } from 'react';
import BannerSlider from '@/components/about/BannerSlider';
import AboutSubNav from '@/components/about/AboutSubNav';

/* Khách hàng tiêu biểu — logo-1 → logo-30 */
const customerLogos = Array.from({ length: 30 }, (_, i) => {
  const num = i + 1;
  const actualNum = num === 26 ? 25 : num;
  return `https://fpt.vn/storage/upload/images/partners/logo-${actualNum}.png`;
});

/* Đối tác */
const partnerLogos = [
  'https://fpt.vn/storage/upload/images/partners/partner-3.png',
  'https://fpt.vn/storage/upload/images/partners/partner-1.png',
  'https://fpt.vn/storage/upload/images/partners/partner-4.png',
  'https://fpt.vn/storage/upload/images/partners/partner-2.png',
];

const partnerBanner = 'https://fpt.vn/assets/frontend/img/customer-partner-1.png';

const ITEMS_PER_PAGE = 12;

/* ============ Section wrapper ============ */
const Section = ({ children, bg = '#fff', style = {} }) => (
  <section style={{ backgroundColor: bg, padding: '50px 0', ...style }}>
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>{children}</div>
  </section>
);

/* ============ Section Title ============ */
const SectionTitle = ({ icon, children, color = '#f57020' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
    {icon && <img src={icon} alt="" style={{ width: '40px', height: '40px' }} />}
    <h2 style={{ fontSize: '22px', fontWeight: '800', color, margin: 0, fontStyle: 'italic' }}>{children}</h2>
  </div>
);

/* ============ Main component ============ */
export default function KhachHangDoiTac() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(customerLogos.length / ITEMS_PER_PAGE);
  const paginatedLogos = customerLogos.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div style={{ backgroundColor: '#f5f6fa' }}>
      {/* ===== BANNER SLIDER ===== */}
      <BannerSlider />

      {/* ===== SUB NAV ===== */}
      <AboutSubNav />

      {/* ===== KHÁCH HÀNG TIÊU BIỂU ===== */}
      <Section bg="#fff">
        <SectionTitle
          icon="https://fpt.vn/storage/upload/images/menus/nav-icons/about/partners.png"
        >
          KHÁCH HÀNG TIÊU BIỂU
        </SectionTitle>

        {/* Logo grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '16px',
        }}>
          {customerLogos.map((src, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '15px',
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              minHeight: '80px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            >
              <img
                src={src}
                alt={`Khách hàng tiêu biểu ${i + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '45px',
                  objectFit: 'contain',
                  filter: 'grayscale(0)',
                }}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* ===== ĐỐI TÁC ===== */}
      <Section bg="#f5f6fa">
        <SectionTitle
          icon="https://fpt.vn/storage/upload/images/menus/nav-icons/about/partners.png"
          color="#f57020"
        >
          ĐỐI TÁC
        </SectionTitle>

        <div style={{
          display: 'flex',
          gap: '30px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          {/* Partner logos grid */}
          <div style={{
            flex: '1 1 350px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0',
            border: '1px solid #e5e7eb',
            backgroundColor: '#fff',
          }}>
            {partnerLogos.map((src, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '25px',
                borderRight: i % 2 === 0 ? '1px solid #e5e7eb' : 'none',
                borderBottom: i < 2 ? '1px solid #e5e7eb' : 'none',
                minHeight: '100px',
              }}>
                <img
                  src={src}
                  alt={`Đối tác ${i + 1}`}
                  style={{
                    maxWidth: '140px',
                    maxHeight: '60px',
                    objectFit: 'contain',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Partner illustration */}
          <div style={{ flex: '1 1 400px', textAlign: 'center' }}>
            <img
              src={partnerBanner}
              alt="Đối tác FPT Telecom"
              style={{
                maxWidth: '100%',
                maxHeight: '300px',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}

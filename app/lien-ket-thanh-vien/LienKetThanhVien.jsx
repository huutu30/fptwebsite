"use client";

import React, { useEffect, useState } from 'react';
import BannerSlider from '@/components/about/BannerSlider';
import AboutSubNav from '@/components/about/AboutSubNav';

const subsidiaries = [
  { name: "CÔNG TY TNHH MTV VIỄN THÔNG QUỐC TẾ FPT", cap: "30.000.000.000 VNĐ", percent: "100%", desc: "Cung cấp dịch vụ Internet, đại lý cung cấp các dịch vụ viễn thông và các dịch vụ khác." },
  { name: "CÔNG TY CỔ PHẦN DỊCH VỤ TRỰC TUYẾN FPT", cap: "184.712.750.000 VNĐ", percent: "56,51%", desc: "Cung cấp dịch vụ Game Online, Báo điện tử, thanh toán điện tử." },
  { name: "CÔNG TY TNHH MTV VIỄN THÔNG FPT TÂN THUẬN", cap: "70.000.000.000 VNĐ", percent: "100%", desc: "Cung cấp các dịch vụ Internet tốc độ cao và các dịch vụ viễn thông khác." },
  { name: "CÔNG TY TNHH TRUYỀN HÌNH FPT", cap: "15.000.000.000 VNĐ", percent: "100%", desc: "Cung cấp dịch vụ truyền hình." },
  { name: "CÔNG TY CP CÔNG NGHỆ VIỄN THÔNG FPT", cap: "276.000.000.000 VNĐ", percent: "99,99%", desc: "Cung cấp các dịch vụ Internet tốc độ cao và các dịch vụ viễn thông khác." },
  { name: "CÔNG TY TNHH MTV VIỄN THÔNG FPT THĂNG LONG", cap: "224.315.000.000 đồng", percent: "100%", desc: "Cung cấp các dịch vụ Internet tốc độ cao và các dịch vụ viễn thông khác." },
];

const offices = [
  { city: "Hà Nội", address: "Tầng 9, Block A, tòa nhà FPT Cầu Giấy, số 10 Phạm Văn Bạch, quận Cầu Giấy, TP. Hà Nội.", icon: "🏛️" },
  { city: "Tp Hồ Chí Minh", address: "Tòa nhà FPT Lô L.29B-31B-33B Tân Thuận, KCX Tân Thuận, P. Tân Thuận Đông, Q7, TP. HCM.", icon: "🏢" },
];

/* ============ Section wrapper ============ */
const Section = ({ children, bg = '#fff', style = {} }) => (
  <section style={{ backgroundColor: bg, padding: '60px 0', ...style }}>
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>{children}</div>
  </section>
);

/* ============ Subsidiary Card ============ */
function SubsidiaryCard({ item, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px',
        borderRadius: '16px',
        backgroundColor: hovered ? '#fff' : '#fafbfc',
        border: `1px solid ${hovered ? '#f57020' : '#e2e8f0'}`,
        boxShadow: hovered ? '0 12px 40px rgba(245,112,32,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.35s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: hovered ? 'linear-gradient(90deg, #f57020, #ff9a56)' : 'linear-gradient(90deg, #0056D2, #3b82f6)',
        transition: 'background 0.35s ease',
      }} />

      {/* Number badge */}
      <div style={{
        position: 'absolute', top: '18px', right: '18px',
        width: '32px', height: '32px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #f57020, #ff9a56)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: '13px', fontWeight: '800',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <h3 style={{
        color: '#0056D2', fontSize: '16px', fontWeight: '700',
        marginBottom: '18px', paddingRight: '45px', lineHeight: '1.4',
      }}>
        {item.name}
      </h3>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '14px', flexWrap: 'wrap' }}>
        <div style={{
          padding: '8px 14px', backgroundColor: '#f0f7ff', borderRadius: '8px',
          fontSize: '13px', color: '#1e40af', fontWeight: '600',
        }}>
          💰 <span style={{ color: '#475569', fontWeight: '400' }}>Vốn điều lệ:</span> {item.cap}
        </div>
        <div style={{
          padding: '8px 14px', backgroundColor: '#fff7ed', borderRadius: '8px',
          fontSize: '13px', color: '#c2410c', fontWeight: '600',
        }}>
          📊 <span style={{ color: '#475569', fontWeight: '400' }}>Sở hữu:</span> {item.percent}
        </div>
      </div>

      <p style={{
        marginTop: '10px', fontSize: '14px', color: '#64748b',
        lineHeight: '1.7', margin: 0,
      }}>
        <strong style={{ color: '#334155' }}>Lĩnh vực:</strong> {item.desc}
      </p>
    </div>
  );
}

/* ============ Main component ============ */
export default function LienKetThanhVien() {
  return (
    <div style={{ backgroundColor: '#f5f6fa' }}>
      {/* ===== BANNER SLIDER ===== */}
      <BannerSlider />

      {/* ===== SUB NAV ===== */}
      <AboutSubNav />

      {/* ===== PAGE HEADER ===== */}
      <Section bg="#fff">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto' }}>
          <p style={{
            color: '#f57020', fontSize: '13px', fontWeight: '700',
            textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px',
          }}>
            Hệ thống công ty thành viên
          </p>
          <h1 style={{
            fontSize: '32px', fontWeight: '800', color: '#0f172a',
            lineHeight: 1.3, marginBottom: '16px',
          }}>
            Liên kết – <span style={{ color: '#f57020' }}>Thành viên</span>
          </h1>
          <div style={{
            width: '60px', height: '4px', borderRadius: '2px',
            background: 'linear-gradient(90deg, #f57020, #ff9a56)',
            margin: '0 auto 20px',
          }} />
          <p style={{
            color: '#64748b', fontSize: '15px', lineHeight: '1.8',
          }}>
            FPT Telecom sở hữu hệ thống các công ty con hoạt động đa lĩnh vực, từ viễn thông, truyền hình đến công nghệ và dịch vụ trực tuyến, tạo nên một hệ sinh thái số toàn diện phục vụ hàng triệu khách hàng.
          </p>
        </div>
      </Section>

      {/* ===== TITLE BAR ===== */}
      <Section bg="linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', padding: '35px 0' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            color: '#fff', fontSize: '24px', fontWeight: '800', margin: 0,
            textTransform: 'uppercase', letterSpacing: '1px',
          }}>
            🏢 Công ty con
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginTop: '8px' }}>
            {subsidiaries.length} công ty trực thuộc FPT Telecom
          </p>
        </div>
      </Section>

      {/* ===== SUBSIDIARIES GRID ===== */}
      <Section bg="#f5f6fa">
        <div className="member-grid">
          {subsidiaries.map((item, idx) => (
            <SubsidiaryCard key={idx} item={item} index={idx} />
          ))}
        </div>
      </Section>

      {/* ===== VĂN PHÒNG CHÍNH ===== */}
      <Section bg="#fff">
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <h2 style={{
            fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px',
          }}>
            📍 Văn phòng chính tại 2 thành phố lớn
          </h2>
          <div style={{
            width: '60px', height: '4px', borderRadius: '2px',
            background: 'linear-gradient(90deg, #0056D2, #3b82f6)',
            margin: '0 auto',
          }} />
        </div>

        <div className="office-grid">
          {offices.map((office, i) => (
            <div key={i} className="office-card">
              <div style={{
                width: '56px', height: '56px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #0056D2, #3b82f6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '26px', flexShrink: 0,
              }}>
                {office.icon}
              </div>
              <div>
                <h3 style={{
                  fontSize: '20px', fontWeight: '700', color: '#0056D2',
                  margin: '0 0 10px',
                }}>
                  {office.city}
                </h3>
                <p style={{
                  fontSize: '14px', color: '#475569', lineHeight: '1.7', margin: 0,
                }}>
                  {office.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

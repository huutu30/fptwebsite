"use client";

import React, { useEffect, useState, useRef } from 'react';
import BannerSlider from '@/components/about/BannerSlider';
import AboutSubNav from '@/components/about/AboutSubNav';

const stats = [
  { prefix: 'Sau', value: '30', label: 'NĂM HOẠT ĐỘNG' },
  { prefix: 'FPT Telecom đã có hơn', value: '10.731', label: 'NHÂN VIÊN CHÍNH THỨC' },
  { prefix: 'Với gần', value: '317', label: 'VĂN PHÒNG ĐIỂM GIAO DỊCH' },
  { prefix: 'Thuộc gần', value: '61', label: 'CHI NHÁNH' },
  { prefix: 'Tại', value: '34', label: 'TỈNH THÀNH' },
];
const businessAreas = [
  'Cung cấp hạ tầng mạng viễn thông cho dịch vụ Internet băng thông rộng',
  'Dịch vụ giá trị gia tăng trên mạng Internet, điện thoại di động',
  'Dịch vụ Truyền hình trả tiền',
  'Dịch vụ tin nhắn, dữ liệu, thông tin giải trí trên mạng điện thoại di động',
  'Thiết lập hạ tầng mạng và cung cấp các dịch vụ Viễn thông, Internet',
  'Xuất nhập khẩu thiết bị Viễn thông và Internet',
  'Dịch vụ Viễn thông cố định nội hạt',
  'Dịch vụ Viễn thông giá trị gia tăng',
  'Dịch vụ Viễn thông cố định đường dài trong nước',
  'Cung ứng dịch vụ trung gian thanh toán',
];

const consumerServices = [
  'Dịch vụ truy nhập Internet băng thông rộng cố định mặt đất công nghệ FTTH/xPON',
  'Truyền hình FPT Play sở hữu gần 200 kênh truyền hình trong nước và quốc tế, cung cấp các ứng dụng học tập online, rèn luyện thể thao tại nhà, ứng dụng Sự kiện trực tuyến..cho phép người dùng trải nghiệm nhiều nhu cầu: học tập, giải trí, chơi game,..trên đa nền tảng thiết bị.',
  'Dịch vụ nội dung, ứng dụng trên Internet: FPT Play Box (Voice Remote), FPT Play, Foxy, Hi FPT, Fshare, Fsend,...',
  'Ví điện tử, Cổng thanh toán điện tử Foxpay',
  'Dịch vụ, sản phẩm IoT/Smart Home: FPT Camera, iHome.',
];

const enterpriseServices = [
  'Truyền dẫn số liệu: Trong nước (kết nối nội hạt, kết nối liên tỉnh) và quốc tế (IPLC, MPLS, IEPL).',
  'Kênh thuê riêng Internet: NIX, GIA, Asia Transit.',
  'Dịch vụ thoại: Trong nước (Điện thoại cố định, VoIP, đầu số 1800/1900) và quốc tế.',
  'Dữ liệu trực tuyến: Tên miền, lưu trữ dữ liệu và email, thuê máy chủ và chỗ đặt máy chủ, thuê tủ Rack.',
  'Dịch vụ quản lý: Hội nghị truyền hình, điện toán đám mây, tích hợp hệ thống, dịch vụ bảo mật.',
  'Ví Doanh nghiệp, Cổng thanh toán điện tử Foxpay; Dịch vụ Hỗ trợ thu hộ chi hộ; Và các dịch vụ hỗ trợ thanh toán khác.',
  'Dịch vụ Điện toán đám mây – FPT HI GIO CLOUD: là dịch vụ nền tảng điện toán đám mây (Cloud Infrastructure Service) được phát triển bởi FPT Telecom và Internet Initiative Japan (IIJ).',
];

const awards = [
  '48 giải thưởng Sao Khuê từ 2012 đến 2025',
  'Giải thưởng Vietnam Game Awards 2025: Nhà mạng được yêu thích nhất.',
  'Giải Vàng Stevie Awards for Great Employers 2025 tại hạng mục Employer of the Year - Telecommunications.',
  'Giải Đồng Stevie Awards - International Business Awards 2025 tại hạng mục Best AI-Enabled Product cho FPT Camera.',
  '3 giải thưởng Vietnam Top 10 Tech & Map 2025.',
  '2 Giải thưởng Vietnam Digital Awards 2025.',
  'Sản phẩm công nghiệp chủ lực thành phố Hà Nội 2025: FPT Play.',
  'Giải thưởng Vạn Xuân 2025 với chiến dịch "Một Sắc Cam - Ngàn dặm Việt".',
  'Giải thưởng Vietnam Marketing Awards 2025 tại hạng mục Tiếp thị Kinh doanh Xuất sắc - Bền vững.',
  'Giải thưởng Make in Vietnam 2025 tại hạng mục Sản phẩm Công nghệ số xuất sắc cho FPT Camera Agent.',
  'Giải thưởng Best SD-WAN Partner và Million Dollar Club Partner của Fortinet năm 2025.',
  'Giải thưởng APJ Rising Star of the Year của SolarWinds năm 2025.',
  'Giải thưởng Top FS5K Dealer of the Year của IBM năm 2025.',
  'Danh hiệu "Telecom Company of the Year" tại Asian Telecom Awards 2025.',
  '3 sản phẩm, giải pháp đạt giải ICT Awards 2024.',
  'Danh hiệu "Nhà tuyển dụng được yêu thích nhất ngành Viễn thông 2024".',
  '3 giải thưởng tại Asian Technology Excellence Awards 2024.',
  '3 năm liên tiếp thuộc Câu lạc bộ Doanh nghiệp CNTT nghìn tỷ Việt Nam.',
  'Giải thưởng Vietnam iContent Awards 2024: FPT Play đạt hạng mục Nền tảng giải trí Việt của năm.',
  'Top 25 thương hiệu niêm yết dẫn đầu năm 2024 do Forbes Việt Nam bình chọn.',
  '2 Giải thưởng Tech Awards 2023: Nền tảng giải trí Việt xuất sắc nhất cho FPT Play.',
  'Giải thưởng Vietnam Digital Awards 2023 tại hạng mục Sản phẩm, dịch vụ, giải pháp công nghệ số tiêu biểu.',
];

const certifications = [
  'ISO 9001, ISO 27001, ISO 27017, PCI DSS, TIA 942.',
  'Đối tác Vàng (Gold Partner) CISCO 2015',
  'Đối tác Vàng (Gold Partner) Microsoft 2016',
  'Chứng chỉ thiết kế Data Center (Certified Data Center Professional)',
  'Uptime TIER III',
  'Cisco Certified Internetwork Expert (CCIE)',
  'CISSP (Certified Information System Security Professional)',
  'LEED Certification.',
];

/* ============ Counter animation ============ */
function AnimatedCounter({ value }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef(null);

  useEffect(() => {
    const num = parseInt(value.replace(/\./g, ''), 10);
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 1500;
        const step = ts => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const current = Math.floor(progress * num);
          setDisplay(current.toLocaleString('vi-VN'));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

/* ============ Section wrapper ============ */
const Section = ({ children, bg = '#fff', style = {} }) => (
  <section style={{ backgroundColor: bg, padding: '60px 0', ...style }}>
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>{children}</div>
  </section>
);

const SectionTitle = ({ icon, children, color = '#f57020' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
    {icon && <img src={icon} alt="" style={{ width: '40px', height: '40px' }} />}
    <h2 style={{ fontSize: '24px', fontWeight: '800', color, margin: 0 }}>{children}</h2>
  </div>
);

/* ============ Main component ============ */
export default function AboutUs() {
  return (
    <div style={{ backgroundColor: '#f5f6fa' }}>
      {/* ===== BANNER SLIDER ===== */}
      <BannerSlider />

      {/* ===== SUB NAV ===== */}
      <AboutSubNav />

      {/* ===== INTRO + HERO IMAGE ===== */}
      <Section bg="#fff">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 480px' }}>
            <img src="https://fpt.vn/storage/upload/images/pages/intro/fptvn_veftel_gioithieu.png" alt="FPT Telecom giới thiệu"
              style={{ width: '100%', borderRadius: '12px' }} />
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <p style={{ color: '#f57020', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Là thành viên thuộc Tập đoàn công nghệ hàng đầu Việt Nam FPT
            </p>
            <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#0f172a', lineHeight: 1.3, marginBottom: '20px' }}>
              Giới thiệu chung về<br /><span style={{ color: '#f57020' }}>FPT Telecom</span>
            </h1>
            <p style={{ color: '#475569', lineHeight: '1.8', fontSize: '15px', marginBottom: '12px' }}>
              Công ty Cổ phần Viễn thông FPT (tên gọi tắt là FPT Telecom) hiện là một trong những nhà cung cấp dịch vụ Viễn thông và Internet hàng đầu khu vực.
            </p>
            <p style={{ color: '#475569', lineHeight: '1.8', fontSize: '15px' }}>
              Thành lập ngày 31/01/1997, khởi nguồn từ Trung tâm Dịch vụ Trực tuyến do 4 thành viên sáng lập cùng sản phẩm mạng Intranet đầu tiên của Việt Nam mang tên "Trí tuệ Việt Nam – TTVN", sản phẩm được coi là đặt nền móng cho sự phát triển của Internet tại Việt Nam.
            </p>
          </div>
        </div>
      </Section>

      {/* ===== STATS COUNTER ===== */}
      <Section bg="linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              flex: '1 1 180px', maxWidth: '200px', textAlign: 'center', padding: '25px 15px',
              backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', backdropFilter: 'blur(10px)',
            }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: '0 0 5px', fontWeight: '500' }}>{s.prefix}</p>
              <p style={{ color: '#f57020', fontSize: '38px', fontWeight: '900', margin: '0 0 4px', lineHeight: 1 }}>
                <AnimatedCounter value={s.value} />
              </p>
              <p style={{ color: '#fff', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== MISSION ===== */}
      <Section bg="#fff">
        <p style={{ color: '#475569', lineHeight: '1.9', fontSize: '15px', textAlign: 'center', maxWidth: '900px', margin: '0 auto', fontStyle: 'italic' }}>
          Với sứ mệnh tiên phong mang Internet, mang kết nối đến với người dân Việt Nam cùng mong muốn lớn lao mỗi gia đình Việt Nam đều sử dụng ít nhất một dịch vụ của Công ty, FPT Telecom đang nỗ lực thực thi Chiến lược <strong>"Mang đến trải nghiệm tuyệt vời cho khách hàng"</strong> trên cơ sở phát huy giá trị văn hóa cốt lõi <strong>"Lấy khách hàng làm trọng tâm"</strong> và nền tảng sức mạnh công nghệ FPT, từ đó tiên phong trở thành Nhà cung cấp dịch vụ số có trải nghiệm khách hàng vượt trội, tốt nhất tại Việt Nam.
        </p>
      </Section>

      {/* ===== VIDEO ===== */}
      <Section bg="#f5f6fa">
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a' }}>Video giới thiệu FPT Telecom</h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Click vào hình để xem video</p>
        </div>
        <a href="https://www.youtube.com/watch?v=iIhgSeqsHzo" target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', position: 'relative', maxWidth: '800px', margin: '0 auto', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}>
          <img src="https://img.youtube.com/vi/iIhgSeqsHzo/maxresdefault.jpg" alt="Video giới thiệu FPT Telecom"
            style={{ width: '100%', display: 'block' }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: '70px', height: '70px', borderRadius: '50%', backgroundColor: 'rgba(245,112,32,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><polygon points="5,3 19,12 5,21" /></svg>
          </div>
        </a>
      </Section>

      {/* ===== CULTURE BANNER ===== */}
      <Section bg="#fff">
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', padding: '30px', background: 'linear-gradient(135deg, #fff5ed, #fff)', borderRadius: '16px', border: '1px solid #fde8d8' }}>
          <img src="https://fpt.vn/storage/upload/images/pages/intro/gioithieu_20.png" alt="FPT Culture"
            style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#f57020', margin: '0 0 5px' }}>Trải nghiệm</h2>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0 }}>khách hàng tuyệt vời</h2>
          </div>
        </div>
      </Section>

      {/* ===== LĨNH VỰC KINH DOANH ===== */}
      <Section bg="#f5f6fa">
        <SectionTitle icon="https://fpt.vn/storage/upload/images/pages/intro/gioithieu-hotro.png">Lĩnh vực kinh doanh</SectionTitle>
        <ul style={{ color: '#475569', lineHeight: '2', paddingLeft: '20px', fontSize: '15px', columns: '2 350px', columnGap: '40px' }}>
          {businessAreas.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </Section>

      {/* ===== DỊCH VỤ KHÁCH HÀNG ĐẠI CHÚNG ===== */}
      <Section bg="#fff">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
          <div style={{ flex: '1 1 450px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0056D2', marginBottom: '15px' }}>Các dịch vụ cho khách hàng đại chúng</h3>
            <ul style={{ color: '#475569', lineHeight: '1.9', paddingLeft: '20px', fontSize: '14px' }}>
              {consumerServices.map((item, i) => <li key={i} style={{ marginBottom: '8px' }}>{item}</li>)}
            </ul>
          </div>
          <div style={{ flex: '1 1 450px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0056D2', marginBottom: '15px' }}>Các dịch vụ cho khách hàng tổ chức, doanh nghiệp</h3>
            <ul style={{ color: '#475569', lineHeight: '1.9', paddingLeft: '20px', fontSize: '14px' }}>
              {enterpriseServices.map((item, i) => <li key={i} style={{ marginBottom: '8px' }}>{item}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      {/* ===== GIẢI THƯỞNG TIÊU BIỂU ===== */}
      <Section bg="#f5f6fa">
        <SectionTitle icon="https://fpt.vn/storage/upload/images/pages/intro/gioithieu-huychuong.png" color="#d4a017">Các giải thưởng tiêu biểu</SectionTitle>
        <div style={{ columns: '2 400px', columnGap: '30px' }}>
          {awards.map((item, i) => (
            <div key={i} style={{
              breakInside: 'avoid', display: 'flex', gap: '10px', alignItems: 'flex-start',
              padding: '10px 0', borderBottom: '1px solid #e2e8f0',
            }}>
              <span style={{ color: '#d4a017', fontSize: '16px', lineHeight: 1, flexShrink: 0, marginTop: '3px' }}>🏆</span>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== CHỨNG CHỈ QUỐC TẾ ===== */}
      <Section bg="#fff">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '40px', borderBottom: '2px solid #f57020', paddingBottom: '10px' }}>
          <img src="https://fpt.vn/storage/upload/images/pages/intro/gioithieu-huychuong.png" alt="" style={{ width: '40px', height: '40px' }} />
          <h2 style={{ fontSize: '24px', fontWeight: '400', color: '#f57020', margin: 0, textTransform: 'uppercase' }}>Các chứng chỉ quốc tế</h2>
        </div>

        {/* LOGOS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', marginBottom: '40px' }}>
          {[
            'https://fpt.vn/storage/upload/images/pages/intro/gioithieu_03.png',
            'https://fpt.vn/storage/upload/images/pages/intro/gioithieu_05.png',
            'https://fpt.vn/storage/upload/images/pages/intro/gioithieu_07.png',
            'https://fpt.vn/storage/upload/images/pages/intro/gioithieu_09.png',
            'https://fpt.vn/storage/upload/images/pages/intro/gioithieu_11.png',
            'https://fpt.vn/storage/upload/images/pages/intro/gioithieu_13.png',
            'https://fpt.vn/storage/upload/images/pages/intro/gioithieu_15.png',
            'https://fpt.vn/storage/upload/images/pages/intro/gioithieu_17.png',
            'https://fpt.vn/storage/upload/images/pages/intro/gioithieu_19.jpg',
          ].map((src, i) => (
            <img key={i} src={src} alt={`Chứng chỉ ${i + 1}`} style={{ height: '80px', objectFit: 'contain' }} />
          ))}
        </div>

        {/* TEXT LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#111', fontSize: '15px' }}>
          {certifications.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid #eee', paddingBottom: '8px' }}>{item}</div>
          ))}
        </div>
      </Section>
    </div>
  );
}

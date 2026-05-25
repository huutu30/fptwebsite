"use client";

import React, { useEffect, useState, useRef } from 'react';
import BannerSlider from '@/components/about/BannerSlider';
import AboutSubNav from '@/components/about/AboutSubNav';

const stats = [
  { prefix: 'Thành lập', value: '38', label: 'NĂM' },
  { prefix: 'Phủ khắp', value: '34', label: 'TỈNH THÀNH' },
  { prefix: 'Hiện diện', value: '30', label: 'QUỐC GIA' },
  { prefix: 'Với', value: '54.110', label: 'NHÂN VIÊN' },
  { prefix: 'Doanh thu 2025', value: '70.113', label: 'TỶ VNĐ' },
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
  <section style={{ backgroundColor: bg, padding: '50px 0', ...style }}>
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>{children}</div>
  </section>
);

/* ============ Section Title (matching fpt.vn style) ============ */
const SectionTitle = ({ icon, children, color = '#f57020' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '25px' }}>
    {icon && <img src={icon} alt="" style={{ width: '44px', height: '44px' }} />}
    <h2 style={{ fontSize: '22px', fontWeight: '800', color, margin: 0, fontStyle: 'italic', textTransform: 'uppercase' }}>{children}</h2>
  </div>
);

export default function TapDoanFPT() {
  return (
    <div style={{ backgroundColor: '#f5f6fa' }}>
      {/* ===== BANNER SLIDER ===== */}
      <BannerSlider />

      {/* ===== SUB NAV ===== */}
      <AboutSubNav />

      {/* ===== VỀ TẬP ĐOÀN FPT ===== */}
      <Section bg="#fff">
        <SectionTitle icon="https://fpt.vn/storage/upload/images/menus/nav-icons/about/fpt.png">
          Về tập đoàn FPT
        </SectionTitle>

        <div style={{ borderTop: '2px solid #f57020', paddingTop: '25px' }}>
          <p style={{ color: '#333', lineHeight: '1.9', fontSize: '15px', marginBottom: '18px' }}>
            Năm 1988, 13 nhà khoa học trẻ thành lập Công ty FPT với mong muốn xây dựng "một tổ chức kiểu mới, giàu mạnh bằng nỗ lực lao động sáng tạo trong khoa học kỹ thuật và công nghệ, làm Khách hàng hài lòng, góp phần hưng thịnh Quốc gia, đem lại cho mỗi thành viên của mình điều kiện phát triển đầy đủ nhất về tài năng và một cuộc sống đầy đủ về vật chất, phong phú về tinh thần."
          </p>

          <p style={{ color: '#333', lineHeight: '1.9', fontSize: '15px', marginBottom: '18px' }}>
            Không ngừng đổi mới, liên tục sáng tạo và luôn tiên phong mang lại cho Khách hàng các sản phẩm/ giải pháp/ dịch vụ công nghệ tối ưu nhất, FPT trở thành Công ty Công nghệ lớn nhất trong khu vực kinh tế tư nhân của Việt Nam với <strong>54.110 Cán bộ Nhân viên</strong>. FPT cũng là doanh nghiệp dẫn đầu trong các lĩnh vực: Xuất khẩu phần mềm, Tích hợp hệ thống; Phát triển phần mềm; Dịch vụ CNTT.
          </p>

          <p style={{ color: '#333', lineHeight: '1.9', fontSize: '15px', marginBottom: '18px' }}>
            FPT là công ty tiên phong chuyển đổi số và dẫn đầu về tư vấn, cung cấp, triển khai các dịch vụ, giải pháp công nghệ - viễn thông. FPT đồng hành cùng các khách hàng tại <strong>30 quốc gia và vùng lãnh thổ</strong> trên toàn cầu hiện thực hóa chiến lược, mục tiêu phát triển kinh doanh dựa trên công nghệ.
          </p>

          <p style={{ color: '#333', lineHeight: '1.9', fontSize: '15px' }}>
            Với kinh nghiệm triển khai dự án trên phạm vi toàn cầu trong gần bốn thập kỷ qua, FPT giúp khách hàng vượt qua những thách thức, rào cản và đạt được hiệu quả cao nhất trong hành trình chuyển đổi số. Dựa trên những công nghệ mới nhất trí tuệ nhân tạo, phân tích dữ liệu lớn, điện toán đám mây, tự động hóa, kết nối vạn vật…, FPT đưa ra những giải pháp, dịch vụ công nghệ tiên tiến giúp khách hàng chủ động, linh hoạt thích ứng trong mọi bối cảnh.
          </p>
        </div>
      </Section>

      {/* ===== STATS COUNTER ===== */}
      <Section bg="#fff" style={{ paddingTop: '0' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0',
          borderTop: '1px solid #e5e7eb',
          borderBottom: '1px solid #e5e7eb',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              flex: '1 1 180px',
              textAlign: 'center',
              padding: '30px 15px',
              borderRight: i < stats.length - 1 ? '1px solid #e5e7eb' : 'none',
            }}>
              <p style={{ color: '#666', fontSize: '13px', margin: '0 0 6px', fontWeight: '500' }}>{s.prefix}</p>
              <p style={{ color: '#e53e3e', fontSize: '42px', fontWeight: '900', margin: '0 0 4px', lineHeight: 1 }}>
                <AnimatedCounter value={s.value} />
              </p>
              <p style={{ color: '#333', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== CÁCH MẠNG 4.0 + VỊ THẾ ===== */}
      <Section bg="#fff" style={{ paddingTop: '0' }}>
        <p style={{ color: '#333', lineHeight: '1.9', fontSize: '15px', marginBottom: '18px' }}>
          Trong cuộc cách mạng 4.0, FPT là Công ty Việt Nam tiên phong trong việc nghiên cứu và phát triển các công nghệ mới về trí tuệ nhân tạo, dữ liệu lớn, điện toán đám mây, di động,… FPT cũng là doanh nghiệp tiên phong đồng hành cùng với các tập đoàn công nghệ hàng đầu thế giới để tạo nên các nền tảng công nghệ số tiên tiến nhất như <strong>GE (Predix), Siemens (MindSphere), Airbus (Skywise), Amazon AWS…</strong>
        </p>

        <p style={{ color: '#333', lineHeight: '1.9', fontSize: '15px', marginBottom: '18px' }}>
          Vị thế của FPT trên toàn cầu đã được công nhận và khẳng định thông qua danh sách Khách hàng gồm hơn <strong>1.100 doanh nghiệp lớn</strong> trên thế giới, đặc biệt trong đó có gần <strong>100 Khách hàng</strong> nằm trong danh sách Fortune 500. Một số tên tuổi khách hàng lớn có thể kể đến <strong>Toshiba, Hitachi, Airbus, Deutsche Bank, Unilever, Panasonic…</strong>
        </p>

        <p style={{ color: '#333', lineHeight: '1.9', fontSize: '15px' }}>
          Với định hướng tiên phong nghiên cứu và ứng dụng các xu hướng công nghệ mới nhất, FPT sẽ tiếp tục là đơn vị đi đầu về chuyển đổi số cho Khách hàng, đưa các công nghệ mới như <strong>AI, Big Data, IoT,…</strong> vào các giải pháp trong mọi lĩnh vực như giao thông thông minh, y tế thông minh, chính phủ số, …
        </p>
      </Section>

      {/* ===== VĂN HÓA FPT ===== */}
      <Section bg="#f5f6fa">
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          padding: '35px 40px',
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#333', marginBottom: '10px' }}>Văn hóa FPT</h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '30px',
            alignItems: 'flex-start',
          }}>
            {/* Quote */}
            <div style={{ flex: '0 0 auto' }}>
              <p style={{
                fontSize: '32px',
                fontWeight: '900',
                color: '#0f172a',
                lineHeight: 1.3,
                margin: 0,
                fontStyle: 'italic',
              }}>
                <span style={{ color: '#f57020', fontSize: '48px' }}>"</span> Tôn đổi đồng,<br />
                &nbsp;&nbsp;Chí gương sáng <span style={{ color: '#f57020', fontSize: '48px' }}>"</span>
              </p>
            </div>

            {/* Tôn Đổi Đồng */}
            <div style={{ flex: '1 1 250px' }}>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.8' }}>
                trong đó: <strong>"TÔN ĐỔI ĐỒNG"</strong> nghĩa là "Tôn trọng cá nhân - Tinh thần đổi mới - Tinh thần đồng đội", là những giá trị mà tất cả người FPT đều chia sẻ.
              </p>
            </div>

            {/* Chí Gương Sáng */}
            <div style={{ flex: '1 1 250px' }}>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.8' }}>
                <strong>"CHÍ GƯƠNG SÁNG"</strong> nghĩa là "Chí công - Gương mẫu - Sáng suốt", là những phẩm chất cần có của lãnh đạo FPT.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ===== TẦM NHÌN CHIẾN LƯỢC ===== */}
      <Section bg="#fff">
        <SectionTitle icon="https://fpt.vn/storage/upload/images/pages/fpt/i-setting-1.png" color="#f57020">
          Tầm nhìn chiến lược
        </SectionTitle>

        <div style={{ borderTop: '2px solid #f57020', paddingTop: '25px' }}>
          <p style={{ color: '#333', lineHeight: '1.9', fontSize: '15px', marginBottom: '18px' }}>
            FPT đã xác lập mục tiêu chiến lược: đầu tư và làm chủ công nghệ lõi để giữ vị trí trung tâm trên bản đồ công nghệ Việt Nam và xây dựng lợi thế cạnh tranh trong dài hạn.
          </p>

          <p style={{ color: '#333', lineHeight: '1.9', fontSize: '15px', marginBottom: '18px' }}>
            Từ năm 2026 và những năm tiếp theo, FPT sẽ chuyển mình thành doanh nghiệp sáng tạo công nghệ, làm chủ các công nghệ chiến lược như <strong>AI, Quantum AI & Cybersecurity, UAV, công nghệ đường sắt, an ninh mạng và dữ liệu...</strong>
          </p>

          <p style={{ color: '#333', lineHeight: '1.9', fontSize: '15px' }}>
            Để đạt được mục tiêu này, FPT xây dựng các chương trình hành động cân bằng, toàn diện ở cả ba khía cạnh: <strong>Kinh doanh, Công nghệ, Con người.</strong>
          </p>
        </div>
      </Section>

      {/* ===== MẠNG LƯỚI TOÀN CẦU ===== */}
      <Section bg="#f5f6fa">
        <SectionTitle icon="https://fpt.vn/storage/upload/images/pages/fpt/icon-global-network.png" color="#f57020">
          Mạng lưới toàn cầu
        </SectionTitle>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          alignItems: 'center',
          borderTop: '2px solid #f57020',
          paddingTop: '25px',
        }}>
          <div style={{ flex: '1 1 400px' }}>
            <img
              src="https://fpt.vn/storage/upload/images/pages/fpt/fpt-toan-cau.png"
              alt="Mạng lưới toàn cầu FPT"
              style={{ width: '100%', borderRadius: '4px' }}
            />
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <p style={{ color: '#333', lineHeight: '1.9', fontSize: '15px' }}>
              Với nguồn lực và mạng lưới trụ sở, văn phòng, chi nhánh tại <strong>30 quốc gia và vùng lãnh thổ</strong> trên toàn cầu, FPT là đối tác quan trọng cung cấp dịch vụ/giải pháp cho hàng trăm tập đoàn lớn trong nhiều lĩnh vực, trong đó có trên <strong>100 khách hàng thuộc danh sách Fortune Global 500</strong>. Đồng thời là đối tác công nghệ cấp cao của các hãng công nghệ hàng đầu như <strong>GE, Airbus, Siemens, Microsoft, Amazon Web Services, SAP…</strong>
            </p>
          </div>
        </div>
      </Section>

      {/* ===== CÔNG TY CON VÀ CÔNG TY LIÊN KẾT ===== */}
      <Section bg="#fff">
        <SectionTitle icon="https://fpt.vn/storage/upload/images/pages/fpt/i-customer-1.png" color="#f57020">
          Công ty con và công ty liên kết chính
        </SectionTitle>

        <div style={{ borderTop: '2px solid #f57020', paddingTop: '25px' }}>
          <p style={{ color: '#333', lineHeight: '1.9', fontSize: '15px', marginBottom: '25px' }}>
            FPT cung cấp giải pháp CNTT tổng thể trong <strong>3 lĩnh vực kinh doanh cốt lõi</strong> gồm Công nghệ, Viễn thông, Giáo dục với <strong>08 Công ty thành viên trực thuộc</strong> và <strong>02 công ty liên kết chính</strong>.
          </p>

          <img
            src="https://fpt.vn/storage/upload/images/pages/anh.png"
            alt="Sơ đồ tổ chức FPT"
            style={{ width: '100%', borderRadius: '4px' }}
          />
        </div>
      </Section>
    </div>
  );
}

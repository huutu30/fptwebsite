import React, { useEffect, useState } from 'react';
import { useRegisterModal } from '../../context/RegisterContext';
import { ShieldCheck, Wifi, Activity, MonitorPlay, CheckCircle, ChevronRight, ChevronDown, ChevronUp, Download, Upload, Monitor, Gamepad2, Trophy } from 'lucide-react';
import { PRODUCT_DATA } from '../../data/productData';
import ProductCardSlider from '../../components/common/ProductCardSlider';
import NewsSection from '../../components/home/NewsSection';
import { Link } from 'react-router-dom';
import Hero from '../../components/home/Hero';
import styles from './CaNhan.module.css';
import SEOHead from '../../components/common/SEOHead';

const TABS = [
  { id: 'internet', label: 'Internet Cá Nhân', icon: <Wifi size={18} /> },
  { id: 'combo', label: 'Combo Truyền Hình', icon: <MonitorPlay size={18} /> },
];

const TAB_CONFIG = {
  internet: {
    title: 'Gói cước Internet Tốc độ cao',
    desc: 'Khám phá các gói cước Internet FPT dành cho cá nhân với mức giá rõ ràng, tốc độ cao, dễ chọn theo nhu cầu học tập, làm việc, giải trí và sử dụng nhiều thiết bị.',
    badgeSub: 'INTERNET CÁ NHÂN',
  },
  combo: {
    title: 'Combo Internet & Truyền hình',
    desc: 'Cập nhật bảng giá gói cước FPT tích hợp Internet và truyền hình với chi phí tiết kiệm, phù hợp gia đình cần vừa lắp mạng ổn định vừa xem giải trí trên FPT Play.',
    badgeSub: 'COMBO INTERNET & TRUYỀN HÌNH',
  },
};

const FAQ_DATA = [
  { q: "Lắp mạng internet FPT có ổn định không?", a: "FPT sử dụng hạ tầng cáp quang FTTH đồng bộ, trang bị modem WiFi 6 hiện đại, mang lại tốc độ truy cập nhanh, ổn định. Ngoài ra, FPT có đội ngũ kỹ thuật hỗ trợ tận nơi nếu xảy ra sự cố mạng." },
  { q: "Các gói cước Internet cá nhân FPT phù hợp với ai?", a: "Các gói cước Internet cá nhân FPT phù hợp với người ở một mình, gia đình nhỏ, căn hộ chung cư hoặc người cần lắp mạng để học tập, làm việc và giải trí cơ bản tại nhà." },
  { q: "Tốc độ gói cước Internet cá nhân FPT là bao nhiêu?", a: "Tùy gói cước, gói cước Internet cá nhân có tốc độ có thể từ 300Mbps đến 1Gbps, đáp ứng tốt nhu cầu sử dụng từ cơ bản đến nâng cao." },
  { q: "Đăng ký Internet cá nhân FPT có kèm modem không?", a: "Có. Không chỉ riêng các gói cước cá nhân mà khi đăng ký các gói cước FPT, bạn đều sẽ được trang bị modem Wi-Fi 6, một số gói còn đi kèm Access Point để mở rộng vùng phủ sóng." },
  { q: "Lắp mạng FPT với các gói Wifi cá nhân mất bao lâu?", a: "Thông thường, sau khi hoàn tất đăng ký, kỹ thuật viên sẽ hỗ trợ lắp đặt trong khoảng 24–48 giờ, tùy khu vực." },
  { q: "Có thể đăng ký Internet cá nhân FPT online không?", a: <>Hoàn toàn có thể, bạn có thể đăng ký online các gói cước FPT qua website FPT.vn với các bước sau:<br/>1. Lựa chọn gói cước phù hợp với nhu cầu sử dụng tại nhà hoặc theo diện tích không gian cần phủ sóng.<br/>2. Cung cấp thông tin cá nhân/doanh nghiệp và địa chỉ lắp đặt.<br/>3. Ký hợp đồng (có thể ký online qua e-Contract hoặc ký trực tiếp tại địa chỉ lắp đặt).<br/>4. Thanh toán cước phí ban đầu.<br/>5. Kỹ thuật viên FPT sẽ liên hệ và tiến hành lắp đặt tận nơi trong thời gian từ 24–72h.</> }
];

export default function CaNhan({ region }) {
  const { openModal } = useRegisterModal();
  const [activeTab, setActiveTab] = useState('internet');
  const [openFaq, setOpenFaq] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lấy sản phẩm theo ID từ một danh sách cụ thể
  const getProductsByIds = (sourceArrays, idList) => {
    const pool = sourceArrays.flat();
    return idList.map(id => pool.find(p => p.id === id)).filter(Boolean);
  };

  const CA_NHAN_DISPLAY_IDS = {
    internet: [
      "giga", "sky", "giga-f1", "sky-f1", "meta-f1", "fpt-an-tam", "sky-f2", "sky-f3", "meta-f2", "meta-f3"
    ],
    combo: [
      "combo-sky", "combo-giga", "combo-meta", "combo-giga-f1", "combo-sky-f1", "combo-meta-f1", 
      "combo-meta-f2", "combo-meta-f3", "combo-an-tam", "combo-giga-lite", "combo-giga-f1-lite", 
      "combo-giga-f2-lite", "combo-giga-f3-lite", "combo-sky-lite", "combo-sky-f1-lite", "combo-sky-f2-lite", "combo-sky-f3-lite", 
      "combo-meta-lite", "combo-meta-f1-lite", "combo-meta-f2-lite", "combo-meta-f3-lite", "combo-fgame-lite", 
      "combo-fgame-f1-lite", "combo-fgame-f2-lite", "combo-fgame-f3-lite", "fpt-speedx2-pro-lite", "fpt-speedx10-pro-lite"
    ]
  };

  // Tab internet: chỉ lấy từ ca_nhan (gói Internet thuần)
  // Tab combo: chỉ lấy từ additional_home_packages + f_game (gói Combo truyền hình, KHÔNG phải thể thao)
  const DATA_SOURCES = {
    internet: [PRODUCT_DATA.ca_nhan || []],
    combo: [PRODUCT_DATA.additional_home_packages || [], PRODUCT_DATA.f_game || []],
  };

  const currentTab = TAB_CONFIG[activeTab];
  const currentData = getProductsByIds(DATA_SOURCES[activeTab] || [], CA_NHAN_DISPLAY_IDS[activeTab] || []);

  return (
    <div className={styles.caNhanPage}>
      <SEOHead
        title="Bảng giá gói cước Internet FPT cá nhân gia đình"
        description="Đăng ký gói cước Internet FPT cá nhân chỉ từ 195.000đ/tháng. Tốc độ cao đến 1Gbps, Wi-Fi 6, lắp đặt nhanh 24h. Xem bảng giá mạng FPT mới nhất."
        canonicalPath="/internet/ca-nhan"
        keywords="gói cước FPT cá nhân, bảng giá mạng FPT, Internet FPT, lắp mạng FPT cá nhân, WiFi FPT"
      />
      {/* HERO SECTION */}
      <Hero hideQuickLinks />

      <div className="container" style={{ marginTop: '15px' }}>

        {/* TABS NAVIGATION */}
        <div className={styles.tabsNav} id="packages" style={{ marginBottom: '10px' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* PRODUCT CARDS - Dynamic based on active tab */}
        <div className={styles.sectionHeader} style={{ marginBottom: '0', textAlign: 'center' }}>
          <h2 className={styles.sectionTitle} style={{ marginBottom: '8px' }}>{currentTab.title}</h2>
          <p className={styles.sectionDesc}>{currentTab.desc}</p>
        </div>
        
        <div style={{ marginTop: '-30px' }}>
          <ProductCardSlider 
            data={currentData} 
            region={region} 
            badgeSub={currentTab.badgeSub}
          />
        </div>

        {/* HIGHLIGHTS - 4 điểm nổi bật */}
        <section className={styles.section}>
          <div className={styles.highlightsGrid}>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}><Activity size={32} /></div>
              <h3>Gói cước FPT tốc độ đến 1Gbps</h3>
              <p>Xem bảng giá mạng FPT với nhiều lựa chọn băng thông mạnh, phù hợp học tập, làm việc và giải trí tại nhà.</p>
            </div>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}><Wifi size={32} /></div>
              <h3>Phủ sóng tốt, kết nối ổn định hơn</h3>
              <p>Bảng giá mạng FPT đi kèm nhiều lựa chọn thiết bị và giải pháp phủ sóng, phù hợp không gian sống hiện đại.</p>
            </div>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}><MonitorPlay size={32} /></div>
              <h3>Trải nghiệm online mượt hơn mỗi ngày</h3>
              <p>Các gói cước FPT hỗ trợ học online, làm việc từ xa, xem phim, chơi game và kết nối nhiều thiết bị cùng lúc.</p>
            </div>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}><ShieldCheck size={32} /></div>
              <h3>Nhiều ưu đãi khi đăng ký gói cước FPT</h3>
              <p>Cập nhật bảng giá mạng FPT cùng các chương trình khuyến mãi giúp người dùng dễ chọn gói cước phù hợp ngân sách.</p>
            </div>
          </div>
        </section>

        {/* THỦ TỤC VÀ QUY TRÌNH ĐĂNG KÝ */}
        <section className={styles.section} style={{ paddingTop: '0' }}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Quy trình & Thủ tục</h2>
            <p className={styles.sectionDesc}>
              Chỉ với vài bước cơ bản, bạn đã có thể hoàn tất đăng ký và được kỹ thuật viên hỗ trợ lắp đặt Internet nhanh chóng tại nhà.
            </p>
          </div>

          <div className="row">
            <div className="col-md-5">
              <div className={styles.procedureBox} style={{ height: '100%', background: '#fff9f5', borderColor: '#fdba74' }}>
                <h3 className={styles.benefitTitle} style={{ color: '#ea580c', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Monitor size={24} /> Hồ sơ cần chuẩn bị
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'flex-start' }}>
                    <CheckCircle color="#f57020" size={20} style={{ marginRight: '12px', marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ fontSize: '16px', color: '#334155', lineHeight: '1.5' }}><strong>Khách hàng cá nhân:</strong> Bản photo/scan hoặc ảnh chụp CMND/CCCD.</span>
                  </li>
                  <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'flex-start' }}>
                    <CheckCircle color="#f57020" size={20} style={{ marginRight: '12px', marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ fontSize: '16px', color: '#334155', lineHeight: '1.5' }}><strong>Người thuê nhà/Sinh viên:</strong> CMND/CCCD và đóng trước tối thiểu 6 tháng cước.</span>
                  </li>
                  <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'flex-start' }}>
                    <CheckCircle color="#f57020" size={20} style={{ marginRight: '12px', marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ fontSize: '16px', color: '#334155', lineHeight: '1.5' }}><strong>Khách hàng doanh nghiệp:</strong> Bản sao Giấy phép kinh doanh và CMND của người đại diện.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-7">
              <div className={styles.procedureBox}>
                <h3 className={styles.benefitTitle} style={{ color: '#0f172a', marginBottom: '25px' }}>Quy trình lắp đặt trong 24h</h3>
                <div className={styles.procStep}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h4>Liên hệ tư vấn</h4>
                    <p>Chọn gói cước và để lại thông tin trên website hoặc gọi Hotline 1900 6600.</p>
                  </div>
                </div>
                <div className={styles.procStep}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h4>Khảo sát & Ký hợp đồng</h4>
                    <p>Nhân viên FPT liên hệ xác nhận, khảo sát hạ tầng và ký hợp đồng điện tử tiện lợi.</p>
                  </div>
                </div>
                <div className={styles.procStep}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h4>Lắp đặt nghiệm thu</h4>
                    <p>Kỹ thuật viên triển khai lắp đặt tại nhà trong vòng 12-24h và hướng dẫn sử dụng chi tiết.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO CONTENT & PRICING TABLES */}
        <section className={styles.section} style={{ paddingTop: '0' }}>
          <div className={`${styles.seoContent} ${showMore ? styles.expanded : styles.collapsed}`}>
            <h1 className={styles.seoTitle} style={{ fontSize: '28px', color: '#f57020', marginBottom: '20px' }}>Đăng ký gói cước Internet dành cho cá nhân - Giá ưu đãi, nhiều tiện ích</h1>
            <p className={styles.seoText}>
              FPT cung cấp đa dạng gói cước Internet cá nhân phù hợp cho người ở một mình, gia đình nhỏ, căn hộ chung cư hoặc nhu cầu sử dụng Internet tại nhà. Với hạ tầng cáp quang phủ rộng, thiết bị Wi-Fi 6 hiện đại và nhiều mức giá linh hoạt, người dùng có thể dễ dàng lựa chọn gói cước phù hợp để học tập, làm việc từ xa, xem phim, lướt web hay kết nối nhiều thiết bị ổn định mỗi ngày. Ngay dưới đây là thông tin chi tiết về các gói cước Internet cá nhân FPT, bảng giá tham khảo, thiết bị đi kèm, thủ tục đăng ký và những câu hỏi thường gặp khi lắp mạng tại nhà.
            </p>

            <h2 className={styles.seoTitle}>Gói cước Internet cá nhân FPT kèm modem Wi-Fi 6 cho nhu cầu học tập làm việc giải trí tại nhà</h2>
            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-07-10/1752163539_lap-internet-wifi-fpt.jpg" alt="Gói cước Internet cá nhân FPT đi kèm modem Wi-Fi 6" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>Gói cước Internet cá nhân FPT đi kèm modem Wi-Fi 6, phù hợp cho nhu cầu sử dụng tại nhà</figcaption>
            </figure>

            <h2 className={styles.seoTitle}>Các gói cước Internet cá nhân FPT - Linh hoạt nhu cầu, dễ chọn theo mức sử dụng</h2>
            <p className={styles.seoText}>
              FPT hiện cung cấp nhiều gói cước Internet cá nhân dành cho người dùng tại nhà, từ nhu cầu cơ bản như lướt web, học online, xem phim đến nhu cầu cao hơn như kết nối nhiều thiết bị hoặc cần vùng phủ sóng rộng hơn trong căn hộ, nhà phố.
            </p>

            <h2 className={styles.seoTitle}>Bảng giá gói cước Internet cá nhân FPT cho nhu cầu sử dụng tại nhà</h2>
            <p className={styles.seoText}>
              Tham khảo bảng giá các gói Internet cá nhân FPT phù hợp cho người ở một mình, gia đình nhỏ, căn hộ chung cư hoặc nhu cầu sử dụng Internet hằng ngày tại nhà.
            </p>
            <div style={{ overflowX: 'auto', marginBottom: '40px' }}>
              <table className={styles.priceTable}>
                <thead>
                  <tr>
                    <th>Gói cước</th>
                    <th>Giá cước (chỉ từ)</th>
                    <th>Đăng ký</th>
                    <th>Thiết bị, dịch vụ đi kèm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Giga</strong> (300Mb)</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>195,000 ₫</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Internet%20Giga'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6</td>
                  </tr>
                  <tr>
                    <td><strong>Sky</strong> (1Gb - 300Mb)</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>195,000 ₫</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Internet%20Sky'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6</td>
                  </tr>
                  <tr>
                    <td><strong>Giga F1</strong> (300Mb)</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>205,000 ₫</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Internet%20Giga%20F1'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6, Access Point</td>
                  </tr>
                  <tr>
                    <td><strong>Sky F1</strong> (1Gb - 300Mb)</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>210,000 ₫</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Internet%20Sky%20F1'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6, Access Point</td>
                  </tr>
                  <tr>
                    <td><strong>Giga F2</strong> (300Mb)</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>225,000 ₫</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Internet%20Giga%20F2'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6, 2 Access Point</td>
                  </tr>
                  <tr>
                    <td><strong>Sky F2</strong> (1Gb - 300Mb)</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>230,000 ₫</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Internet%20Sky%20F2'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6, 2 Access Point</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', marginBottom: '40px' }}>
              * Lưu ý: giá gói cước Internet cá nhân FPT có thể thay đổi theo khu vực, thời điểm đăng ký và chính sách hiện hành. Để nhận báo giá chính xác nhất, bạn có thể nhấn Đăng ký hoặc gọi 1900.6600 để được tư vấn nhanh.
            </p>

            <h2 className={styles.seoTitle}>Bảng giá cước combo Internet cá nhân kèm truyền hình FPT Play</h2>
            <p className={styles.seoText}>
              Bảng giá các gói combo Internet và truyền hình FPT Play dành cho nhu cầu giải trí tại nhà:
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table className={styles.priceTable}>
                <thead>
                  <tr>
                    <th>Gói cước</th>
                    <th>Giá cước (chỉ từ)</th>
                    <th>Đăng ký</th>
                    <th>Thiết bị, dịch vụ đi kèm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Combo Giải trí</strong> (300Mb)</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>200,000 ₫</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Combo%20Giai%20Tri'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6, FPT Play Box</td>
                  </tr>
                  <tr>
                    <td><strong>Combo Truyền hình</strong> (1Gbps)</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>210,000 ₫</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Combo%20Truyen%20Hinh'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6, FPT Play Box</td>
                  </tr>
                  <tr>
                    <td><strong>Combo Giga F1</strong> (300Mb)</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>220,000 ₫</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Combo%20Giga%20F1'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6, FPT Play Box</td>
                  </tr>
                  <tr>
                    <td><strong>Combo Sky F1</strong> (1Gb - 300Mb)</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>239,000 ₫</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Combo%20Sky%20F1'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6, FPT Play Box</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', marginTop: '15px' }}>
              * Lưu ý: giá gói combo Internet và truyền hình có thể thay đổi theo khu vực, thời điểm đăng ký và chính sách hiện hành. Nhấn ngay vào Đăng ký hoặc gọi 1900.6600 để được tư vấn chi tiết.
            </p>

            <h2 className={styles.seoTitle} style={{marginTop: '40px'}}>Đăng ký Internet cá nhân FPT có thủ tục như thế nào? Có dễ lắp đặt không?</h2>
            <p className={styles.seoText}>
              Thủ tục đăng ký gói cước Internet cá nhân FPT khá đơn giản, phù hợp cho người dùng lắp mạng tại nhà, căn hộ hoặc gia đình nhỏ. Chỉ với vài bước cơ bản, bạn đã có thể hoàn tất đăng ký và được kỹ thuật viên hỗ trợ lắp đặt Internet nhanh chóng tại địa chỉ sử dụng.
            </p>

            <h3 className={styles.seoTitle} style={{fontSize: '20px', marginTop: '20px'}}>Hồ sơ đăng ký cần chuẩn bị</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px', color: '#334155', lineHeight: '1.8' }}>
              <li><strong>Khách hàng cá nhân:</strong> Bản photo/scan hoặc ảnh chụp CMND/CCCD. Nếu là người thuê nhà, có thể cần thêm hợp đồng thuê nhà hoặc xác nhận của chủ nhà (tùy khu vực).</li>
              <li><strong>Khách hàng doanh nghiệp:</strong>
                <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px' }}>
                  <li>Bản sao Giấy phép kinh doanh.</li>
                  <li>CMND/CCCD của người đại diện.</li>
                  <li>Con dấu công ty hoặc chữ ký điện tử (nếu đăng ký online).</li>
                </ul>
              </li>
            </ul>

            <h3 className={styles.seoTitle} style={{fontSize: '20px', marginTop: '20px'}}>Quy trình đăng ký lắp đặt Internet FPT</h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '20px', color: '#334155', lineHeight: '1.8' }}>
              <li>Lựa chọn gói cước phù hợp với nhu cầu sử dụng tại nhà hoặc theo diện tích không gian cần phủ sóng.</li>
              <li>Cung cấp thông tin cá nhân/doanh nghiệp và địa chỉ lắp đặt.</li>
              <li>Ký hợp đồng (có thể ký online qua e-Contract hoặc ký trực tiếp tại địa chỉ lắp đặt).</li>
              <li>Thanh toán cước phí ban đầu (theo chính sách gói đã chọn: 1 tháng, 3 tháng, 6 tháng, 13 tháng…).</li>
              <li>Kỹ thuật viên FPT sẽ liên hệ và tiến hành lắp đặt tận nơi trong thời gian từ 24–72h, tùy từng địa phương và khu vực.</li>
            </ol>

            <h3 className={styles.seoTitle} style={{fontSize: '20px', marginTop: '20px'}}>Các hình thức đăng ký lắp đặt Internet FPT</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px', color: '#334155', lineHeight: '1.8' }}>
              <li><strong>Đăng ký online:</strong> Điền form tại https://fpt.vn/ hoặc các trang liên kết chính thức.</li>
              <li><strong>Đăng ký qua tổng đài:</strong> Gọi số 0387498332 (tư vấn toàn quốc, phục vụ 24/7).</li>
              <li><strong>Đăng ký trực tiếp:</strong> Đến bất kỳ phòng giao dịch hoặc chi nhánh FPT gần nhất trên toàn quốc để được hỗ trợ nhanh chóng.</li>
            </ul>

            <h2 className={styles.seoTitle} style={{marginTop: '40px'}}>Tư vấn đăng ký gói cước Internet cá nhân FPT phù hợp với nhu cầu sử dụng tại nhà</h2>
            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-07-10/1752120878_lap-wifi-internet-fpt.jpg" alt="Đội ngũ tư vấn FPT hỗ trợ khách hàng" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>Đội ngũ tư vấn FPT hỗ trợ khách hàng chọn gói cước Internet cá nhân phù hợp trước khi đăng ký lắp đặt</figcaption>
            </figure>

            <h2 className={styles.seoTitle}>Vì sao gói cước Internet cá nhân FPT là lựa chọn phù hợp cho bạn</h2>
            <p className={styles.seoText}>
              Đối với nhu cầu sử dụng Internet tại nhà, người dùng thường quan tâm đến tốc độ ổn định, thiết bị đi kèm, khả năng kết nối nhiều thiết bị và mức giá hợp lý. Các gói cước Internet cá nhân FPT đáp ứng khá tốt những tiêu chí này nhờ hạ tầng cáp quang, modem Wi-Fi 6 và nhiều lựa chọn phù hợp theo từng mức sử dụng. Cụ thể:
            </p>
            <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '20px', color: '#334155', lineHeight: '1.8' }}>
              <li style={{marginBottom: '10px'}}><CheckCircle color="#f57020" size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> <strong>Phù hợp nhu cầu sử dụng tại nhà:</strong> Các gói Internet cá nhân được thiết kế cho người dùng cá nhân, gia đình nhỏ, căn hộ hoặc nhà phố với mức tốc độ và chi phí dễ lựa chọn.</li>
              <li style={{marginBottom: '10px'}}><CheckCircle color="#f57020" size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> <strong>Hạ tầng cáp quang ổn định:</strong> Đường truyền cáp quang giúp kết nối Internet ổn định hơn cho học tập, làm việc online, xem video và giải trí hằng ngày.</li>
              <li style={{marginBottom: '10px'}}><CheckCircle color="#f57020" size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> <strong>Trang bị modem Wi-Fi 6:</strong> Nhiều gói cước đi kèm modem Wi-Fi 6, hỗ trợ kết nối tốt hơn khi trong nhà có nhiều smartphone, laptop, TV hoặc thiết bị thông minh cùng sử dụng.</li>
              <li style={{marginBottom: '10px'}}><CheckCircle color="#f57020" size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> <strong>Dễ chọn gói theo mức sử dụng:</strong> Người dùng có thể chọn gói cơ bản hoặc gói có thêm Access Point tùy vào diện tích nhà, số lượng thiết bị và nhu cầu phủ sóng thực tế.</li>
              <li style={{marginBottom: '10px'}}><CheckCircle color="#f57020" size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> <strong>Tốc độ cao cho nhu cầu hằng ngày:</strong> Tốc độ từ 300Mbps trở lên phù hợp cho lướt web, học online, họp video, xem phim 4K và tải dữ liệu nhanh tại nhà.</li>
              <li style={{marginBottom: '10px'}}><CheckCircle color="#f57020" size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> <strong>Kết nối đa thiết bị ổn định:</strong> Phù hợp với các hộ gia đình hiện đại có nhiều thiết bị cùng truy cập Internet trong cùng một thời điểm.</li>
              <li style={{marginBottom: '10px'}}><CheckCircle color="#f57020" size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> <strong>Hỗ trợ đăng ký và lắp đặt thuận tiện:</strong> Người dùng có thể đăng ký online, qua tổng đài hoặc tại điểm giao dịch và được kỹ thuật viên hỗ trợ lắp đặt tận nơi.</li>
            </ul>

            <h2 className={styles.seoTitle}>Gói cước Internet cá nhân FPT Wi-Fi 6 phù hợp cho gia đình nhỏ và nhu cầu sử dụng đa thiết bị</h2>
            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-06-30/1751298415_goi-cuoc-lap-dat-mang-fpt-1.jpg" alt="Gói cước Internet cá nhân FPT với Wi-Fi 6" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>Gói cước Internet cá nhân FPT với Wi-Fi 6, tốc độ cao và khả năng kết nối đa thiết bị cho nhu cầu sử dụng tại nhà</figcaption>
            </figure>

            <h2 className={styles.seoTitle}>Đăng ký gói cước Internet cá nhân FPT phù hợp với nhu cầu của bạn</h2>
            <p className={styles.seoText}>
              Nếu bạn đang cần lắp mạng tại nhà cho nhu cầu cá nhân, căn hộ nhỏ hoặc gia đình ít người, các gói cước Internet cá nhân FPT là lựa chọn đáng tham khảo nhờ tốc độ cao, thiết bị Wi-Fi 6 đi kèm và mức giá linh hoạt theo từng nhu cầu sử dụng. Bạn có thể chọn gói phù hợp ngay trên website, nhấn <strong>ĐĂNG KÝ</strong> hoặc <strong>TƯ VẤN NGAY</strong> để nhận báo giá theo khu vực, thông tin ưu đãi hiện hành và hỗ trợ lắp đặt nhanh.
            </p>

            <h2 className={styles.seoTitle}>Đăng ký gói cước Internet cá nhân FPT hoặc tham khảo thêm combo truyền hình và các gói mở rộng khác</h2>
            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-06-30/1751298388_goi-cuoc-lap-dat-mang-fpt-3.jpg" alt="Ngoài các gói Internet cá nhân, FPT còn cung cấp thêm gói combo truyền hình" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>Ngoài các gói Internet cá nhân, FPT còn cung cấp thêm gói combo truyền hình và các gói mở rộng khác</figcaption>
            </figure>
          </div>
          <div className={styles.showMoreWrapper}>
            <button className={styles.showMoreBtn} onClick={() => setShowMore(!showMore)}>
              {showMore ? (
                <>Thu gọn <ChevronUp size={20} /></>
              ) : (
                <>Xem thêm <ChevronDown size={20} /></>
              )}
            </button>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className={styles.section} style={{ paddingTop: '0' }}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Câu hỏi thường gặp</h2>
            <p className={styles.sectionDesc}>
              Giải đáp những thắc mắc phổ biến khi đăng ký và sử dụng dịch vụ Internet FPT.
            </p>
          </div>
          
          <div className={styles.faqSection}>
            {FAQ_DATA.map((faq, index) => (
              <div key={index} className={`${styles.faqItem} ${openFaq === index ? styles.faqOpen : ''}`}>
                <h4 className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                  {faq.q}
                  <ChevronDown size={20} className={styles.faqChevron} />
                </h4>
                {openFaq === index && (
                  <p className={styles.faqAnswer}>{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
      
    </div>
  );
}

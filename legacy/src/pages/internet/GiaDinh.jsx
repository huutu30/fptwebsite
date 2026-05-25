import React, { useEffect, useState } from 'react';
import { useRegisterModal } from '../../context/RegisterContext';
import { Wifi, Zap, Clock, Gift, MonitorPlay, Home, Camera, Trophy, ChevronRight, ChevronDown, ChevronUp, CheckCircle, Monitor } from 'lucide-react';
import { PRODUCT_DATA } from '../../data/productData';
import ProductCardSlider from '../../components/common/ProductCardSlider';
import NewsSection from '../../components/home/NewsSection';
import { Link } from 'react-router-dom';
import Hero from '../../components/home/Hero';
import styles from './GiaDinh.module.css';
import SEOHead from '../../components/common/SEOHead';

const TABS = [
  { id: 'internet', label: 'Internet Gia Đình', icon: <Home size={18} /> },
  { id: 'combo', label: 'Combo Truyền Hình', icon: <MonitorPlay size={18} /> },
  { id: 'camera', label: 'Internet & Camera', icon: <Camera size={18} /> },
];

const TAB_CONFIG = {
  internet: {
    title: 'Gói cước Internet Gia Đình mở rộng vùng phủ',
    desc: 'Các gói cước được trang bị thêm Access Point / Wi-Fi Mesh, phủ sóng mạnh mẽ cho nhà nhiều tầng, chung cư diện tích rộng.',
    badgeSub: 'INTERNET GIA ĐÌNH',
  },
  combo: {
    title: 'Combo Internet & Truyền hình FPT Play',
    desc: 'Phù hợp mọi nhu cầu cho gia đình giải trí với hàng trăm kênh truyền hình đặc sắc, thể thao độc quyền và kho phim 4K.',
    badgeSub: 'COMBO INTERNET & TRUYỀN HÌNH',
  },
  camera: {
    title: 'Combo Internet Camera thông minh cho gia đình an tâm',
    desc: 'Giải pháp kết nối và giám sát giúp bảo vệ ngôi nhà dù ở bất cứ đâu, tích hợp lưu trữ Cloud và camera AI thông minh.',
    badgeSub: 'INTERNET & CAMERA',
  },
};

const FAQ_DATA = [
  { q: "Gói Internet gia đình FPT phù hợp với những ai?", a: "Gói cước Internet gia đình FPT phù hợp với hộ gia đình có nhu cầu sử dụng mạng để học tập, làm việc online, xem phim, giải trí, lướt web và kết nối nhiều thiết bị như điện thoại, TV, laptop hoặc máy tính bảng trong cùng một thời điểm." },
  { q: "Gia đình đông người, nhiều tầng, nhiều phòng nên chọn gói cước Internet FPT nào?", a: "Với gia đình 2–3 người, nhu cầu chủ yếu là lướt web, học tập, xem YouTube, dùng TV và điện thoại hằng ngày, có thể cân nhắc Internet GIGA tốc độ 300 Mbps, giá 195.000đ/tháng; hoặc Internet Giga F1 giá 205.000đ/tháng nếu muốn thêm 01 Access Point. Nếu gia đình thường xem video chất lượng cao, có thể chọn Internet Sky F1 tốc độ 1 Gbps, giá 210.000đ/tháng." },
  { q: "Gia đình muốn vừa có Internet vừa có truyền hình thì nên chọn gói nào?", a: "Có thể cân nhắc Combo Giga F1 giá 220.000đ/tháng; Combo Sky F1 giá 239.000đ/tháng; hoặc Combo Meta tốc độ 1 Gbps / 1 Gbps, giá 320.000đ/tháng nếu nhu cầu giải trí và kết nối cao hơn hoặc Combo Thể Thao VVIP cho gia đình cần trải nghiệm bóng đá, giải trí cùng nhau." },
  { q: "Gia đình cần Internet để học tập và làm việc online hằng ngày thì nên lắp gói nào?", a: "Với nhu cầu học online, họp video, gửi file, làm việc từ xa, có thể tư vấn Giga F1 nếu gia đình ít người; Sky F1 nếu có nhiều người học và làm việc cùng lúc; hoặc Giga F2 nếu không gian có nhiều phòng và cần thêm điểm phát để giữ kết nối ổn định." },
  { q: "Nhà có nhiều phòng, nhiều vật cản thì nên chọn gói nào để Wi-Fi ổn định hơn?", a: "Nếu nhà có nhiều phòng ngủ, tường dày hoặc nhiều vật cản khiến sóng Wi-Fi dễ yếu, nên ưu tiên gói có thêm thiết bị phủ sóng. Có thể chọn Giga F2 với 02 Access Point, Sky F2 với 02 Access Point, hoặc Giga F3 / Sky F3 với 03 Access Point." },
];

export default function GiaDinh({ region }) {
  const { openModal } = useRegisterModal();
  const [activeTab, setActiveTab] = useState('internet');
  const [openFaq, setOpenFaq] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allProducts = Object.values(PRODUCT_DATA).flat();

  const getProductsByIds = (idList) => {
    return idList.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
  };

  const GIA_DINH_DISPLAY_IDS = {
    internet: [
      "giga-f1", "sky-f1", "sky-f2", "combo-giga-f1", "combo-sky-f1", "meta", "meta-f1", "meta-f2", "meta-f3"
    ],
    combo: [
      "combo-sky", "combo-giga", "combo-meta", "combo-giga-f1", "combo-sky-f1", "combo-meta-f1", "combo-fgame"
    ],
    camera: PRODUCT_DATA.camera_gia_dinh.map(p => p.id)
  };

  const currentTab = TAB_CONFIG[activeTab];
  const getSliderData = () => {
    return getProductsByIds(GIA_DINH_DISPLAY_IDS[activeTab] || []);
  };

  return (
    <div className={styles.giaDinhPage}>
      <SEOHead
        title="Gói cước Internet FPT cho hộ gia đình | Khuyến mãi HOT"
        description="Đăng ký lắp mạng Internet FPT gia đình. Phủ sóng rộng đến 200m², Wi-Fi 6 + Access Point, combo truyền hình. Giá chỉ từ 205.000đ/tháng. Lắp đặt trong 24h."
        canonicalPath="/internet/gia-dinh"
        keywords="Internet FPT gia đình, lắp mạng gia đình, WiFi FPT nhà nhiều tầng, combo Internet truyền hình FPT"
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
            data={getSliderData()} 
            region={region} 
            badgeSub={currentTab.badgeSub}
          />
        </div>

        {/* HIGHLIGHTS - 4 điểm nổi bật */}
        <section className={styles.section}>
          <div className={styles.highlightsGrid}>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}><Zap size={32} /></div>
              <h3>Tốc độ băng thông đến 1Gbps</h3>
              <p>Tải phim, học tập và làm việc online không gián đoạn, đáp ứng tốt mọi tác vụ nặng.</p>
            </div>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}><Wifi size={32} /></div>
              <h3>Phủ sóng rộng tới 200m²</h3>
              <p>Kết nối mạnh mẽ, ổn định cho mọi không gian nhờ thiết bị Access Point (Wi-Fi Mesh).</p>
            </div>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}><Clock size={32} /></div>
              <h3>Độ trễ cực thấp chỉ từ 0.016s</h3>
              <p>Học tập, làm việc online và giải trí không gián đoạn, mượt mà mọi lúc.</p>
            </div>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}><Gift size={32} /></div>
              <h3>Ưu đãi & chăm sóc 24/7</h3>
              <p>Đặc biệt tặng thêm 1 tháng khi đăng ký 12 tháng, hỗ trợ kỹ thuật tận nơi.</p>
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
              <div className={styles.procedureBox} style={{ height: '100%', background: '#f0f9ff', borderColor: '#93c5fd' }}>
                <h3 className={styles.benefitTitle} style={{ color: '#1e3a8a', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Monitor size={24} /> Hồ sơ cần chuẩn bị
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'flex-start' }}>
                    <CheckCircle color="#2563eb" size={20} style={{ marginRight: '12px', marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ fontSize: '16px', color: '#334155', lineHeight: '1.5' }}><strong>Khách hàng cá nhân:</strong> Bản photo/scan hoặc ảnh chụp CMND/CCCD.</span>
                  </li>
                  <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'flex-start' }}>
                    <CheckCircle color="#2563eb" size={20} style={{ marginRight: '12px', marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ fontSize: '16px', color: '#334155', lineHeight: '1.5' }}><strong>Người thuê nhà/Sinh viên:</strong> CMND/CCCD và đóng trước tối thiểu 6 tháng cước.</span>
                  </li>
                  <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'flex-start' }}>
                    <CheckCircle color="#2563eb" size={20} style={{ marginRight: '12px', marginTop: '3px', flexShrink: 0 }} />
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
            <h1 className={styles.seoTitle} style={{ fontSize: '28px', color: '#f57020', marginBottom: '20px' }}>Đăng ký lắp mạng Internet gia đình FPT | Lắp WiFi nhanh, ổn định</h1>
            <p className={styles.seoText}>
              Từ những giờ học trực tuyến bổ ích của con trẻ, những phút giây thư giãn xem phim cùng cả nhà, đến việc ông bà kết nối với con cháu phương xa, một đường truyền internet tốc độ cao, ổn định và phủ sóng rộng khắp là điều mà mọi gia đình đều mong muốn. FPT thấu hiểu sâu sắc những nhu cầu đó và mang đến các gói cước internet gia đình tốc độ vượt trội cho gia đình đông người, nhà nhiều tầng hoặc có không gian rộng; và các gói combo internet - truyền hình giúp cả nhà giải trí thả ga mà vẫn tiết kiệm chi phí.
            </p>

            <h2 className={styles.seoTitle}>Bảng giá gói cước Internet gia đình theo nhu cầu tại FPT</h2>
            <p className={styles.seoText}>
              Gói cước Internet cho gia đình sử dụng nhiều thiết bị, smart home, stream 4K
            </p>
            <div style={{ overflowX: 'auto', marginBottom: '40px' }}>
              <table className={styles.priceTable}>
                <thead>
                  <tr>
                    <th>Gói cước</th>
                    <th>Băng thông (DL/UL)</th>
                    <th>Đăng ký</th>
                    <th>Thiết bị đi kèm</th>
                    <th>Giá cước (chỉ từ)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Giga F1</strong> (300Mb)</td>
                    <td>300 Mbps / 300 Mbps</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Internet%20Giga%20F1'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6 + 1 Access Point</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>205.000đ</td>
                  </tr>
                  <tr>
                    <td><strong>Sky F1</strong> (1Gb)</td>
                    <td>1 Gbps / 300 Mbps</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Internet%20Sky%20F1'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6 + 1 Access Point</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>210.000đ</td>
                  </tr>
                  <tr>
                    <td><strong>Giga F2</strong> (300Mb)</td>
                    <td>300 Mbps / 300 Mbps</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Internet%20Giga%20F2'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6 + 2 Access Point</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>225.000đ</td>
                  </tr>
                  <tr>
                    <td><strong>Sky F2</strong> (1Gb)</td>
                    <td>1 Gbps / 300 Mbps</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Internet%20Sky%20F2'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6 + 2 Access Point</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>230.000đ</td>
                  </tr>
                  <tr>
                    <td><strong>Giga F3</strong> (300Mb)</td>
                    <td>300 Mbps / 300 Mbps</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Internet%20Giga%20F3'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6 + 3 Access Point</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>245.000đ</td>
                  </tr>
                  <tr>
                    <td><strong>Sky F3</strong> (1Gb)</td>
                    <td>1 Gbps / 300 Mbps</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Internet%20Sky%20F3'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6 + 3 Access Point</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>255.000đ</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', marginBottom: '40px' }}>
              * Lưu ý: giá gói cước Internet gia đình FPT có thể thay đổi theo khu vực, thời điểm đăng ký và chính sách hiện hành. Nhấn Đăng ký hoặc gọi 1900.6600 để được tư vấn chính xác.
            </p>

            <h2 className={styles.seoTitle}>Gói cước Internet + truyền hình cho gia đình</h2>
            <p className={styles.seoText}>
              Bảng giá các gói combo Internet và truyền hình FPT Play dành cho gia đình cần vừa lắp mạng ổn định vừa xem giải trí, thể thao:
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table className={styles.priceTable}>
                <thead>
                  <tr>
                    <th>Gói cước</th>
                    <th>Băng thông (DL/UL)</th>
                    <th>Đăng ký</th>
                    <th>Thiết bị, dịch vụ đi kèm</th>
                    <th>Giá cước (chỉ từ)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Combo Giga F1</strong> (300Mb)</td>
                    <td>300 Mbps / 300 Mbps</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Combo%20Giga%20F1'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6 + 1 AP + FPT Play Box (130+ kênh)</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>220.000đ</td>
                  </tr>
                  <tr>
                    <td><strong>Combo Sky F1</strong> (1Gb)</td>
                    <td>1 Gbps / 300 Mbps</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Combo%20Sky%20F1'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6 + 1 AP + FPT Play Box (130+ kênh)</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>239.000đ</td>
                  </tr>
                  <tr>
                    <td><strong>Combo Giga F2</strong> (300Mb)</td>
                    <td>300 Mbps / 300 Mbps</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Combo%20Giga%20F2'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6 + 2 AP + FPT Play Box (130+ kênh)</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>240.000đ</td>
                  </tr>
                  <tr>
                    <td><strong>Combo Sky F2</strong> (1Gb)</td>
                    <td>1 Gbps / 300 Mbps</td>
                    <td><button onClick={() => openModal(decodeURIComponent('Combo%20Sky%20F2'))} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6 + 2 AP + FPT Play Box (130+ kênh)</td>
                    <td style={{ color: '#ea580c', fontWeight: 'bold' }}>259.000đ</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', marginTop: '15px', marginBottom: '40px' }}>
              * Nhấn ngay vào gói cước phù hợp, điền thông tin để nhân viên tư vấn thông tin đến bạn giá gói cước, chương trình khuyến mãi chính xác nhất tại khu vực của bạn nhé.
            </p>

            <h2 className={styles.seoTitle} style={{marginTop: '40px'}}>Câu hỏi thường gặp khi lắp mạng FPT cho gia đình</h2>
            <p className={styles.seoText}>Các câu hỏi thường gặp nhất khi chọn dịch vụ internet cho gia đình</p>
            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-06-30/1751298777_internet-gia-dinh-2.jpg" alt="FPT tư vấn Internet cho gia đình" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>FPT luôn sẵn sàng tư vấn, giúp gia đình bạn đưa ra lựa chọn Internet thông thái.</figcaption>
            </figure>

            <h2 className={styles.seoTitle} style={{marginTop: '40px'}}>Vì sao FPT nên là sự lựa chọn dịch vụ internet cho gia đình bạn?</h2>
            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-06-30/1751298818_internet-gia-dinh-1.jpg" alt="Chọn FPT cho trải nghiệm Internet ưu việt" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>Chọn FPT, chọn trải nghiệm Internet ưu việt cho cả gia đình.</figcaption>
            </figure>
            <p className={styles.seoText}>
              Khi tìm kiếm một nhà cung cấp dịch vụ internet cho gia đình, tốc độ cao, ổn định, kết nối cùng lúc nhiều thiết bị không gây giật lag sẽ là các yếu tố hàng đầu mà bạn nên cân nhắc. FPT tự hào là đơn vị cung cấp dịch vụ chất lượng, đa dạng gói cước phù hợp với cá nhân và gia đình. Cụ thể hơn:
            </p>
            <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '20px', color: '#334155', lineHeight: '1.8' }}>
              <li style={{marginBottom: '10px'}}><CheckCircle color="#f57020" size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> FPT tự hào sở hữu hạ tầng cáp quang hiện đại, phủ sóng rộng khắp, đảm bảo tốc độ đường truyền luôn ổn định và nhanh chóng, ngay cả trong giờ cao điểm.</li>
              <li style={{marginBottom: '10px'}}><CheckCircle color="#f57020" size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> FPT liên tục cập nhật và ứng dụng những công nghệ mới nhất, điển hình là Modem Wi-Fi 6, mang đến khả năng kết nối vượt trội, vùng phủ sóng rộng hơn và giảm thiểu độ trễ.</li>
              <li style={{marginBottom: '10px'}}><CheckCircle color="#f57020" size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Dịch vụ chăm sóc khách hàng của FPT luôn được đánh giá cao với đội ngũ kỹ thuật viên chuyên nghiệp, hỗ trợ nhanh chóng 24/7.</li>
              <li style={{marginBottom: '10px'}}><CheckCircle color="#f57020" size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Với các gói cước đa dạng, linh hoạt và nhiều chương trình ưu đãi hấp dẫn, FPT mang đến giải pháp internet chất lượng cao với chi phí hợp lý.</li>
            </ul>

            <h2 className={styles.seoTitle}>Đăng ký ngay các gói mạng Wi-Fi 6 FPT - Cho giây phút bên gia đình luôn trọn vẹn nhất</h2>
            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-06-30/1751298846_internet-gia-dinh.jpeg" alt="Wi-Fi 6 FPT cho gia đình" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>Đừng để Internet chậm làm gián đoạn khoảnh khắc yêu thương. Chọn Wi-Fi 6 FPT cho gia đình trọn vẹn.</figcaption>
            </figure>
            <p className={styles.seoText}>
              Đừng để những trải nghiệm internet chậm chạp, giật lag làm ảnh hưởng đến cuộc sống số của gia đình bạn. Với công nghệ Wi-Fi 6 tiên tiến nhất, các gói cước internet FPT mang đến một cuộc cách mạng về tốc độ, sự ổn định và khả năng kết nối. Wi-Fi 6 không chỉ cung cấp băng thông rộng hơn, cho phép nhiều thiết bị cùng lúc truy cập mạng mà không làm giảm hiệu suất, mà còn tối ưu hóa việc sử dụng năng lượng, giúp kéo dài tuổi thọ pin cho các thiết bị di động của bạn.
            </p>
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
              Giải đáp những thắc mắc phổ biến khi chọn dịch vụ Internet cho gia đình.
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

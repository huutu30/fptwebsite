"use client";

import React, { useEffect, useState } from 'react';
import { useRegisterModal } from '@/context/RegisterContext';
import { useRegion } from '@/context/RegionContext';
import Link from 'next/link';
import { Home, Cpu, Shield, Zap, Check, ChevronDown, ChevronUp } from 'lucide-react';
import NewsSection from '@/components/home/NewsSection';
import styles from './SmartHome.module.css';

export default function SmartHome() {
  const { openModal } = useRegisterModal();
  const { region } = useRegion();
  const [showMore, setShowMore] = useState(false);

  const smarthomeProducts = [
    {
      id: "o-cam-athena",
      name: "Ổ cắm thông minh SA Athena",
      price: 346500,
      image: "https://hi-static.fpt.vn/sys/shop/prod/2025-07-15/687577bbbb186_2.jpg",
      features: ["Điều khiển từ xa qua smartphone", "Hẹn giờ bật/tắt thiết bị", "Thiết kế an toàn, chống cháy"],
    },
    {
      id: "ir-morong",
      name: "Bộ điều khiển thiết bị IR mở rộng",
      price: 683100,
      image: "https://hi-static.fpt.vn/sys/shop/prod/2025-07-15/6875762c19905_1.jpg",
      features: ["Chuẩn Wi-Fi và Bluetooth", "Điều khiển TV, điều hòa, quạt", "Tích hợp kịch bản thông minh"],
    },
    {
      id: "cam-bien-hien-dien",
      name: "Cảm biến hiện diện âm trần Athena AC",
      price: 1178100,
      image: "https://hi-static.fpt.vn/sys/shop/prod/2025-07-30/6889c37aebb80_cam-bien-am-tran.jpg",
      features: ["Phát hiện sự hiện diện siêu nhạy", "Tự động bật/tắt đèn", "Thiết kế âm trần thẩm mỹ"],
    },
    {
      id: "cam-bien-khoi",
      name: "Cảm biến khói Athena",
      price: 1227600,
      image: "https://hi-static.fpt.vn/sys/shop/prod/2025-07-30/6889be0eb3079_cam-bien-khoi-athena.jpg",
      features: ["Cảnh báo khói, cháy nổ kịp thời", "Báo động qua còi và điện thoại", "Dễ dàng lắp đặt"],
    },
    {
      id: "cong-tac-4-nut",
      name: "Công tắc cảm ứng 4 nút Leto",
      price: 881100,
      image: "https://hi-static.fpt.vn/sys/shop/prod/2025-07-30/6889c08ee6b49_cong-tac-cam-ung-chu-nhat-4-nut-leto-wifi-trang-3.jpg",
      features: ["Chuẩn WiFi – Bluetooth Mesh", "Cảm ứng siêu nhạy", "Thiết kế sang trọng, màu trắng"],
    },
    {
      id: "cong-tac-cua-cuon",
      name: "Công tắc cửa cuốn vuông Leto WiFi",
      price: 1178100,
      image: "https://hi-static.fpt.vn/sys/shop/prod/2025-07-30/6889fada9495d_cong-tac-cua-cuon-vuong-mau-trang-leto-fpt.jpg",
      features: ["Điều khiển cửa cuốn từ xa", "Theo dõi trạng thái đóng/mở", "Kết nối trực tiếp WiFi"],
    },
    {
      id: "cong-tac-cua-cuon-cn",
      name: "Công tắc cửa cuốn chữ nhật Leto",
      price: 1079100,
      image: "https://hi-static.fpt.vn/sys/shop/prod/2025-07-15/68757a55db7ad_1.jpg",
      features: ["Điều khiển cửa cuốn an toàn", "Kết nối WiFi-BLE ổn định", "Tương thích hệ sinh thái FPT"],
    }
  ];

  const solutions = [
    {
      title: "Giải Pháp Chiếu Sáng",
      features: [
        "Đèn thông minh thay đổi cường độ sáng và nhiệt độ màu theo thời gian",
        "Tự động bật đèn khi có chuyển động",
        "Điều khiển riêng lẻ hoặc theo nhóm không cần phụ thuộc hạ tầng điện"
      ],
      images: [
        "https://fpt.vn/storage/upload/images/services/smarthome/giaiphap-chieusang1.jpg",
        "https://fpt.vn/storage/upload/images/services/smarthome/giaiphap-chieusang2.jpg"
      ]
    },
    {
      title: "Giải Pháp Điều khiển",
      features: [
        "Điều khiển bằng giọng nói tiếng Việt hoặc từ xa bằng smart phone",
        "Tắt/ bật thiết bị theo nhóm hoặc riêng lẻ",
        "Hẹn giờ lịch hoạt động, tạo ngữ cảnh tự động với cảm biến"
      ],
      images: [
        "https://fpt.vn/storage/upload/images/services/smarthome/giaiphap-dieukhien1.jpg",
        "https://fpt.vn/storage/upload/images/services/smarthome/giaiphap-dieukhien2.jpg",
        "https://fpt.vn/storage/upload/images/services/smarthome/giaiphap-dieukhien3.jpg"
      ]
    },
    {
      title: "Giải Pháp An Ninh",
      features: [
        "Phát hiện chuyển động và gửi video thời gian thực trên điện thoại",
        "Báo động âm thanh khi có sự cố xảy ra",
        "Mở cửa bằng khuôn mặt hoặc từ xa bằng điện thoại"
      ],
      images: [
        "https://fpt.vn/storage/upload/images/services/smarthome/giaiphap-anninh1.jpg",
        "https://fpt.vn/storage/upload/images/services/smarthome/giaiphap-anninh2.jpg"
      ]
    },
    {
      title: "Giải Pháp Truyền Hình",
      features: [
        "Mở kênh, chương trình bằng giọng nói",
        "Kho nội dung đa dạng gồm: Giải trí, Giáo dục, Yoga",
        "UEFA Champoins League, HBO, K+"
      ],
      images: [
        "https://fpt.vn/storage/upload/images/services/smarthome/giaiphap-tv1.jpg",
        "https://fpt.vn/storage/upload/images/services/smarthome/giaiphap-tv2.jpg"
      ]
    }
  ];

  return (
    <div className={styles.page}>
      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero}>
        <img 
          src="https://fpt.vn/storage/upload/images/services/banners/hi1200.jpg" 
          alt="FPT Smart Home Banner" 
          className={styles.heroImage}
        />
      </section>

      {/* ===== DANH MỤC THIẾT BỊ ===== */}
      <section className={styles.section} style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Thiết bị <span>Smart Home</span></h2>
            <p className={styles.sectionDesc}>
              Hệ sinh thái sản phẩm đa dạng, kết nối chuẩn Bluetooth Mesh / Wi-Fi đảm bảo ổn định tối đa.
            </p>
          </div>
          <div className={styles.productGrid}>
            {smarthomeProducts.map((prod) => (
              <div className={styles.productCard} key={prod.id}>
                <div className={styles.productImgWrap}>
                  <img
                    src={prod.image}
                    alt={`${prod.name} - FPT Smart Home`}
                    loading="lazy"
                  />
                </div>
                <div className={styles.productBody}>
                  <h3 className={styles.productName}>{prod.name}</h3>
                  <div className={styles.productPrice}>
                    Từ {prod.price.toLocaleString('vi-VN')}đ
                  </div>
                  <ul className={styles.productFeatures}>
                    {prod.features.map((f, i) => (
                      <li key={i}><Check size={14} /><span>{f}</span></li>
                    ))}
                  </ul>
                  <button onClick={() => openModal(prod.name)} className={styles.productBtn}>
                    Đăng ký mua
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CÁC GIẢI PHÁP SMART HOME ===== */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Giải pháp <span>Thông minh</span> toàn diện</h2>
            <p className={styles.sectionDesc}>
              FPT Smart Home hướng đến trở thành đơn vị phát triển nhà thông minh hàng đầu. Tích hợp công nghệ tiên tiến vào không gian sống của mỗi người dân Việt Nam.
            </p>
          </div>
          
          <div className={styles.solutionsList}>
            {solutions.map((sol, index) => (
              <div className={`${styles.solutionRow} ${index % 2 !== 0 ? styles.rowReverse : ''}`} key={index}>
                <div className={styles.solutionText}>
                  <h3 className={styles.solutionTitle}>{sol.title}</h3>
                  <ul className={styles.solutionFeatures}>
                    {sol.features.map((f, i) => (
                      <li key={i}><Check size={20} /><span>{f}</span></li>
                    ))}
                  </ul>
                </div>
                <div className={styles.solutionImages}>
                  {sol.images.map((img, i) => (
                    <img key={i} src={img} alt={`${sol.title} - phần ${i + 1}`} loading="lazy" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SEO CONTENT & PRICING TABLE ===== */}
      <section className={styles.section} style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className={`${styles.seoContent} ${showMore ? styles.expanded : styles.collapsed}`}>
            <h2 className={styles.seoTitle}>FPT Smart Home – Nâng tầm không gian sống hiện đại</h2>
            <p className={styles.seoText}>
              FPT Smart Home mang đến giải pháp nhà thông minh toàn diện, giúp bạn điều khiển và quản lý các thiết bị điện trong gia đình dễ dàng bằng giọng nói tiếng Việt hoặc qua ứng dụng trên điện thoại di động. Từ hệ thống chiếu sáng thông minh, điều khiển tivi, máy lạnh, rèm cửa cho đến hệ thống an ninh cảnh báo tức thời, FPT Smart Home đều đáp ứng trọn vẹn nhu cầu của gia đình.
            </p>
            <p className={styles.seoText}>
              Hệ thống sử dụng các chuẩn kết nối tiên tiến như Bluetooth Mesh và Wi-Fi, mang lại sự ổn định cao và dễ dàng mở rộng. Không cần đục phá tường hay can thiệp vào hệ thống điện lưới phức tạp, việc lắp đặt diễn ra nhanh chóng, giữ nguyên vẹn tính thẩm mỹ và thiết kế nguyên bản cho ngôi nhà của bạn.
            </p>

            <h2 className={styles.seoTitle} style={{ marginTop: '40px' }}>Bảng giá Tham khảo Thiết bị FPT Smart Home</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className={styles.priceTable}>
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Loại</th>
                    <th>Chuẩn kết nối</th>
                    <th>Tính năng nổi bật</th>
                    <th>Giá từ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Ổ cắm thông minh SA Athena</strong></td>
                    <td>Điều khiển điện</td>
                    <td>Wi-Fi</td>
                    <td>Hẹn giờ bật/tắt, theo dõi trạng thái</td>
                    <td style={{ color: '#22c55e', fontWeight: 'bold' }}>346.500đ</td>
                  </tr>
                  <tr>
                    <td><strong>Bộ điều khiển IR mở rộng</strong></td>
                    <td>Điều khiển hồng ngoại</td>
                    <td>Wi-Fi & Bluetooth</td>
                    <td>Thay thế remote TV, máy lạnh, quạt</td>
                    <td style={{ color: '#22c55e', fontWeight: 'bold' }}>683.100đ</td>
                  </tr>
                  <tr>
                    <td><strong>Công tắc cảm ứng Leto (4 nút)</strong></td>
                    <td>Chiếu sáng</td>
                    <td>Bluetooth Mesh</td>
                    <td>Cảm ứng cực nhạy, phản hồi đèn nền</td>
                    <td style={{ color: '#22c55e', fontWeight: 'bold' }}>881.100đ</td>
                  </tr>
                  <tr>
                    <td><strong>Công tắc cửa cuốn WiFi Leto</strong></td>
                    <td>An ninh / Cửa</td>
                    <td>Wi-Fi</td>
                    <td>Đóng/mở từ xa, kiểm tra trạng thái</td>
                    <td style={{ color: '#22c55e', fontWeight: 'bold' }}>1.178.100đ</td>
                  </tr>
                  <tr>
                    <td><strong>Cảm biến hiện diện Athena AC</strong></td>
                    <td>Cảm biến</td>
                    <td>Wi-Fi / BLE</td>
                    <td>Phát hiện chuyển động siêu nhỏ</td>
                    <td style={{ color: '#22c55e', fontWeight: 'bold' }}>1.178.100đ</td>
                  </tr>
                  <tr>
                    <td><strong>Cảm biến khói Athena</strong></td>
                    <td>Cảm biến / An toàn</td>
                    <td>Wi-Fi / BLE</td>
                    <td>Báo động cháy nổ, còi hú lớn</td>
                    <td style={{ color: '#22c55e', fontWeight: 'bold' }}>1.227.600đ</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Câu hỏi <span>thường gặp</span></h2>
            <p className={styles.sectionDesc}>
              Giải đáp các thắc mắc phổ biến về giải pháp Nhà thông minh FPT Smart Home.
            </p>
          </div>
          <div className={styles.faqSection}>
            {[
              {
                q: "FPT Smart Home điều khiển bằng giọng nói được không?",
                a: "Có. Điểm nổi bật nhất của hệ thống là hỗ trợ điều khiển bằng giọng nói tiếng Việt rất tự nhiên thông qua FPT Play Box S hoặc các thiết bị tích hợp trợ lý ảo thông minh, phù hợp cho mọi lứa tuổi."
              },
              {
                q: "Thiết bị FPT Smart Home dùng chuẩn kết nối gì?",
                a: "Các thiết bị chủ yếu sử dụng chuẩn kết nối Bluetooth Mesh và Wi-Fi tiên tiến nhất, đảm bảo tốc độ phản hồi nhanh (độ trễ siêu thấp), tính bảo mật cao và hoạt động ổn định."
              },
              {
                q: "Nhà tôi đã hoàn thiện xong, có lắp đặt FPT Smart Home được không?",
                a: "Hoàn toàn được. Các thiết bị như công tắc cảm ứng, ổ cắm thông minh được thiết kế chuẩn kích thước đế âm tường thông dụng tại Việt Nam (hình vuông, chữ nhật). Chỉ cần tháo công tắc cũ và thay thế mà không cần đi lại dây điện hay đục phá tường."
              },
              {
                q: "Khi mất mạng Internet, hệ thống có hoạt động không?",
                a: "Với các thiết bị dùng kết nối Bluetooth Mesh qua bộ điều khiển trung tâm (Hub), một số tính năng và kịch bản cục bộ vẫn hoạt động bình thường kể cả khi mất Internet, giúp bạn điều khiển trực tiếp mà không bị gián đoạn hoàn toàn."
              },
              {
                q: "Hệ thống FPT Smart Home có an toàn không?",
                a: "FPT Smart Home sử dụng hệ thống server Cloud đặt tại Việt Nam do chính FPT Telecom vận hành, dữ liệu được mã hóa chuẩn quốc tế giúp đảm bảo an toàn và quyền riêng tư tuyệt đối cho gia đình bạn."
              }
            ].map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>{faq.q}</h4>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

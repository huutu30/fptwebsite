"use client";

import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PRODUCT_DATA } from '@/data/productData';
import ProductCardSlider from '@/components/common/ProductCardSlider';
import { useRegisterModal } from '@/context/RegisterContext';
import { useRegion } from '@/context/RegionContext';
import NewsSection from '@/components/home/NewsSection';
import styles from './GameThu.module.css';

const GAME_IMAGES = [
  { src: 'https://hi-static.fpt.vn/sys/shop/prod/2026-04-08/69d603a75acde_valorant.png', name: 'Valorant' },
  { src: 'https://hi-static.fpt.vn/sys/shop/prod/2026-04-08/69d607d9cae94_Game%20%281%29.png', name: 'PUBG Mobile' },
  { src: 'https://hi-static.fpt.vn/sys/shop/prod/2026-04-08/69d6082f3f3b7_Worlds%20of%20warcraft.png', name: 'World of Warcraft' },
  { src: 'https://hi-static.fpt.vn/sys/shop/prod/2026-04-08/69d60994bdb34_Game%20%282%29.png', name: 'Dota 2' },
  { src: 'https://hi-static.fpt.vn/sys/shop/prod/2026-04-08/69d609efd892e_Game.png', name: 'FIFA Online 4' },
  { src: 'https://hi-static.fpt.vn/sys/shop/prod/2026-04-08/69d60a3481202_Worlds%20of%20warcraft%20%281%29.png', name: 'Liên Quân Mobile' },
  { src: 'https://hi-static.fpt.vn/sys/shop/prod/2026-04-08/69d60a64d0a55_Worlds%20of%20warcraft%20%282%29.png', name: 'Liên Minh Huyền Thoại' },
];

const FAQ_DATA = [
  { q: "Tại sao các gói cước FPT F-Game lại được game thủ chuyên nghiệp tin dùng?", a: "Khác với các gói Internet thông thường, gói F-Game được tích hợp sẵn công nghệ Ultra Fast độc quyền. Công nghệ này tối ưu hóa đường truyền cho hơn 50 tựa game phổ biến, giúp giảm độ trễ (ping) xuống mức lý tưởng (chỉ từ 16ms), loại bỏ hoàn toàn tình trạng giật lag hay rớt kết nối (loss) trong những pha giao tranh quyết định." },
  { q: "Tốc độ \"không giới hạn\" 1Gbps của FPT có ý nghĩa gì đối với trải nghiệm gaming?", a: "Với băng thông lên đến 1Gbps, việc tải các bản cập nhật game nặng hàng chục GB chỉ diễn ra trong tích tắc. Quan trọng hơn, băng thông lớn giúp duy trì đường truyền ổn định tuyệt đối ngay cả khi trong nhà có nhiều thiết bị cùng truy cập, đảm bảo game thủ không bao giờ phải \"thua vì lag\" do nghẽn mạng cục bộ." },
  { q: "Streamer nên chọn gói cước nào để đảm bảo chất lượng hình ảnh sắc nét không bị drop?", a: "Bạn nên ưu tiên các gói F-Game F1 hoặc Combo F-Game F1. Các gói này không chỉ có băng thông Upload cực cao (lên đến 1Gbps) mà còn đi kèm thêm thiết bị Access Point Wi-Fi 6, giúp tối ưu hóa luồng dữ liệu truyền tải, đảm bảo tín hiệu livestream luôn mượt mà, \"No Drop - No Ping\"." },
  { q: "Sự khác biệt giữa gói F-Game tiêu chuẩn và các gói F1 (F-Game F1, Combo F-Game F1) là gì?", a: "Điểm khác biệt chính nằm ở thiết bị và phạm vi phủ sóng. Các gói có hậu tố \"F1\" được trang bị thêm một thiết bị mở rộng sóng (Access Point), phù hợp cho nhà nhiều tầng, căn hộ rộng hoặc phòng game có nhiều vật cản, giúp sóng Wi-Fi luôn căng đét ở mọi ngóc ngách." },
  { q: "Gói Combo F-Game có gì đặc biệt ngoài việc chơi game?", a: "Gói Combo F-Game là giải pháp giải trí toàn diện cho cả gia đình. Bên cạnh đường truyền siêu tốc cho game thủ, gói này còn bao gồm dịch vụ truyền hình với thiết bị FPT Play Box, cung cấp gần 120 kênh truyền hình đặc sắc và kho phim điện ảnh chất lượng cao, đáp ứng nhu cầu giải trí của mọi thành viên." },
];

export default function GameThu() {
  const { openModal } = useRegisterModal();
  const { region } = useRegion();
  const [openFaq, setOpenFaq] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const gamePackages = PRODUCT_DATA.f_game || [];

  return (
    <div className={styles.gameThuPage}>
      {/* BANNER IMAGE */}
      <section className={styles.heroBanner}>
        <img 
          src="https://hi-static.fpt.vn/sys/shop/prod/2026-03-12/69b214c59318e_z7198969088863_bcb4ba7ed704f21eee8aede5952eadac%20%281%29.jpg" 
          alt="Gói cước Internet FPT dành cho Game thủ" 
          className={styles.heroBannerImg}
        />
      </section>

      {/* GÓI CƯỚC GAME */}
      <section className={styles.section} style={{ background: '#0f172a' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Gói cước dành cho <span>Game Thủ</span></h2>
            <p className={styles.sectionDesc}>
              Gói cước F-Game là lựa chọn phù hợp cho game thủ, streamer hoặc người dùng có nhu cầu kết nối tốc độ cao.
            </p>
          </div>
          <div style={{ marginTop: '-30px' }}>
            <ProductCardSlider data={gamePackages} region={region} />
          </div>
        </div>
      </section>

      {/* VÌ SAO GAME THỦ PRO CHỌN FPT */}
      <section className={styles.section} style={{ background: '#020617' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Vì sao game thủ "Pro" chọn <span>Internet FPT</span>?</h2>
            <p className={styles.sectionDesc}>
              Internet game thủ FPT tốc độ cao, ping cực thấp đem lại lợi thế cho mọi game thủ.
            </p>
          </div>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <img src="https://hi-static.fpt.vn/sys/shop/stag/2026-03-03/69a6b4f5a6302_image-game-net-1.png" alt="Không ai phải thua vì lag" className={styles.whyImg} />
              <h3>Không ai phải thua vì lag</h3>
              <p>FPT mang đến tốc độ lên tới 1Gbps giúp chơi game siêu mượt và ổn định trong mọi cuộc vui.</p>
            </div>
            <div className={styles.whyCard}>
              <img src="https://hi-static.fpt.vn/sys/shop/stag/2026-03-03/69a6b5a866b9c_image-game-net-2.png" alt="Chiến game ở đâu cũng êm" className={styles.whyImg} />
              <h3>Chiến game ở đâu cũng êm</h3>
              <p>Wi-Fi 6 hỗ trợ kết nối đồng thời đến 30 thiết bị như PC, mobile, Play Station, Xbox, Nintendo,...</p>
            </div>
            <div className={styles.whyCard}>
              <img src="https://hi-static.fpt.vn/sys/shop/stag/2026-03-03/69a6b5ce83d33_image-game-net-3.png" alt="Giờ cao điểm cũng chiến" className={styles.whyImg} />
              <h3>Giờ cao điểm cũng chiến</h3>
              <p>Công nghệ Ultra Fast giảm độ trễ và giữ ping xuống đến 16ms, game thủ không tụt mood, không mất kết nối.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TỐC ĐỘ DẪN ĐẦU ĐÃ ĐƯỢC KIỂM CHỨNG */}
      <section className={styles.section} style={{ background: '#0f172a' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Tốc độ dẫn đầu <span>đã được kiểm chứng</span></h2>
            <p className={styles.sectionDesc}>
              Tận hưởng hiệu năng mạnh mẽ, nâng tầm trải nghiệm cùng các đội tuyển Esports hàng đầu Việt Nam.
            </p>
          </div>
          <div className={styles.proofGrid}>
            <div className={styles.proofCard}>
              <img src="https://hi-static.fpt.vn/sys/shop/stag/2026-03-03/69a6b60c09395_product-game-1.jpg" alt="TEAM FLASH" className={styles.proofImg} />
              <div className={styles.proofBody}>
                <h3 className={styles.proofTeam}>TEAM FLASH</h3>
                <p className={styles.proofDesc}>Tổ chức Esports hàng đầu Đông Nam Á. Dành nhiều giải vô địch AIC, VCS, DTDV,...</p>
                <p className={styles.proofQuote}>"FPT mang lại công nghệ kết nối giúp luyện tập suôn sẻ, train hard một cách mượt mà, không cần lo ping mà chỉ cần nghĩ đến chuyện win thôi."</p>
              </div>
            </div>
            <div className={styles.proofCard}>
              <img src="https://hi-static.fpt.vn/sys/shop/prod/2026-03-17/69b90f26419f5_Product%20image-1.png" alt="TEAM FLASH" className={styles.proofImg} />
              <div className={styles.proofBody}>
                <h3 className={styles.proofTeam}>TEAM FLASH</h3>
                <p className={styles.proofDesc}>Tổ chức Esports hàng đầu Đông Nam Á. Dành nhiều giải vô địch AIC, VCS, DTDV,...</p>
                <p className={styles.proofQuote}>"Luyện tập 8 đến 10 tiếng mỗi ngày và Internet FPT đã mang lại sự ổn định, không có sự delay, không cần lo nghĩ đến mạng."</p>
              </div>
            </div>
            <div className={styles.proofCard}>
              <img src="https://hi-static.fpt.vn/sys/shop/prod/2026-03-17/69b90f83b425d_Product%20image-2.png" alt="GAM Esports" className={styles.proofImg} />
              <div className={styles.proofBody}>
                <h3 className={styles.proofTeam}>GAM Esports</h3>
                <p className={styles.proofDesc}>Đội Liên Minh Huyền Thoại số 1 Việt Nam với 11 lần vô địch VCS</p>
                <p className={styles.proofQuote}>"Training, Livestreaming, Upload content đều không có vấn đề. No drop! No ping! No problem!"</p>
              </div>
            </div>
            <div className={styles.proofCard}>
              <img src="https://hi-static.fpt.vn/sys/shop/prod/2026-03-17/69b90faeddfbd_Product%20image-3.png" alt="GAM Esports" className={styles.proofImg} />
              <div className={styles.proofBody}>
                <h3 className={styles.proofTeam}>GAM Esports</h3>
                <p className={styles.proofDesc}>Đội Liên Minh Huyền Thoại số 1 Việt Nam với 11 lần vô địch VCS</p>
                <p className={styles.proofQuote}>"Tốc độ Internet trong trận đấu là quan trọng nhất vì mình chỉ chậm một giây nó sẽ thay đổi luôn kết quả của giải đấu. Nếu mọi người muốn level up thì nên cài."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIỆU NĂNG VƯỢT TRỘI CHO MỌI TỰA GAME */}
      <section className={styles.section} style={{ background: '#020617' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Hiệu năng vượt trội cho mọi tựa game với <span>Internet FPT</span></h2>
          </div>
          <div className={styles.gameGrid}>
            {GAME_IMAGES.map((game, i) => (
              <div key={i} className={styles.gameCard}>
                <img src={game.src} alt={game.name} className={styles.gameImg} />
                <p className={styles.gameName}>{game.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO CONTENT & PRICING TABLES */}
      <section className={styles.section} style={{ background: '#0f172a' }}>
        <div className="container">
          <div className={`${styles.seoContent} ${showMore ? styles.expanded : styles.collapsed}`}>
            <h1 className={styles.seoTitle} style={{ color: '#22d3ee', fontSize: '26px' }}>Đăng ký lắp mạng Internet game thủ FPT | Lắp WiFi chiến game mượt</h1>
            <h2 className={styles.seoTitle}>Gói cước Internet/WiFi FPT dành cho Game thủ - Tốc độ cao, không độ trễ</h2>
            <p className={styles.seoText}>
              FPT là một trong những nhà cung cấp dịch vụ Internet hàng đầu Việt Nam, đã có mặt tại 63 tỉnh thành, đồng hành cùng hàng triệu hộ gia đình, doanh nghiệp và nay là game thủ chuyên nghiệp. Các gói cước FPT dành cho game thủ được tích hợp công nghệ Ultra Fast giúp tối ưu ping, độ trễ chỉ còn 16ms, đáp ứng tối đa nhu cầu chơi game online, livestream, xem video đồng thời.
            </p>
            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-06-30/1751298599_internet-game-thu-2.jpg" alt="Internet FPT cho game thủ và streamer" style={{ display: 'inline-block', maxWidth: '100%', borderRadius: '12px' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>Chinh phục mọi trận đấu với gói cước Internet FPT dành riêng cho game thủ và streamer.</figcaption>
            </figure>

            <h2 className={styles.seoTitle} style={{ marginTop: '40px' }}>Bảng giá gói cước WiFi FPT dành cho Game thủ</h2>
            <p className={styles.seoText}>Xem ngay bảng giá các gói cước lắp đặt wifi FPT dành riêng cho game thủ có nhu cầu streaming/ chơi game tốc độ cao</p>
            <div style={{ overflowX: 'auto' }}>
              <table className={styles.priceTable}>
                <thead>
                  <tr>
                    <th>Tên gói</th>
                    <th>Tốc độ (DL/UL)</th>
                    <th>Đăng ký</th>
                    <th>Thiết bị đi kèm</th>
                    <th>Phù hợp</th>
                    <th>Giá cước</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>F-Game</strong></td>
                    <td>1 Gbps / 300 Mbps</td>
                    <td><button onClick={() => openModal('Internet F-Game')} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6, Ultra Fast</td>
                    <td>Game thủ chơi thường xuyên, ping thấp</td>
                    <td style={{ color: '#22d3ee', fontWeight: 'bold' }}>225.000đ</td>
                  </tr>
                  <tr>
                    <td><strong>F-Game F1</strong></td>
                    <td>1 Gbps / 300 Mbps</td>
                    <td><button onClick={() => openModal('Internet F-Game F1')} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6, Access Point, Ultra Fast</td>
                    <td>Game thủ, nhà nhiều tầng, livestream mượt mà</td>
                    <td style={{ color: '#22d3ee', fontWeight: 'bold' }}>245.000đ</td>
                  </tr>
                  <tr>
                    <td><strong>Combo F-Game</strong></td>
                    <td>1 Gbps / 1 Gbps</td>
                    <td><button onClick={() => openModal('Combo F-Game')} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6, Ultra Fast, FPT Play Box</td>
                    <td>Game thủ + xem phim, truyền hình</td>
                    <td style={{ color: '#22d3ee', fontWeight: 'bold' }}>270.000đ</td>
                  </tr>
                  <tr>
                    <td><strong>Combo F-Game F1</strong></td>
                    <td>1 Gbps / 1 Gbps</td>
                    <td><button onClick={() => openModal('Combo F-Game F1')} className={styles.tableCta}>Đăng ký</button></td>
                    <td>Modem Wi-Fi 6, AP, Ultra Fast, FPT Play Box</td>
                    <td>Tối ưu toàn diện gaming, streaming</td>
                    <td style={{ color: '#22d3ee', fontWeight: 'bold' }}>290.000đ</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className={styles.seoTitle} style={{ marginTop: '40px' }}>FPT sử dụng các công nghệ nào cho gói cước dành riêng cho Game thủ/ Streamer</h2>
            <p className={styles.seoText}>Chất lượng dịch vụ Internet FPT dành cho game thủ được xây dựng dựa trên các yếu tố công nghệ chính:</p>
            <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '20px', color: '#94a3b8', lineHeight: '2' }}>
              <li style={{marginBottom: '10px'}}>🔹 <strong style={{color: '#e2e8f0'}}>Hạ tầng cáp quang 100%:</strong> FPT triển khai công nghệ truyền dẫn hoàn toàn bằng cáp quang từ nhà cung cấp đến tận nhà thuê bao, giúp duy trì kết nối liền mạch.</li>
              <li style={{marginBottom: '10px'}}>🔹 <strong style={{color: '#e2e8f0'}}>Công nghệ WiFi 6 (IEEE 802.11ax):</strong> Tăng tốc độ và hiệu suất, giảm độ trễ, vùng phủ sóng tốt hơn so với các thế hệ trước.</li>
              <li style={{marginBottom: '10px'}}>🔹 <strong style={{color: '#e2e8f0'}}>Ultra Fast – Tối ưu hoá đường truyền gaming:</strong> Tính năng độc quyền FPT phát triển nhằm cải thiện chất lượng đường truyền dành riêng cho hoạt động chơi game.</li>
            </ul>
            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-06-30/1751298631_internet-game-thu-.jpg" alt="Công nghệ Ultra Fast FPT" style={{ display: 'inline-block', maxWidth: '100%', borderRadius: '12px' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>Công nghệ Ultra Fast FPT giúp giảm ping, tối ưu đường truyền cho game thủ, streamer.</figcaption>
            </figure>

            <h2 className={styles.seoTitle} style={{ marginTop: '40px' }}>Đăng ký gói cước Internet cho game thủ tại FPT - Nâng trải nghiệm lên tầm cao mới</h2>
            <p className={styles.seoText}>
              FPT cam kết cung cấp một giải pháp Internet toàn diện, được thiết kế đặc biệt để đáp ứng và vượt xa mong đợi của cộng đồng game thủ/ streamer. Với sự kết hợp giữa hạ tầng cáp quang mạnh mẽ, công nghệ WiFi 6 hiện đại và tính năng Ultra Fast độc quyền, các gói cước của FPT đảm bảo tốc độ vượt trội, độ ổn định cao và độ trễ tối thiểu – những yếu tố then chốt giúp người chơi đạt được hiệu suất tối ưu trong mọi tựa game.
            </p>
            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-06-30/1751298653_internet-game-thu-1.jpg" alt="Gói Internet FPT cho game thủ" style={{ display: 'inline-block', maxWidth: '100%', borderRadius: '12px' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>Gói Internet dành cho game thủ của FPT: Không chỉ là kết nối, đó là lợi thế của bạn trong mọi cuộc chiến.</figcaption>
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
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className={styles.section} style={{ background: '#020617' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Câu hỏi <span>Thường gặp</span></h2>
            <p className={styles.sectionDesc}>
              Giải đáp thắc mắc về đường truyền, ping và công nghệ Ultra Fast.
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
        </div>
      </section>
    </div>
  );
}

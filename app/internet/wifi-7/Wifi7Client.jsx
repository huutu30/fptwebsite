"use client";

import React, { useState } from 'react';
import { Shield, Zap, Cpu, Activity, ChevronDown, ChevronUp } from 'lucide-react';
import Wifi7Section from '@/components/home/Wifi7Section';
import { useRegion } from '@/context/RegionContext';
import styles from './Wifi7.module.css';

export default function Wifi7Client() {
  const [openFaq, setOpenFaq] = useState(null);
  const { region } = useRegion();

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  const faqs = [
    {
      q: "Công nghệ Wi-Fi 7 khác gì so với Wi-Fi 6?",
      a: "Wi-Fi 7 (802.11be) là thế hệ Wi-Fi mới nhất, hỗ trợ tốc độ cao hơn gấp 4 lần, băng thông kênh truyền rộng hơn (lên đến 320MHz), giúp giảm tối đa độ trễ và tăng khả năng chịu tải lên rất nhiều thiết bị cùng lúc."
    },
    {
      q: "Wi-Fi 7 có phù hợp cho nhu cầu gia đình và doanh nghiệp không?",
      a: "Có. Wi-Fi 7 đáp ứng tốt mọi nhu cầu – từ học tập, giải trí, chơi game, làm việc online trong gia đình đến vận hành văn phòng nhiều thiết bị, camera, IoT cho doanh nghiệp."
    },
    {
      q: "Tôi có cần thiết bị mới để tận hưởng Wi-Fi 7?",
      a: "Wi-Fi 7 hoàn toàn tương thích ngược với các thiết bị Wi-Fi đời trước, nên điện thoại, laptop hay TV của bạn vẫn kết nối và sử dụng bình thường. Tuy nhiên, để trải nghiệm trọn vẹn sức mạnh của chuẩn mới – bao gồm tốc độ tối đa, băng thông rộng 320 MHz, công nghệ điều chế 4096-QAM và đặc biệt là tính năng Multi-Link Operation (MLO) giúp khai thác đồng thời nhiều băng tần – bạn cần sử dụng những thiết bị thế hệ mới có hỗ trợ Wi-Fi 7. Khi đó, toàn bộ hiệu năng vượt trội của Wi-Fi 7 mới được phát huy tối đa, từ xem phim 8K, chơi game cloud, đến vận hành nhà thông minh nhiều thiết bị."
    },
    {
      q: "Gói cước SpeedX của FPT có những mức băng thông nào?",
      a: "Gói cước SpeedX2/SpeedX2 Pro có băng thông 2Gbps và SpeedX10/SpeedX10 Pro đạt 10Gbps; tất cả đều đối xứng ở download/upload trên hạ tầng công nghệ XGS-PON."
    }
  ];

  return (
    <div className={styles.wifi7Page}>
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        {/* Background image - woman with devices */}
        <div className={styles.heroImageWrapper}>
          <img 
            src="https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/landing-wifi7/wifi7-wrapper2.png" 
            alt="FPT Wi-Fi 7 - Thiết bị công nghệ mới nhất" 
            className={styles.heroImage}
          />
        </div>

        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroTag}>FPT Wi-Fi 7</div>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleScript}>WiFi thế hệ</span>
              <span className={styles.heroTitleScript}>mới nhất</span>
            </h1>
            <p className={styles.heroSubtitle}>Công nghệ hàng đầu, thiết bị hiện đại số 1</p>
          </div>
          
          <div className={styles.heroFormBox}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Đăng ký thông tin</h2>
              <p className={styles.formSubtitle}>Quý khách vui lòng nhập số điện thoại để thực hiện đăng ký lắp đặt Wi-Fi 7</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert("Đăng ký thành công!"); }}>
              <div className={styles.inputGroup}>
                <input 
                  type="text" 
                  placeholder="Nhập số điện thoại/số hợp đồng" 
                  className={styles.inputField}
                  required 
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className={styles.benefitsSection}>
        <div className={styles.benefitsContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Ưu điểm vượt trội của Wi-Fi 7</h2>
            <p className={styles.sectionSubtitle}>Trải nghiệm đỉnh cao với công nghệ mạng viễn thông dẫn đầu</p>
          </div>
          
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}><Zap size={32} /></div>
              <h3 className={styles.benefitTitle}>Tốc độ cực đỉnh</h3>
              <p className={styles.benefitDesc}>Đạt tốc độ tải xuống/tải lên đến 10 Gbps, loại bỏ hoàn toàn giật lag khi chơi game hay stream 4K/8K.</p>
            </div>
            
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}><Activity size={32} /></div>
              <h3 className={styles.benefitTitle}>Độ trễ siêu thấp</h3>
              <p className={styles.benefitDesc}>Công nghệ MLO (Multi-Link Operation) giúp truyền dữ liệu đồng thời trên nhiều băng tần, giảm độ trễ tối đa.</p>
            </div>
            
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}><Cpu size={32} /></div>
              <h3 className={styles.benefitTitle}>Chịu tải gấp 4 lần</h3>
              <p className={styles.benefitDesc}>Với băng thông 320MHz và 4K QAM, thiết bị có khả năng kết nối đồng thời số lượng cực lớn thiết bị thông minh.</p>
            </div>

            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}><Shield size={32} /></div>
              <h3 className={styles.benefitTitle}>Bảo mật an toàn</h3>
              <p className={styles.benefitDesc}>Tích hợp chuẩn mã hóa WPA3 và F-Safe bảo vệ các thiết bị khỏi rủi ro xâm nhập từ mạng lưới bên ngoài.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section className={styles.packagesSection}>
        <div className="container">
          <Wifi7Section region={region} />
        </div>
      </section>

      {/* TECH SECTION */}
      <section className={styles.techSection}>
        <div className={styles.techContainer}>
          <div className={styles.techContentRight}>
            <div className={styles.techHeader}>
              <h2 className={styles.techTitle}>Công nghệ nổi bật của WiFi 7</h2>
            </div>
            
            <div className={styles.techGrid}>
              <div className={styles.techCard}>
                <div className={styles.techIconWrapper}>
                  <img src="https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/landing-wifi7/mimo-icon.png" alt="16x16 MU-MIMO" className={styles.techIcon} />
                </div>
                <div className={styles.techCardContent}>
                  <h3 className={styles.techCardTitle}>16x16 MU-MIMO</h3>
                  <p className={styles.techCardDesc}>Cung cấp băng thông lên đến 5.8 Gbps, tăng cường kết nối và giảm độ trễ, hỗ trợ tốt cho VR/AR và làm việc từ xa.</p>
                </div>
              </div>
              
              <div className={styles.techCard}>
                <div className={styles.techIconWrapper}>
                  <img src="https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/landing-wifi7/xgs-icon.png" alt="XGS-PON" className={styles.techIcon} />
                </div>
                <div className={styles.techCardContent}>
                  <h3 className={styles.techCardTitle}>XGS-PON</h3>
                  <p className={styles.techCardDesc}>Công nghệ XGS-PON cho tốc độ cao lên đến 10Gbps ở cả hai chiều: tải phim/game nặng, xem/phát 4K/8K, upload–livestream–backup trong vài giây.</p>
                </div>
              </div>
              
              <div className={styles.techCard}>
                <div className={styles.techIconWrapper}>
                  <img src="https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/landing-wifi7/preamble-icon.png" alt="PREAMBLE PUNCTURING" className={styles.techIcon} />
                </div>
                <div className={styles.techCardContent}>
                  <h3 className={styles.techCardTitle}>PREAMBLE PUNCTURING</h3>
                  <p className={styles.techCardDesc}>Lọc nhiễu hiệu quả, giúp đảm bảo chất lượng dữ liệu khi có tín hiệu nhiễu, lý tưởng khi chơi game online và gọi thoại.</p>
                </div>
              </div>
              
              <div className={styles.techCard}>
                <div className={styles.techIconWrapper}>
                  <img src="https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/landing-wifi7/band-icon.png" alt="6 GHZ BAND" className={styles.techIcon} />
                </div>
                <div className={styles.techCardContent}>
                  <h3 className={styles.techCardTitle}>6 GHZ BAND</h3>
                  <p className={styles.techCardDesc}>Thêm băng tần 6 GHz ít nhiễu hơn so với băng tần Wi-Fi truyền thống, cải thiện hiệu suất truyền tải, hỗ trợ các thiết bị kết nối nhanh chóng và ổn định.</p>
                </div>
              </div>
              
              <div className={styles.techBtnWrapper}>
                <button className={styles.techBtn} onClick={() => window.scrollTo(0, 0)}>Đăng ký &rarr;</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Câu hỏi thường gặp</h2>
            <p className={styles.sectionSubtitle}>Giải đáp thắc mắc về công nghệ Wi-Fi 7 và gói cước SpeedX</p>
          </div>
          
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <button className={styles.faqQuestion} onClick={() => toggleFaq(index)}>
                  {faq.q}
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <div className={`${styles.faqAnswer} ${openFaq === index ? styles.open : ''}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

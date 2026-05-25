import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import ProductCardSlider from '../../components/common/ProductCardSlider';
import { PRODUCT_DATA } from '../../data/productData';
import { useRegisterModal } from '../../context/RegisterContext';
import NewsSection from '../../components/home/NewsSection';
import styles from './DoanhNghiep.module.css';
import SEOHead from '../../components/common/SEOHead';

const FAQ_DATA = [
  { q: "Internet doanh nghiệp FPT phù hợp với các đối tượng, mô hình kinh doanh nào?", a: "Các gói cước Internet doanh nghiệp FPT phù hợp với văn phòng, cửa hàng, công ty vừa và lớn, hoặc doanh nghiệp cần đường truyền ổn định để làm việc, họp online và vận hành hệ thống mỗi ngày." },
  { q: "Các gói Internet doanh nghiệp FPT có hỗ trợ IP tĩnh không?", a: "Có. FPT cung cấp giải pháp Internet doanh nghiệp hỗ trợ IP tĩnh, phù hợp cho nhu cầu quản trị hệ thống, camera, máy chủ hoặc truy cập từ xa ổn định hơn." },
  { q: "Giải pháp Wi-Fi doanh nghiệp FPT phù hợp cho văn phòng nhiều người như thế nào?", a: "Các gói cước doanh nghiệp FPT được tích hợp thiết bị phù hợp để tăng khả năng phủ sóng, giúp nhiều người dùng kết nối cùng lúc ổn định hơn trong môi trường làm việc chuyên nghiệp, đòi hỏi ổn định, tốc độ, băng thông cao." },
  { q: "FPT có hỗ trợ kỹ thuật riêng cho khách hàng doanh nghiệp không?", a: "Khách hàng doanh nghiệp được hỗ trợ kỹ thuật chuyên nghiệp, giúp xử lý sự cố nhanh hơn và hạn chế ảnh hưởng đến hoạt động kinh doanh." },
  { q: "Thời gian lắp đặt Internet doanh nghiệp FPT mất bao lâu?", a: "Sau khi hoàn tất thủ tục và khảo sát hạ tầng, FPT thường triển khai lắp đặt trong khoảng 1–3 ngày làm việc, tùy khu vực và mức độ phức tạp của hệ thống." },
];

export default function DoanhNghiep({ region }) {
  const { openModal } = useRegisterModal();
  const [openFaq, setOpenFaq] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.doanhNghiepPage}>
      <SEOHead
        title="Đăng ký lắp WiFi doanh nghiệp FPT | IP Tĩnh, bảo mật cao"
        description="Gói cước Internet FPT doanh nghiệp. Băng thông lớn đến 800Mbps, IP Tĩnh, cân bằng tải, hỗ trợ kỹ thuật 24/7. Phù hợp văn phòng, quán cafe, công ty."
        canonicalPath="/internet/doanh-nghiep"
        keywords="Internet doanh nghiệp FPT, WiFi doanh nghiệp, IP tĩnh FPT, lắp mạng văn phòng, cân bằng tải FPT"
      />

      {/* BANNER IMAGE */}
      <section className={styles.heroBanner}>
        <img 
          src="https://hi-static.fpt.vn/sys/shop/prod/2026-03-12/69b2192e1e7f3_1920x560%20%283%29.png" 
          alt="Đăng ký lắp WiFi doanh nghiệp FPT" 
          className={styles.heroBannerImg}
        />
      </section>

      {/* GÓI CƯỚC DOANH NGHIỆP */}
      <section className={styles.section} style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Các Gói Cước Doanh Nghiệp</h2>
            <p className={styles.sectionDesc}>
              Tối ưu cho văn phòng, cửa hàng, công ty cần đường truyền ổn định để làm việc, họp online và vận hành hệ thống.
            </p>
          </div>
          <div style={{ marginTop: '-30px' }}>
            <ProductCardSlider data={PRODUCT_DATA.doanh_nghiep} region={region} />
          </div>
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div className={`${styles.seoContent} ${showMore ? styles.expanded : styles.collapsed}`}>
            <h1 className={styles.seoTitle} style={{ color: '#f57020', fontSize: '26px' }}>Đăng ký lắp WiFi doanh nghiệp FPT | IP Tĩnh, bảo mật cao</h1>
            <p className={styles.seoText}>
              Trong môi trường kinh doanh cạnh tranh khốc liệt ngày nay, một hạ tầng internet mạnh mẽ, ổn định và bảo mật không còn là yếu tố cộng thêm, mà đã trở thành nền tảng cốt lõi quyết định sự sống còn và phát triển của mọi doanh nghiệp. FPT, với vị thế là nhà cung cấp dịch vụ viễn thông internet hàng đầu, tự hào mang đến các giải pháp internet cáp quang chuyên biệt, được thiết kế để đáp ứng những yêu cầu khắt khe nhất của khối doanh nghiệp.
            </p>
            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-06-30/1751298939_internet-doanh-nghiep-3.jpg" alt="FPT Internet cáp quang cho doanh nghiệp" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>FPT cung cấp giải pháp Internet cáp quang chuyên biệt cho doanh nghiệp toàn quốc.</figcaption>
            </figure>

            <h2 className={styles.seoTitle} style={{ marginTop: '40px' }}>Vì sao FPT nên là sự lựa chọn dịch vụ internet cho doanh nghiệp của bạn?</h2>
            <p className={styles.seoText}>
              Trong bối cảnh kinh doanh số hóa, việc lựa chọn một đối tác cung cấp dịch vụ internet uy tín và chất lượng là yếu tố quyết định chiến lược. FPT tự hào là lựa chọn hàng đầu của hàng ngàn doanh nghiệp trên cả nước bởi những lý do then chốt:
            </p>
            <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '20px', color: '#334155', lineHeight: '1.8' }}>
              <li style={{marginBottom: '10px'}}><CheckCircle color="#f57020" size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> FPT sở hữu hạ tầng cáp quang 100%, đảm bảo tốc độ truy cập vượt trội, độ ổn định gần như tuyệt đối và băng thông quốc tế lớn.</li>
              <li style={{marginBottom: '10px'}}><CheckCircle color="#f57020" size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> FPT luôn tiên phong ứng dụng các công nghệ mạng tiên tiến nhất như Wi-Fi 6, giải pháp cân bằng tải thông minh, tăng cường khả năng bảo mật.</li>
              <li style={{marginBottom: '10px'}}><CheckCircle color="#f57020" size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Đội ngũ chuyên gia và kỹ thuật viên giàu kinh nghiệm luôn sẵn sàng tư vấn, thiết kế giải pháp riêng biệt phù hợp với đặc thù từng ngành nghề.</li>
              <li style={{marginBottom: '10px'}}><CheckCircle color="#f57020" size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Dịch vụ hỗ trợ kỹ thuật chuyên nghiệp 24/7/365, xử lý sự cố nhanh chóng và hiệu quả, giảm thiểu tối đa thời gian gián đoạn hoạt động.</li>
            </ul>
            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-06-30/1751298972_internet-doanh-nghiep-2.jpg" alt="FPT Internet cho doanh nghiệp Việt" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>Công nghệ tiên phong, giải pháp chuyên biệt – FPT là lựa chọn Internet hàng đầu cho doanh nghiệp Việt.</figcaption>
            </figure>

            <h2 className={styles.seoTitle} style={{ marginTop: '40px' }}>Đăng ký ngay các gói mạng Wi-Fi 6 FPT cho doanh nghiệp: Đón đầu xu thế, bứt phá hiệu năng!</h2>
            <p className={styles.seoText}>
              Trong kỷ nguyên số, năng lực kết nối chính là lợi thế cạnh tranh. Việc trang bị công nghệ Wi-Fi 6 mới nhất từ FPT cho doanh nghiệp không chỉ là một sự nâng cấp, mà là một bước đầu tư chiến lược vào tương lai. Wi-Fi 6 mang đến tốc độ vượt trội, khả năng xử lý đồng thời nhiều kết nối hơn gấp nhiều lần so với các thế hệ trước, giảm thiểu độ trễ và tăng cường độ ổn định.
            </p>
            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-06-30/1751298989_internet-doanh-nghiep-1.jpg" alt="Wi-Fi 6 FPT cho doanh nghiệp" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>Wi-Fi 6 FPT: Tốc độ vượt trội, kết nối đồng thời nhiều thiết bị, tối ưu hóa mọi hoạt động kinh doanh.</figcaption>
            </figure>
            <p className={styles.seoText}>
              Với các gói mạng Wi-Fi 6 của FPT, điều đó hoàn toàn nằm trong tầm tay. Doanh nghiệp của bạn sẽ được trang bị modem Wi-Fi 6 tiên tiến cùng các giải pháp Access Point chuyên dụng, tạo nên một mạng lưới không dây mạnh mẽ, phủ sóng toàn diện và sẵn sàng đáp ứng mọi yêu cầu về traffic ngày càng tăng. Đừng để hạ tầng mạng lạc hậu cản trở sự phát triển. Hãy chọn Wi-Fi 6 FPT ngay hôm nay!
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
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className={styles.section} style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Câu hỏi thường gặp</h2>
            <p className={styles.sectionDesc}>
              Giải đáp những thắc mắc phổ biến khi doanh nghiệp chọn dịch vụ Internet FPT.
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

      {/* NEWS SECTION */}
      <NewsSection />

    </div>
  );
}

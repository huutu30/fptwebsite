"use client";

import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PRODUCT_DATA } from '@/data/productData';
import ProductCardSlider from '@/components/common/ProductCardSlider';
import { useRegion } from '@/context/RegionContext';
import NewsSection from '@/components/home/NewsSection';
import Hero from '@/components/home/Hero';
import styles from './FptPlay.module.css';

const FAQ_DATA = [
  { q: "Có thể xem FPT Play trên các thiết bị nào?", a: "FPT Play là một dịch vụ truyền hình đa nền tảng, đa thiết bị, cho phép bạn thưởng thức kho nội dung phong phú trên Smart TV, điện thoại di động, máy tính bảng, máy tính bàn, máy tính xách tay và bộ giải mã truyền hình (FPT Play Box). Với khả năng tương thích đa nền tảng này, FPT Play mang đến sự linh hoạt tối đa, giúp người dùng tận hưởng thế giới giải trí không giới hạn ở bất kỳ đâu, trong bất kỳ thời điểm nào." },
  { q: "Đăng ký tài khoản FPT Play có mất phí không?", a: "Việc tạo tài khoản FPT Play là hoàn toàn miễn phí. Bạn chỉ cần nhập các thông tin đăng ký và xác thực OTP là có thể sử dụng ngay. Tuy nhiên, để truy cập kho phim độc quyền, các kênh truyền hình cao cấp và các giải thể thao bản quyền (như Ngoại hạng Anh, Cúp C1), bạn sẽ cần phải mua các gói cước trả phí tương ứng." },
  { q: "Truyền hình FPT có chiếu giải Ngoại hạng Anh không?", a: "Có. FPT Play phát sóng các trận đấu Ngoại hạng Anh (Premier League) thông qua các gói thể thao cao cấp như V.VIP 1, V.VIP 2 và các combo Internet + Truyền hình Thể thao (Sky, Meta, Sky F1…). Khi đăng ký các gói này, bạn có thể theo dõi trọn vẹn Ngoại hạng Anh cùng nhiều giải bóng đá hàng đầu khác trên FPT Play." },
  { q: "Đăng ký xem Ngoại Hạng Anh cùng FPT trong tháng 03/2026 có khuyến mãi gì?", a: "Trong tháng 03/2026, khách hàng đăng ký xem Ngoại Hạng Anh cùng FPT có cơ hội trúng TV Sony 55 inch mỗi tuần, cùng rất nhiều phần quà khác. Dành cho khách hàng cá nhân đăng ký mới Combo Internet & FPT Play gói V.VIP, hoặc nâng cấp thêm FPT Play gói V.VIP. Đăng ký VVIP trả trước 8 tháng đang được giảm còn 90.000VNĐ/tháng cho VVIP 1." },
];

export default function FptPlay() {
  const { region } = useRegion();
  const [showMore, setShowMore] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const comboPackages = PRODUCT_DATA.the_thao || [];
  const standalonePackages = PRODUCT_DATA.fpt_play_only || [];
  const additionalPackages = PRODUCT_DATA.additional_home_packages || [];

  return (
    <div className={styles.fptPlayPage}>
      {/* HERO SECTION */}
      <Hero hideQuickLinks={true} />

      {/* GÓI COMBO INTERNET + TRUYỀN HÌNH */}
      <section id="combo-section" className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Gói <span>Combo Internet & Truyền hình</span></h2>
            <p className={styles.sectionDesc}>
              Việc kết hợp Internet và truyền hình FPT Play trong một gói cước là lựa chọn tối ưu, giúp khách hàng tiết kiệm chi phí đáng kể.
            </p>
          </div>
          <ProductCardSlider data={comboPackages} region={region} />
        </div>
      </section>

      {/* GÓI FPT PLAY ĐỘC LẬP */}
      <section id="standalone-section" className={styles.section} style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Gói <span>FPT Play</span></h2>
            <p className={styles.sectionDesc}>
              Nếu bạn đã có sẵn đường truyền Internet và muốn sử dụng thêm dịch vụ truyền hình trên các thiết bị di động hay Smart TV, bạn có thể đăng ký các gói FPT Play độc lập.
            </p>
          </div>
          <div className={styles.blueButtonVariant}>
            <ProductCardSlider data={standalonePackages} region={region} />
          </div>
        </div>
      </section>

      {/* GÓI COMBO INTERNET & TRUYỀN HÌNH BỔ SUNG */}
      <section id="additional-packages-section" className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Gói <span>Combo Internet & Truyền hình</span></h2>
            <p className={styles.sectionDesc}>
              Tận hưởng kho giải trí bất tận cùng internet siêu tốc độ. Kết hợp Internet và FPT Play trong một gói cước tiết kiệm.
            </p>
          </div>
          <ProductCardSlider data={additionalPackages} region={region} />
        </div>
      </section>

      {/* SEO CONTENT & DETAILED CONTEXT - FULL VERSION */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div className={`${styles.seoContent} ${showMore ? styles.expanded : styles.collapsed}`}>
            <h1 className={styles.seoTitle} style={{ fontSize: '28px' }}>FPT Play - Combo truyền hình internet - Wifi 6 tốc độ đến 1Gbps</h1>
            <p className={styles.seoText}>
              FPT tự hào là nhà cung cấp dịch vụ truyền hình hàng đầu hiện nay nhờ sở hữu nhiều ưu điểm vượt trội về cả chất lượng nội dung và dịch vụ. Với công nghệ hiện đại, kho nội dung đa dạng, cùng hàng loạt tính năng nâng cao, truyền hình FPT Play sẽ mang đến cho bạn và gia đình những phút giây giải trí đỉnh cao, sống động ngay tại nhà. Xem ngay bài viết dưới đây để khám phá chi tiết hơn về truyền hình FPT!
            </p>

            <h2 className={styles.seoTitle} style={{ marginTop: '30px' }}>Truyền hình FPT Play - Giải trí thả ga, không lo về giá</h2>
            <p className={styles.seoText}>
              FPT Play là truyền hình Internet thế hệ mới do FPT cung cấp. Với mục tiêu hướng đến “Giải trí không giới hạn”, FPT Play mang đến cho người dùng một thư viện nội dung khổng lồ, từ phim ảnh, thể thao, show giải trí đến hàng trăm kênh truyền hình đặc sắc. Bạn sẽ được trải nghiệm chất lượng hình ảnh, âm thanh đỉnh cao ngay tại ngôi nhà của mình.
            </p>
            <p className={styles.seoText}>
              Đặc biệt, dịch vụ của FPT mang đến sự khác biệt, vượt trội không chỉ ở chất lượng nội dung, mà còn tiên phong trong công nghệ truyền hình tương tác. Qua đó cho phép người dùng trở thành người xem chủ động, có thể tương tác, bình luận trực tiếp, hay thậm chí là quyết định diễn biến tiếp theo của chương trình theo sở thích.
            </p>

            <h2 className={styles.seoTitle} style={{ marginTop: '30px' }}>Truyền hình FPT Play có những kênh giải trí nào?</h2>
            <p className={styles.seoText}>FPT Play tự hào mang đến cho người dùng một hệ thống kênh truyền hình đa dạng và phong phú, đáp ứng mọi sở thích và lứa tuổi. Bạn sẽ không bao giờ cảm thấy nhàm chán với kho nội dung hấp dẫn, được cập nhật liên tục trên FPT Play.</p>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Các kênh truyền hình trong nước phổ biến</h3>
            <p className={styles.seoText}>FPT Play tích hợp đầy đủ các kênh truyền hình được yêu thích tại Việt Nam, đảm bảo bạn luôn cập nhật tin tức, giải trí trong nước một cách nhanh chóng và đầy đủ:</p>
            <div className={styles.seoText}>
              <ul style={{ paddingLeft: '20px' }}>
                <li><strong>Kênh thiết yếu:</strong> VTV1 HD, Quốc Phòng VN HD, Quốc hội HD, VTC1 HD, Vnews HD, ANTV HD, Nhân dân HD.</li>
                <li><strong>Kênh VTV:</strong> VTV1, VTV2, VTV3, VTV4, VTV5, VTV7, VTV8, VTV9, VTV Cần Thơ, VTV5 Tây Nam Bộ, VTV5 Tây Nguyên.</li>
                <li><strong>Kênh HTV:</strong> HTV1, HTV2, HTV3, HTV7, HTV9,...</li>
                <li><strong>Kênh giải trí tổng hợp:</strong> Vĩnh Long 1, HaNoiTV 1, HaNoiTV 2, SCTV6, Miền Tây THĐT2, BTV9,...</li>
              </ul>
            </div>

            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-08-13/1755102221_fpt-play-cung-day-du-cac-kenh-truyen-hinh-pho-bien-tai-viet-nam.jpg" alt="FPT Play cung cấp đầy đủ các kênh truyền hình phổ biến tại Việt Nam" style={{ display: 'inline-block', maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>FPT Play cung cấp đầy đủ các kênh truyền hình phổ biến tại Việt Nam</figcaption>
            </figure>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Các kênh địa phương</h3>
            <p className={styles.seoText}>Nhóm kênh địa phương trên FPT Play cung cấp các chương trình đặc trưng của từng tỉnh thành, giúp người dùng theo dõi tin tức và văn hóa vùng miền. Một số kênh địa phương được yêu thích có thể kể đến như BGTV, THLC, QTV1, DaNang TV1, HueTV, QTTV, TTV11, THTG, BRT,...</p>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Các kênh truyền hình quốc tế đỉnh cao</h3>
            <p className={styles.seoText}>Để nâng tầm trải nghiệm giải trí quốc tế, FPT Play cung cấp một loạt kênh truyền hình nổi tiếng thế giới, phục vụ những người yêu thích phim ảnh, khoa học, thể thao, giải trí, giáo dục,... Một số cái tên được yêu thích có thể kể đến như CNN, Da Vinci, Outdoor, Arirang, KBS World,...</p>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Các kênh mở rộng</h3>
            <p className={styles.seoText}>Ngoài các nhóm kênh kể trên, FPT Play còn cung cấp nhóm kênh mở rộng, bao gồm các gói kênh trả phí của K+ như K+SPORT 1, K+SPORT 2, K+CINE, K+LIFE, K+KIDs.</p>

            <h2 className={styles.seoTitle} style={{ marginTop: '30px' }}>Truyền hình FPT Play có các tính năng ưu việt gì?</h2>
            <p className={styles.seoText}>Không chỉ sở hữu kho nội dung đồ sộ, FPT Play còn chinh phục người dùng bởi các tính năng thông minh, hiện đại, mang đến trải nghiệm xem truyền hình cá nhân hóa và tiện lợi hơn bao giờ hết.</p>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Cá nhân hóa nội dung đề xuất</h3>
            <p className={styles.seoText}>Dựa trên lịch sử xem, các chương trình mà bạn yêu thích, FPT Play sẽ tự động đề xuất những nội dung phù hợp nhất, giúp bạn dễ dàng khám phá phim mới, chương trình hấp dẫn mà không cần mất công tìm kiếm.</p>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Cá nhân hóa trải nghiệm thưởng thức</h3>
            <p className={styles.seoText}>FPT Play cho phép bạn tùy chỉnh trải nghiệm xem. Ví dụ như cập nhật ảnh đại diện, thay đổi thông tin tài khoản, tạo danh sách kênh yêu thích, lưu lại những bộ phim muốn xem sau, tiếp tục xem những bộ phim đang dang dở trên bất kỳ thiết bị nào,...</p>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Xem lại các kênh truyền hình</h3>
            <p className={styles.seoText}>Bạn sẽ không còn phải lo lắng bỏ lỡ chương trình yêu thích vì bận việc. FPT Play cho phép bạn xem lại các chương trình đã phát sóng trên hầu hết các kênh truyền hình trong khoảng thời gian lên đến 72 giờ kể từ thời điểm phát sóng. Chỉ cần chọn kênh và thời gian, bạn có thể xem lại bất cứ khi nào mình muốn, giúp bạn hoàn toàn chủ động về thời gian giải trí.</p>

            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-08-13/1755102264_de-dang-xem-lai-cac-kenh-hinh-yeu-thich-tren-fpt-play.jpg" alt="Dễ dàng xem lại các kênh hình yêu thích trên FPT Play" style={{ display: 'inline-block', maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>Dễ dàng xem lại các kênh hình yêu thích trên FPT Play</figcaption>
            </figure>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Lưu kênh yêu thích</h3>
            <p className={styles.seoText}>Với hàng trăm kênh truyền hình, việc tìm kiếm kênh mong muốn có thể khiến bạn mất thời gian. Trong trường hợp này, tính năng "Lưu kênh yêu thích" sẽ giúp bạn bạn tạo một danh sách các kênh thường xuyên xem nhất, giúp truy cập kênh nhanh chóng chỉ với vài thao tác đơn giản, tiết kiệm thời gian và mang lại sự thuận tiện tối đa.</p>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Điều khiển bằng giọng nói</h3>
            <p className={styles.seoText}>FPT Play hỗ trợ tính năng điều khiển bằng giọng nói (có thể nhận 100% khẩu lệnh bằng tiếng Việt) thông qua FPT Play Box kết hợp cùng trợ lý ảo Google Assistant. Chỉ cần nói ra yêu cầu của bạn, hệ thống sẽ tự động tìm kiếm kênh, phim hoặc chương trình mong muốn. Tính năng này đặc biệt hữu ích cho người lớn tuổi và trẻ em, giúp việc điều khiển trở nên đơn giản và nhanh .</p>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Giám sát trẻ em</h3>
            <p className={styles.seoText}>Để đảm bảo môi trường giải trí an toàn và lành mạnh cho trẻ nhỏ, FPT Play tích hợp tính năng "Giám sát nội dung trẻ em". Cha mẹ có thể thiết lập và quản lý các kênh phù hợp với lứa tuổi, đồng thời giới hạn, kênh truyền hình, thời gian xem của trẻ.</p>

            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-08-13/1755102281_cha-me-co-the-thiet-lap-va-quan-ly-kenh-phu-hop-cho-tre-nho.jpg" alt="Cha mẹ có thể thiết lập và quản lý kênh phù hợp cho trẻ nhỏ" style={{ display: 'inline-block', maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>Cha mẹ có thể thiết lập và quản lý kênh phù hợp cho trẻ nhỏ</figcaption>
            </figure>

            <h2 className={styles.seoTitle} style={{ marginTop: '30px' }}>Bảng giá đăng ký truyền hình FPT Play là bao nhiêu?</h2>
            <p className={styles.seoText}>FPT Play được thiết kế để phục vụ nhu cầu giải trí của mọi thành viên trong gia đình. Các gói cước có chi phí hợp lý, giúp mỗi gia đình có thể "giải trí thả ga mà không lo về giá." Dù bạn muốn đăng ký Combo Internet - Truyền hình hay dịch vụ truyền hình độc lập, FPT Play đều có gói cước linh hoạt để phù hợp với nhu cầu và ngân sách của bạn.</p>
            <p className={styles.seoText}>After certain promotions, these are the pricing options for different FPT subscriptions.</p>

            <h3 style={{ fontWeight: '700', marginTop: '20px', marginBottom: '15px' }}>Bảng giá Combo Internet - Truyền hình FPT Play</h3>
            <p className={styles.seoText}>Việc kết hợp Internet và truyền hình FPT Play trong một gói cước là lựa chọn tối ưu, giúp khách hàng tiết kiệm chi phí đáng kể so với việc đăng ký riêng lẻ từng dịch vụ.</p>
            <div className={styles.tableWrapper}>
              <table className={styles.priceTable}>
                <thead>
                  <tr>
                    <th>Tên gói cước</th>
                    <th>Tốc độ</th>
                    <th>Giá cước</th>
                    <th>Đi kèm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Combo giải trí</td>
                    <td>300Mbps/300Mbps</td>
                    <td>200.000đ/tháng</td>
                    <td>Modem Wifi 6, FPT Play</td>
                  </tr>
                  <tr>
                    <td>Combo GIGA</td>
                    <td>300Mbps/300Mbps</td>
                    <td>230.000đ/tháng</td>
                    <td>Modem Wifi 6, FPT Play</td>
                  </tr>
                  <tr>
                    <td>Combo SKY</td>
                    <td>1000Mbps/300Mbps</td>
                    <td>230.000đ/tháng</td>
                    <td>Modem Wifi 6, FPT Play</td>
                  </tr>
                  <tr>
                    <td>Combo META</td>
                    <td>1000Mbps/1000Mbps</td>
                    <td>315.000đ/tháng</td>
                    <td>Modem Wifi 6, FPT Play</td>
                  </tr>
                  <tr>
                    <td>Combo F-Game</td>
                    <td>1000Mbps/300Mbps</td>
                    <td>275.000đ/tháng</td>
                    <td>Modem Wifi 6, FPT Play, Ultra Fast giảm ping</td>
                  </tr>
                  <tr>
                    <td>Combo An Tâm</td>
                    <td>300Mbps/300Mbps</td>
                    <td>245.000đ/tháng</td>
                    <td>Modem Wifi 6, FPT Play, Bảo mật F-Safe</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ fontWeight: '700', marginTop: '30px', marginBottom: '15px' }}>Bảng giá các gói cước FPT Play</h3>
            <p className={styles.seoText}>Nếu bạn đã có sẵn đường truyền Internet và muốn sử dụng thêm dịch vụ truyền hình trên các thiết bị di động hay Smart TV, bạn có thể đăng ký các gói FPT Play độc lập.</p>
            <div className={styles.tableWrapper}>
              <table className={styles.priceTable}>
                <thead>
                  <tr>
                    <th>Tên gói cước</th>
                    <th>Giá cước</th>
                    <th>Quyền lợi bao gồm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Gói Cine</td>
                    <td>33.000đ/tháng</td>
                    <td>
                      Xem phim bộ mới và hot phát song song<br/>
                      Kho phim đặc sắc (trừ Galaxy Play)<br/>
                      Nội dung thiếu nhi, âm nhạc, anime,...<br/>
                      Hỗ trợ 2 thiết bị xem đồng thời
                    </td>
                  </tr>
                  <tr>
                    <td>Gói Premium</td>
                    <td>75.000đ/tháng</td>
                    <td>
                      Hơn 100 kênh truyền hình trong nước và quốc tế (trừ K+)<br/>
                      Kho phim lẻ, phim bộ đặc sắc của Âu-Mỹ và Châu Á (Trung, Hàn, Thái, Việt,…)<br/>
                      Trực tiếp và trọn vẹn các giải bóng đá đỉnh cao<br/>
                      Độc quyền các giải thể thao khác<br/>
                      Ưu tiên xem trước Phim bộ phát song song<br/>
                      Không bị quảng cáo làm phiền khi xem video<br/>
                      Hỗ trợ 3 thiết bị xem đồng thời
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className={styles.seoText} style={{ fontStyle: 'italic', marginTop: '10px' }}>Lưu ý: Các mức giá dưới đây chỉ mang tính chất tham khảo tại thời điểm hiện tại và có thể thay đổi tùy theo chương trình khuyến mãi hoặc chính sách của FPT. Để nhận được báo giá chính xác nhất, bạn hãy liên hệ trực tiếp tổng đài FPT 1900 6600 hoặc nhấp vào nút Tư vấn ngay ở góc phải bên dưới màn hình.</p>

            <h2 className={styles.seoTitle} style={{ marginTop: '30px' }}>Vì sao nên lắp đặt truyền hình FPT Play?</h2>
            <p className={styles.seoText}>Lựa chọn FPT Play không chỉ mang đến cho bạn một dịch vụ truyền hình đa dạng, mà còn mở ra thế giới giải trí không giới hạn với những ưu điểm vượt trội.</p>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Đa dạng kênh truyền hình</h3>
            <p className={styles.seoText}>Với 120 kênh truyền hình trong nước và quốc tế, FPT Play đáp ứng mọi nhu cầu giải trí của các thành viên trong gia đình. Từ tin tức, thời sự, phim truyện, ca nhạc, thể thao, khám phá cho đến các chương trình thiếu nhi, tất cả đều được gói gọn trong một nền tảng duy nhất, giúp bạn không bao giờ bỏ lỡ những chương trình yêu thích.</p>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Hình ảnh 4K, âm thanh sống</h3>
            <p className={styles.seoText}>Trải nghiệm xem truyền hình của bạn sẽ được nâng tầm với chất lượng hình ảnh lên đến 4K, sắc nét từng chi tiết, cùng hệ thống âm thanh sống động, chân thực. FPT Play sẽ biến phòng khách của bạn thành một rạp chiếu phim thu nhỏ, mang đến những phút giây giải trí mãn nhãn và ấn tượng.</p>

            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-08-13/1755102340_xem-phim-sac-net-am-thanh-song-dong-cung-fpt-play.jpg" alt="Xem phim sắc nét, âm thanh sống động cùng FPT Play" style={{ display: 'inline-block', maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>Xem phim sắc nét, âm thanh sống động cùng FPT Play</figcaption>
            </figure>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Kho nội dung chọn lọc</h3>
            <p className={styles.seoText}>FPT Play không chỉ cung cấp số lượng kênh truyền hình, mà còn chú trọng vào chất lượng nội dung. Bạn sẽ tìm thấy các chương trình được chọn lọc và phân loại kỹ lưuỡng. Đặc biệt, FPT Play thường xuyên có các nội dung độc quyền, mang đến sự mới lạ và hấp dẫn riêng biệt mà không thể tìm thấy ở bất kỳ đâu khác.</p>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Kho phim khổng lồ</h3>
            <p className={styles.seoText}>Nếu bạn là tín đồ của phim ảnh, truyền hình FPT Play chắc chắn sẽ làm hài lòng bạn với kho phim khổng lồ được cập nhật liên tục. Từ những bộ phim Hollywood mới nhất, phim điện ảnh Việt Nam, phim bộ Hàn Quốc, Trung Quốc, Thái Lan đang làm mưa làm gió cho đến các series truyền hình kinh điển, FPT Play đều có đủ.</p>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Thể thao độc quyền</h3>
            <p className={styles.seoText}>Đây là một trong những điểm mạnh vượt trội và thu hút nhất của FPT Play. FPT Play là đơn vị sở hữu bản quyền phát sóng độc quyền nhiều giải đấu thể thao hàng đầu ở trong nước và thế giới: Ngoại hạng Anh, Champions League, V.League,...</p>

            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-08-13/1755102380_fpt-play-phat-song-doc-quyen-nhieu-giai-dau-the-thao-hang-dau-the-gioi.jpg" alt="FPT Play phát sóng độc quyền nhiều giải đấu thể thao hàng đầu thế giới" style={{ display: 'inline-block', maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>FPT Play phát sóng độc quyền nhiều giải đấu thể thao hàng đầu thế giới</figcaption>
            </figure>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Đồng bộ và xem được đồng thời trên nhiều thiết bị</h3>
            <p className={styles.seoText}>FPT Play cho phép bạn đăng nhập tài khoản và xem nội dung trên nhiều thiết bị khác nhau cùng lúc. Điều này có nghĩa là các thành viên trong gia đình có thể xem những nội dung yêu thích của riêng mình trên các thiết bị khác nhau, mang lại sự tiện lợi và linh hoạt tối đa.</p>

            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-08-13/1755102407_fpt-play-cho-phep-nguoi-dung-truy-cap-tren-nhieu-thiet-bi-khac-nhau.jpg" alt="FPT Play cho phép người dùng truy cập trên nhiều thiết bị khác nhau" style={{ display: 'inline-block', maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>FPT Play cho phép người dùng truy cập trên nhiều thiết bị khác nhau</figcaption>
            </figure>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Tiện ích và tính năng linh hoạt</h3>
            <p className={styles.seoText}>Dịch vụ truyền hình FPT Play mang đến cho người dùng trải nghiệm giải trí đỉnh cao với nhiều tính năng nổi trội như cá nhân hóa nội dung đề xuất, xem lại truyền hình, đa ngữ, đa thoại, điều khiển bằng giọng nói, tải về không giới hạn các chương trình yêu thích,...</p>

            <h2 className={styles.seoTitle} style={{ marginTop: '30px' }}>Đăng ký lắp đặt truyền hình FPT như thế nào, ở đâu</h2>
            <p className={styles.seoText}>Bạn có thể dễ dàng đăng ký lắp đặt dịch vụ truyền hình FPT Play thông qua nhiều kênh tiện lợi:</p>
            <div className={styles.seoText}>
              <ul style={{ paddingLeft: '20px' }}>
                <li><strong>Tổng đài FPT:</strong> Gọi trực tiếp đến số hotline 038 749 8332 để nhận tư vấn về các gói cước, chương trình khuyến mãi và được hỗ trợ đăng ký ngay lập tức.</li>
                <li><strong>Website chính thức của FPT:</strong> Truy cập fpt.vn để tìm hiểu chi tiết về các gói cước, chương trình khuyến mãi và điền thông tin đăng ký trực tuyến. Sau đó, nhân viên FPT sẽ chủ động liên hệ với bạn.</li>
                <li><strong>Ứng dụng Hi FPT:</strong> Bạn có thể dễ dàng đăng ký dịch vụ FPT Play thông qua ứng dụng Hi FPT bằng cách chọn mục "Truyền hình FPT Play" trên ứng dụng và thực hiện đăng ký theo hướng dẫn.</li>
                <li><strong>Các điểm giao dịch FPT:</strong> Đến trực tiếp các văn phòng giao dịch của FPT gần nhất để được nhân viên tư vấn trực tiếp, giải đáp thắc mắc và hỗ trợ đăng ký truyền hình FPT Play.</li>
              </ul>
            </div>

            <h2 className={styles.seoTitle} style={{ marginTop: '30px' }}>Làm sao để mua gói truyền hình FPT đơn giản, nhanh chóng?</h2>
            <p className={styles.seoText}>FPT luôn nỗ lực để quy trình mua gói cước FPT Play trở nên đơn giản và nhanh chóng nhất cho khách hàng. Bạn có thể lựa chọn một trong các cách đăng ký FPT Play sau:</p>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Mua gói FPT Play trên ứng dụng Hi-FPT</h3>
            <div className={styles.seoText}>
              <ol style={{ paddingLeft: '20px' }}>
                <li>Tải ứng dụng Hi-FPT và đăng ký tài khoản.</li>
                <li>Nhấp vào mục “Truyền hình FPT Play”.</li>
                <li>Chọn gói dịch vụ phù hợp và nhấp vào mục “Đăng ký ngay”.</li>
                <li>Điền thông tin đăng ký theo yêu cầu.</li>
                <li>Kiểm tra các thông tin đã nhập và chọn “Tiếp tục”.</li>
                <li>Chọn phương thức thanh toán và nhấp “Thanh toán”.</li>
                <li>Hoàn tất thủ tục đăng ký gói cước FPT Play.</li>
              </ol>
            </div>

            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-08-13/1755102466_cach-dang-ky-truyen-hinh-fpt-play-tren-app-hi-fpt.jpg" alt="Cách đăng ký truyền hình FPT Play trên app Hi-FPT" style={{ display: 'inline-block', maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>Cách đăng ký truyền hình FPT Play trên app Hi-FPT</figcaption>
            </figure>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Mua gói FPT Play tại các điểm giao dịch của FPT</h3>
            <p className={styles.seoText}>Nếu cần hỗ trợ trực tiếp, bạn có thể đến văn phòng giao dịch của FPT gần nhất. Nhân viên FPT sẽ tư vấn chi tiết về các gói cước truyền hình FPT, cũng như các gói Combo Internet theo nhu cầu của bạn. Sau đó hướng dẫn bạn các thủ tục đăng ký các gói FPT Play một cách nhanh chóng.</p>

            <h3 style={{ fontWeight: '700', marginTop: '20px' }}>Mua gói truyền hình qua tổng đài FPT</h3>
            <p className={styles.seoText}>Bạn cũng có thể liên hệ đến tổng đài của FPT là 038 749 8332 để được hỗ trợ. Tổng đài viên sẽ tư vấn gói cước phù hợp và hướng dẫn bạn các bước đăng ký FPT Play.</p>

            <h2 className={styles.seoTitle} style={{ marginTop: '30px' }}>Đăng ký truyền hình FPT Play - Tận hưởng giây phút giải trí trọn vẹn bên gia đình</h2>
            <p className={styles.seoText}>Sau một ngày làm việc bận rộn thì giây phút quây quần bên gia đình để cùng nhau thưởng thức bộ phim hay, theo dõi trận bóng đá kịch tính hay cười sảng khoái với các chương trình giải trí thực sự tuyệt vời. Truyền hình FPT Play sẽ là cầu nối để bạn tận hưởng giây phút giải trí trọn vẹn.</p>

            <figure style={{ margin: '30px 0', textAlign: 'center' }}>
              <img src="https://s3-api.fpt.vn/fptvn-storage/2025-08-13/1755102490_fpt-play-tien-phong-san-xuat-cac-chuong-trinh-giai-tri-tuong-tac-de-tang-trai-nghiem-nguoi-dung.jpg" alt="FPT Play tiên phong sản xuất các chương trình giải trí tương tác để tăng trải nghiệm người dùng" style={{ display: 'inline-block', maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>FPT Play tiên phong sản xuất các chương trình giải trí tương tác để tăng trải nghiệm người dùng</figcaption>
            </figure>

            <p className={styles.seoText}>Nhờ sở hữu kho nội dung phong phú, từ hàng trăm kênh truyền hình đặc sắc, kho phim khổng lồ đến các giải thể thao độc quyền, FPT Play đáp ứng mọi sở thích của từng thành viên. Với mức giá hợp lý và nhiều gói cước linh hoạt, FPT Play cam kết mang đến giá trị vượt trội, cho phép bạn giải trí thả ga mà không lo về giá.</p>
            <p className={styles.seoText}>Đừng chần chừ nữa! Hãy liên hệ ngay với FPT qua tổng đài 038 749 8332 để được tư vấn miễn phí và đăng ký dịch vụ truyền hình FPT Play ngay hôm nay.</p>

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

      {/* FAQ SECTION - ACCORDION */}
      <section className={styles.section} style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Câu hỏi thường gặp</h2>
            <p className={styles.sectionDesc}>Tìm câu trả lời cho những vướng mắc của bạn tại đây.</p>
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

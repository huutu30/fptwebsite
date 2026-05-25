import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../../components/home/Hero";
import DiscoverySection from "../../components/home/DiscoverySection";
import ProductCardSlider from "../../components/common/ProductCardSlider";
import { PRODUCT_DATA } from "../../data/productData";
import Wifi7Section from "../../components/home/Wifi7Section";
import ProductCategorySection from "../../components/home/ProductCategorySection";
import NewsSection from "../../components/home/NewsSection";
import SEOHead from "../../components/common/SEOHead";

export default function Home({ region, activeCity }) {
  const [activeCategory, setActiveCategory] = useState("ca_nhan_gia_dinh");
  const location = useLocation();

  // Reset về tab mặc định khi user click lại link Trang chủ trên navbar
  useEffect(() => {
    setActiveCategory("ca_nhan_gia_dinh");
  }, [location.key]);

  const handleTabChange = (id) => {
    setActiveCategory(id);
  };

  // Lấy danh sách toàn bộ sản phẩm từ tất cả các mảng trong PRODUCT_DATA
  const allProducts = Object.values(PRODUCT_DATA).flat();

  // Helper function để lấy product theo ID
  const getProductsByIds = (idList) => {
    return idList.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
  };

  // Định nghĩa danh sách ID hiển thị ngoài trang chủ theo đúng yêu cầu
  const HOME_DISPLAY_IDS = {
    ca_nhan_gia_dinh: [
      "giga", "sky", "meta", "f-game", "giga-f1", "sky-f1","meta-f1", "combo-giga-f1", "combo-sky-f1","combo-meta-f1"
    ],
    game_thu: [
      "f-game", "meta", "combo-fgame", "combo-meta", "f-game-f1", "combo-fgame-f1"
    ],
    doanh_nghiep: [
      "lux500", "lux800", "s300-biz", "s300-biz-plus", "s500-biz", "s500-biz-plus"
    ],
    combo_camera: PRODUCT_DATA.camera_combos.map(p => p.id),
    combo_truyen_hinh: PRODUCT_DATA.additional_home_packages.map(p => p.id)
  };

  const tabDataMap = {
    ca_nhan_gia_dinh: getProductsByIds(HOME_DISPLAY_IDS.ca_nhan_gia_dinh),
    game_thu: getProductsByIds(HOME_DISPLAY_IDS.game_thu),
    doanh_nghiep: getProductsByIds(HOME_DISPLAY_IDS.doanh_nghiep),
    combo_camera: getProductsByIds(HOME_DISPLAY_IDS.combo_camera),
    combo_truyen_hinh: getProductsByIds(HOME_DISPLAY_IDS.combo_truyen_hinh),
  };

  const categoryNames = {
    ca_nhan_gia_dinh: "Cá nhân & Gia đình",
    game_thu: "Game thủ",
    doanh_nghiep: "Doanh nghiệp",
    combo_camera: "Combo Internet Camera",
    combo_truyen_hinh: "Combo Internet Truyền hình",
  };

  const categoryDescriptions = {
    ca_nhan_gia_dinh: "Đáp ứng mọi nhu cầu học tập, làm việc và giải trí cơ bản cho gia đình bạn",
    game_thu: "Đường truyền tối ưu Ping, không giật lag, dành riêng cho game thủ chuyên nghiệp",
    doanh_nghiep: "Băng thông cực lớn, độ ổn định cao, đáp ứng số lượng thiết bị truy cập lớn",
    combo_camera: "Trang bị internet tốc độ cao kết hợp camera an ninh bảo vệ toàn diện",
    combo_truyen_hinh: "Tận hưởng kho giải trí bất tận cùng internet siêu tốc độ",
  };

  return (
    <div className="home-page">
      <SEOHead
        title="Lắp mạng Internet cáp quang, Truyền hình & Camera"
        description="FPT Telecom - Đăng ký lắp đặt Internet cáp quang tốc độ cao, Truyền hình FPT Play, Camera an ninh. Wi-Fi 6, lắp đặt trong 24h. Giá chỉ từ 195.000đ/tháng."
        canonicalPath="/trang-chu"
        keywords="lắp mạng FPT, Internet FPT, cáp quang FPT, WiFi FPT, FPT Telecom, lắp WiFi, truyền hình FPT"
      />
      <Hero />

      <div className="container">

        {/* SECTION 2: KHÁM PHÁ SẢN PHẨM NỔI BẬT */}
        <DiscoverySection
          activeTab={activeCategory}
          onTabChange={handleTabChange}
          region={region}
          activeCity={activeCity}
        />

        {/* CARDS THEO TAB – CÙNG DESIGN CARD MỚI */}
        <ProductCardSlider
          key={activeCategory}
          title={`Gói cước cho ${categoryNames[activeCategory] || "bạn"}`}
          subtitle={categoryDescriptions[activeCategory]}
          data={tabDataMap[activeCategory]}
          region={region}
        />
        {/* SECTION 1: COMBO THỂ THAO */}
        <ProductCardSlider
          title="Combo Internet – Truyền hình – Ngoại Hạng Anh"
          subtitle="Xem trọn vẹn Ngoại hạng Anh, La Liga, Champions League cùng Internet tốc độ cao"
          data={(PRODUCT_DATA.the_thao || []).filter(item => [
            'c-the-thao-sky', 'c-the-thao-sky-f1', 'c-the-thao-sky-f2',
            'c-the-thao-meta', 'c-the-thao-meta-f1', 'c-the-thao-meta-f2',
            'c-the-thao-speedx2', 'c-the-thao-speedx2-pro'
          ].includes(item.id))}
          region={region}
          badgeSub="Internet – Truyền hình – Ngoại hạng Anh"
        />

        {/* SECTION 3: THIẾT BỊ CÔNG NGHỆ */}
        <ProductCardSlider
          title="Thiết bị công nghệ bán chạy nhất"
          data={PRODUCT_DATA.camera_combos}
          region={region}
          customCardClass="camera-card-special"
        />

        {/* SECTION 4: FPT PLAY - GÓI XEM TRUYỀN HÌNH */}
        <ProductCardSlider
          title="FPT Play – Gói xem truyền hình, giải trí, thể thao đa phương tiện"
          subtitle="Xem Ngoại hạng Anh, FA Cup, V.League và hàng ngàn nội dung giải trí hấp dẫn"
          data={PRODUCT_DATA.fpt_play_only}
          region={region}
        />

        {/* SECTION 5: SPEEDX - WIFI 7 */}
        <Wifi7Section region={region} />

        {/* SECTION 6: DANH MỤC SẢN PHẨM ĐA DẠNG */}
        <ProductCategorySection />
      </div>

      {/* SECTION 6: TIN TỨC & KHUYẾN MÃI */}
      <NewsSection />
    </div>
  );
}

import { Wifi, Tv, Camera } from 'lucide-react';

/** Ánh xạ tên string → Component Icon (dùng trong mega menu) */
export const iconMap = {
  Wifi,
  Tv,
  Camera,
};

/**
 * NAV_MENU - Cấu hình menu chính
 * - seoTitle: thuộc tính title cho SEO + accessibility
 * - badge: nhãn nổi bật (Hot, Mới...)
 * - hasMega: có mega menu con không
 */
export const NAV_MENU = [
  { 
    title: 'Trang chủ', 
    seoTitle: 'Trang chủ FPT Telecom - Đăng ký Internet, Truyền hình, Camera',
    path: '/trang-chu',
  },
  { 
    title: 'Sản phẩm dịch vụ', 
    seoTitle: 'Tất cả gói cước Internet, Truyền hình và Camera FPT Telecom',
    path: '#',
    hasMega: true,
    categories: [
      {
        label: 'Internet - Wifi',
        icon: 'Wifi',
        color: '#f57020',
        items: [
          { name: 'Internet Wifi 7', path: '/internet/wifi-7', badge: 'Mới', seoTitle: 'Đăng ký Internet Wifi 7 tốc độ cao FPT' },
          { name: 'Internet Cá nhân', path: '/internet/ca-nhan', seoTitle: 'Gói Internet FPT dành cho cá nhân' },
          { name: 'Internet Gia đình', path: '/internet/gia-dinh', seoTitle: 'Gói Internet FPT dành cho gia đình' },
          { name: 'Internet Game thủ', path: '/internet/game-thu', seoTitle: 'Gói Internet FPT tối ưu chơi game' },
          { name: 'Internet Doanh nghiệp', path: '/internet/doanh-nghiep', seoTitle: 'Gói Internet FPT dành cho doanh nghiệp' },
        ]
      },
      {
        label: 'Giải trí & Thiết bị',
        icon: 'Tv',
        color: '#4e69fd',
        items: [
          { name: 'FPT Play', path: '/giai-tri/fpt-play', seoTitle: 'Truyền hình FPT Play - Xem phim, thể thao trực tuyến' },
          { name: 'FPT Camera', path: '/thiet-bi/camera', seoTitle: 'Camera an ninh FPT - Giám sát thông minh' },
          { name: 'FPT Smart Home', path: '/thiet-bi/smarthome', seoTitle: 'Nhà thông minh FPT Smart Home' },
        ]
      },
    ]
  },
  { 
    title: 'Tin tức', 
    seoTitle: 'Tin tức khuyến mãi và cập nhật mới nhất từ FPT Telecom',
    path: '/tin-tuc',
  },
  { 
    title: 'Hỗ trợ', 
    seoTitle: 'Liên hệ hỗ trợ kỹ thuật và tư vấn dịch vụ FPT Telecom',
    path: '/ho-tro',
  },
];

/** Số điện thoại hotline hiển thị trên navbar */
export const HOTLINE = '0387498332';
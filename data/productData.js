import { internetData } from './products/internetData';
import { truyenHinhData } from './products/truyenHinhData';
import { cameraData } from './products/cameraData';
import { wifi7Data } from './products/wifi7Data';


// Cố gắng tự động tối ưu SEO bằng cách thêm alt cho hình ảnh
const autoOptimizeSEO = (products) => {
  return products.map((item) => {
    let opt = { ...item };
    if (!opt.alt && opt.name) opt.alt = `${opt.name} - Internet FPT`;
    if (!opt.path) {
      opt.path = `/${(opt.name || "")
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-z0-9-]/g, "")}`;
    }
    opt.btnTitle = `Đăng ký gói ${opt.name} ngay hôm nay`;
    return opt;
  });
};

export const BANNER_DATA = [
  {
    id: 1,
    image: "/images/optimized/banner_1.webp",
    mobileImage: "/images/optimized/banner_1.webp",
    link: "/khuyen-mai"
  },
  {
    id: 2,
    image: "/images/optimized/banner_2.webp",
    mobileImage: "/images/optimized/banner_2.webp",
    link: "/khuyen-mai"
  },
  {
    id: 3,
    image: "/images/optimized/banner_3.webp",
    mobileImage: "/images/optimized/banner_3.webp",
    link: "/khuyen-mai"
  },
  {
    id: 4,
    image: "/images/optimized/banner_4.webp",
    mobileImage: "/images/optimized/banner_4.webp",
    link: "/khuyen-mai"
  },
  {
    id: 5,
    image: "/images/optimized/banner_5.webp",
    mobileImage: "/images/optimized/banner_5.webp",
    link: "/khuyen-mai"
  },
  {
    id: 6,
    image: "/images/optimized/banner_6.webp",
    mobileImage: "/images/optimized/banner_6.webp",
    link: "/khuyen-mai"
  }
];

export const QUICK_LINKS = [
  { id: 'internet', label: 'Internet' },
  { id: 'fptplay', label: 'FPT Play' },
  { id: 'smart-device', label: 'Thiết bị thông minh' },
];

export const CATEGORY_DATA = [
  {
    id: "ca-nhan",
    type: "INTERNET",
    name: "CÁ NHÂN",
    color: "#f26f21",
    gradient: "linear-gradient(160deg, #f26f21 0%, #ff9f4a 100%)",
    image: "/images/product_internet_per_b2dcc811.webp",
    link: "/internet/ca-nhan",
  },
  {
    id: "gia-dinh",
    type: "INTERNET",
    name: "GIA ĐÌNH",
    color: "#1c6dd0",
    gradient: "linear-gradient(160deg, #1c6dd0 0%, #3b8fe8 100%)",
    image: "/images/product_internet_fam_e857243b.webp",
    link: "/internet/gia-dinh",
  },
  {
    id: "game-thu",
    type: "INTERNET",
    name: "GAME THỦ",
    color: "#6a0dad",
    gradient: "linear-gradient(160deg, #6a0dad 0%, #9b27af 100%)",
    image: "/images/product_internet_gam_75a8e8cf.webp",
    link: "/internet/game-thu",
  },
  {
    id: "giai-tri",
    type: "TRUYỀN HÌNH",
    name: "GIẢI TRÍ",
    color: "#111111",
    gradient: "linear-gradient(160deg, #1a1a1a 0%, #333333 100%)",
    image: "/images/product_tv_entertain_0ded04ec.webp",
    link: "/giai-tri/fpt-play",
  },
  {
    id: "camera",
    type: "THIẾT BỊ",
    name: "CAMERA",
    color: "#b05e00",
    gradient: "linear-gradient(160deg, #b05e00 0%, #d97b1a 100%)",
    image: "/images/product_camera_png_88f5e00f.webp",
    link: "/thiet-bi/camera",
  },
];


export const PRODUCT_DATA = {
  ...internetData,
  ...truyenHinhData,
  ...cameraData,
  ...wifi7Data,
};

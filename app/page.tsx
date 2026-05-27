import HomeClient from "./HomeClient";

export const metadata = {
  title: "Lắp mạng Internet cáp quang, Truyền hình & Camera | FPT Telecom",
  description: "FPT Telecom - Đăng ký lắp đặt Internet cáp quang tốc độ cao, Truyền hình FPT Play, Camera an ninh. Wi-Fi 6, Wi-Fi 7 lắp đặt trong 24h. Giá chỉ từ 195.000đ/tháng.",
  alternates: {
    canonical: "https://fptwifitocdo.com",
  },
  openGraph: {
    title: "Lắp mạng Internet cáp quang, Truyền hình & Camera | FPT Telecom",
    description: "Đăng ký lắp đặt Internet cáp quang tốc độ cao, Truyền hình FPT Play, Camera an ninh. Wi-Fi 6, Wi-Fi 7 lắp đặt trong 24h.",
    url: "https://fptwifitocdo.com",
    siteName: "FPT Telecom",
    locale: "vi_VN",
    type: "website",
    images: [{ url: "https://fptwifitocdo.com/images/69e041bf8f173_1_1920_953e52bd.webp" }],
  },
};

export default function Home() {
  return <HomeClient />;
}

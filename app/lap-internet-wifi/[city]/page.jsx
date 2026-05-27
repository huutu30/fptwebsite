import HomeClient from "@/app/HomeClient";
import { CITY_DATA } from "@/data/cityData";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { city } = await params;
  const cityData = CITY_DATA[city];
  if (!cityData) {
    return {
      title: "Không tìm thấy trang | FPT Telecom",
    };
  }
  const currentMonth = new Date().toLocaleDateString('vi-VN', { month: '2-digit', year: 'numeric' });
  return {
    title: `Lắp mạng Internet FPT tại ${cityData.name} - Khuyến mãi tháng ${currentMonth}`,
    description: `Đăng ký lắp đặt Internet FPT tại ${cityData.name}. Cáp quang tốc độ cao, Wi-Fi 6, Wi-Fi 7 lắp đặt trong 24h. Giá chỉ từ 195.000đ/tháng. Gọi ngay 0387498332!`,
    alternates: { canonical: `https://fptwifitocdo.com/lap-internet-wifi/${city}` },
    openGraph: {
      title: `Lắp mạng Internet FPT tại ${cityData.name} - Khuyến mãi tháng ${currentMonth}`,
      description: `Đăng ký lắp đặt Internet FPT tại ${cityData.name}. Cáp quang tốc độ cao, Wi-Fi 6, Wi-Fi 7 lắp đặt trong 24h.`,
      url: `https://fptwifitocdo.com/lap-internet-wifi/${city}`,
      siteName: "FPT Telecom", locale: "vi_VN", type: "website",
      images: [{ url: "https://fptwifitocdo.com/images/69e041bf8f173_1_1920_953e52bd.webp" }],
    },
  };
}

export default async function LocalLandingPage({ params }) {
  const { city } = await params;
  const cityData = CITY_DATA[city];
  if (!cityData) {
    notFound();
  }

  return <HomeClient />;
}
export async function generateStaticParams() {
  return Object.keys(CITY_DATA).map((city) => ({
    city,
  }));
}

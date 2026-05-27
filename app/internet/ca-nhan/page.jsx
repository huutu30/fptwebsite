import CaNhan from "./CaNhan";

export const metadata = {
  title: "Bảng giá gói cước Internet FPT cá nhân gia đình | FPT Telecom",
  description: "Đăng ký gói cước Internet FPT cá nhân chỉ từ 195.000đ/tháng. Tốc độ cao đến 1Gbps, Wi-Fi 6, lắp đặt nhanh 24h. Xem bảng giá mạng FPT mới nhất.",
  alternates: { canonical: "https://fptwifitocdo.com/internet/ca-nhan" },
  openGraph: {
    title: "Bảng giá gói cước Internet FPT cá nhân gia đình | FPT Telecom",
    description: "Đăng ký gói cước Internet FPT cá nhân chỉ từ 195.000đ/tháng. Tốc độ cao đến 1Gbps, Wi-Fi 6, lắp đặt nhanh 24h.",
    url: "https://fptwifitocdo.com/internet/ca-nhan",
    siteName: "FPT Telecom", locale: "vi_VN", type: "website",
    images: [{ url: "https://fptwifitocdo.com/images/69e041bf8f173_1_1920_953e52bd.webp" }],
  },
};

export default function CaNhanPage() {
  return <CaNhan />;
}

import GiaDinh from "./GiaDinh";

export const metadata = {
  title: "Gói cước Internet FPT cho hộ gia đình | Khuyến mãi HOT | FPT Telecom",
  description: "Đăng ký lắp mạng Internet FPT gia đình. Phủ sóng rộng đến 200m², Wi-Fi 6 + Access Point, combo truyền hình. Giá chỉ từ 205.000đ/tháng. Lắp đặt trong 24h.",
  alternates: { canonical: "https://fptwifitocdo.com/internet/gia-dinh" },
  openGraph: {
    title: "Gói cước Internet FPT cho hộ gia đình | Khuyến mãi HOT | FPT Telecom",
    description: "Đăng ký lắp mạng Internet FPT gia đình. Phủ sóng rộng đến 200m², Wi-Fi 6 + Access Point, combo truyền hình.",
    url: "https://fptwifitocdo.com/internet/gia-dinh",
    siteName: "FPT Telecom", locale: "vi_VN", type: "website",
    images: [{ url: "https://fptwifitocdo.com/images/69e041bf8f173_1_1920_953e52bd.webp" }],
  },
};

export default function GiaDinhPage() {
  return <GiaDinh />;
}

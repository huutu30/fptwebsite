import Wifi7Client from "./Wifi7Client";

export const metadata = {
  title: "Đăng ký lắp Wi-Fi 7, công nghệ XGS-PON | FPT Telecom",
  description: "Đăng ký Wi-Fi 7 FPT tốc độ lên đến 10Gbps. Công nghệ XGS-PON, MLO, băng thông 320MHz. Gói SpeedX2 và SpeedX10 cho gia đình và doanh nghiệp.",
  alternates: { canonical: "https://fptwifitocdo.com/internet/wifi-7" },
  openGraph: {
    title: "Đăng ký lắp Wi-Fi 7, công nghệ XGS-PON | FPT Telecom",
    description: "Đăng ký Wi-Fi 7 FPT tốc độ lên đến 10Gbps. Công nghệ XGS-PON, MLO, băng thông 320MHz.",
    url: "https://fptwifitocdo.com/internet/wifi-7",
    siteName: "FPT Telecom", locale: "vi_VN", type: "website",
    images: [{ url: "https://fptwifitocdo.com/images/69e041bf8f173_1_1920_953e52bd.webp" }],
  },
};

export default function Wifi7Page() {
  return <Wifi7Client />;
}

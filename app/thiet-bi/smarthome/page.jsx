import SmartHome from "./SmartHome";

export const metadata = {
  title: "FPT Smart Home - Thiết bị thông minh | FPT Telecom",
  description: "FPT Smart Home - Giải pháp nhà thông minh toàn diện. Điều khiển bằng giọng nói tiếng Việt. Công tắc cảm ứng, cảm biến khói, ổ cắm thông minh.",
  alternates: { canonical: "https://fptwifitocdo.com/thiet-bi/smarthome" },
  openGraph: {
    title: "FPT Smart Home - Thiết bị thông minh | FPT Telecom",
    description: "FPT Smart Home - Giải pháp nhà thông minh toàn diện. Điều khiển bằng giọng nói tiếng Việt.",
    url: "https://fptwifitocdo.com/thiet-bi/smarthome",
    siteName: "FPT Telecom", locale: "vi_VN", type: "website",
    images: [{ url: "https://fptwifitocdo.com/images/69e041bf8f173_1_1920_953e52bd.webp" }],
  },
};

export default function SmartHomePage() {
  return <SmartHome />;
}

import AboutUs from "./AboutUs";

export const metadata = {
  title: "Giới thiệu chung - FPT Telecom",
  description: "Công ty Cổ phần Viễn thông FPT - nhà cung cấp dịch vụ Internet và Truyền hình hàng đầu Việt Nam với hơn 30 năm hoạt động.",
  alternates: { canonical: "https://fptwifitocdo.com/gioi-thieu" },
  openGraph: {
    title: "Giới thiệu chung - FPT Telecom",
    description: "Công ty Cổ phần Viễn thông FPT - nhà cung cấp dịch vụ Internet và Truyền hình hàng đầu Việt Nam.",
    url: "https://fptwifitocdo.com/gioi-thieu",
    siteName: "FPT Telecom", locale: "vi_VN", type: "website",
    images: [{ url: "https://fptwifitocdo.com/images/69e041bf8f173_1_1920_953e52bd.webp" }],
  },
};

export default function AboutPage() {
  return <AboutUs />;
}

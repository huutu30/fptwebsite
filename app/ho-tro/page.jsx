import Support from "./Support";

export const metadata = {
  title: "Chuyên Viên Tư Vấn Cá Nhân | FPT Telecom",
  description: "Liên hệ chuyên viên tư vấn FPT. Hỗ trợ đăng ký lắp mạng, chọn gói cước, khảo sát tại nhà. Gọi 0387 498 332 hoặc để lại thông tin.",
  alternates: { canonical: "https://fptwifitocdo.com/ho-tro" },
  openGraph: {
    title: "Chuyên Viên Tư Vấn Cá Nhân | FPT Telecom",
    description: "Liên hệ chuyên viên tư vấn FPT. Hỗ trợ đăng ký lắp mạng, chọn gói cước, khảo sát tại nhà.",
    url: "https://fptwifitocdo.com/ho-tro",
    siteName: "FPT Telecom", locale: "vi_VN", type: "website",
    images: [{ url: "https://fptwifitocdo.com/images/69e041bf8f173_1_1920_953e52bd.webp" }],
  },
};

export default function SupportPage() {
  return <Support />;
}

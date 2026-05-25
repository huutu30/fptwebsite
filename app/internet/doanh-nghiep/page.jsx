import DoanhNghiep from "./DoanhNghiep";

export const metadata = {
  title: "Đăng ký lắp WiFi doanh nghiệp FPT | IP Tĩnh, bảo mật cao | FPT Telecom",
  description: "Gói cước Internet FPT doanh nghiệp. Băng thông lớn đến 800Mbps, IP Tĩnh, cân bằng tải, hỗ trợ kỹ thuật 24/7. Phù hợp văn phòng, quán cafe, công ty.",
  alternates: { canonical: "https://fptlapmang.id.vn/internet/doanh-nghiep" },
  openGraph: {
    title: "Đăng ký lắp WiFi doanh nghiệp FPT | IP Tĩnh, bảo mật cao | FPT Telecom",
    description: "Gói cước Internet FPT doanh nghiệp. Băng thông lớn đến 800Mbps, IP Tĩnh, cân bằng tải, hỗ trợ kỹ thuật 24/7.",
    url: "https://fptlapmang.id.vn/internet/doanh-nghiep",
    siteName: "FPT Telecom", locale: "vi_VN", type: "website",
    images: [{ url: "https://fptlapmang.id.vn/images/69e041bf8f173_1_1920_953e52bd.webp" }],
  },
};

export default function DoanhNghiepPage() {
  return <DoanhNghiep />;
}

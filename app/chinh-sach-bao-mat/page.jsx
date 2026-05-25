import PrivacyPolicy from "./PrivacyPolicy";

export const metadata = {
  title: "Chính sách bảo mật - FPT Telecom",
  description: "Chính sách bảo mật thông tin khách hàng của FPT Telecom.",
  alternates: { canonical: "https://fptlapmang.id.vn/chinh-sach-bao-mat" },
  openGraph: {
    title: "Chính sách bảo mật - FPT Telecom",
    description: "Chính sách bảo mật thông tin khách hàng của FPT Telecom.",
    url: "https://fptlapmang.id.vn/chinh-sach-bao-mat",
    siteName: "FPT Telecom", locale: "vi_VN", type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}

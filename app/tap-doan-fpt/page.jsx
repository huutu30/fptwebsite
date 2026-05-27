import TapDoanFPT from "./TapDoanFPT";

export const metadata = {
  title: "Tập đoàn FPT - FPT Telecom",
  description: "Thông tin tổng quan về Tập đoàn FPT - Tiên phong chuyển đổi số tại Việt Nam với hơn 54.000 nhân viên, hiện diện tại 30 quốc gia.",
  alternates: { canonical: "https://fptwifitocdo.com/tap-doan-fpt" },
  openGraph: {
    title: "Tập đoàn FPT - FPT Telecom",
    description: "Thông tin tổng quan về Tập đoàn FPT - Tiên phong chuyển đổi số tại Việt Nam.",
    url: "https://fptwifitocdo.com/tap-doan-fpt",
    siteName: "FPT Telecom", locale: "vi_VN", type: "website",
  },
};

export default function TapDoanFPTPage() {
  return <TapDoanFPT />;
}

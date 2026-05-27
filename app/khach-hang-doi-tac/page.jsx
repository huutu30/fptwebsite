import KhachHangDoiTac from "./KhachHangDoiTac";

export const metadata = {
  title: "Khách hàng - Đối tác - FPT Telecom",
  description: "Đại lý và các đối tác chiến lược hàng đầu của FPT Telecom.",
  alternates: { canonical: "https://fptwifitocdo.com/khach-hang-doi-tac" },
  openGraph: {
    title: "Khách hàng - Đối tác - FPT Telecom",
    description: "Đại lý và các đối tác chiến lược hàng đầu của FPT Telecom.",
    url: "https://fptwifitocdo.com/khach-hang-doi-tac",
    siteName: "FPT Telecom", locale: "vi_VN", type: "website",
  },
};

export default function KhachHangDoiTacPage() {
  return <KhachHangDoiTac />;
}

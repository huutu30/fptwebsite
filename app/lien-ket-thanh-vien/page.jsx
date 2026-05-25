import LienKetThanhVien from "./LienKetThanhVien";

export const metadata = {
  title: "Liên kết - Thành viên - FPT Telecom",
  description: "Danh sách các công ty con và đơn vị thành viên trực thuộc Tập đoàn FPT Telecom.",
  alternates: { canonical: "https://fptlapmang.id.vn/lien-ket-thanh-vien" },
  openGraph: {
    title: "Liên kết - Thành viên - FPT Telecom",
    description: "Danh sách các công ty con và đơn vị thành viên trực thuộc Tập đoàn FPT Telecom.",
    url: "https://fptlapmang.id.vn/lien-ket-thanh-vien",
    siteName: "FPT Telecom", locale: "vi_VN", type: "website",
  },
};

export default function LienKetThanhVienPage() {
  return <LienKetThanhVien />;
}

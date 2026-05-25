import FptPlay from "./FptPlay";

export const metadata = {
  title: "FPT Play trực tiếp bóng đá - Combo truyền hình Internet | FPT Telecom",
  description: "FPT Play - Xem trực tiếp bóng đá Ngoại hạng Anh, Champions League. 120+ kênh truyền hình, kho phim 4K. Combo Internet + Truyền hình chỉ từ 200.000đ/tháng.",
  alternates: { canonical: "https://fptlapmang.id.vn/giai-tri/fpt-play" },
  openGraph: {
    title: "FPT Play trực tiếp bóng đá - Combo truyền hình Internet | FPT Telecom",
    description: "FPT Play - Xem trực tiếp bóng đá Ngoại hạng Anh, Champions League. 120+ kênh truyền hình, kho phim 4K.",
    url: "https://fptlapmang.id.vn/giai-tri/fpt-play",
    siteName: "FPT Telecom", locale: "vi_VN", type: "website",
    images: [{ url: "https://fptlapmang.id.vn/images/69e041bf8f173_1_1920_953e52bd.webp" }],
  },
};

export default function FptPlayPage() {
  return <FptPlay />;
}

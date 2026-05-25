import Camera from "./Camera";

export const metadata = {
  title: "Lắp đặt Camera FPT | Trọn gói, thi công nhanh 24h | FPT Telecom",
  description: "Camera AI FPT nhận diện khuôn mặt, lưu trữ Cloud Tier III. Combo camera từ 1.100.000đ. Combo Internet + Camera chỉ từ 250.000đ/tháng. Lắp đặt toàn quốc.",
  alternates: { canonical: "https://fptlapmang.id.vn/thiet-bi/camera" },
  openGraph: {
    title: "Lắp đặt Camera FPT | Trọn gói, thi công nhanh 24h | FPT Telecom",
    description: "Camera AI FPT nhận diện khuôn mặt, lưu trữ Cloud Tier III. Combo Internet + Camera chỉ từ 250.000đ/tháng.",
    url: "https://fptlapmang.id.vn/thiet-bi/camera",
    siteName: "FPT Telecom", locale: "vi_VN", type: "website",
    images: [{ url: "https://fptlapmang.id.vn/images/69e041bf8f173_1_1920_953e52bd.webp" }],
  },
};

export default function CameraPage() {
  return <Camera />;
}

import GameThu from "./GameThu";

export const metadata = {
  title: "Gói cước Internet game thủ FPT | Ping thấp, giảm lag | FPT Telecom",
  description: "Đăng ký gói cước F-Game FPT dành cho game thủ. Tốc độ 1Gbps, công nghệ Ultra Fast giảm ping xuống 16ms, không giật lag. Phù hợp game thủ, streamer.",
  alternates: { canonical: "https://fptlapmang.id.vn/internet/game-thu" },
  openGraph: {
    title: "Gói cước Internet game thủ FPT | Ping thấp, giảm lag | FPT Telecom",
    description: "Đăng ký gói cước F-Game FPT dành cho game thủ. Tốc độ 1Gbps, công nghệ Ultra Fast giảm ping xuống 16ms.",
    url: "https://fptlapmang.id.vn/internet/game-thu",
    siteName: "FPT Telecom", locale: "vi_VN", type: "website",
    images: [{ url: "https://fptlapmang.id.vn/images/69e041bf8f173_1_1920_953e52bd.webp" }],
  },
};

export default function GameThuPage() {
  return <GameThu />;
}

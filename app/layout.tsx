import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RegionProvider } from "@/context/RegionContext";
import { RegisterProvider } from "@/context/RegisterContext";
import { ProductDetailProvider } from "@/context/ProductDetailContext";
import RegisterModal from "@/components/common/RegisterModal";
import ProductDetailModal from "@/components/common/ProductDetailModal";
import FloatingContact from "@/components/common/FloatingContact";
import SupportCTA from "@/components/common/SupportCTA";
import ScrollToTop from "@/components/common/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lắp mạng Internet cáp quang, Truyền hình & Camera | FPT Telecom",
  description: "FPT Telecom - Đăng ký lắp đặt Internet cáp quang tốc độ cao, Truyền hình FPT Play, Camera an ninh. Wi-Fi 6, Wi-Fi 7 lắp đặt trong 24h. Giá chỉ từ 195.000đ/tháng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.onerror = function(message, source, lineno, colno, error) {
                var div = document.createElement('div');
                div.style.position = 'fixed';
                div.style.bottom = '80px';
                div.style.left = '10px';
                div.style.right = '10px';
                div.style.background = 'rgba(255, 0, 0, 0.95)';
                div.style.color = '#fff';
                div.style.padding = '10px';
                div.style.zIndex = '999999';
                div.style.fontSize = '12px';
                div.style.borderRadius = '5px';
                div.style.wordBreak = 'break-all';
                div.innerHTML = '<strong>Error:</strong> ' + message + ' at ' + source + ':' + lineno;
                document.body.appendChild(div);
              };
              window.onunhandledrejection = function(event) {
                var div = document.createElement('div');
                div.style.position = 'fixed';
                div.style.bottom = '80px';
                div.style.left = '10px';
                div.style.right = '10px';
                div.style.background = 'rgba(255, 165, 0, 0.95)';
                div.style.color = '#000';
                div.style.padding = '10px';
                div.style.zIndex = '999999';
                div.style.fontSize = '12px';
                div.style.borderRadius = '5px';
                div.style.wordBreak = 'break-all';
                div.innerHTML = '<strong>Promise Reject:</strong> ' + event.reason;
                document.body.appendChild(div);
              };
            `
          }}
        />
        <RegionProvider>
          <RegisterProvider>
            <ProductDetailProvider>
              <ScrollToTop />
              <div className="app-container">
                <Navbar />
                
                <RegisterModal />
                <ProductDetailModal />
                <FloatingContact />

                <div id="global-loader" className="global-loader">
                  <div className="global-loader-spinner"></div>
                </div>

                <main id="main-content" role="main" style={{ minHeight: "100vh" }}>
                  {children}
                </main>
                
                <SupportCTA />
                <Footer />
              </div>
            </ProductDetailProvider>
          </RegisterProvider>
        </RegionProvider>
      </body>
    </html>
  );
}

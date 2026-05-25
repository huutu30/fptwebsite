import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import styles from './Footer.module.css';

const YoutubeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-1.125 0-2.511.236-2.511 1.41v1.56h3.804l-.318 3.667h-3.485v7.98H9.101z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className={styles.siteFooter} role="contentinfo">
      <div className={styles.container}>
        
        {/* Top section: Logo, Social, Hotline */}
        <div className={styles.footerTopRow}>
          <div className={styles.logo}>
            <Link to="/trang-chu" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <img src="/images/logo-ftel.svg" alt="FPT Telecom Logo" width="160" height="40" style={{ objectFit: 'contain', display: 'block' }} />
            </Link>
          </div>
          
          <div className={styles.topRight}>
            <div className={styles.socialBox}>
              <a href="#" className={`${styles.socialIcon} ${styles.hiLogo}`} aria-label="Hi FPT">Hi</a>
              <a href="#" className={`${styles.socialIcon} ${styles.ytIcon}`} aria-label="YouTube"><YoutubeIcon size={24} /></a>
              <a href="#" className={`${styles.socialIcon} ${styles.igIcon}`} aria-label="Instagram"><InstagramIcon size={22} /></a>
              <a href="#" className={`${styles.socialIcon} ${styles.zaloLogo}`} aria-label="Zalo">Zalo</a>
              <a href="#" className={`${styles.socialIcon} ${styles.fbIcon}`} aria-label="Facebook"><FacebookIcon size={22} /></a>
            </div>
            
            <a href="tel:19006600" className={styles.hotlineBlock}>
              <Phone size={24} fill="currentColor" strokeWidth={0} />
              1900 6600
            </a>
          </div>
        </div>

        {/* Main section: Columns */}
        <div className={styles.footerMain}>
          
          {/* Column 1: Company Info */}
          <div className={styles.footerCol}>
            <div className={styles.companyInfo}>
              <p>Giấy chứng nhận ĐKDN số 0101778163 do Sở Kế hoạch Đầu tư Thành phố Hà Nội cấp ngày 28/07/2005</p>
              <p>Giấy phép cung cấp dịch vụ viễn thông số 255/GP-CVT do Cục Viễn thông cấp ngày 07/11/2022</p>
              
              <p className={styles.companyName}>Công ty Cổ phần Viễn thông FPT</p>
              
              <div className={styles.infoRow}>
                <MapPin size={16} />
                <span>Tầng 9, Block A, tòa nhà FPT Cầu Giấy, số 10 Phạm Văn Bạch, quận Cầu Giấy, TP. Hà Nội</span>
              </div>
              <div className={styles.infoRow}>
                <Mail size={16} />
                <a href="mailto:hotrokhachhang@fpt.com" style={{color: 'inherit', textDecoration: 'none'}}>hotrokhachhang@fpt.com</a>
              </div>
              <div className={styles.infoRow}>
                <Phone size={16} />
                <a href="tel:02473002222" style={{color: 'inherit', textDecoration: 'none'}}>024 7300 2222</a>
              </div>
              
              <p style={{marginTop: '15px'}}>Người đại diện: Ông Hoàng Việt Anh</p>
              
              <img 
                src="/images/bct.png" 
                alt="Đã thông báo Bộ Công Thương" 
                className={styles.bctLogo}
                width="150"
                height="56"
                loading="lazy"
              />
            </div>
          </div>

          {/* Column 2: Về FPT Telecom */}
          <div className={styles.footerCol}>
            <h3>Về FPT Telecom</h3>
            <ul className={styles.footerLinks}>
              <li><Link to="/gioi-thieu" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Giới thiệu chung</Link></li>
              <li><Link to="/lien-ket-thanh-vien" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Liên kết - Thành viên</Link></li>
              <li><Link to="/khach-hang-doi-tac" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Khách hàng - Đối tác</Link></li>
              <li><Link to="/tap-doan-fpt" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Tập đoàn FPT</Link></li>
              <li><Link to="/tin-tuc" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Tin tức</Link></li>
            </ul>
          </div>
          {/* Column 3: Sản phẩm dịch vụ */}
          <div className={styles.footerCol}>
            <h3>Sản phẩm dịch vụ</h3>
            <ul className={styles.footerLinks}>
              <li><Link to="/internet/ca-nhan" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Lắp đặt WiFi Internet</Link></li>
              <li><Link to="/giai-tri/fpt-play" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Internet - Truyền hình FPT Play</Link></li>
              <li><Link to="/thiet-bi/camera" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>FPT Camera</Link></li>
              <li><Link to="/thiet-bi/smarthome" className={styles.highlightLink} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>FPT Smart Home</Link></li>
            </ul>
          </div>

          {/* Column 5: Lắp mạng tại */}
          <div className={styles.footerCol}>
            <h3>Lắp mạng FPT tại</h3>
            <ul className={styles.footerLinks}>
              <li><Link to="/lap-internet-wifi/hcm" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>TP. Hồ Chí Minh</Link></li>
              <li><Link to="/lap-internet-wifi/ha-noi" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Hà Nội</Link></li>
              <li><Link to="/lap-internet-wifi/da-nang" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Đà Nẵng</Link></li>
              <li><Link to="/lap-internet-wifi/hai-phong" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Hải Phòng</Link></li>
              <li><Link to="/lap-internet-wifi/binh-duong" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Bình Dương</Link></li>
              <li><Link to="/lap-internet-wifi/dong-nai" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Đồng Nai</Link></li>
              <li><Link to="/lap-internet-wifi/khanh-hoa" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Khánh Hòa</Link></li>
              <li><Link to="/lap-internet-wifi/vung-tau" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Vũng Tàu</Link></li>
            </ul>
          </div>
          
        </div>
      </div>
    </footer>
  );
}

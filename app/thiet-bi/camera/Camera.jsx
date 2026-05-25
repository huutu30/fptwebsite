"use client";

import React, { useEffect, useState } from 'react';
import { useRegisterModal } from '@/context/RegisterContext';
import { useRegion } from '@/context/RegionContext';
import Link from 'next/link';
import { Shield, Cloud, Eye, Cpu, Check, Sun, Moon, ChevronDown, ChevronUp } from 'lucide-react';
import { PRODUCT_DATA } from '@/data/productData';
import ProductCardSlider from '@/components/common/ProductCardSlider';
import NewsSection from '@/components/home/NewsSection';
import styles from './Camera.module.css';

export default function Camera() {
  const { openModal } = useRegisterModal();
  const { region } = useRegion();
  const [comboTab, setComboTab] = useState('all');
  const [showMore, setShowMore] = useState(false);

  // ---------- Data ----------
  const cameraProducts = PRODUCT_DATA.fpt_camera || [];
  const cameraCombos = PRODUCT_DATA.camera_combos || [];
  const cameraGiaDinh = PRODUCT_DATA.camera_gia_dinh || [];

  // Filter combo tabs
  const filteredCombos = comboTab === 'all'
    ? cameraCombos
    : cameraCombos.filter(c => {
        if (comboTab === '2cam') return c.name.includes('2 Camera');
        if (comboTab === '3cam') return c.name.includes('3 Camera');
        if (comboTab === '5cam') return c.name.includes('5 Camera');
        return true;
      });

  return (
    <div className={styles.cameraPage}>
      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Lắp đặt <span>Camera FPT</span><br />An toàn – Thông minh
          </h1>
          <p className={styles.heroDesc}>
            Camera AI FPT nhận diện khuôn mặt, phát hiện người lạ, lưu trữ Cloud tiêu chuẩn Tier III.
            Trọn gói lắp đặt, tư vấn thi công nhanh 24h trên toàn quốc.
          </p>
        </div>
      </section>

      {/* ===== VÌ SAO CHỌN FPT CAMERA ===== */}
      <section className={styles.section} style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Vì sao chọn <span>FPT Camera</span>?</h2>
            <p className={styles.sectionDesc}>
              Công nghệ AI tiên tiến, lưu trữ đám mây an toàn, bảo mật tuyệt đối cho gia đình và doanh nghiệp.
            </p>
          </div>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}><Cpu size={30} /></div>
              <h3 className={styles.benefitTitle}>Camera AI thông minh</h3>
              <p className={styles.benefitDesc}>Nhận diện khuôn mặt, phát hiện người lạ, cảnh báo xâm nhập real-time qua điện thoại.</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}><Cloud size={30} /></div>
              <h3 className={styles.benefitTitle}>Lưu trữ Cloud Tier III</h3>
              <p className={styles.benefitDesc}>Không cần đầu ghi NVR/DVR. Dữ liệu được mã hóa, lưu trữ trên hạ tầng Cloud tiêu chuẩn quốc tế.</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}><Eye size={30} /></div>
              <h3 className={styles.benefitTitle}>Quay đêm sắc nét</h3>
              <p className={styles.benefitDesc}>Hồng ngoại thông minh, quay đêm rõ nét đến 30m. Độ phân giải 2K+ siêu sắc nét 24/7.</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}><Shield size={30} /></div>
              <h3 className={styles.benefitTitle}>Chống nước IP67</h3>
              <p className={styles.benefitDesc}>Camera ngoài trời chịu được mưa bão, nắng gắt. Hoạt động ổn định trong mọi điều kiện thời tiết.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DANH MỤC CAMERA LẺ ===== */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Dòng sản phẩm <span>Camera AI</span></h2>
            <p className={styles.sectionDesc}>
              Camera AI FPT tích hợp nhận diện khuôn mặt, phát hiện người, đàm thoại 2 chiều và lưu trữ Cloud.
            </p>
          </div>
          <div className={styles.productGrid}>
            {cameraProducts.map((cam) => (
              <div className={styles.productCard} key={cam.id}>
                <div className={styles.productImgWrap}>
                  <img
                    src={cam.image}
                    alt={`${cam.name} - Camera FPT Telecom`}
                    loading="lazy"
                    width="280"
                    height="220"
                  />
                </div>
                <div className={styles.productBody}>
                  <h3 className={styles.productName}>{cam.name}</h3>
                  <div className={styles.productPrice}>
                    {cam.price.toLocaleString('vi-VN')}đ <small>/thiết bị</small>
                  </div>
                  <ul className={styles.productFeatures}>
                    {cam.features.map((f, i) => (
                      <li key={i}><Check size={14} /><span>{f}</span></li>
                    ))}
                  </ul>
                  <button onClick={() => openModal(cam.name)} className={styles.productBtn}>
                    Đăng ký tư vấn
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMBO CAMERA (MUA ĐỨT) ===== */}
      <section className={styles.section} style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Combo Camera <span>trọn gói</span></h2>
            <p className={styles.sectionDesc}>
              Tiết kiệm hơn khi mua combo! Giám sát toàn diện trong nhà và ngoài trời với giải pháp trọn gói từ FPT.
            </p>
          </div>

          {/* Tabs */}
          <div className={styles.tabGroup}>
            {[
              { key: 'all', label: 'Tất cả' },
              { key: '2cam', label: '2 Camera' },
              { key: '3cam', label: '3 Camera' },
              { key: '5cam', label: '5 Camera' },
            ].map(tab => (
              <button
                key={tab.key}
                className={comboTab === tab.key ? styles.tabBtnActive : styles.tabBtn}
                onClick={() => setComboTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={styles.comboGrid}>
            {filteredCombos.map((combo) => (
              <div className={styles.comboCard} key={combo.id}>
                <div className={styles.comboImgWrap}>
                  <img
                    src={combo.image}
                    alt={`${combo.name} - FPT Camera`}
                    loading="lazy"
                    width="280"
                    height="200"
                  />
                </div>
                <div className={styles.comboBody}>
                  <h3 className={styles.comboName}>{combo.name}</h3>
                  <div className={styles.comboPrice}>
                    {combo.price.toLocaleString('vi-VN')}đ
                  </div>
                  <ul className={styles.comboFeatures}>
                    {(combo.features || []).map((f, i) => (
                      <li key={i}><Check size={13} /><span>{f}</span></li>
                    ))}
                  </ul>
                  <button onClick={() => openModal(combo.name)} className={styles.comboBtn}>
                    Đăng ký ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMBO INTERNET + CAMERA (GÓI CƯỚC THÁNG) ===== */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Combo Internet + Camera <span>thông minh</span></h2>
            <p className={styles.sectionDesc}>
              Vừa có Internet tốc độ cao, vừa có Camera AI giám sát an ninh. Chỉ từ 250.000đ/tháng, trọn gói không lo chi phí phát sinh.
            </p>
          </div>
          <div className={styles.sliderWrapper}>
            <ProductCardSlider
              data={cameraGiaDinh}
              region={region}
            />
          </div>
        </div>
      </section>

      {/* ===== SEO CONTENT & PRICING TABLE ===== */}
      <section className={styles.section} style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className={`${styles.seoContent} ${showMore ? styles.expanded : styles.collapsed}`}>
            <h2 className={styles.seoTitle}>Camera AI FPT – Giải pháp an ninh thông minh cho gia đình hiện đại</h2>
            <p className={styles.seoText}>
              FPT Camera sử dụng công nghệ AI (Trí tuệ nhân tạo) tiên tiến với khả năng nhận diện khuôn mặt, phát hiện chuyển động người, phân biệt người lạ – người quen. Khi phát hiện bất thường, hệ thống lập tức gửi cảnh báo qua ứng dụng FPT Camera trên điện thoại, giúp bạn an tâm dù ở bất cứ đâu.
            </p>
            <p className={styles.seoText}>
              Khác với camera truyền thống cần đầu ghi NVR/DVR tốn kém, FPT Camera lưu trữ toàn bộ dữ liệu trên hạ tầng Cloud đạt chuẩn Tier III – tiêu chuẩn bảo mật quốc tế. Dữ liệu được mã hóa AES-256, đảm bảo an toàn tuyệt đối. Bạn có thể xem lại video từ 1 đến 7 ngày tuỳ gói dịch vụ đã chọn.
            </p>

            <h2 className={styles.seoTitle} style={{ marginTop: '40px' }}>Bảng giá Camera FPT lẻ & Combo</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className={styles.priceTable}>
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Loại</th>
                    <th>Độ phân giải</th>
                    <th>Tính năng nổi bật</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Camera IQ 4S</strong></td>
                    <td>Ngoài trời</td>
                    <td>2K+</td>
                    <td>IP67, hồng ngoại 30m, nhận diện khuôn mặt</td>
                    <td style={{ color: '#f97316', fontWeight: 'bold' }}>400.000đ</td>
                  </tr>
                  <tr>
                    <td><strong>Camera Play 4</strong></td>
                    <td>Trong nhà</td>
                    <td>2K+</td>
                    <td>Xoay 360°, đàm thoại 2 chiều, AI</td>
                    <td style={{ color: '#f97316', fontWeight: 'bold' }}>400.000đ</td>
                  </tr>
                  <tr>
                    <td><strong>Camera Play 3</strong></td>
                    <td>Trong nhà</td>
                    <td>2K</td>
                    <td>Xoay 360°, phát hiện chuyển động</td>
                    <td style={{ color: '#f97316', fontWeight: 'bold' }}>400.000đ</td>
                  </tr>
                  <tr>
                    <td><strong>Camera Play</strong></td>
                    <td>Trong nhà</td>
                    <td>Full HD</td>
                    <td>Đàm thoại 2 chiều, hồng ngoại</td>
                    <td style={{ color: '#f97316', fontWeight: 'bold' }}>350.000đ</td>
                  </tr>
                  <tr>
                    <td><strong>Combo 2 Camera</strong></td>
                    <td>Trong + Ngoài</td>
                    <td>2K+</td>
                    <td>1 Play 4 + 1 IQ4S, Cloud 1 ngày</td>
                    <td style={{ color: '#f97316', fontWeight: 'bold' }}>1.100.000đ</td>
                  </tr>
                  <tr>
                    <td><strong>Combo 3 Camera</strong></td>
                    <td>Tuỳ chọn</td>
                    <td>2K+</td>
                    <td>Giám sát toàn diện, Cloud 1 ngày</td>
                    <td style={{ color: '#f97316', fontWeight: 'bold' }}>1.299.999đ</td>
                  </tr>
                  <tr>
                    <td><strong>Combo 5 Camera</strong></td>
                    <td>2 Trong + 3 Ngoài</td>
                    <td>2K+</td>
                    <td>Giải pháp giám sát toàn diện nhất</td>
                    <td style={{ color: '#f97316', fontWeight: 'bold' }}>2.100.000đ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.showMoreWrapper}>
            <button className={styles.showMoreBtn} onClick={() => setShowMore(!showMore)}>
              {showMore ? (
                <>Thu gọn <ChevronUp size={20} /></>
              ) : (
                <>Xem thêm <ChevronDown size={20} /></>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Câu hỏi <span>thường gặp</span></h2>
            <p className={styles.sectionDesc}>
              Giải đáp các thắc mắc phổ biến về Camera FPT và dịch vụ lưu trữ Cloud.
            </p>
          </div>
          <div className={styles.faqSection}>
            {[
              {
                q: "Camera FPT có cần đầu ghi hình (NVR/DVR) không?",
                a: "Không. Camera FPT lưu trữ toàn bộ dữ liệu trên hệ thống Cloud tiêu chuẩn Tier III, không cần đầu ghi truyền thống. Bạn chỉ cần kết nối WiFi và xem qua ứng dụng FPT Camera trên điện thoại."
              },
              {
                q: "Cloud Camera FPT lưu trữ được bao lâu?",
                a: "Tuỳ theo gói dịch vụ, dữ liệu được lưu trữ từ 1 ngày (gói cơ bản), 3 ngày (Eyes3), đến 7 ngày (Eyes7). Dữ liệu được mã hoá AES-256 đảm bảo an toàn tuyệt đối."
              },
              {
                q: "Camera FPT có nhận diện khuôn mặt không?",
                a: "Có. Dòng Camera IQ 4S và Play 4 đều được tích hợp AI nhận diện khuôn mặt, phát hiện người lạ – người quen, gửi cảnh báo tức thì qua ứng dụng."
              },
              {
                q: "Tôi có thể mua Camera FPT mà không cần đăng ký Internet FPT không?",
                a: "Được. Bạn có thể mua camera lẻ hoặc combo camera mà không cần đăng ký gói Internet FPT. Tuy nhiên, nếu đăng ký combo Internet + Camera, bạn sẽ tiết kiệm hơn rất nhiều và được hỗ trợ kỹ thuật toàn diện."
              },
              {
                q: "Camera IQ 4S có chịu được mưa bão không?",
                a: "Có. Camera IQ 4S đạt chuẩn chống nước IP67, có thể hoạt động ổn định trong mọi điều kiện thời tiết khắc nghiệt, từ mưa bão đến nắng gắt."
              }
            ].map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>{faq.q}</h4>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

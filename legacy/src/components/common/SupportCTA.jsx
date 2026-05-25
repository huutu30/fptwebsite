import React, { useState } from 'react';
import { useRegisterModal } from '../../context/RegisterContext';
import styles from './SupportCTA.module.css';

export default function SupportCTA() {
  const { openModal } = useRegisterModal();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && phone) {
      openModal(`Tư vấn cho ${name} - SĐT: ${phone}`);
      setName('');
      setPhone('');
    }
  };

  return (
    <section className={styles.supportCta}>
      <div className={styles.supportInner}>
        <div className={styles.supportLeft}>
          <h3 className={styles.supportTitle}>Bạn cần hỗ trợ tư vấn sản phẩm dịch vụ</h3>
          <p className={styles.supportDesc}>
            Bằng việc ấn vào Đăng ký Internet bạn đã đồng ý để FPT Telecom liên hệ tư vấn sản phẩm dịch vụ phù hợp với nhu cầu.
            Chi tiết xin xem tại <a href="/ho-tro" className={styles.supportLink}>Chính sách xử lý dữ liệu cá nhân</a>
          </p>
        </div>
        <div className={styles.supportIcon}>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            <path d="M8 9h8M8 13h6"/>
          </svg>
        </div>
        <form className={styles.supportForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Họ tên <span>*</span></label>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.formInput}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Số điện thoại <span>*</span></label>
            <input
              type="tel"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.formInput}
              required
            />
          </div>
          <button type="submit" className={styles.formBtn}>Nhận tư vấn</button>
        </form>
      </div>
    </section>
  );
}

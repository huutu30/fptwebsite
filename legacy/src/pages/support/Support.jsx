import React, { useEffect, useState } from 'react';
import { PhoneCall, MessageCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import styles from './Support.module.css';
import SEOHead from '../../components/common/SEOHead';

export default function Support() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    note: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cảm ơn bạn! Thông tin đã được gửi. Chuyên viên sẽ gọi lại cho bạn ngay lập tức.');
  };

  return (
    <div className={styles.pageWrapper}>
      <SEOHead
        title="Chuyên Viên Tư Vấn Cá Nhân"
        description="Liên hệ chuyên viên tư vấn FPT. Hỗ trợ đăng ký lắp mạng, chọn gói cước, khảo sát tại nhà. Gọi 0387 498 332 hoặc để lại thông tin."
        canonicalPath="/ho-tro"
        keywords="hỗ trợ FPT, tư vấn lắp mạng, liên hệ FPT Telecom"
      />
      <div className={styles.container}>
        {/* Left Side: Premium Typography & Tags */}
        <div className={styles.textSide}>
          <span className={styles.greeting}>Dịch Vụ Hỗ Trợ VVIP</span>
          <h1 className={styles.title}>
            Chuyên Viên<br />Tư Vấn Cá Nhân<br /><span>Của Riêng Bạn.</span>
          </h1>
          <p className={styles.subtitle}>
            Quên đi việc phải chờ đợi tổng đài hàng giờ đồng hồ. Tôi ở đây để mang đến cho bạn trải nghiệm lắp đặt và hỗ trợ mạng FPT riêng biệt, nhanh chóng và tận tâm nhất.
          </p>

          <div className={styles.contactTags}>
            <div className={styles.glassTag}>
              <div className={styles.tagIcon}><PhoneCall size={26} strokeWidth={2.5}/></div>
              <div className={styles.tagInfo}>
                <p className={styles.tagLabel}>Gọi Trực Tiếp Kênh Ưu Tiên</p>
                <p className={styles.tagValue}>0387 498 332</p>
              </div>
            </div>

            <div className={styles.glassTag}>
              <div className={styles.tagIcon}><MessageCircle size={26} strokeWidth={2.5}/></div>
              <div className={styles.tagInfo}>
                <p className={styles.tagLabel}>Tư Vấn & Khảo Sát Zalo</p>
                <p className={styles.tagValue}>0387 498 332</p>
              </div>
            </div>

            <div className={styles.glassTag}>
              <div className={styles.tagIcon}><ShieldCheck size={26} strokeWidth={2.5}/></div>
              <div className={styles.tagInfo}>
                <p className={styles.tagLabel}>Đặc Quyền Khách Hàng</p>
                <p className={styles.tagValue} style={{ fontSize: '16px' }}>Khảo sát & Ký hợp đồng tại nhà</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Frosted Glass Form */}
        <div className={styles.formSide}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Nhận Báo Giá Độc Quyền</h2>
            <p className={styles.formSubtitle}>Điền thông tin để nhận gói ưu đãi mạng cực sốc chỉ dành riêng cho khách hàng đăng ký tại đây.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Họ và tên *</label>
              <input 
                className={styles.input} 
                type="text" 
                placeholder="Ví dụ: Nguyễn Văn A" 
                required 
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Số điện thoại *</label>
              <input 
                className={styles.input} 
                type="tel" 
                placeholder="038x xxx xxx" 
                required 
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Địa chỉ lắp đặt dự kiến</label>
              <input 
                className={styles.input} 
                type="text" 
                placeholder="Nhập địa chỉ nhà bạn..." 
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Gói dịch vụ quan tâm</label>
              <select className={styles.input} onChange={(e) => setFormData({...formData, note: e.target.value})}>
                <option value="">-- Chọn dịch vụ --</option>
                <option value="Internet">Internet cáp quang</option>
                <option value="Combo">Combo Internet + Truyền hình</option>
                <option value="Camera">Lắp đặt Camera AI</option>
                <option value="Khác">Cần tư vấn chọn gói</option>
              </select>
            </div>

            <button type="submit" className={styles.btnSubmit}>
              GỌI LẠI CHO TÔI NGAY <ArrowRight size={20} strokeWidth={3}/>
            </button>
            <p className={styles.formFooter}>
              Cam kết bảo mật 100%. Tôi sẽ gọi lại cho bạn ngay sau khi nhận được yêu cầu.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

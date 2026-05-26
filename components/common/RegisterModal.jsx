"use client";

import React, { useState, useEffect } from 'react';
import { X, Wifi, Tv, Camera, ArrowRight, ShieldCheck, Zap, Clock } from 'lucide-react';
import { useRegisterModal } from '@/context/RegisterContext';
import styles from './RegisterModal.module.css';

export default function RegisterModal() {
  const { isOpen, closeModal, productName, productId } = useRegisterModal();
  const [activeService, setActiveService] = useState('Internet');
  
  // States cho form để điều khiển class 'valid' của input (phục vụ floating label)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (productName) {
      const nameLower = productName.toLowerCase();
      if (nameLower.includes('combo') && nameLower.includes('camera')) {
        setActiveService('Combo Camera');
      } else if (nameLower.includes('combo')) {
        setActiveService('Combo FPT Play');
      } else if (nameLower.includes('camera') || nameLower.includes('iq4s')) {
        setActiveService('Camera');
      } else {
        setActiveService('Internet');
      }
    }
  }, [productName, isOpen]);

  // Reset form khi đóng
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setPhone('');
      setAddress('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = {
      formType: 'register',
      name,
      phone,
      address,
      service: activeService,
      productName: productName || '',
      productId: productId || '',
    };
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        alert(`Cảm ơn bạn! Yêu cầu tư vấn đã được gửi thành công.${productId ? `\nMã gói: ${productId}` : ''}`);
        closeModal();
      } else {
        alert(data.message || 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    { id: 'Internet', icon: <Wifi size={18} />, label: 'Internet' },
    { id: 'Truyền hình', icon: <Tv size={18} />, label: 'Truyền hình' },
    { id: 'Camera', icon: <Camera size={18} />, label: 'Camera' },
    { id: 'Combo FPT Play', icon: <Tv size={18} />, label: 'Combo FPT Play' },
    { id: 'Combo Camera', icon: <ShieldCheck size={18} />, label: 'Combo Camera' },
  ];

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={closeModal}>
          <X size={20} />
        </button>

        {/* Form Đăng ký */}
        <div className={styles.modalForm}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Nhận Tư Vấn Trực Tiếp</h2>
            <p className={styles.formDesc}>Chuyên viên của chúng tôi sẽ gọi lại trong vòng 5 phút</p>
          </div>

          <form onSubmit={handleSubmit}>
            {productName && (
              <div className={styles.selectedProductBadge}>
                <span>Sản phẩm đang chọn:</span>
                <strong>{productName}</strong>
              </div>
            )}

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <input 
                  type="text" 
                  className={styles.inputField} 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className={styles.inputLabel}>Họ và tên *</label>
              </div>
              <div className={styles.inputGroup}>
                <input 
                  type="tel" 
                  className={styles.inputField} 
                  required 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label className={styles.inputLabel}>Số điện thoại *</label>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <input 
                type="text" 
                className={styles.inputField} 
                required 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <label className={styles.inputLabel}>Địa chỉ lắp đặt dự kiến *</label>
            </div>

            <div className={styles.serviceSection}>
              <h3 className={styles.serviceTitle}>Sản phẩm quan tâm</h3>
              <div className={styles.serviceGrid}>
                {services.map((svc) => (
                  <div 
                    key={svc.id} 
                    className={`${styles.servicePill} ${activeService === svc.id ? styles.active : ''}`}
                    onClick={() => setActiveService(svc.id)}
                  >
                    <div className={styles.pillIcon}>{svc.icon}</div>
                    <span>{svc.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'ĐANG GỬI...' : 'GỬI YÊU CẦU'} {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

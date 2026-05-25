"use client";

import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '60vh', padding: '60px 0' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '30px', borderLeft: '4px solid #f57020', paddingLeft: '15px' }}>
          Chính sách Bảo mật Thông tin
        </h1>
        <p style={{ color: '#475569', lineHeight: '1.8', marginBottom: '20px' }}>
          Chào mừng Quý khách đến với FPT Telecom. Việc bảo vệ dữ liệu cá nhân và xây dựng niềm tin của Quý khách là vấn đề cực kỳ quan trọng đối với chúng tôi.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginTop: '30px', marginBottom: '15px' }}>1. Mục đích thu thập thông tin</h2>
        <p style={{ color: '#475569', lineHeight: '1.8' }}>
          Chúng tôi thu thập thông tin cá nhân của Quý khách chủ yếu phục vụ cho mục đích hỗ trợ quá trình đăng ký dịch vụ, lắp đặt mạng Internet, truyền hình và chăm sóc khách hàng sau bán hàng.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginTop: '30px', marginBottom: '15px' }}>2. Cam kết bảo mật</h2>
        <p style={{ color: '#475569', lineHeight: '1.8' }}>
          FPT Telecom cam kết tuyệt đối bảo mật thông tin cá nhân của Quý khách theo chính sách bảo vệ dữ liệu cá nhân và các quy định của pháp luật Việt Nam. Chúng tôi không mua bán, trao đổi thông tin khách hàng cho bên thứ ba.
        </p>
      </div>
    </div>
  );
}

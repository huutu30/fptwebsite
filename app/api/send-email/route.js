import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { formType, name, phone, address, service, productName, productId, note } = body;

    // Lấy thông tin cấu hình từ biến môi trường
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiverEmail = process.env.RECEIVER_EMAIL;

    // Xác định tên loại form tiếng Việt
    let formNameVi = 'Đăng ký tư vấn nhanh (Modal)';
    if (formType === 'support') {
      formNameVi = 'Yêu cầu hỗ trợ VVIP (Trang Hỗ Trợ)';
    } else if (formType === 'wifi7') {
      formNameVi = 'Đăng ký lắp đặt Wi-Fi 7';
    }

    const customerName = name || body.fullName || 'Khách hàng';
    const customerPhone = phone || '';
    const customerAddress = address || 'Không có';
    const customerService = service || note || 'Không xác định';
    const selectedProduct = productName || '';
    const codeProduct = productId || '';

    // Kiểm tra xem đã cấu hình SMTP hay chưa
    const isConfigured = 
      smtpHost && 
      smtpPass && 
      smtpUser && 
      smtpUser !== 'your-email@gmail.com' &&
      smtpPass !== 'your-app-password-16-characters';

    if (!isConfigured) {
      // Chế độ Fallback: In thông tin ra console để nhà phát triển test
      console.log('==================================================');
      console.log('🔔 [MOCK GỬI EMAIL - CHƯA CẤU HÌNH BIẾN MÔI TRƯỜNG]');
      console.log(`Loại form: ${formNameVi}`);
      console.log(`Khách hàng: ${customerName}`);
      console.log(`Số điện thoại: ${customerPhone}`);
      console.log(`Địa chỉ: ${customerAddress}`);
      console.log(`Dịch vụ quan tâm/Ghi chú: ${customerService}`);
      if (selectedProduct) console.log(`Sản phẩm đang chọn: ${selectedProduct}`);
      if (codeProduct) console.log(`Mã sản phẩm: ${codeProduct}`);
      console.log(`Thời gian: ${new Date().toLocaleString('vi-VN')}`);
      console.log('==================================================');

      return Response.json({
        success: true,
        message: 'Lưu thông tin thành công (Chế độ demo - Đã ghi nhận ra console server).',
        fallback: true
      }, { status: 200 });
    }

    // Thiết lập cấu hình gửi email bằng nodemailer
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort) || 465,
      secure: parseInt(smtpPort) === 465, // true nếu dùng cổng 465 (SSL)
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const sendDate = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    // Tạo template HTML email sang trọng và chuyên nghiệp
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            color: #334155;
            background-color: #f8fafc;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            overflow: hidden;
            border: 1px solid #e2e8f0;
          }
          .header {
            background: linear-gradient(135deg, #f57020 0%, #0056D2 100%);
            padding: 30px 20px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 22px;
            font-weight: 800;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }
          .header p {
            margin: 5px 0 0 0;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.85);
          }
          .content {
            padding: 30px 24px;
          }
          .intro {
            font-size: 15px;
            color: #475569;
            margin-bottom: 24px;
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 15px;
          }
          .detail-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
          }
          .detail-table th, .detail-table td {
            padding: 12px 14px;
            text-align: left;
            border-bottom: 1px solid #f1f5f9;
            font-size: 14px;
          }
          .detail-table th {
            width: 35%;
            color: #64748b;
            font-weight: 600;
            background-color: #fafbfc;
          }
          .detail-table td {
            color: #0f172a;
            font-weight: 500;
          }
          .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
          }
          .badge-orange {
            background-color: #fff7ed;
            color: #c2410c;
            border: 1px solid #ffedd5;
          }
          .badge-blue {
            background-color: #f0fdf4;
            color: #166534;
            border: 1px solid #dcfce7;
          }
          .footer {
            background-color: #f8fafc;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
          }
          .footer a {
            color: #0056D2;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Đăng ký dịch vụ mới</h1>
            <p>Thông tin liên hệ được gửi từ website FPT Telecom</p>
          </div>
          <div class="content">
            <div class="intro">
              Chào bạn, hệ thống vừa ghi nhận một lượt gửi thông tin từ khách hàng cần tư vấn trên website. Dưới đây là thông tin chi tiết:
            </div>
            <table class="detail-table">
              <tr>
                <th>Nguồn đăng ký</th>
                <td><span class="badge ${formType === 'wifi7' ? 'badge-blue' : 'badge-orange'}">${formNameVi}</span></td>
              </tr>
              <tr>
                <th>Họ và tên</th>
                <td><strong>${customerName}</strong></td>
              </tr>
              <tr>
                <th>Số điện thoại</th>
                <td><a href="tel:${customerPhone}" style="color:#0056D2; font-weight:bold; text-decoration:none;">${customerPhone}</a></td>
              </tr>
              <tr>
                <th>Địa chỉ lắp đặt</th>
                <td>${customerAddress}</td>
              </tr>
              <tr>
                <th>Dịch vụ quan tâm</th>
                <td>${customerService}</td>
              </tr>
              ${selectedProduct ? `
              <tr>
                <th>Sản phẩm đã chọn</th>
                <td>${selectedProduct}</td>
              </tr>` : ''}
              ${codeProduct ? `
              <tr>
                <th>Mã gói cước</th>
                <td><code>${codeProduct}</code></td>
              </tr>` : ''}
              <tr>
                <th>Thời gian nhận</th>
                <td>${sendDate}</td>
              </tr>
            </table>
          </div>
          <div class="footer">
            Đây là email tự động từ hệ thống website. Vui lòng không trả lời trực tiếp thư này.<br/>
            Hỗ trợ bởi kỹ thuật FPT Telecom.
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"FPT Web Form" <${smtpUser}>`,
      to: receiverEmail,
      subject: `[ĐĂNG KÝ WEB] - ${customerName} - ${customerPhone} (${formNameVi})`,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({
      success: true,
      message: 'Email gửi thành công!'
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Lỗi khi xử lý gửi email:', error);
    return Response.json({
      success: false,
      message: 'Có lỗi xảy ra khi gửi thông tin.',
      error: error.message
    }, { status: 500 });
  }
}

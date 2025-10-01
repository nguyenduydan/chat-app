export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="vi">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chào mừng DIFAChat</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
    <div style="background: linear-gradient(to right, #36D1DC, #5B86E5); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
      <img src="https://img.freepik.com/free-vector/hand-drawn-message-element-vector-cute-sticker_53876-118344.jpg?t=st=1741295028~exp=1741298628~hmac=0d076f885d7095f0b5bc8d34136cd6d64749455f8cb5f29a924281bafc11b96c&w=1480" alt="Messenger Logo" style="width: 80px; height: 80px; margin-bottom: 20px; border-radius: 50%; background-color: white; padding: 10px;">
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 500;">Chào mừng đến với DIFAChat!</h1>
    </div>
    <div style="background-color: #ffffff; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
      <p style="font-size: 18px; color: #5B86E5;"><strong>Chào ${name},</strong></p>
      <p>Chúng tôi rất vui mừng khi bạn tham gia nền tảng nhắn tin của chúng tôi! DIFAChat kết nối bạn với bạn bè, gia đình và đồng nghiệp theo thời gian thực, bất kể họ ở đâu.</p>

      <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #36D1DC;">
        <p style="font-size: 16px; margin: 0 0 15px 0;"><strong>Bắt đầu chỉ với vài bước:</strong></p>
        <ul style="padding-left: 20px; margin: 0;">
          <li style="margin-bottom: 10px;">Thiết lập ảnh đại diện</li>
          <li style="margin-bottom: 10px;">Tìm và thêm bạn nào</li>
          <li style="margin-bottom: 10px;">Bắt đầu trò chuyện</li>
          <li style="margin-bottom: 0;">Chia sẻ ảnh, video và nhiều nội dung khác</li>
        </ul>
      </div>

      <div style="text-align: center; margin: 30px 0;">
          <a href=${clientURL}
              style="background: linear-gradient(to right, #36D1DC, #5B86E5); color: white; text-decoration: none; padding: 12px 30px; box-shadow:3px 9px 0px -5px black;border-radius: 50px; font-weight: 500; display: inline-block;">Bắt
              đầu nhắn tin thôi</a>
      </div>


      <p style="margin-bottom: 5px;">Nếu bạn cần trợ giúp hoặc có thắc mắc, chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
      <p style="margin-top: 0;">Nhắn tin vui vẻ!</p>

      <p style="margin-top: 25px; margin-bottom: 0;">Trân trọng,<br>DIFAChat Team</p>
    </div>

    <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
      <p>© 2025 Messenger. All rights reserved.</p>
      <p>
        <a href="#" style="color: #5B86E5; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
        <a href="#" style="color: #5B86E5; text-decoration: none; margin: 0 10px;">Terms of Service</a>
        <a href="#" style="color: #5B86E5; text-decoration: none; margin: 0 10px;">Contact Us</a>
      </p>
    </div>
  </body>
  </html>
  `;
}

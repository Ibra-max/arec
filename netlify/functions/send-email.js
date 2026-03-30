const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, phone, message } = data;

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' })
      };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const contactEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;
    const siteUrl = process.env.URL || 'http://localhost:8888';
    const logoUrl = `${siteUrl}/assets/images/logo.jpeg`;

    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@800&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
            color: #334155;
            direction: rtl;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
          }
          .header {
            background-color: #0d9488; /* AREC Teal */
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            font-size: 24px;
            margin: 0;
            font-weight: 600;
          }
          .content {
            padding: 30px;
          }
          .row {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #f1f5f9;
          }
          .row:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
          .label {
            font-size: 14px;
            font-weight: 600;
            color: #ea580c; /* AREC Orange */
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .value {
            font-size: 16px;
            color: #0f172a;
            line-height: 1.6;
          }
          .message-box {
            background-color: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            margin-top: 10px;
            white-space: pre-wrap;
          }
          .footer {
            background-color: #f1f5f9;
            padding: 20px;
            text-align: center;
            font-size: 13px;
            color: #64748b;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div dir="ltr" style="display: inline-block; margin-bottom: 15px;">
              <svg viewBox="0 0 250 80" width="250" height="80" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <mask id="cutA">
                    <rect width="100%" height="100%" fill="white" />
                    <path d="M 25 20 L 45 70" stroke="black" stroke-width="4" />
                  </mask>
                  <mask id="cutC">
                    <rect width="100%" height="100%" fill="white" />
                    <path d="M 190 20 Q 200 45 195 70 Q 180 50 190 20" fill="black" />
                  </mask>
                </defs>
                <text x="50%" y="60" text-anchor="middle" font-family="'Outfit', Arial, sans-serif" font-weight="800" font-size="64" fill="#ffffff" letter-spacing="1">
                  <tspan mask="url(#cutA)">A</tspan>
                  <tspan>R</tspan>
                  <tspan>E</tspan>
                  <tspan mask="url(#cutC)">C</tspan>
                </text>
              </svg>
            </div>
            <h1>رسالة استفسار جديدة</h1>
          </div>
          <div class="content">
            <div class="row">
              <div class="label">تاريخ الإرسال</div>
              <div class="value">${new Date().toLocaleString('ar-EG')}</div>
            </div>
            <div class="row">
              <div class="label">الاسم الكامل</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="row">
              <div class="label">البريد الإلكتروني</div>
              <div class="value"><a href="mailto:${email}" style="color: #0d9488; text-decoration: none;">${email}</a></div>
            </div>
            
            <div class="row">
              <div class="label">رقم الهاتف</div>
              <div class="value" dir="ltr" style="text-align: right;">${phone || 'غير محدد'}</div>
            </div>
            
            <div class="row">
              <div class="label">محتوى الرسالة</div>
              <div class="value message-box">${message}</div>
            </div>
          </div>
          <div class="footer">
            تم استلام هذه الرسالة عبر نموذج التواصل في موقع أريك للهندسة والمقاولات.
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"نموذج التواصل - AREC" <${process.env.SMTP_USER}>`,
      to: contactEmail,
      replyTo: email,
      subject: `رسالة جديدة من الموقع: ${name}`,
      html: htmlTemplate
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email' })
    };
  }
};

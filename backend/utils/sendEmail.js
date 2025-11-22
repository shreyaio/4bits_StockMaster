// ============================================
// STOCKMASTER - Email Utility (ES6 Modules)
// Location: backend/utils/sendEmail.js
// ============================================

import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  
  // Define email options
  const mailOptions = {
    from: `StockMaster <${process.env.EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html || `<p>${options.message}</p>`
  };
  
  // Send email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
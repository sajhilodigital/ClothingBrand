// backend/user/sendEmail.js
import nodemailer from "nodemailer";

export const sendOTP = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS, // MUST BE an App Password
    },
  });

  await transporter.sendMail({
    from: `"Clothing Brand" <${process.env.SMTP_EMAIL}>`,
    to,
    subject: "Your OTP Verification Code",
    html: `<h2>Your OTP: <b>${otp}</b></h2><p>Valid for 10 minutes.</p>`,
  });
};

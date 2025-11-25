// import express from "express";
// import nodemailer from "nodemailer";
// import * as Yup from "yup";
// import { asyncHandler } from "../user/booking.controller.js";

// const router = express.Router();

// // -------------------- Validation Schema -------------------- //
// const ContactValidationSchema = Yup.object({
//   firstName: Yup.string().required(),
//   lastName: Yup.string().required(),
//   email: Yup.string().email().required(),
//   phone: Yup.string().required(),
//   destination: Yup.string().required(),
//   message: Yup.string().required(),
// });

// // -------------------- Middleware for Validation -------------------- //
// const validateReqBody = (schema) => async (req, res, next) => {
//   try {
//     await schema.validate(req.body, { abortEarly: false });
//     next();
//   } catch (err) {
//     console.error("Validation error:", err.errors);
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid input", errors: err.errors });
//   }
// };

// // -------------------- Contact Route -------------------- //
// router.post(
//   "/contact/me",
//   validateReqBody(ContactValidationSchema),
//   asyncHandler(async (req, res) => {
//     const { firstName, lastName, email, phone, destination, message } =
//       req.body;

//     try {
//       // ✅ Use Gmail service instead of host/port
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS, // App Password
//         },
//       });

//       const mailOptions = {
//         from: `"${firstName} ${lastName}" <${process.env.EMAIL_USER}>`,
//         to: process.env.EMAIL_TO || process.env.EMAIL_USER,
//         subject: `New Contact Inquiry: ${destination}`,
//         text: `
// Name: ${firstName} ${lastName}
// Email: ${email}
// Phone: ${phone}
// Destination: ${destination}

// Message:
// ${message}
//         `,
//       };

//       const info = await transporter.sendMail(mailOptions);
//       console.log("✅ Email sent:", info.messageId);

//       return res.status(200).json({
//         success: true,
//         message: "Message sent successfully!",
//         messageId: info.messageId,
//       });
//     } catch (err) {
//       console.error("❌ Email sending error:", err);
//       return res.status(500).json({
//         success: false,
//         message:
//           "Failed to send message. Make sure EMAIL_USER and EMAIL_PASS are correct and App Password is enabled.",
//         error: err.message,
//       });
//     }
//   })
// );

// export { router as mailController };



import express from "express";
import nodemailer from "nodemailer";
import * as Yup from "yup";
import { asyncHandler } from "../user/booking.controller.js";

const router = express.Router();

// -------------------- Validation Schema -------------------- //
const ContactValidationSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string().required(),
  destination: Yup.string().required(),
  message: Yup.string().required(),
});

// -------------------- Middleware for Validation -------------------- //
const validateReqBody = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    console.error("Validation error:", err.errors);
    return res
      .status(400)
      .json({ success: false, message: "Invalid input", errors: err.errors });
  }
};

// -------------------- Contact Route -------------------- //
router.post(
  "/contact/me",
  validateReqBody(ContactValidationSchema),
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, destination, message } =
      req.body;

    try {
      // ✅ Use Brevo SMTP instead of Gmail
      const transporter = nodemailer.createTransport({
        host: process.env.BREVO_SMTP_HOST || "smtp-relay.brevo.com",
        port: parseInt(process.env.BREVO_SMTP_PORT) || 587,
        secure: false, // true if port 465
        auth: {
          user: process.env.BREVO_SMTP_USER, // your Brevo email
          pass: process.env.BREVO_SMTP_KEY, // your SMTP key
        },
      });

      const mailOptions = {
        from: `"${firstName} ${lastName}" <${process.env.BREVO_SMTP_USER}>`,
        to: process.env.EMAIL_TO || process.env.BREVO_SMTP_USER,
        subject: `New Contact Inquiry: ${destination}`,
        text: `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Destination: ${destination}

Message:
${message}
        `,
        html: `
          <h2>New Contact Inquiry</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Destination:</strong> ${destination}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Email sent:", info.messageId);

      return res.status(200).json({
        success: true,
        message: "Message sent successfully!",
        messageId: info.messageId,
      });
    } catch (err) {
      console.error("❌ Email sending error:", err);
      return res.status(500).json({
        success: false,
        message:
          "Failed to send message. Make sure BREVO_SMTP_USER and BREVO_SMTP_KEY are correct.",
        error: err.message,
      });
    }
  })
);

export { router as mailController };

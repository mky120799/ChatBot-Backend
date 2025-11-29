import { createTransport } from "nodemailer";
import "dotenv/config";

const sendMail = async (email, subject, otp) => {
  const user = process.env.GMAIL_USER || process.env.Gmail;
  const pass = process.env.GMAIL_PASS || process.env.Password;

  if (!user || !pass) {
    console.error(
      "Mail credentials missing. Check GMAIL_USER / GMAIL_PASS (or Gmail / Password)."
    );
    throw new Error("Mail credentials are not set in environment variables");
  }

  const transport = createTransport({
    service: "gmail", // simpler for Gmail
    auth: { user, pass },
    secure: false, // use STARTTLS on port 587
    tls: { rejectUnauthorized: false }, // optional; remove if strict TLS is required
  });

  // helpful to surface authentication/network errors early
  try {
    await transport.verify();
  } catch (err) {
    console.error("SMTP verify failed:", err.message || err);
    throw err;
  }

  const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>OTP</title>
<style>body{font-family:Arial,Helvetica,sans-serif}.container{padding:20px;border-radius:8px;text-align:center}h1{color:#d32f2f}.otp{font-size:30px;color:#7b68ee}</style>
</head><body><div class="container"><h1>OTP Verification</h1><p>Hello ${email}, your One-Time Password is:</p><p class="otp">${otp}</p></div></body></html>`;

  try {
    const info = await transport.sendMail({
      from: user,
      to: email,
      subject,
      html,
      text: `Your OTP is: ${otp}`,
    });
    console.log("Mail sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("Failed to send mail:", err.message || err);
    throw err;
  }
};

export default sendMail;

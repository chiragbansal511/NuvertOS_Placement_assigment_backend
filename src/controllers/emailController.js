import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: false,
    port: Number(process.env.SMTP_PORT) || 587,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

export async function sendMail(email, username, generatedPassword) {
    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: 'Your account has been created',
        text:
            `Hello ${username},
    
    An account has been created for you.
    
    Email: ${email}
    Temporary password: ${generatedPassword}
    
    For security, please sign in and change your password immediately (or use the "Reset Password" flow) — this password is temporary.
    
    If you did not expect this email, please contact your administrator.`,
        html: `<p>Hello <strong>${username}</strong>,</p>
    <p>An account has been created for you.</p>
    <ul>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Temporary password:</strong> <code>${generatedPassword}</code></li>
    </ul>
    <p>For security, please sign in and change your password immediately (or use the "Reset Password" flow). This password is temporary.</p>
    <p>If you did not expect this email, contact your administrator.</p>`
    };

    await transporter.sendMail(mailOptions);
}

export default transporter;

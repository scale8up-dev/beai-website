import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST || 'email-smtp.us-west-2.amazonaws.com';
const port = parseInt(process.env.SMTP_PORT || '587', 10);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const fromAddress = process.env.EMAIL_FROM_ADDRESS || 'info@businessevolutionai.com';
const fromName = process.env.EMAIL_FROM_NAME || 'Business Evolution AI';

export async function sendPasswordResetEmail(
  toEmail: string,
  resetUrl: string,
  userName: string
) {
  try {
    if (!user || !pass) {
      console.warn('⚠️ SMTP credentials not fully configured. Password reset link:', resetUrl);
      return { success: true, simulated: true, resetUrl };
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"${fromName}" <${fromAddress}>`,
      to: toEmail,
      subject: 'Password Reset Request - BEAI CMS',
      text: `Hello ${userName},\n\nYou recently requested to reset your password for the Business Evolution AI Content Management System.\n\nPlease use the following link to choose a new password:\n${resetUrl}\n\nThis link will expire in 1 hour. If you did not request a password reset, you can safely ignore this email.\n\nBest regards,\nBusiness Evolution AI Team`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="color: #111827; margin-bottom: 8px;">Password Reset Request</h2>
            <p style="color: #6b7280; font-size: 14px; margin-top: 0;">Business Evolution AI &bull; CMS Portal</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <p style="color: #374151; font-size: 15px; margin-top: 0;">Hello <strong>${userName}</strong>,</p>
            <p style="color: #374151; font-size: 14px; line-height: 1.6;">
              We received a request to reset your password for the BEAI Content Management System. Click the button below to set a new password:
            </p>
            
            <div style="text-align: center; margin: 28px 0;">
              <a href="${resetUrl}" style="background-color: #111827; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600; display: inline-block;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 12px; line-height: 1.5; margin-bottom: 0;">
              This link is valid for <strong>1 hour</strong>. If you did not request this, you can safely ignore this message.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #9ca3af;">
            &copy; ${new Date().getFullYear()} Business Evolution AI. All rights reserved.
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    // Don't crash; return error
    throw error;
  }
}

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email address is required.' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      // Return success message to avoid revealing account existence
      return NextResponse.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.',
      });
    }

    // Generate random token & 1-hour expiration
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();

    // Determine reset URL based on request origin or headers
    const origin =
      request.headers.get('origin') ||
      request.headers.get('x-forwarded-host') ||
      'http://localhost:3000';

    const baseUrl = origin.startsWith('http') ? origin : `https://${origin}`;
    const resetUrl = `${baseUrl}/admin/reset-password?token=${resetToken}`;

    // Send email
    try {
      await sendPasswordResetEmail(user.email, resetUrl, user.name);
    } catch (emailErr) {
      console.error('Failed to send reset email:', emailErr);
      // Even if SMTP fails in local test, return the reset url in development
      if (process.env.NODE_ENV !== 'production') {
        return NextResponse.json({
          success: true,
          message: 'Password reset link generated. (Check server logs or click link)',
          devLink: resetUrl,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.',
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [POST /api/auth/forgot-password]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to process request.' },
      { status: 500 }
    );
  }
}

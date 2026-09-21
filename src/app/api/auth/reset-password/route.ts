import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Reset token is required.' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Password reset link is invalid or has expired.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      email: user.email,
      name: user.name,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [GET /api/auth/reset-password]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to verify reset token.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Token and new password are required.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Password reset link is invalid or has expired.' },
        { status: 400 }
      );
    }

    user.password = await hashPassword(newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Your password has been reset successfully. You can now log in.',
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [POST /api/auth/reset-password]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to reset password.' },
      { status: 500 }
    );
  }
}

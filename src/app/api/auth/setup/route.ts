import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, signToken } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const count = await User.countDocuments();
    return NextResponse.json({
      success: true,
      setupRequired: count === 0,
      userCount: count,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [GET /api/auth/setup]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to check setup status' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const count = await User.countDocuments();

    if (count > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Setup is already completed. An admin account already exists. Please log in.',
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const firstAdmin = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: 'admin',
    });

    const token = signToken({
      userId: firstAdmin._id.toString(),
      email: firstAdmin.email,
      role: firstAdmin.role,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Master Admin account created successfully! You are now logged in.',
      user: {
        id: firstAdmin._id,
        name: firstAdmin.name,
        email: firstAdmin.email,
        role: firstAdmin.role,
      },
    });

    // Set HTTP-only session cookie
    response.cookies.set('cms_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [POST /api/auth/setup]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to create admin user' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { getAuthUser, hashPassword } from '@/lib/auth';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    if (authUser.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden. Admin access required.' },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    await connectToDatabase();

    const userToUpdate = await User.findById(id);
    if (!userToUpdate) {
      return NextResponse.json(
        { success: false, error: 'User not found.' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, email, role, resetPassword } = body;

    if (name) userToUpdate.name = name.trim();
    if (email) userToUpdate.email = email.trim().toLowerCase();
    if (role && ['admin', 'editor'].includes(role)) userToUpdate.role = role;

    if (resetPassword) {
      if (resetPassword.length < 6) {
        return NextResponse.json(
          { success: false, error: 'Password must be at least 6 characters long.' },
          { status: 400 }
        );
      }
      userToUpdate.password = await hashPassword(resetPassword);
    }

    await userToUpdate.save();

    return NextResponse.json({
      success: true,
      message: 'User updated successfully.',
      data: {
        _id: userToUpdate._id,
        name: userToUpdate.name,
        email: userToUpdate.email,
        role: userToUpdate.role,
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [PUT /api/users/[id]]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    if (authUser.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden. Admin access required.' },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    await connectToDatabase();

    if (authUser._id.toString() === id) {
      return NextResponse.json(
        { success: false, error: 'You cannot delete your own account while logged in.' },
        { status: 400 }
      );
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json(
        { success: false, error: 'User not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully.',
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [DELETE /api/users/[id]]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to delete user' },
      { status: 500 }
    );
  }
}

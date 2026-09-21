import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';
import { getAuthUser } from '@/lib/auth';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    await connectToDatabase();

    const member = await TeamMember.findById(id).lean();
    if (!member) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: member });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [GET /api/team/[id]]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch team member' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in to CMS.' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    await connectToDatabase();

    const body = await request.json();
    const { name, title, description, image, order } = body;

    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name.trim();
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (image !== undefined) updateData.image = image.trim();
    if (order !== undefined) updateData.order = Number(order);

    const updatedMember = await TeamMember.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedMember) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedMember,
      message: 'Team member updated successfully',
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [PUT /api/team/[id]]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to update team member' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in to CMS.' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    await connectToDatabase();

    const deletedMember = await TeamMember.findByIdAndDelete(id);
    if (!deletedMember) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Team member deleted successfully',
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [DELETE /api/team/[id]]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to delete team member' },
      { status: 500 }
    );
  }
}

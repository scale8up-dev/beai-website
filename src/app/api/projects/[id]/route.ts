import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Project from '@/models/Project';
import { getAuthUser } from '@/lib/auth';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    await connectToDatabase();

    const project = await Project.findById(id).lean();
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [GET /api/projects/[id]]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch project' },
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
    const { name, year, tag, image, link, order } = body;

    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name.trim();
    if (year !== undefined) updateData.year = year.trim();
    if (tag !== undefined) updateData.tag = tag.trim();
    if (image !== undefined) updateData.image = image.trim();
    if (link !== undefined) updateData.link = link.trim();
    if (order !== undefined) updateData.order = Number(order);

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedProject,
      message: 'Project updated successfully',
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [PUT /api/projects/[id]]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to update project' },
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

    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [DELETE /api/projects/[id]]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to delete project' },
      { status: 500 }
    );
  }
}

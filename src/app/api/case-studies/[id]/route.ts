import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';
import { getAuthUser } from '@/lib/auth';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    await connectToDatabase();

    const caseStudy = await CaseStudy.findById(id).lean();
    if (!caseStudy) {
      return NextResponse.json(
        { success: false, error: 'Case study not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: caseStudy });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [GET /api/case-studies/[id]]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch case study' },
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
    const {
      title,
      client,
      shortDescription,
      metrics,
      tags,
      duration,
      category,
      deliverables,
      link,
      markdown,
      order,
    } = body;

    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title.trim();
    if (client !== undefined) updateData.client = client.trim();
    if (shortDescription !== undefined) {
      if (shortDescription.trim().length > 150) {
        return NextResponse.json(
          { success: false, error: 'Short description cannot exceed 150 characters.' },
          { status: 400 }
        );
      }
      updateData.shortDescription = shortDescription.trim();
    }
    if (metrics !== undefined) {
      updateData.metrics = Array.isArray(metrics) ? metrics.slice(0, 3) : [];
    }
    if (tags !== undefined) {
      updateData.tags = Array.isArray(tags) ? tags.slice(0, 5) : [];
    }
    if (duration !== undefined) updateData.duration = duration.trim();
    if (category !== undefined) updateData.category = category.trim();
    if (deliverables !== undefined) {
      updateData.deliverables = Array.isArray(deliverables) ? deliverables : [];
    }
    if (link !== undefined) updateData.link = link.trim();
    if (markdown !== undefined) updateData.markdown = markdown.trim();
    if (order !== undefined) updateData.order = Number(order);

    const updatedCaseStudy = await CaseStudy.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedCaseStudy) {
      return NextResponse.json(
        { success: false, error: 'Case study not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedCaseStudy,
      message: 'Case study updated successfully',
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [PUT /api/case-studies/[id]]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to update case study' },
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

    const deletedCaseStudy = await CaseStudy.findByIdAndDelete(id);
    if (!deletedCaseStudy) {
      return NextResponse.json(
        { success: false, error: 'Case study not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Case study deleted successfully',
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [DELETE /api/case-studies/[id]]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to delete case study' },
      { status: 500 }
    );
  }
}

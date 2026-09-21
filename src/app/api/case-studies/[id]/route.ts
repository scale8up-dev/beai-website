import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
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

    let caseStudy = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      caseStudy = await CaseStudy.findById(id).lean();
    }
    if (!caseStudy) {
      caseStudy = await CaseStudy.findOne({
        $or: [
          { slug: id.toLowerCase() },
          { title: { $regex: new RegExp(`^${id.replace(/-/g, ' ')}$`, 'i') } },
        ],
      }).lean();
    }

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
      cardTitle,
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
    if (cardTitle !== undefined) {
      if (cardTitle.trim().length > 25) {
        return NextResponse.json(
          { success: false, error: 'Card title cannot exceed 25 characters.' },
          { status: 400 }
        );
      }
      updateData.cardTitle = cardTitle.trim().slice(0, 25);
    }
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
    if (body.slug !== undefined) {
      updateData.slug = body.slug.trim().toLowerCase();
    } else if (title !== undefined) {
      updateData.slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    if (order !== undefined) updateData.order = Number(order);

    let updatedCaseStudy = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      updatedCaseStudy = await CaseStudy.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
    } else {
      updatedCaseStudy = await CaseStudy.findOneAndUpdate(
        { slug: id.toLowerCase() },
        { $set: updateData },
        { new: true, runValidators: true }
      );
    }

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

    let deletedCaseStudy = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      deletedCaseStudy = await CaseStudy.findByIdAndDelete(id);
    } else {
      deletedCaseStudy = await CaseStudy.findOneAndDelete({ slug: id.toLowerCase() });
    }

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

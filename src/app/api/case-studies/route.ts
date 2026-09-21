import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';
import { getAuthUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    const query: Record<string, unknown> = {};

    if (search && search.trim()) {
      const sanitized = search.trim().slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.$or = [
        { title: { $regex: sanitized, $options: 'i' } },
        { client: { $regex: sanitized, $options: 'i' } },
        { category: { $regex: sanitized, $options: 'i' } },
        { shortDescription: { $regex: sanitized, $options: 'i' } },
        { tags: { $in: [new RegExp(sanitized, 'i')] } },
      ];
    }

    if (category && category !== 'ALL') {
      query.category = category;
    }

    const caseStudies = await CaseStudy.find(query)
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, count: caseStudies.length, data: caseStudies });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [GET /api/case-studies]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch case studies' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in to CMS.' },
        { status: 401 }
      );
    }

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

    if (!title || !client || !shortDescription || !duration || !category || !markdown) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: Title, Client, Short Description, Duration, Category, and Markdown are required.',
        },
        { status: 400 }
      );
    }

    if (cardTitle && cardTitle.trim().length > 25) {
      return NextResponse.json(
        {
          success: false,
          error: 'Card title cannot exceed 25 characters.',
        },
        { status: 400 }
      );
    }

    if (shortDescription.trim().length > 150) {
      return NextResponse.json(
        {
          success: false,
          error: 'Short description cannot exceed 150 characters.',
        },
        { status: 400 }
      );
    }

    const formattedMetrics = Array.isArray(metrics) ? metrics.slice(0, 3) : [];
    const formattedTags = Array.isArray(tags) ? tags.slice(0, 5) : [];
    const formattedDeliverables = Array.isArray(deliverables) ? deliverables : [];
    const derivedSlug = (body.slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newCaseStudy = await CaseStudy.create({
      title: title.trim(),
      cardTitle: cardTitle ? cardTitle.trim().slice(0, 25) : undefined,
      slug: derivedSlug,
      client: client.trim(),
      shortDescription: shortDescription.trim(),
      metrics: formattedMetrics,
      tags: formattedTags,
      duration: duration.trim(),
      category: category.trim(),
      deliverables: formattedDeliverables,
      link: (link || '#').trim(),
      markdown: markdown.trim(),
      order: typeof order === 'number' ? order : 0,
    });

    return NextResponse.json(
      { success: true, data: newCaseStudy, message: 'Case study created successfully' },
      { status: 201 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [POST /api/case-studies]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to create case study' },
      { status: 500 }
    );
  }
}

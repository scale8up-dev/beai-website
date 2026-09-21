import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Project from '@/models/Project';
import { getAuthUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const tag = searchParams.get('tag');

    const query: Record<string, unknown> = {};

    if (search && search.trim()) {
      const sanitized = search.trim().slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.$or = [
        { name: { $regex: sanitized, $options: 'i' } },
        { tag: { $regex: sanitized, $options: 'i' } },
        { year: { $regex: sanitized, $options: 'i' } },
      ];
    }

    if (tag) {
      query.tag = tag;
    }

    const projects = await Project.find(query)
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, count: projects.length, data: projects });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [GET /api/projects]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch projects' },
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
    const { name, year, tag, image, link, order } = body;

    if (!name || !year || !tag || !image) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name, year, tag, and image are required.',
        },
        { status: 400 }
      );
    }

    const newProject = await Project.create({
      name: name.trim(),
      year: year.trim(),
      tag: tag.trim(),
      image: image.trim(),
      link: (link || '#').trim(),
      order: typeof order === 'number' ? order : 0,
    });

    return NextResponse.json(
      { success: true, data: newProject, message: 'Project created successfully' },
      { status: 201 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [POST /api/projects]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to create project' },
      { status: 500 }
    );
  }
}

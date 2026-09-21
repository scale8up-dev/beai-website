import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';
import { getAuthUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const team = await TeamMember.find(query)
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, count: team.length, data: team });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [GET /api/team]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch team members' },
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
    const { name, title, description, image, order } = body;

    if (!name || !title || !description || !image) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name, title, description, and image are required.',
        },
        { status: 400 }
      );
    }

    const newMember = await TeamMember.create({
      name: name.trim(),
      title: title.trim(),
      description: description.trim(),
      image: image.trim(),
      order: typeof order === 'number' ? order : 0,
    });

    return NextResponse.json(
      { success: true, data: newMember, message: 'Team member added successfully' },
      { status: 201 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [POST /api/team]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to create team member' },
      { status: 500 }
    );
  }
}

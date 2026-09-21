import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';
import defaultTeam from '@/data/teamList.json';
import { getAuthUser } from '@/lib/auth';

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

    const formattedMembers = defaultTeam.map((m, index) => ({
      name: m.name || `Team Member ${index + 1}`,
      title: m.role || 'Team Member',
      description: m.bio || '',
      image: m.image || '/team/domingo.svg',
      order: index,
    }));

    const existingCount = await TeamMember.countDocuments();

    if (existingCount > 0) {
      return NextResponse.json({
        success: true,
        message: `Database already contains ${existingCount} team members. Seed skipped to avoid duplicates.`,
        count: existingCount,
      });
    }

    const inserted = await TeamMember.insertMany(formattedMembers);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${inserted.length} team members into MongoDB.`,
      count: inserted.length,
      data: inserted,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [POST /api/team/seed]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to seed team members' },
      { status: 500 }
    );
  }
}

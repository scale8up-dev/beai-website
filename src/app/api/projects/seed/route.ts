import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Project from '@/models/Project';
import defaultProjects from '@/data/projectsList.json';
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

    // Map default projects to schema
    const formattedProjects = defaultProjects.map((p, index) => ({
      name: p.title || `Project ${index + 1}`,
      year: p.year || new Date().getFullYear().toString(),
      tag: p.tag || 'Web Development',
      image: p.imageLink || '/slideshow/1.jpg',
      link: p.link || '#',
      order: index,
    }));

    // Check existing count
    const existingCount = await Project.countDocuments();

    if (existingCount > 0) {
      // If records already exist, insert only if forced or return info
      return NextResponse.json({
        success: true,
        message: `Database already contains ${existingCount} projects. Seed skipped to avoid overwriting existing data.`,
        count: existingCount,
      });
    }

    const inserted = await Project.insertMany(formattedProjects);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${inserted.length} projects into MongoDB.`,
      count: inserted.length,
      data: inserted,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [POST /api/projects/seed]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to seed projects' },
      { status: 500 }
    );
  }
}

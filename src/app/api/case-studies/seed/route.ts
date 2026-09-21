import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import connectToDatabase from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';
import defaultCaseStudies from '@/data/caseStudies.json';

export async function POST() {
  try {
    await connectToDatabase();

    const existingCount = await CaseStudy.countDocuments();
    if (existingCount > 0) {
      return NextResponse.json({
        success: true,
        message: `Database already contains ${existingCount} case studies. Seed skipped to avoid duplicates.`,
        count: existingCount,
      });
    }

    const formattedCaseStudies = await Promise.all(
      defaultCaseStudies.map(async (cs, index) => {
        let markdownContent = '';
        try {
          const mdPath = path.join(
            process.cwd(),
            'src',
            'content',
            'case-studies',
            `${cs.id}.md`
          );
          markdownContent = await readFile(mdPath, 'utf8');
        } catch {
          markdownContent = `## Project Overview\n\n${cs.overview || cs.summary}\n\n## The Challenge\n\n${cs.challenge}\n\n## The Solution\n\n${cs.solution}`;
        }

        const shortDesc = (cs.tagline || cs.summary || cs.title).slice(0, 150);

        return {
          title: cs.title,
          client: cs.client,
          shortDescription: shortDesc,
          metrics: (cs.results || []).slice(0, 3).map((r) => ({
            label: r.label,
            value: r.value,
          })),
          tags: (cs.tags || []).slice(0, 5),
          duration: cs.timeline || '8 Weeks',
          category: cs.category || 'AI Solutions',
          deliverables: cs.deliverables || [],
          link: cs.link || '#',
          markdown: markdownContent,
          order: index,
        };
      })
    );

    const inserted = await CaseStudy.insertMany(formattedCaseStudies);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${inserted.length} case studies into MongoDB.`,
      count: inserted.length,
      data: inserted,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error [POST /api/case-studies/seed]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to seed case studies' },
      { status: 500 }
    );
  }
}

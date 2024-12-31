import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

// Get Ranking
export async function GET() {
  try {
    const submits = await prisma.submits.findMany({
      where: {
        selected: true,
      },
    });

    return NextResponse.json(submits, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching submit:', error);

    return NextResponse.json(
      { error: 'Failed to fetch submit' },
      { status: 500 },
    );
  }
}

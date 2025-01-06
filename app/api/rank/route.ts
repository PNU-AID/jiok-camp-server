import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';
import { auth } from '@/libs/auth';

// Get Ranking
export async function GET() {
  try {
    const session = await auth();
    console.log('login user info: ', session);

    // 로그인되지 않았을 때
    if (!session?.user) {
      return NextResponse.json(
        {
          message: '로그인이 필요합니다.',
        },
        { status: 401 },
      );
    }

    // 로그인한 유저가 관리자일 때
    if (session?.user.role === 'ADMIN') {
      const submits = await prisma.submits.findMany({
        where: {
          selected: true,
        },
        select: {
          id: true,
          filename: true,
          selected: true,
          private_score: true,
        },
      });
      return NextResponse.json(submits, { status: 200 });
    } else {
      // 로그인한 유저가 일반유저(TEAM)일 때
      // 날짜 설정
      const now = new Date();
      now.setHours(now.getHours() + 9); // UTC 시간 수정
      const referenceDate = new Date('2025-02-24T00:00:00+09:00'); // 기준 날짜 (KST)

      const orderingField =
        now < referenceDate ? 'public_score' : 'private_score';
      const isPrivate = now < referenceDate ? false : true;

      const submits = await prisma.submits.findMany({
        where: {
          selected: true,
        },
        select: {
          id: true,
          filename: true,
          selected: true,
          public_score: true,
          private_score: isPrivate,
        },
        orderBy: {
          [orderingField]: 'desc', // 동적으로 정렬 필드 설정
        },
      });

      return NextResponse.json(submits, { status: 200 });
    }
  } catch (error: unknown) {
    console.error('Error fetching submit:', error);

    return NextResponse.json(
      { error: 'Failed to fetch submit' },
      { status: 500 },
    );
  }
}

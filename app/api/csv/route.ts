import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

// Submit csv
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filename, user_id, selected, private_score, public_score } = body;

    if (
      !filename ||
      !user_id ||
      private_score === undefined ||
      public_score === undefined
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // 동일 사용자의 제출 내역 확인
    const existingSubmits = await prisma.submits.findMany({
      where: {
        user_id: user_id,
      },
    });

    // 최초 제출 여부에 따라 selected 값 설정
    const isFirstSubmission = existingSubmits.length === 0;

    const submit = await prisma.submits.create({
      data: {
        filename,
        user_id,
        selected: isFirstSubmission ? true : (selected ?? false),
        private_score,
        public_score,
      },
    });

    return NextResponse.json(submit, {
      status: 201,
    });
  } catch (error: unknown) {
    console.log(JSON.stringify(error));
    // console.log(error); // 이거는 왜 안되지?

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: 'Unexpected error occurred' },
      { status: 500 },
    );
  }
}

// Select csv
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is not found.' },
        { status: 400 },
      );
    }

    // user_id 구하기
    const submit = await prisma.submits.findUnique({
      where: {
        id: id,
      },
    });

    if (!submit) {
      return NextResponse.json(
        { error: 'Submission not found.' },
        { status: 404 },
      );
    }

    const userId = submit.user_id;

    // user_id가 true인 것은 모두 false로, 지정한 건 true로
    const updatedSubmit = await prisma.$transaction(async (prisma) => {
      await prisma.submits.updateMany({
        where: {
          user_id: userId,
          selected: true,
        },
        data: {
          selected: false,
        },
      });

      return prisma.submits.update({
        where: {
          id: id,
        },
        data: {
          selected: true,
        },
      });
    });

    return NextResponse.json(
      { message: 'Selection updated successfully', user: updatedSubmit },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.log(JSON.stringify(error));

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}

// Get csv
export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const userId = params.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }, // 잘못된 요청 상태 코드 반환
      );
    }

    const submits = await prisma.submits.findMany({
      where: {
        user_id: parseInt(userId),
      },
    });

    return NextResponse.json(submits, { status: 200 });
  } catch (error: unknown) {
    console.log(JSON.stringify(error));

    return NextResponse.json(
      { error: 'Failed to fetch submit' },
      { status: 500 },
    );
  }
}

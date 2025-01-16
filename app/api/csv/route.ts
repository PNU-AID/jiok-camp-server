import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';
import { auth } from '@/libs/auth';
import fs from 'fs';
import path from 'path';

// Submit csv
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file'); // CSV 파일
    const session = await auth();
    const id = session?.user.id; // TEXT

    if (!file || !id) {
      return NextResponse.json(
        { error: 'File or ID is missing' },
        { status: 400 },
      );
    }

    // 파일이 실제로 File 타입인지 확인
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // 동일 사용자의 제출 내역 확인
    const existingSubmits = await prisma.submits.findMany({
      where: {
        user_id: parseInt(id as string, 10),
      },
    });

    // 최초 제출 여부에 따라 selected 값 설정
    const isFirstSubmission = existingSubmits.length === 0;

    // 제출 횟수 제한
    if (existingSubmits.length > 30) {
      return NextResponse.json(
        { error: 'Number of submissions exceeded' },
        { status: 400 },
      );
    }

    // 파일명 - 시간 설정
    const now = new Date();
    now.setHours(now.getHours() + 9); // UTC 시간 수정
    const timestamp = now
      .toISOString()
      .replace(/[-T:.Z]/g, '')
      .slice(0, 14);
    const filename = `${timestamp}-${id}.csv`;

    // 제출한 csv 경로 설정
    const csvDir = path.join(process.cwd(), 'csv');
    const answerFilePath = path.join(csvDir, filename);

    // csv 폴더가 없다면 생성
    if (!fs.existsSync(path.dirname(csvDir))) {
      fs.mkdirSync(path.dirname(csvDir), { recursive: true });
    }

    // 제출한 csv 받아서 저장하기
    const fileData = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(answerFilePath, fileData);

    // solution csv 경로 설정
    const solutionFilePath = path.join(csvDir, 'solution.csv');
    if (!fs.existsSync(solutionFilePath)) {
      return NextResponse.json(
        { error: 'Solution file not found' },
        { status: 500 },
      );
    }
    const solutionContent = await fs.readFileSync(solutionFilePath, 'utf-8');
    const solutionLines = solutionContent
      .split(/\r?\n/)
      .filter((line: string) => line.trim() !== ''); // type string으로 지정

    // solution.csv 파싱
    const solutionMap: Record<
      string,
      { solution: string; isPrivate: boolean }
    > = {};
    for (let i = 1; i < solutionLines.length; i++) {
      // 첫 번째 라인은 헤더
      const [solId, solution, priv] = solutionLines[i].split(/\t|,/); // 탭 또는 콤마 구분
      if (solId && solution && priv !== undefined) {
        solutionMap[solId.trim()] = {
          solution: solution.trim(),
          isPrivate: priv.trim() === '1',
        };
      }
    }

    // 제출한 csv 읽기
    const answerContent = await fs.readFileSync(answerFilePath, 'utf-8');
    const answerLines = answerContent
      .split(/\r?\n/)
      .filter((line: string) => line.trim() !== '');

    console.info(solutionLines);
    console.info(answerLines);

    // 점수 계산
    let correctPublic = 0;
    let totalPublic = 0;
    let correctPrivate = 0;
    let totalPrivate = 0;

    for (let i = 1; i < answerLines.length; i++) {
      // 첫 번째 라인은 헤더
      const [ansId, answer] = answerLines[i].split(/\t|,/); // 탭 또는 콤마 구분
      if (ansId && answer && solutionMap[ansId.trim()]) {
        const sol = solutionMap[ansId.trim()];
        if (sol.isPrivate) {
          totalPrivate += 1;
          if (answer.trim() === sol.solution) {
            correctPrivate += 1;
          }
        } else {
          totalPublic += 1;
          if (answer.trim() === sol.solution) {
            correctPublic += 1;
          }
        }
      }
    }

    // 점수 계산
    const public_score = totalPublic > 0 ? correctPublic / totalPublic : 0;
    const private_score = totalPrivate > 0 ? correctPrivate / totalPrivate : 0;

    const submit = await prisma.submits.create({
      data: {
        filename,
        user_id: parseInt(id as string, 10),
        selected: isFirstSubmission,
        private_score,
        public_score,
      },
    });

    const response = {
      id: submit.id,
      filename: submit.filename,
      user_id: submit.user_id,
      selected: submit.selected,
      public_score: submit.public_score, // public_score만 포함
    };

    return NextResponse.json(response, {
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
    const session = await auth();

    // 로그인되지 않았을 때
    if (!session?.user) {
      return NextResponse.json(
        {
          message: '로그인이 필요합니다.',
        },
        { status: 401 },
      );
    }
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

    // 자신의 csv만 선택할 수 있도록 함
    if (parseInt(session?.user.id) !== userId) {
      return NextResponse.json(
        { error: '자신의 csv만 선택할 수 있습니다.' },
        { status: 401 },
      );
    }

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
        select: {
          id: true,
          filename: true,
          selected: true,
          public_score: true,
        },
      });
    });

    return NextResponse.json(updatedSubmit, { status: 201 });
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
    const session = await auth();
    console.log('login user info: ', session);

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }, // 잘못된 요청 상태 코드 반환
      );
    }

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
      const response = await prisma.submits.findMany({
        include: {
          user: {
            select: {
              login_id: true,
            },
          },
        },
      });

      const processedResponse = response.map((submit) => ({
        ...submit,
        login_id: submit.user.login_id,
        user: undefined, // user 객체 제거
      }));

      return NextResponse.json(processedResponse, { status: 200 });
    } else {
      // 로그인한 유저가 일반유저(TEAM)일 때
      // 자신의 csv만 불러올 수 있도록 함
      if (session?.user.id !== userId) {
        return NextResponse.json(
          { error: '자신의 csv만 불러올 수 있습니다.' },
          { status: 401 },
        );
      }

      const response = await prisma.submits.findMany({
        where: {
          user_id: parseInt(userId),
        },
        select: {
          id: true,
          filename: true,
          selected: true,
          public_score: true,
        },
      });
      return NextResponse.json(response, { status: 200 });
    }
  } catch (error: unknown) {
    console.log(JSON.stringify(error));

    return NextResponse.json(
      { error: 'Failed to fetch submit' },
      { status: 500 },
    );
  }
}

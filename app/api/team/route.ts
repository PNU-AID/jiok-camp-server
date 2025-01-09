import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';
import { hashingPassword } from '@/libs/hasing';
import { auth } from '@/libs/auth';

// Create Team
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();
    const { login_id, password } = body;

    const hashedPw = await hashingPassword(password);

    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'ADMIN만 TEAM 생성이 가능합니다.' },
        { status: 401 },
      );
    }

    const user = await prisma.user.create({
      data: {
        login_id,
        password: hashedPw,
        role: 'TEAM',
      },
      select: {
        login_id: true,
        role: true,
        id: true,
      },
    });

    return NextResponse.json(user, {
      status: 201,
    });
  } catch (error: unknown) {
    console.log(JSON.stringify(error));

    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 },
    );
  }
}

// Read Teams
export async function GET() {
  const session = await auth();
  console.log('login user info: ', session);
  try {
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
      const users = await prisma.user.findMany({
        where: {
          role: 'TEAM',
        },
        select: {
          id: true,
          login_id: true,
        },
      });

      return NextResponse.json(users, { status: 200 });
    } else {
      // 로그인한 유저가 일반유저(TEAM)일 때
      return NextResponse.json(
        {
          message: '관리자만 이용할 수 있습니다.',
        },
        { status: 403 },
      );
    }
  } catch (error: unknown) {
    console.log(JSON.stringify(error));

    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 },
    );
  }
}

// Delete Team
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    const params = request.nextUrl.searchParams;
    const userId = params.get('id');

    // 로그인되지 않았을 때
    if (!session?.user) {
      return NextResponse.json(
        {
          message: '로그인이 필요합니다.',
        },
        { status: 401 },
      );
    }

    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자만 삭제가 가능합니다.' },
        { status: 401 },
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 },
      );
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id: parseInt(userId, 10),
      },
    });

    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error: unknown) {
    console.log(JSON.stringify(error));

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}

// Update Team password or name
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, login_id, newPassword } = body;
    const session = await auth();

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 },
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

    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자만 변경할 수 있습니다.' },
        { status: 401 },
      );
    }

    // null이 들어와도 처리되도록 수정
    const updateData: any = {};
    if (login_id) {
      updateData.login_id = login_id;
    }
    if (newPassword) {
      updateData.password = await hashingPassword(newPassword);
    }

    // 수정하려는 데이터가 들어오지 않았을 때
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    return NextResponse.json(updatedUser, { status: 201 });
  } catch (error: unknown) {
    console.log(JSON.stringify(error));

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}

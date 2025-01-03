import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';
import { hashingPassword } from '@/libs/hasing';
import { auth } from '@/libs/auth';

// Create Team
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { login_id, password } = body;

    const hashedPw = await hashingPassword(password);

    const user = await prisma.user.create({
      data: {
        login_id,
        password: hashedPw,
        role: 'TEAM',
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
      const users = await prisma.user.findMany({});

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
    const params = request.nextUrl.searchParams;
    const userId = params.get('id');

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

    if (!login_id || !newPassword) {
      return NextResponse.json(
        { error: 'User ID and new password are required' },
        { status: 400 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        login_id: login_id,
        password: newPassword,
      },
    });

    return NextResponse.json(
      { message: 'Password updated successfully', user: updatedUser },
      { status: 200 }, // OK
    );
  } catch (error: unknown) {
    console.log(JSON.stringify(error));

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

// Create Team
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { login_id, password, role } = body;

    const user = await prisma.user.create({
      data: {
        login_id,
        password,
        role,
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
  try {
    const users = await prisma.user.findMany({});

    return NextResponse.json(users, { status: 200 });
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

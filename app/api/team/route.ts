import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  return NextResponse.json(
    {
      test: params.get("test"),
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  return NextResponse.json(body, {
    status: 201,
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  return NextResponse.json(body, {
    status: 201,
  });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();

  return NextResponse.json(body, {
    status: 201,
  });
}

export async function DELETE(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  return NextResponse.json(
    {
      test: params.get("test"),
    },
    {
      status: 204,
    }
  );
}

import { prisma } from '@/prisma/prisma';
// import * as bcrypt from 'bcrypt';

interface RequestBody {
  teamname: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  console.log(body);
  const user = await prisma.user.findUnique({
    where: {
      login_id: body.teamname,
    },
  });

  if (user && body.password === user.password) {
    const result = {
      id: user.id,
      teamname: user.login_id,
      role: user.role,
    };
    console.log(user);
    return new Response(JSON.stringify(result));
  } else return new Response(JSON.stringify(null));
}

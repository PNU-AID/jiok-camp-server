import { comparePassword } from '@/libs/hasing';
import { prisma } from '@/prisma/prisma';

interface RequestBody {
  teamname: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const user = await prisma.user.findUnique({
    where: {
      login_id: body.teamname,
    },
  });

  if (user && (await comparePassword(body.password, user?.password ?? ''))) {
    const userObj = {
      id: user.id,
      teamname: user.login_id,
      role: user.role,
    };

    // const accessToken = signJwtAccessToken(userObj);

    return new Response(
      JSON.stringify({
        ...userObj,
        // accessToken,
      }),
    );
  } else return new Response(JSON.stringify(null));
}

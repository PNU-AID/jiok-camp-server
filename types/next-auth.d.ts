import NextAuth from 'next-auth';

export declare module 'next-auth' {
  interface User {
    id: number;
    teamname: string;
    role: string;
  }

  interface Session {
    user: {
      id: string;
      teamname: string;
      role: string;
      exp: number;
      iat: number;
      jti: string;
      sub: string;
    };
  }
}

export declare module '@auth/core/jwt' {
  interface JWT {
    id: number;
    teamname: string;
    role: string;
  }
}

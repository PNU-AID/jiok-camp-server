import NextAuth from 'next-auth';
declare module 'next-auth' {
  interface User {
    id: number;
    teamname: string;
    role: string;
  }

  interface Session {
    user: {
      id: number;
      teamname: string;
      role: string;
    };
  }
}

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        teamname: { label: 'Teamname', type: 'text', placeholder: 'team name' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/signin`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                teamname: credentials?.teamname,
                password: credentials?.password,
              }),
            },
          );

          const user = await res.json();
          console.log('user:', user);
          return user || null;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('in token:', user);
      return { ...token, ...user };
    },
    async session({ session, token }) {
      console.log('$$$ token: ', token);
      session.user = token as any;
      console.log('$$$ session: ', session);
      return session;
    },
  },
});

export const { handlers, auth, signIn, signOut } = handler;

'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const { data: session } = useSession();

  const [teamname, setTeamname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false, // redirect를 false로 설정하면, 페이지 리다이렉션 없이 결과를 확인할 수 있음
      teamname,
      password,
    });

    if (result?.error) {
      setError('Invalid team name or password');
    } else {
      setError(''); // 오류 초기화
    }
  };

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      {session && session.user ? (
        <div>
          <h1>teamname: {session.user.teamname}</h1>
          <button onClick={() => signOut()}>로그아웃</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="teamname">Teamname</label>
            <input
              type="text"
              id="teamname"
              name="teamname"
              value={teamname}
              onChange={(e) => setTeamname(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

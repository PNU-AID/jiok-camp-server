'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AidTop() {
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
    <section className="flex justify-between pt-10">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-9xl font-black md:text-8xl">
          {session
            ? session.user.role === 'ADMIN'
              ? 'ADMIN'
              : session.user.teamname
            : 'AID'}
        </h1>
        <h6 className="text-xl md:text-lg md:font-bold">
          미션: 6공학관 몇 층의 사진인지 분류해보자!
        </h6>
        <p className="text-xs text-gray-500">
          6공학관 내부의 이미지가 몇 층의 사진인지 분류하는 것이 미션입니다.
          <br />
          얼마 남지않은 6공학관, 잊지 말아주세요!
        </p>
        {session && session.user ? (
          <Link
            target="_blank"
            href="https://aidpnu.notion.site/AID-AI-Developer-11ef0e0d194f8108951efc1bce4b42fc?pvs=74"
            className="bg-aid-blue px-5 py-1 font-medium text-white"
          >
            학습데이터 & 템플릿코드 다운로드
          </Link>
        ) : undefined}
      </div>
      {session && session.user ? (
        <div>
          <button onClick={() => signOut()}>로그아웃</button>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5 px-5 py-10">
          <h2 className="text-2xl font-bold">로그인</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
            <div className="border-line-gray border-0.5 w-[256px] px-4 py-2">
              <input
                className="w-full text-xs"
                type="text"
                id="teamname"
                name="teamname"
                placeholder="팀 이름"
                value={teamname}
                onChange={(e) => setTeamname(e.target.value)}
                required
              />
            </div>
            <div className="border-line-gray border-0.5 w-[256px] px-4 py-2">
              <input
                className="w-full text-xs"
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button
              type="submit"
              className="bg-aid-blue px-5 py-1 font-medium text-white"
            >
              로그인
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

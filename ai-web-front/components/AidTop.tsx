'use client';

import { downloadUrl } from '@/constants';
import { UserInfo } from '@/types/next-auth';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function AidTop(props: { user: UserInfo | undefined }) {
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

  return (
    <section className="flex items-center justify-between pt-10">
      <div className="flex flex-col items-start gap-2">
        <h1
          className={`text-9xl font-black md:text-8xl ${props.user && props.user.role === 'ADMIN' ? 'text-aid-red' : ''}`}
        >
          {props.user
            ? props.user.role === 'ADMIN'
              ? 'ADMIN'
              : props.user.teamname
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
        {props.user ? (
          <Link
            target="_blank"
            href={downloadUrl}
            className="bg-aid-blue px-5 py-1 font-medium text-white"
          >
            Data & Baseline Code 다운로드
          </Link>
        ) : undefined}
      </div>
      {props.user ? (
        <div>
          <button onClick={() => signOut()}>로그아웃</button>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5 px-5 py-10">
          <h2 className="text-2xl font-bold">로그인</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
            <div className="w-[256px] border-0.5 border-line-gray px-4 py-2">
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
            <div className="w-[256px] border-0.5 border-line-gray px-4 py-2">
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

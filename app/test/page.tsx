'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Test() {
  const session = useSession();

  if (session.status === 'authenticated') {
    console.log('');
    console.log('team:', session.data?.user.teamname);
    console.log('jti:', session.data?.user.jti);
    console.log('iat:', session.data?.user.iat);
    console.log('exp:', session.data?.user.exp);
    console.log('now:', new Date());

    return (
      <div>
        <p>축하합니다!</p>
        <p>이 페이지를 발견하셨다면</p>
        <p>&apos;F12&apos;를 눌러 콘솔창과 함께 화면 전체를</p>
        <p>캡처 후 운영진에게 DM으로 보내주세요</p>
        <p>소정의 상품을 드립니다 🤗</p>
        <img src="https://media.tenor.com/tNfwApVE9RAAAAAM/orange-cat-laughing.gif" />
        <Link href={'/'} className="text-blue-400">
          메인페이지로 돌아가기
        </Link>
      </div>
    );
  }
  return (
    <div>
      <div>로그인 후 이 페이지로 접속하면 좋은 일이 생길지도..?</div>
      <Link href={'/'} className="text-blue-400">
        메인페이지로 돌아가기
      </Link>
    </div>
  );
}

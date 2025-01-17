'use client';

import { useSession } from 'next-auth/react';

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
        <p>이 페이지를 발견하셨다면</p>
        <p>&apos;F12&apos;를 눌러 콘솔창과 함께 화면 전체를</p>
        <p>캡처 후 운영진에게 DM으로 보내주세요</p>
        <img src="https://media.tenor.com/tNfwApVE9RAAAAAM/orange-cat-laughing.gif" />
      </div>
    );
  }
  return <div></div>;
}

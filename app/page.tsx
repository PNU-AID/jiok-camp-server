'use client';

import AidTop from '@/components/AidTop';
import Rank from '@/components/Rank';
import Submit from '@/components/Submit';
import Team from '@/components/Team';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  // session 로딩 중
  if (session === undefined) return <div />;

  // session 로딩 완료, session !== undefined
  return (
    <div className="flex flex-col gap-24 py-12">
      <AidTop user={session?.user} />
      <Rank user={session?.user} />
      <Submit user={session?.user} />
      {session?.user.role === 'ADMIN' ? <Team /> : undefined}
    </div>
  );
}

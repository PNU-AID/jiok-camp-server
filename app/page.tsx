'use client';

import AidTop from '@/components/AidTop';
import LoadingSpinner from '@/components/LoadingSpinner';
import Rank from '@/components/Rank';
import Submit from '@/components/Submit';
import Team from '@/components/Team';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const { data: session } = useSession();

  const [refresh, setRefresh] = useState<number>(0);

  // session 로딩 중
  if (session === undefined) return <LoadingSpinner />;

  // session 로딩 완료, session !== undefined
  return (
    <div className="flex flex-col gap-24 py-12">
      <AidTop user={session?.user} />
      <Rank user={session?.user} refresh={refresh} setRefresh={setRefresh} />
      <Submit user={session?.user} refresh={refresh} setRefresh={setRefresh} />
      {session?.user.role === 'ADMIN' ? <Team /> : undefined}
    </div>
  );
}

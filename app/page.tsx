'use client';

import AidTop from '@/components/AidTop';
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
    <div className="flex flex-col py-12">
      <AidTop user={session?.user} />
    </div>
  );
}

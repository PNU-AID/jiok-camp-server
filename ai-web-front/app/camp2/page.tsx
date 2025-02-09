'use client';

import AidTop from '@/components/AidTop';
import LoadingSpinner from '@/components/LoadingSpinner';
import MobileCaution from '@/components/MobileCaution';
import Rank from '@/components/Rank';
import Submit from '@/components/Submit';
import Team from '@/components/Team';
import getIsMobile from '@/libs/isMobile';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Camp2() {
  const { data: session } = useSession();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);

  useEffect(() => {
    setIsMobile(getIsMobile());
  }, []);

  return (
    <main className="m-auto mt-20 w-[896px] px-12 md:mt-16 md:px-0">
      <div className="flex flex-col gap-24 py-12">
        {session === undefined ? (
          // session 로딩 중
          <div className="h-screen">
            <LoadingSpinner />
          </div>
        ) : (
          // session 로딩 완료, session !== undefined
          <>
            {isMobile ? <MobileCaution /> : undefined}
            <AidTop user={session?.user} />
            <Rank
              user={session?.user}
              refresh={refresh}
              setRefresh={setRefresh}
            />
            <Submit
              user={session?.user}
              refresh={refresh}
              setRefresh={setRefresh}
            />
            {session?.user.role === 'ADMIN' ? <Team /> : undefined}
          </>
        )}
      </div>
    </main>
  );
}

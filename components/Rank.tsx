'use client';

import { getRank } from '@/apis/rank';
import { ScoreOpenDate } from '@/constants';
import { GetRankRes } from '@/types/api/rank';
import { UserInfo } from '@/types/next-auth';
import { useEffect, useState } from 'react';

export default function Rank(props: { user: UserInfo | undefined }) {
  const [data, setData] = useState<GetRankRes>([]);

  useEffect(() => {
    const rankFetcher = async () => {
      const rankData = await getRank();
      if (rankData) setData(rankData);
    };

    rankFetcher();
  }, [props.user]);

  const nowDate = new Date();

  return (
    <div className="flex w-full flex-col gap-2.5">
      <h1 className="text-2xl font-black">RANK👑</h1>
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between font-bold">
          <h3 className="w-20 text-center">Rank</h3>
          <div className="flex w-4/5 justify-around gap-2.5 border-t-0.5 border-line-gray/50 px-8 py-5">
            <h3 className="w-32 text-center">TeamName</h3>
            <h3 className="w-32 text-center">Public Score</h3>
            {nowDate >= ScoreOpenDate ||
            (props.user && props.user.role === 'ADMIN') ? (
              <h3 className="w-32 text-center">Private Score</h3>
            ) : undefined}
          </div>
        </div>
        <div className="h-80 w-full overflow-y-scroll">
          {data.length ? (
            data.map((row, index) => {
              return (
                <div
                  key={`rank-${index + 1}-${row.id}`}
                  className="flex w-full items-center justify-between font-medium"
                >
                  <h3 className="w-20 text-center">{index + 1}</h3>
                  <div className="flex w-4/5 justify-around gap-2.5 border-t-0.5 border-line-gray/50 px-8 py-5">
                    <h3 className="w-32 text-center">
                      {row.login_id ?? `team${index + 1}`}
                    </h3>
                    <h3 className="w-32 text-center">
                      {(row.public_score ?? 0).toFixed(3)}
                    </h3>
                    {nowDate >= ScoreOpenDate ||
                    (props.user && props.user.role === 'ADMIN') ? (
                      <h3 className="w-32 text-center">
                        {(row.private_score ?? 0).toFixed(3)}
                      </h3>
                    ) : undefined}
                  </div>
                </div>
              );
            })
          ) : (
            <h3 className="text-center font-medium">
              정보를 불러오는 중 입니다...
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

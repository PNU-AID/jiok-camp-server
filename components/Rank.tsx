'use client';

import { getRank } from '@/apis/rank';
import { HelpText } from '@/components/HelpText';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ScoreOpenDate } from '@/constants';
import dateFormat from '@/libs/dateFormat';
import { GetRankRes } from '@/types/api/rank';
import { UserInfo } from '@/types/next-auth';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function Rank(props: {
  user: UserInfo | undefined;
  refresh: number;
  setRefresh: Dispatch<SetStateAction<number>>;
}) {
  const [data, setData] = useState<GetRankRes>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const nowDate = new Date();

  const descriptions = [
    `최종 점수 공개(${dateFormat(ScoreOpenDate)})전까지 Public Score만 공개됩니다.`,
    `점수 공개일부터 Public 및 Private Score가 공개되며, Private Score를 기준으로 평가됩니다.`,
  ];

  useEffect(() => {
    const rankFetcher = async () => {
      const rankData = await getRank();
      if (rankData) {
        setData(rankData);
        setIsLoading(false);
      }
    };

    rankFetcher();
  }, [props.user, props.refresh]);

  return (
    <div className="relative flex w-full flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-black">RANK👑</h1>
        <HelpText descriptions={descriptions} />
      </div>
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
        <div className="w-full">
          {data.length ? (
            data.map((row, index) => {
              return (
                <div
                  key={`rank-${index + 1}-${row.id}`}
                  className={`flex w-full items-center justify-between font-medium ${props.user && row.login_id === props.user.teamname ? 'bg-[#FFEEEE]' : ''}`}
                >
                  <h3 className="w-20 text-center">{index + 1}</h3>
                  <div className="flex w-4/5 justify-around gap-2.5 border-t-0.5 border-line-gray/50 px-8 py-5">
                    <h3 className="w-32 text-center">
                      {row.login_id ?? `team${index + 1}`}
                    </h3>
                    <h3 className="w-32 text-center">
                      {(row.public_score ?? 0).toFixed(4)}
                    </h3>
                    {nowDate >= ScoreOpenDate ||
                    (props.user && props.user.role === 'ADMIN') ? (
                      <h3 className="w-32 text-center">
                        {(row.private_score ?? 0).toFixed(4)}
                      </h3>
                    ) : undefined}
                  </div>
                </div>
              );
            })
          ) : isLoading ? (
            <div className="py-2">
              <LoadingSpinner />
            </div>
          ) : (
            <h3 className="py-5 text-center font-medium">
              제출한 팀이 없습니다.
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

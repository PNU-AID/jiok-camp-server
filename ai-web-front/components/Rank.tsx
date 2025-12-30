'use client';

import { getRank } from '@/hooks/apis/camp2/rank';
import { HelpText } from '@/components/HelpText';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ScoreOpenDate } from '@/constants';
import dateFormat from '@/libs/dateFormat';
import useInterval from '@/libs/useInterval';
import { GetRankRes } from '@/types/api/rank';
import { UserInfo } from '@/types/next-auth';
import { useEffect, useState } from 'react';

interface RankProps {
  user?: UserInfo;
  refresh: number;
  isEng?: boolean;
}

function millisecondsToTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

export default function Rank({ user, refresh, isEng = false }: RankProps) {
  const nowDate = new Date();

  const [data, setData] = useState<GetRankRes>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timeRemainingMs, setTimeRemainingMs] = useState<number>(
    ScoreOpenDate.valueOf() - nowDate.valueOf(),
  );

  const descriptions = [
    `최종 점수 공개(${dateFormat(ScoreOpenDate)})전까지 Public Score만 공개됩니다.`,
    `점수 공개일부터 Public 및 Private Score가 공개되며, Private Score를 기준으로 평가됩니다.`,
  ];
  const descriptionsEng = [
    `Until the final score announcement on ${dateFormat(ScoreOpenDate)},`,
    `only the Public Score will be shown.`,
    `After the announcement, both Public and Private Scores will be disclosed,`,
    `with final rankings determined by the Private Score.`,
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
  }, [user, refresh]);

  useInterval(() => {
    setTimeRemainingMs(ScoreOpenDate.valueOf() - new Date().valueOf());
  }, 1000);

  return (
    <div className="relative flex w-full flex-col gap-2.5">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black">RANK👑</h1>
          <HelpText descriptions={isEng ? descriptionsEng : descriptions} />
        </div>
        {timeRemainingMs >= 0 && (
          <div className="flex items-center gap-4">
            <p
              className={`font-medium ${timeRemainingMs < 1000 * 60 * 60 * 6 ? 'text-red-600' : ''}`}
            >
              {isEng
                ? 'Until Private Score Release & Submission Deadline'
                : 'Private Score 공개 & 제출 마감까지'}{' '}
              - {millisecondsToTime(timeRemainingMs)}
            </p>
          </div>
        )}
      </div>
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between font-bold">
          <h3 className="w-20 text-center">Rank</h3>
          <div className="flex w-4/5 justify-around gap-2.5 border-t-0.5 border-line-gray/50 px-8 py-5">
            <h3 className="w-32 text-center">TeamName</h3>
            <h3 className="w-32 text-center">Public Score</h3>
            {nowDate >= ScoreOpenDate || (user && user.role === 'ADMIN') ? (
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
                  className={`flex w-full items-center justify-between font-medium ${user && row.login_id === user.teamname ? 'bg-[#FFEEEE]' : ''}`}
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
                    (user && user.role === 'ADMIN') ? (
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
              {isEng
                ? 'There are no submissions yet.'
                : '제출한 팀이 없습니다.'}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

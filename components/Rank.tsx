'use client';

import { ScoreOpenDate } from '@/constants';
import { UserInfo } from '@/types/next-auth';
import { useState } from 'react';

export default function Rank(props: { user: UserInfo | undefined }) {
  const [data, setData] = useState([
    {
      id: 1,
      login_id: 'team1',
      private_score: 90,
      public_score: 90.25,
    },
    {
      id: 2,
      login_id: 'team2',
      private_score: 90,
      public_score: 89.58,
    },
    {
      id: 3,
      login_id: 'team3',
      private_score: 90,
      public_score: 89.2,
    },
    {
      id: 4,
      login_id: 'team4',
      private_score: 90,
      public_score: 89.2,
    },
    {
      id: 5,
      login_id: 'team5',
      private_score: 90,
      public_score: 89.2,
    },
    {
      id: 6,
      login_id: 'team6',
      private_score: 90,
      public_score: 89.2,
    },
  ]);

  const nowDate = new Date();

  console.log(ScoreOpenDate);
  console.log(nowDate);

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
              <>
                <h3 className="w-32 text-center">Private Score</h3>
                <h3 className="w-32 text-center">Total</h3>
              </>
            ) : undefined}
          </div>
        </div>
        <div className="h-80 w-full overflow-y-scroll">
          {data.map((row, index) => {
            const total_score =
              (row.private_score + (row.public_score ?? 0)) / 2;
            return (
              <div
                key={`rank-${index + 1}-${row.id}`}
                className="flex w-full items-center justify-between font-medium"
              >
                <h3 className="w-20 text-center">{index + 1}</h3>
                <div className="flex w-4/5 justify-around gap-2.5 border-t-0.5 border-line-gray/50 px-8 py-5">
                  <h3 className="w-32 text-center">{row.login_id}</h3>
                  <h3 className="w-32 text-center">
                    {row.public_score.toFixed(3)}
                  </h3>
                  {nowDate >= ScoreOpenDate ||
                  (props.user && props.user.role === 'ADMIN') ? (
                    <>
                      <h3 className="w-32 text-center">
                        {(row.private_score ?? 0).toFixed(3)}
                      </h3>
                      <h3 className="w-32 text-center">
                        {total_score.toFixed(3)}
                      </h3>
                    </>
                  ) : undefined}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

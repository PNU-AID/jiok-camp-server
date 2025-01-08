'use client';

import { UserInfo } from '@/types/next-auth';
import { useState } from 'react';

export default function Submit(props: { user: UserInfo | undefined }) {
  const [data, setData] = useState([
    {
      id: 1,
      filename: '250104 191601',
      login_id: 'team1',
      selected: true,
      private_score: 90,
      public_score: 90.25,
    },
    {
      id: 2,
      filename: '250104 191601',
      login_id: 'team2',
      selected: false,
      private_score: 90,
      public_score: 89.58,
    },
    {
      id: 3,
      filename: '250104 191601',
      login_id: 'team3',
      selected: false,
      private_score: 90,
      public_score: 89.2,
    },
    {
      id: 4,
      filename: '250104 191601',
      login_id: 'team4',
      selected: false,
      private_score: 90,
      public_score: 89.2,
    },
    {
      id: 5,
      filename: '250104 191601',
      login_id: 'team5',
      selected: false,
      private_score: 90,
      public_score: 89.2,
    },
    {
      id: 6,
      filename: '250104 191601',
      login_id: 'team6',
      selected: false,
      private_score: 90,
      public_score: 89.2,
    },
  ]);

  const [submitSelection, setSubmitSelection] = useState<number>(0);

  if (props.user === undefined) return undefined;

  return (
    <div className="flex w-full flex-col gap-2.5">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-black">SUBMIT 📃</h1>
        {props.user.role === 'TEAM' ? (
          <button className="bg-aid-blue px-5 py-1 font-medium text-white">
            CSV 제출하기
          </button>
        ) : undefined}
      </div>
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between gap-2.5 border-t-0.5 border-line-gray/50 px-8 py-5 font-bold">
          <h3 className="w-32 text-center">제출시각</h3>
          {props.user.role === 'ADMIN' ? (
            <h3 className="w-32 text-center">TeamName</h3>
          ) : undefined}
          <h3 className="w-32 text-center">Public Score</h3>
          {props.user.role === 'ADMIN' ? (
            <>
              <h3 className="w-32 text-center">Private Score</h3>
              <h3 className="w-32 text-center">Total</h3>
            </>
          ) : (
            <h3 className="w-32 text-center">최종선택</h3>
          )}
        </div>
        <form className="h-80 w-full overflow-y-scroll">
          {data.map((row, index) => {
            if (props.user?.role === 'TEAM')
              return (
                <div
                  key={`submit-${index + 1}-${row.id}`}
                  className="flex w-full items-center justify-between gap-2.5 border-t-0.5 border-line-gray/50 px-8 py-5 font-medium"
                >
                  <h3 className="w-32 text-center">{row.filename}</h3>
                  <h3 className="w-32 text-center">
                    {row.public_score.toFixed(3)}
                  </h3>
                  <div className="w-32 text-center">
                    <input
                      type="radio"
                      name="selected"
                      value={row.id}
                      checked={submitSelection === row.id}
                      onChange={(e) =>
                        setSubmitSelection(parseInt(e.target.value))
                      }
                    />
                  </div>
                </div>
              );

            const total_score = (row.private_score + row.public_score) / 2;
            return (
              <div
                key={`submit-${index + 1}-${row.id}`}
                className="flex w-full items-center justify-between gap-2.5 border-t-0.5 border-line-gray/50 px-8 py-5 font-medium"
              >
                <h3 className="w-32 text-center">{row.filename}</h3>
                <h3 className="w-32 text-center">{row.login_id}</h3>
                <h3 className="w-32 text-center">
                  {row.public_score.toFixed(3)}
                </h3>
                <h3 className="w-32 text-center">
                  {row.private_score.toFixed(3)}
                </h3>
                <h3 className="w-32 text-center">{total_score.toFixed(3)}</h3>
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

export default function Team() {
  const [data, setData] = useState([
    {
      id: 1,
      login_id: 'team1',
    },
    {
      id: 2,
      login_id: 'team2',
    },
    {
      id: 3,
      login_id: 'team3',
    },
    {
      id: 4,
      login_id: 'team4',
    },
    {
      id: 5,
      login_id: 'team5',
    },
    {
      id: 6,
      login_id: 'team6',
    },
  ]);

  const [submitSelection, setSubmitSelection] = useState<number>(0);

  return (
    <div className="flex w-full flex-col gap-2.5">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-black">TEAM 🐧</h1>
        <button className="bg-aid-blue px-5 py-1 font-medium text-white">
          팀 생성하기
        </button>
      </div>
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between gap-2.5 border-t-0.5 border-line-gray/50 px-8 py-5 font-bold">
          <h3 className="w-32 text-center">TeamName</h3>
          <h3 className="w-32 text-center">비밀번호 재설정</h3>
          <h3 className="w-32 text-center">팀명 변경</h3>
          <h3 className="w-32 text-center">팀 삭제</h3>
        </div>
        <div className="h-80 w-full overflow-y-scroll">
          {data.map((row, index) => {
            return (
              <div
                key={`submit-${index + 1}-${row.id}`}
                className="flex w-full items-center justify-between gap-2.5 border-t-0.5 border-line-gray/50 px-8 py-4 font-medium"
              >
                <h3 className="w-32 text-center">{row.login_id}</h3>
                <button className="bg-aid-green w-32 py-1 text-center text-white">
                  비밀번호 재설정
                </button>
                <button className="bg-aid-yellow w-32 py-1 text-center text-white">
                  팀명 변경
                </button>
                <button className="w-32 bg-aid-red py-1 text-center text-white">
                  팀 삭제
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

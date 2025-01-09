'use client';

import { getTeam } from '@/apis/team';
import PopUp, { PopUpData } from '@/components/PopUp';
import { GetTeamRes } from '@/types/api/team';
import { useEffect, useState } from 'react';

export default function Team() {
  const [data, setData] = useState<GetTeamRes>([]);

  const [popUpData, setPopUpData] = useState<PopUpData | null>(null);

  const teamCreateHandler = () => {
    setPopUpData({
      quesionList: [
        { question: '팀 이름', inputType: 'text' },
        { question: '비밀번호', inputType: 'password' },
        { question: '비밀번호 확인', inputType: 'password' },
      ],
      onSubmitHandler: () => {
        return true;
      },
      submitText: '생성',
    });
  };

  useEffect(() => {
    const teamFetcher = async () => {
      const data = await getTeam();
      if (data) {
        setData(data);
      }
    };

    teamFetcher();
  }, []);

  return (
    <div className="relative flex w-full flex-col gap-2.5">
      <PopUp popUpData={popUpData} setPopUpData={setPopUpData} />
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-black">TEAM 🐧</h1>
        <button
          className="bg-aid-blue px-5 py-1 font-medium text-white"
          onClick={teamCreateHandler}
        >
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
          {data.length ? (
            data.map((row, index) => {
              return (
                <div
                  key={`submit-${index + 1}-${row.id}`}
                  className="flex w-full items-center justify-between gap-2.5 border-t-0.5 border-line-gray/50 px-8 py-4 font-medium"
                >
                  <h3 className="w-32 text-center">{row.login_id}</h3>
                  <button className="w-32 bg-aid-green py-1 text-center text-white">
                    비밀번호 재설정
                  </button>
                  <button className="w-32 bg-aid-yellow py-1 text-center text-white">
                    팀명 변경
                  </button>
                  <button className="w-32 bg-aid-red py-1 text-center text-white">
                    팀 삭제
                  </button>
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

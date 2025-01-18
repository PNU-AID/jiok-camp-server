'use client';

import { getTeam } from '@/apis/team';
import PopUp, { PopUpData } from '@/components/PopUp';
import LoadingSpinner from '@/components/LoadingSpinner';
import { GetTeamRes } from '@/types/api/team';
import { useEffect, useState } from 'react';

export default function Team() {
  const [refresh, setRefresh] = useState<number>(0);
  const [data, setData] = useState<GetTeamRes>([]);

  const [popUpData, setPopUpData] = useState<PopUpData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const teamCreateHandler = () => {
    setPopUpData({
      type: 'create',
    });
  };

  const teamPasswordHandler = (id: number, teamname: string) => {
    setPopUpData({
      type: 'password',
      targetId: id,
      targetName: teamname,
    });
  };

  const teamNameHandler = (id: number, teamname: string) => {
    setPopUpData({
      type: 'teamname',
      targetId: id,
      targetName: teamname,
    });
  };

  const deleteHandler = (id: number, teamname: string) => {
    setPopUpData({
      type: 'delete',
      targetId: id,
      targetName: teamname,
    });
  };

  useEffect(() => {
    const teamFetcher = async () => {
      const data = await getTeam();
      if (data) {
        setData(data);
        setIsLoading(false);
      }
    };

    teamFetcher();
  }, [refresh]);

  return (
    <div className="relative flex w-full flex-col gap-2.5">
      <PopUp
        popUpData={popUpData}
        setPopUpData={setPopUpData}
        setRefresh={setRefresh}
      />
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
        <div className="w-full">
          {data.length ? (
            data.map((row, index) => {
              return (
                <div
                  key={`submit-${index + 1}-${row.id}`}
                  className="flex w-full items-center justify-between gap-2.5 border-t-0.5 border-line-gray/50 px-8 py-4 font-medium"
                >
                  <h3 className="w-32 text-center">{row.login_id}</h3>
                  <button
                    className="w-32 bg-aid-green py-1 text-center text-white"
                    onClick={() => teamPasswordHandler(row.id, row.login_id)}
                  >
                    비밀번호 재설정
                  </button>
                  <button
                    className="w-32 bg-aid-yellow py-1 text-center text-white"
                    onClick={() => teamNameHandler(row.id, row.login_id)}
                  >
                    팀명 변경
                  </button>
                  <button
                    className="w-32 bg-aid-red py-1 text-center text-white"
                    onClick={() => deleteHandler(row.id, row.login_id)}
                  >
                    팀 삭제
                  </button>
                </div>
              );
            })
          ) : isLoading ? (
            <div className="py-2">
              <LoadingSpinner />
            </div>
          ) : (
            <h3 className="py-5 text-center font-medium">
              등록된 팀이 없습니다.
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

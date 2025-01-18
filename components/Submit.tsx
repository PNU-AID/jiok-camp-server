'use client';

import { getCsv, patchCsv, postCsv } from '@/apis/csv';
import { HelpText } from '@/components/HelpText';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ScoreOpenDate } from '@/constants';
import { GetCsvRes } from '@/types/api/csv';
import { UserInfo } from '@/types/next-auth';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

export default function Submit(props: {
  user: UserInfo | undefined;
  refresh: number;
  setRefresh: Dispatch<SetStateAction<number>>;
}) {
  const [data, setData] = useState<GetCsvRes>([]);
  const [highScore, setHighScore] = useState({ id: 0, score: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const descriptions = [
    'csv는 30번 제출할 수 있으며, 가장 점수가 높은 csv가 빨간색으로 표시됩니다.',
    '최종 선택된 파일이 Ranking에 노출되니 신중히 선택해주세요 🤗',
  ];

  const isScoreOpen = new Date() > ScoreOpenDate;

  function formatDateString(dateString: string) {
    // 10자리 문자열인지 확인
    if (dateString.length !== 10) {
      return 'Invalid input';
    }

    // 각각의 값 추출
    const month = dateString.slice(0, 2);
    const day = dateString.slice(2, 4);
    const hour = dateString.slice(4, 6);
    const minute = dateString.slice(6, 8);
    const second = dateString.slice(8, 10);

    // 원하는 형식으로 포맷팅
    return `${month}.${day} ${hour}:${minute}:${second}`;
  }

  const csvSubmitHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const csvFile = e.target.files[0];
    const formData = new FormData();
    formData.append('file', csvFile);

    const res = await postCsv(formData);
    if (res) props.setRefresh(props.refresh + 1);
    e.target.value = '';
  };

  const csvSelector = async (csvId: number) => {
    const res = await patchCsv({ id: csvId });
    if (res) {
      props.setRefresh(props.refresh + 1);
    }
  };

  useEffect(() => {
    const csvFetcher = async () => {
      if (props.user && props.user.id) {
        const csvData = await getCsv({ userId: props.user.id });
        if (csvData) {
          let newHighScore = { id: 0, score: 0 };
          csvData.forEach((csv) => {
            if (csv.public_score > newHighScore.score) {
              newHighScore = { id: csv.id, score: csv.public_score };
            }
          });
          setHighScore(newHighScore);
          setData(csvData);
          setIsLoading(false);
        }
      }
    };

    csvFetcher();
  }, [props.user, props.refresh]);

  if (props.user === undefined) return undefined;

  return (
    <div className="relative flex w-full flex-col gap-2.5">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black">SUBMIT 📃</h1>
          <HelpText descriptions={descriptions} />
        </div>
        {props.user.role === 'TEAM' && !isLoading ? (
          <div className="flex items-center gap-4">
            <p
              className={`font-medium ${data.length >= 25 ? 'text-red-600' : ''}`}
            >
              남은 제출 기회: {30 - data.length}
            </p>
            <div className="flex">
              <label
                htmlFor="file_id"
                className={`${data.length >= 30 || isScoreOpen ? 'bg-gray-400' : 'bg-aid-blue'} cursor-pointer px-5 py-1 font-medium text-white`}
              >
                CSV 제출하기
              </label>
              <input
                id="file_id"
                type="file"
                accept=".csv"
                onChange={csvSubmitHandler}
                className="hidden"
                disabled={data.length >= 30 || isScoreOpen}
              />
            </div>
          </div>
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
            <h3 className="w-32 text-center">Private Score</h3>
          ) : (
            <>
              {isScoreOpen && (
                <h3 className="w-32 text-center">Private Score</h3>
              )}
              <h3 className="w-32 text-center">최종선택</h3>
            </>
          )}
        </div>
        <form className="h-[290px] w-full overflow-y-scroll shadow-inner">
          {data.length ? (
            data.map((row, index) => {
              if (props.user?.role === 'TEAM')
                return (
                  <div
                    key={`submit-${index + 1}-${row.id}`}
                    className={`flex w-full items-center justify-between gap-2.5 border-t-0.5 border-line-gray/50 px-8 py-5 font-medium ${row.id === highScore.id ? 'bg-[#FFEEEE]' : ''}`}
                  >
                    <h3 className="w-32 text-center">
                      {formatDateString(row.filename.split('-')[0].slice(4))}
                    </h3>
                    <h3
                      className={`w-32 text-center ${row.id === highScore.id ? 'text-aid-red' : ''}`}
                    >
                      {row.public_score.toFixed(4)}
                    </h3>
                    {isScoreOpen && (
                      <h3 className="w-32 text-center">
                        {(row.private_score ?? 0).toFixed(4)}
                      </h3>
                    )}
                    <div className="w-32 text-center">
                      <input
                        type="radio"
                        name="selected"
                        value={row.id}
                        checked={row.selected}
                        onChange={(e) => csvSelector(parseInt(e.target.value))}
                        disabled={isScoreOpen}
                      />
                    </div>
                  </div>
                );

              return (
                <div
                  key={`submit-${index + 1}-${row.id}`}
                  className="flex w-full items-center justify-between gap-2.5 border-t-0.5 border-line-gray/50 px-8 py-5 font-medium"
                >
                  <h3 className="w-32 text-center">
                    {formatDateString(row.filename.split('-')[0].slice(4))}
                  </h3>
                  <h3 className="w-32 text-center">
                    {row.login_id ?? `team${row.user_id}`}
                  </h3>
                  <h3 className="w-32 text-center">
                    {row.public_score.toFixed(4)}
                  </h3>
                  <h3 className="w-32 text-center">
                    {(row.private_score ?? 0).toFixed(4)}
                  </h3>
                </div>
              );
            })
          ) : isLoading ? (
            <div className="py-2">
              <LoadingSpinner />
            </div>
          ) : (
            <h3 className="py-5 text-center font-medium">
              제출한 기록이 없습니다.
            </h3>
          )}
        </form>
      </div>
    </div>
  );
}

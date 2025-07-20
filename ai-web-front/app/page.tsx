'use client';

import { HelpText } from '@/components/HelpText';
import { useRouter } from 'next/navigation';
import { FaAngleRight, FaPlay } from 'react-icons/fa';
import { FaInfo } from 'react-icons/fa6';

type Competition = {
  season: number;
  time: string;
  description: string;
  infoUrl: string;
  playButtonUrl: string;
};

const nowCompetitionData: Competition[] = [];

const nowDescriptions = [
  '대회는 매 기수(1학기) 또는 1년 단위로 개최됩니다.',
  'ℹ️ 버튼을 누르면 대회 개요 페이지로,',
  '▶️ 버튼을 누르면 대회 진행 페이지로 이동됩니다.',
];

const pastCompetitionData: Competition[] = [
  {
    season: 3,
    time: '2025-1',
    description: 'PNU x Upstage: Document AI Challenge 2025',
    infoUrl:
      'https://aidpnu.notion.site/PNU-x-Upstage-DOCUMENT-AI-CHALLENGE-2025-1f1f0e0d194f804f9a57f9b8a6ac3f24?source=copy_link',
    playButtonUrl: '',
  },
  {
    season: 2,
    time: '2024-2',
    description: '부산대학교 6공학관 사진으로 층수 분류하기',
    infoUrl:
      'https://aidpnu.notion.site/AID-2-179f0e0d194f804b9d88d723427c46b1',
    playButtonUrl: '',
  },
  {
    season: 1,
    time: '2024-1',
    description: '맥도날드 리뷰 데이터로 실제 별점 예측하기',
    infoUrl:
      'https://aidpnu.notion.site/11ef0e0d194f81c39e0ccb28200a067f?pvs=74',
    playButtonUrl: '',
  },
];

const pastDescriptions = [
  '대회는 매 기수(1학기) 또는 1년 단위로 개최됩니다.',
  'ℹ️ 버튼을 누르면 대회 개요 페이지로 이동되며,',
  '▶️ 버튼을 누르면 우수 모델을 테스트 해볼 수 있습니다.',
];

export default function Home() {
  const router = useRouter();

  return (
    <main className="m-auto mt-20 w-full max-w-[1024px] px-12 md:mt-16 md:px-0">
      <div className="flex flex-col gap-24 py-12 md:px-6">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-8xl font-black md:text-5xl">AID 지옥캠프</h1>
          <h6 className="text-2xl md:text-lg md:font-bold">
            부산대학교 대표 AI 동아리, AID에서 개최하는 대회입니다.
          </h6>
          <p className="text-sm text-gray-500">
            제시된 주제를 가장 잘 소화하는 AI 모델을 만드는 것이 대회의
            규칙입니다.
            <br className="md:hidden" />
            대회를 통해 실력과 팀워크를 기르고 상금을 가져가보세요!
          </p>
        </div>
        {nowCompetitionData.length ? (
          <div className="flex flex-col">
            <div className="relative mb-4 flex items-center gap-2">
              <h1 className="text-2xl font-black">진행 중인 대회 🏆</h1>
              <HelpText descriptions={nowDescriptions} />
            </div>
            {nowCompetitionData.map((competition, index) => {
              const playButtonUrl = competition.playButtonUrl.length
                ? competition.playButtonUrl
                : `/camp${competition.season}`;
              return (
                <div
                  key={`camp-${index}`}
                  className={`flex w-full items-center justify-between ${index ? 'md:mt-12' : ''} md:flex-col md:items-start md:border-b-0.5 md:border-line-gray/50`}
                >
                  <h3 className="w-24 md:w-auto md:text-2xl md:font-bold">
                    {competition.time}
                  </h3>
                  <div
                    className={`flex h-full w-3/4 items-center justify-end gap-2 border-t-0.5 ${index + 1 === pastCompetitionData.length ? 'border-b-0.5' : ''} border-line-gray/50 px-2 py-5 md:w-full md:border-0`}
                  >
                    <p className={`shrink`}>{competition.description}</p>
                    <button
                      className="h-9 w-9 shrink-0 rounded bg-aid-blue font-medium text-white hover:bg-sky-900"
                      onClick={() => router.push(competition.infoUrl)}
                    >
                      <FaInfo size={18} className="m-auto" />
                    </button>
                    <button
                      className="h-9 w-9 shrink-0 rounded bg-aid-blue font-medium text-white hover:bg-sky-900"
                      onClick={() => router.push(playButtonUrl)}
                    >
                      <FaAngleRight size={20} className="m-auto" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : undefined}
        {pastCompetitionData.length ? (
          <div className="flex flex-col">
            <div className="relative mb-4 flex items-center gap-2">
              <h1 className="text-2xl font-black">지난 대회 목록 🥇</h1>
              <HelpText descriptions={pastDescriptions} />
            </div>
            {pastCompetitionData.map((competition, index) => {
              const playButtonUrl = competition.playButtonUrl.length
                ? competition.playButtonUrl
                : `/camp${competition.season}`;
              return (
                <div
                  key={`camp-${index}`}
                  className={`flex w-full items-center justify-between ${index ? 'md:mt-12' : ''} md:flex-col md:items-start md:border-b-0.5 md:border-line-gray/50`}
                >
                  <h3 className="w-24 md:w-auto md:text-2xl md:font-bold">
                    {competition.time}
                  </h3>
                  <div
                    className={`flex h-full w-3/4 items-center justify-end gap-2 border-t-0.5 ${index + 1 === pastCompetitionData.length ? 'border-b-0.5' : ''} border-line-gray/50 px-2 py-5 md:w-full md:border-0`}
                  >
                    <p className={`shrink`}>{competition.description}</p>
                    <button
                      className="h-9 w-9 shrink-0 rounded bg-aid-blue font-medium text-white hover:bg-sky-900"
                      onClick={() => router.push(competition.infoUrl)}
                    >
                      <FaInfo size={18} className="m-auto" />
                    </button>
                    <button
                      className="h-9 w-9 shrink-0 rounded bg-aid-blue font-medium text-white hover:bg-sky-900"
                      onClick={() => router.push(playButtonUrl)}
                    >
                      <FaPlay size={12} className="m-auto" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : undefined}
      </div>
    </main>
  );
}

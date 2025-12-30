'use client';

import Camp1Test from '@/components/camp1/Camp1Test';
import LoadingPage from '@/components/LoadingPage';
import { useSearchParams } from 'next/navigation';

export default function Camp1() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const isKo = lang === 'KO';

  if (lang === null) return <LoadingPage />;

  return (
    <div className="flex h-dvh justify-center bg-white pt-[2rem] md:pt-0">
      <div className="m-auto lg:hidden">
        <div className="flex flex-col items-start gap-2 px-4">
          <h1 className="text-6xl font-black xl:text-5xl">
            {isKo ? '지옥캠프1' : 'JiokCamp 1'}
          </h1>
          <h6 className="text-xl xl:text-lg">
            {isKo
              ? '맥도날드 리뷰 데이터로 실제 별점 예측하기'
              : 'Star Rating Prediction Using McDonald’s Review Data'}
          </h6>
          <p className="text-sm text-gray-500 xl:text-xs">
            {isKo ? (
              <>
                실제 미국 맥도날드 매장의 리뷰 데이터를 학습하여
                <br />
                해당 리뷰의 별점을 1~5점 중 몇 점인지 예측하는 것이 주제였으며,
                <br />총 13명, 8팀이 경쟁하여 최고 정확도 <strong>71.3%</strong>
                를 기록하였습니다.
                <br />
                <br />
                가장 최근에 다녀왔던 맥도날드 매장을 떠올려,
                <br />
                매장에 대한 리뷰를 <strong>영어</strong>로 남겨보세요!
                <br />
                AI가 당신이 남길 별점을 예측해드립니다.
              </>
            ) : (
              <>
                In this competition, participants trained models on real review
                data
                <br />
                from McDonald’s locations across the United States
                <br />
                to predict a review’s star rating on a scale from 1 to 5.
                <br />
                A total of 13 participants across 8 teams competed,
                <br />
                achieving a best accuracy of <strong>71.3%</strong>.
                <br />
                <br />
                Think about the most recent McDonald’s location you visited,
                <br />
                and leave a review in <strong>English</strong>.
                <br />
                The AI will predict the star rating you would give!
              </>
            )}
          </p>
        </div>
      </div>
      <div className={`w-full max-w-[640px] border-x-0.5`}>
        <Camp1Test />
      </div>
      <div className="w-1/12 xl:hidden 2xl:w-1/6" />
    </div>
  );
}

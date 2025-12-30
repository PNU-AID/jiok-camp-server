import { useState } from 'react';

interface MobileCautionProps {
  isEng?: boolean;
}

export default function MobileCaution({ isEng = false }: MobileCautionProps) {
  const [mobileConfirm, setMobileConfirm] = useState<boolean>(false);

  if (mobileConfirm) return undefined;

  return (
    <div className="absolute left-0 top-0 z-20 h-screen w-screen">
      <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-fit w-[300px] flex-col items-center justify-center gap-4 rounded-2xl border-[1px] bg-white p-8 shadow-2xl">
        <h1 className="text-xl font-extrabold">
          {isEng ? 'Mobile Environment Detected' : '모바일 환경 감지'}
        </h1>
        <p className="text-wrap text-center text-gray-700">
          {isEng ? (
            <>
              This website is optimized for desktop screens.
              <br />
              We recommend using a PC for the best experience.
            </>
          ) : (
            <>PC화면에 최적화 된 사이트입니다. PC환경 이용을 추천드려요!</>
          )}
        </p>
        <button
          className="rounded bg-aid-blue px-6 py-2 font-medium text-white"
          onClick={() => setMobileConfirm(true)}
        >
          {isEng ? 'I Understand' : '확인했습니다'}
        </button>
      </div>
    </div>
  );
}

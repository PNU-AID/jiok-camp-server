import { useState } from 'react';

export function HelpText({ descriptions }: { descriptions: string[] }) {
  const [mouseOn, setMouseOn] = useState(false);
  return (
    <button
      className="relative h-6 w-6 cursor-default border-[1px] border-black text-black md:static"
      onMouseOver={() => setMouseOn(true)}
      onMouseOut={() => setMouseOn(false)}
    >
      <h1 className="text-sm font-medium">i</h1>
      {mouseOn ? (
        <div className="max-w-screen absolute left-[30px] top-[-5px] flex h-fit w-fit flex-col items-start text-nowrap border-[1px] border-black bg-white px-4 py-1 md:bottom-0 md:left-0 md:right-0 md:top-0 md:m-auto md:text-sm">
          {descriptions.map((description, idx) => (
            <p key={`desc-${idx}`} className="w-full text-left md:text-wrap">
              {description}
            </p>
          ))}
        </div>
      ) : undefined}
    </button>
  );
}

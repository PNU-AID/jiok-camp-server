import { useState } from 'react';

export function HelpText({ descriptions }: { descriptions: string[] }) {
  const [mouseOn, setMouseOn] = useState(false);
  return (
    <button
      className="relative h-6 w-6 cursor-default border-[1px] border-black text-black"
      onMouseOver={() => setMouseOn(true)}
      onMouseOut={() => setMouseOn(false)}
    >
      <h1 className="text-sm font-medium">i</h1>
      {mouseOn ? (
        <div className="absolute left-[30px] top-[-5px] flex flex-col items-start text-nowrap border-[1px] border-black bg-white px-4 py-1">
          {descriptions.map((description, idx) => (
            <p key={`desc-${idx}`}>{description}</p>
          ))}
        </div>
      ) : undefined}
    </button>
  );
}

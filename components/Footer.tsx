'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/Logo';
import { aidUrl } from '@/constants';

export default function Footer() {
  return (
    <footer className="items-between top-0 m-auto flex w-4/5 flex-col space-y-5 py-3 md:mt-16">
      <div className="flex justify-between md:flex-col">
        <div className="flex flex-col gap-5 md:flex-row">
          <Logo />
          <div className="flex text-sm font-semibold">
            <Link className="px-3 py-5" target="_blank" href={aidUrl.github}>
              <Image
                alt="github_logo"
                width="30"
                height="1"
                src={`/github-mark.svg`}
              />
            </Link>
            <Link className="px-3 py-5" target="_blank" href={aidUrl.notion}>
              <Image
                alt="github_logo"
                width="30"
                height="1"
                src={`/notion-mark.svg`}
              />
            </Link>
            <Link className="px-3 py-5" target="_blank" href={aidUrl.velog}>
              <Image
                alt="github_logo"
                width="30"
                height="1"
                src={`/velog-mark.svg`}
              />
            </Link>
          </div>
        </div>
        <div className="flex-col text-sm md:space-y-2 md:text-center md:text-gray-500">
          <h1 className="text-lg font-black md:hidden">Contact</h1>
          <h3>aideveloper@pusan.ac.kr</h3>
          <h3>회장 이동훈 (therqq13@pusan.ac.kr)</h3>
          <h3>부회장 안소희 (soheean1370@gmail.com)</h3>
          <h3>부산대학교 제 6공학관(컴퓨터공학관)</h3>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="font-bold md:whitespace-nowrap md:text-xs">
          AID <a className="md:hidden">(AI Developers)</a> in PNU © 2022 ALL
          RIGHTS RESERVED
        </p>
        <p className="text-xs md:hidden">
          Reproduction in whole or part without written permission is strictly
          prohibited
        </p>
      </div>
    </footer>
  );
}

'use client';

import Logo from '@/components/Logo';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

type Lang = 'KO' | 'EN';

export default function Navi() {
  const [lang, setLang] = useState<Lang>('KO');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    router.push(pathname + '?' + createQueryString('lang', lang));
  }, [lang, pathname]);

  return (
    <header className="fixed left-0 right-0 top-0 z-10 m-auto flex items-center justify-center bg-white/70 py-4 shadow backdrop-blur-lg md:py-2">
      <nav
        className={
          'z-10 flex w-4/5 items-center justify-between md:w-full md:px-6'
        }
      >
        <Logo />
        <div className={'flex gap-4'}>
          <menu>
            <button
              className={`${lang == 'KO' ? 'font-medium md:hidden' : 'font-light'}`}
              onClick={() => {
                setLang('KO');
              }}
            >
              한국어
            </button>
            <span className="md:hidden"> | </span>
            <button
              className={` ${lang == 'EN' ? 'font-medium md:hidden' : 'font-light'}`}
              onClick={() => {
                setLang('EN');
              }}
            >
              ENG
            </button>
          </menu>
          <button
            onClick={() => {
              router.push('/' + '?' + createQueryString('lang', lang));
            }}
            className="ml-auto flex items-center space-x-16 text-base font-normal"
          >
            {lang === 'KO' ? 'AID 지옥캠프' : 'JiokCamp'}
          </button>
        </div>
      </nav>
    </header>
  );
}

import type { Metadata } from 'next';
import { Baloo_Bhai_2, Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import Provider from '@/app/Provider';
import Navi from '@/components/Navi';

const notoSansKr = Noto_Sans_KR({ subsets: ['latin'] });
const balooBhai = Baloo_Bhai_2({
  subsets: ['latin'],
  variable: '--Baloo',
});

export const metadata: Metadata = {
  title: 'AID 지옥캠프2',
  description: '부산대학교 인공지능 동아리 AID, 대회 제출 페이지',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSansKr.className} ${balooBhai.variable} antialiased`}
      >
        <Provider>
          <Navi />
          <main className="m-auto mt-20 w-[800px] md:mt-16">{children}</main>
        </Provider>
      </body>
    </html>
  );
}

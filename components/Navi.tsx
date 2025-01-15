import Logo from '@/components/Logo';

export default function Navi() {
  return (
    <header className="fixed left-0 right-0 top-0 z-10 flex w-full items-center justify-center bg-white/70 py-4 shadow backdrop-blur-lg md:py-2">
      <nav className={'z-10 flex w-4/5 items-center md:w-full md:px-6'}>
        <Logo />
        <div className="ml-auto flex items-center space-x-16 text-base font-light">
          AID 지옥캠프 시즌 2
        </div>
      </nav>
    </header>
  );
}

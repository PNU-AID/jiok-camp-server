import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      className="font-baloo flex items-center gap-3 text-xl font-black"
      href="https://pnu-aid.github.io/homepage/"
    >
      <Image
        className="md:w-6"
        alt="aid_logo"
        width="30"
        height="1"
        src={`/aid_logo_vector.svg`}
      />
      <span className={'text-nowrap md:text-lg'}>AI Developer</span>
    </Link>
  );
}

import { headerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import AuthProvider from "./AuthProvider";
import UserSection from "./UserSection";
import { getCurrentUser } from "@/lib/getCurrentUser";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flex justify-between items-center py-[26px] px-10 gap-4 relative">
      <div className="flex flex-1 items-center justify-start gap-9">
        <Link href="/" className="flex xl:hidden">
          <Image src="/logo.png" height={36} width={94} alt="logo" priority />
        </Link>

        <ul className="text-xs md:text-sm font-medium gap-6 text-neutral-800 flex">
          {headerLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="hover:text-neutral-500 transition-colors"
            >
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <Link
        href="/"
        className="absolute top-9.5 left-1/2 transform -translate-x-1/2 hidden xl:flex"
      >
        <Image src="/logo.png" height={40} width={96} alt="logo" priority />
      </Link>

      <div className="flex justify-center items-center gap-4">
        {session?.user ? <UserSection user={session.user} /> : <AuthProvider />}
      </div>
    </nav>
  );
};

export default Navbar;

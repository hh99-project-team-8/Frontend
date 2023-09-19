import { headerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/getCurrentUser";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flex justify-between items-center pt-6 px-6 gap-4 relative">
      <div className="flex flex-1 items-center justify-start gap-9">
        <Link href="/" className="flex">
          <button
            type="button"
            className="px-5 py-2.5 text-neutral-950 border border-neutral-300 text-[13px] rounded-full font-semibold transition duration-300 flex hover:border-neutral-400"
          >
            Cancel
          </button>
        </Link>
      </div>
      <button
        type="button"
        className="px-5 py-2.5 bg-neutral-100 text-neutral-950 text-[13px] rounded-full font-semibold transition hover:bg-neutral-200 duration-300 flex"
      >
        Save as draft
      </button>{" "}
      <button
        type="button"
        className="px-5 py-2.5 bg-neutral-950 text-white text-[13px] rounded-full font-semibold transition hover:bg-neutral-600 duration-300 flex"
      >
        Continue
      </button>
    </nav>
  );
};

export default Navbar;

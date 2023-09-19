import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="flex flex-col items-center justify-start paddings w-full gap-20 bg-light-white">
      <div className="flex flex-col w-full items-center">
        <div className="flex justify-between items-center w-full px-20">
          <Image
            src="/logo.png"
            width={115}
            height={35}
            alt="footer logo"
            priority
          />

          <div className="flex justify-center w-full gap-12 lg:gap-16 px-12 lg:px-14 font-semibold text-xs md:text-sm">
            {footerLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="hover:text-neutral-500 transition-color"
              >
                {link.text}
              </Link>
            ))}
          </div>
          <div></div>
        </div>
        <div className="text-neutral-500 text-[13px] text-start py-16 w-full px-20">
          © 2023 Dribbble.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

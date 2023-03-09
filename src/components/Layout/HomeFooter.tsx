import { LogoWithText } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface HomeFooterTypes {}

const HomeFooter: FC<HomeFooterTypes> = () => {
  return (
    <div className="flex flex-col justify-center items-center py-[30px]">
      <div>
        <Image src={LogoWithText} width={169} height={40} alt="logo" />
      </div>
      <ul className="flex mt-2">
        <li>
          About <span className="mr-1 text-success-500">/</span>
        </li>
        <li>
          Twitter <span className="mr-1 text-success-500">/</span>
        </li>
        <li>
          Telegram <span className="mr-1 text-success-500">/</span>
        </li>
        <li>
          <Link href={"/term"}>
            Term <span className="mr-1 text-success-500">/</span>
          </Link>
        </li>
        <li>
          <Link href={"/privacy-policy"}>Privacy policy</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomeFooter;

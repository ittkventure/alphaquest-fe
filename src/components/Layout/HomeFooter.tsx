import { LogoWithText } from "@/assets/images";
import Image from "next/image";
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
        <li>Telegram</li>
      </ul>
    </div>
  );
};

export default HomeFooter;

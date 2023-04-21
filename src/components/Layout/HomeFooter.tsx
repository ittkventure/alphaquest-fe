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
      <ul className="flex max-lg:flex-wrap max-lg:justify-center mt-2">
        <li>
          <Link href={"https://twitter.com/alphaquestio"}>
            Twitter <span className="mr-1 text-success-500">/</span>
          </Link>
        </li>

        <li>
          <Link href={"/privacy-policy"}>
            Privacy policy <span className="mr-1 text-success-500">/</span>
          </Link>
        </li>

        <li>
          <Link href={"/terms"}>
            Terms <span className="mr-1 text-success-500">/</span>
          </Link>
        </li>

        <li>
          <Link href={"https://t.me/alphaquestio"}>
            Contact us <span className="mr-1 text-success-500">/</span>
          </Link>
        </li>

        <li>
          <Link href={"https://coinwire.com/"}>
            CoinWire <span className="mr-1 text-success-500">/</span>
          </Link>
        </li>

        <li>
          <Link href={"https://chainplay.gg/"}>Chainplay</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomeFooter;

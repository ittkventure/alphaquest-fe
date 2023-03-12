import { LogoWithText } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";

interface HomeNavTypes {}

const HomeNav: FC<HomeNavTypes> = () => {
  const router = useRouter();

  const onGoLogin = () => {
    router.push("/login");
  };

  const onGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex max-lg:flex-col h-24 justify-between p-6 max-lg:mb-5 z-[100] absolute w-full">
      <button onClick={onGoHome} className="cursor-pointer">
        <Image src={LogoWithText} width={169} height={40} alt="logo" />
      </button>
      <div>
        <ul className="flex items-center max-lg:text-[14px] mt-3 max-lg:border-b max-lg:border-b-secondary-600 max-lg:pb-2">
          <li className="max-lg:flex-1 mr-6">
            <Link href="/app">Projects</Link>
          </li>
          <li className="max-lg:flex-1 mr-6">
            <Link href="/app/trending">Trends</Link>
          </li>
          <li className="max-lg:flex-1 mr-6">
            <Link href="/app">Ecosystems</Link>
          </li>
          <li className="max-lg:flex-1 mr-6">
            <Link href="/app">About</Link>
          </li>
          <li className="max-lg:flex-1 max-lg:hidden">
            <button
              onClick={onGoLogin}
              className="py-2 px-6 bg-success-500 text-white"
            >
              Login
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeNav;

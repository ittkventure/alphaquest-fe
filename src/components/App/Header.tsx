import { CrownIcon } from "@/assets/icons";
import { LogoWithText } from "@/assets/images";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <h1 className="font-workSansSemiBold text-[36px] max-lg:hidden">
          Trending
        </h1>
        <div className="hidden max-lg:block">
          <Image src={LogoWithText} width={169} height={40} alt="logo" />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="relative  max-lg:hidden">
          <MagnifyingGlassIcon className="w-5 h-5 text-white absolute top-[11px] left-[5px]" />

          <input
            className="w-52 bg-secondary-600 py-2 pl-8"
            placeholder="Search"
          />
        </div>

        <button>
          <MagnifyingGlassIcon className="w-5 h-5 text-white hidden max-lg:block" />
        </button>

        <div className="ml-6 max-lg:ml-3 mr-6 flex items-center">
          <div className="w-10 h-10 rounded-[50%] border border-white overflow-hidden relative ">
            <Image
              src={
                "https://i.pinimg.com/736x/0c/01/62/0c01627379bbe834af8150c606d65f1b.jpg"
              }
              width={40}
              height={40}
              alt="avt"
              className="object-cover"
            />
          </div>
          <p className="pl-2 text-[16px] max-lg:hidden">Melinda</p>
        </div>
        <div>
          <button className="px-3 py-2 bg-primary-500 font-workSansRegular text-[1rem] flex justify-center items-center max-lg:hidden">
            <Image
              src={CrownIcon}
              width={17}
              height={14}
              alt="crown-icon"
              className="mr-2"
            />
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

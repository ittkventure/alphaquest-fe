import { HeartIcon, NewestIcon, TrendingIcon } from "@/assets/icons";
import { LogoWithText } from "@/assets/images";
import Image from "next/image";
import React from "react";

const SideMenu = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen border-r border-white border-opacity-20 px-3 py-6 max-lg:hidden">
      <ul className="w-full">
        <li>
          <Image src={LogoWithText} width={169} height={40} alt="logo" />
        </li>
        <li className="mt-6">
          <div className="p-[13px] bg-success-500 w-full">
            <a href="#" className="text-dark-900 flex">
              <Image
                className="mr-2"
                src={TrendingIcon}
                width={15}
                height={19}
                alt="icon"
              />
              Trending
            </a>
          </div>
        </li>
        <li>
          <div className="p-[13px] w-full">
            <a href="#" className="flex">
              <Image
                className="mr-2"
                src={NewestIcon}
                width={15}
                height={19}
                alt="icon"
              />
              Newest
            </a>
          </div>
        </li>
        <li>
          <div className="p-[13px] w-full">
            <a href="#" className="flex">
              <Image
                className="mr-2"
                src={HeartIcon}
                width={15}
                height={19}
                alt="icon"
              />
              Watch List
            </a>
          </div>
        </li>
      </ul>

      <div className="absolute left-0 bottom-0 border-t border-white border-opacity-20 w-full px-6 pt-4 pb-6">
        <ul>
          <li className="mt-2">
            <a href="#">About</a>
          </li>
          <li className="mt-2">
            <a href="#">Twitter</a>
          </li>
          <li className="mt-2">
            <a href="#">Discord</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideMenu;

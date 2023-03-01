import { ETHIcon } from "@/assets/images";
import Image from "next/image";
import React, { FC } from "react";

interface DiscoverProjectItemTypes {}

const DiscoverProjectItem: FC<DiscoverProjectItemTypes> = () => {
  return (
    <div className="relative m-8">
      <div className="rounded-[100%] w-52 h-52 linear-bg-gradient-home opacity-40 absolute top-1 right-[-5px]"></div>

      <div className="flex flex-col items-center rounded-[50%] bg-white bg-opacity-20 w-80 h-80 backdrop-blur-md relative">
        <div className="absolute flex justify-center items-center top-[-20px]">
          <Image src={ETHIcon} width={75} height={75} alt="icon" />
        </div>
        <div className="mt-[39px]">
          <p className="text-center text-lg">Moon Bird</p>
        </div>
        <div className="mt-4">
          <p className="text-center">Found March 6th, 2022</p>
        </div>
        <div className="mt-[6px] text-success-500 font-workSansLight text-xs">
          <p className="text-center">4 days after account created</p>
        </div>
        <div className="mt-[25px] px-3 py-[6px] bg-primary-500 text-sm">
          <p className="text-center">Floor price is now available 20ETH</p>
        </div>
        <div className="mt-[18px]">
          <p className="text-center text-3xl font-workSansBold">100k+</p>
        </div>
        <div className="mt-2 w-32 text-sm">
          <p className="text-center">followers now (vs 245 when found)</p>
        </div>
      </div>
    </div>
  );
};

export default DiscoverProjectItem;

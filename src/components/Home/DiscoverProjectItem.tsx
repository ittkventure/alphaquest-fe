import { ETHIcon } from "@/assets/images";
import Image from "next/image";
import React, { FC } from "react";

export interface DiscoverProjectItemTypes {
  project: string;
  found: string;
  dayAfter?: string;
  des: string;
  follow: string;
  whenFound: string;
  logo: any;
}

const DiscoverProjectItem: FC<DiscoverProjectItemTypes> = ({
  project,
  found,
  dayAfter,
  des,
  follow,
  whenFound,
  logo,
}) => {
  return (
    <div className="relative m-8">
      <div className="rounded-[100%] w-52 h-52 linear-bg-gradient-home opacity-40 absolute top-1 right-[-5px]"></div>

      <div className="flex flex-col items-center rounded-[50%] bg-white bg-opacity-10 w-80 h-80 backdrop-blur-md relative">
        <div className="absolute flex justify-center items-center top-[-25px]">
          <div className="h-[52px] w-[52px] rounded-[50%] overflow-hidden filter-backdrop-custom">
            <Image
              src={logo}
              width={75}
              height={75}
              alt="icon"
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-[39px]">
          <p className="text-center text-lg">{project}</p>
        </div>
        <div className="mt-4">
          <p className="text-center">{found}</p>
        </div>
        <div className="mt-[6px] text-success-500 font-workSansLight text-xs">
          <p className="text-center">{dayAfter}</p>
        </div>
        <div className="w-full px-5">
          <div className="mt-[25px] px-3 py-[6px] border border-white w-full text-sm">
            <p className="text-center">{des}</p>
          </div>
        </div>
        <div className="mt-[18px]">
          <p className="text-center text-3xl font-workSansBold">{follow}</p>
        </div>
        <div className="mt-2 w-32 text-sm">
          <p className="text-center">
            {" "}
            followers now (vs {whenFound} when found)
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiscoverProjectItem;

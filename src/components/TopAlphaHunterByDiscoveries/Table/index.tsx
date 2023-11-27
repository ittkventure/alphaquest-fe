import { InfoIcon2 } from "@/assets/icons";
import Image from "next/image";
import React, { FC } from "react";
import AvatarRow from "./Rows/AvatarRow";
import { HeartIcon } from "@heroicons/react/24/outline";
import ProjectsFollowedRow from "./Rows/ProjectsFollowed";
import { TopAlphaItem } from "@/types/topAlpha";
import { formatNumberWithCommas } from "@/utils/formatNumber";

interface ITableTopAlphaHunterByDiscoveriesProps {
  topAlphaList: TopAlphaItem[];
}

const TableTopAlphaHunterByDiscoveries: FC<
  ITableTopAlphaHunterByDiscoveriesProps
> = ({ topAlphaList }) => {
  return (
    <div className="w-full overflow-auto">
      <div className="min-w-[1260px] ">
        <div className="flex flex-row bg-[#1F2536] py-3">
          <div className="w-[293px] pl-11">Account</div>
          <div className="w-[127px]">Followers</div>
          <div className="w-[214px]"># of Projects Mentioned</div>
          <div className="w-[521px] ml-3">Projects Followed last 60 days</div>
          <div className="pr-4 flex w-[calc(100%-1150px)] gap-1">
            # of Early Discoveries{" "}
            <Image src={InfoIcon2} width={20} height={20} alt="InfoIcon2" />
          </div>
        </div>

        {topAlphaList.map((item, index) => {
          return (
            <div className="flex flex-row items-center py-3 ">
              <div className="w-[293px] pl-[14px] pr-6">
                <AvatarRow item={item} index={index} />
              </div>
              <div className="w-[127px] flex items-start">
                <p>{item.followerCount}</p>
              </div>
              <div className="w-[214px]">
                <p>{item.alphaFollowingCount}</p>
              </div>
              <div className="w-[521px] ml-3">
                <ProjectsFollowedRow
                  projectsFollowedLastXDays={item?.projectsFollowedLastXDays}
                />
              </div>
              <div className="pr-4 w-[calc(100%-1150px)]">
                <div className="flex items-center justify-between">
                  <p>{formatNumberWithCommas(item.numberOfEarlyDiscoveries)}</p>
                  <p>
                    <HeartIcon className="h-6 w-6" />
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableTopAlphaHunterByDiscoveries;

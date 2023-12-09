import { InfoIcon2 } from "@/assets/icons";
import Image from "next/image";
import React, { FC, useContext, useState } from "react";
import AvatarRow from "./Rows/AvatarRow";
import ProjectsFollowedRow from "./Rows/ProjectsFollowed";
import { TopAlphaItem } from "@/types/topAlpha";
import { TimeFrameTypes } from "@/api-client/types/TwitterType";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useMutation } from "react-query";
import { WatchListTypes } from "@/api-client/twitter";
import { apiTwitter } from "@/api-client";
import Spinner2 from "@/components/Spinner2";
import { HeartIcon as HeartIconBold  } from "@heroicons/react/24/solid";

interface IAlphaItemProps { 
  item: TopAlphaItem;
  index: number;
  refetch?: () => void;
  isWatchList?: boolean;
}

const AlphaItem: FC<IAlphaItemProps> = ({
  item,
  index,
  refetch,
  isWatchList,
}) => {

  const [heart, setHeart] = useState(item.inWatchlist)
  
  const addWatchListAHMutate = useMutation({
    mutationFn: (params: {
      refId: string;
      type: WatchListTypes;
      subType: string;
    }) => apiTwitter.addWatchList(params.refId, params.type, params.subType),
    onSuccess: () => {
      setHeart(pre => !pre)
        refetch && refetch()
      
    },
  })


  return isWatchList && !heart ? null : (
    <div className="flex flex-row items-center py-3 ">
  <div className="w-[333px] pl-[14px] pr-6 mr-14">
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
      <p>{item.numberOfEarlyDiscoveries}</p>
      <button onClick={() => {
        addWatchListAHMutate.mutate({
          refId: item.userId,
          type: WatchListTypes.ALPHA_HUNTER,
          subType: '',
        })
      }}
      disabled={addWatchListAHMutate.isLoading}
      >
        {addWatchListAHMutate.isLoading && <Spinner2 />}

        {!addWatchListAHMutate.isLoading && (
          heart ? <HeartIconBold  className="h-6 w-6 text-red-500 transition-all duration-200" /> : <HeartIcon className="h-6 w-6 hover:text-success-500 transition-all duration-200" />
        )}
      </button>
    </div>
  </div>
</div>
  )
}

interface ITableTopAlphaHunterByDiscoveriesProps {
  topAlphaList: TopAlphaItem[];
  timeFrame: TimeFrameTypes;
  followers: number | string;
  refetch?: () => void;
  isWatchList?: boolean;
}

const TableTopAlphaHunterByDiscoveries: FC<
  ITableTopAlphaHunterByDiscoveriesProps
> = ({ topAlphaList, timeFrame, followers, refetch, isWatchList }) => {
  return (
    <div className="w-full overflow-auto">
      <div className="min-w-[1260px] ">
        <div className="flex flex-row bg-[#1F2536] py-3">
          <div className="w-[293px] pl-11 mr-24">Account</div>
          <div className="w-[127px]">Followers</div>
          <div className="w-[214px]">Total # of Projects Followed</div>
          <div className="w-[521px] ml-3">
            Projects Followed last {timeFrame?.replaceAll("D", "")} days
          </div>
          <div className="pr-4 flex items-center w-[calc(100%-1150px)] gap-1">
            # of Early Discoveries{" "}
            <div
              data-tooltip-id="info-tooltip-discoveries"
              className="cursor-pointer"
            >
              <Image src={InfoIcon2} width={20} height={20} alt="InfoIcon2" className="min-h-[20px] min-w-[20px]" />
            </div>
          </div>
        </div>

        {topAlphaList.map((item, index) => {
          return isWatchList && !item.inWatchlist ? null : (
            <AlphaItem key={item?.userId} item={item} index={index} refetch={refetch} isWatchList={isWatchList} />
          );
        })}
      </div>

      <ReactTooltip
        id="info-tooltip-discoveries"
        className="!bg-[#282E44] max-w-[300px] text-white text-[12px] p-4 !rounded-none"
        place="right"
        content={`Number of projects with less than ${followers} followers discovered by the Alpha Hunter in the last ${timeFrame}. Click on the Alpha Hunter to check out the list of all projects they followed`}
      />
    </div>
  );
};

export default TableTopAlphaHunterByDiscoveries;

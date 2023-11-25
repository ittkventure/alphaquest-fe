import { TopAlphaItem } from "@/types/topAlpha";
import React, { FC } from "react";

interface IAvatarRowProps {
  item: TopAlphaItem;
  index: number;
}

const AvatarRow: FC<IAvatarRowProps> = ({ item, index }) => {
  return (
    <div className="w-full flex items-center ">
      <div className="mr-6">{index + 1}</div>
      {item.name === "UNKNOWN" ? (
        <div className="w-10 h-10 rounded-full mr-3 animate-pulse bg-slate-600" />
      ) : (
        <img
          src={item.profileImageUrl}
          alt=""
          className="w-10 h-10 rounded-full mr-3"
        />
      )}
      <div>
        {item.name === "UNKNOWN" ? (
          <div className="w-[100px] h-3 animate-pulse bg-slate-600 rounded-full" />
        ) : (
          <p className="font-workSansMedium">{item.name}</p>
        )}
        {item.name === "UNKNOWN" ? (
          <div className="w-[130px] h-3 animate-pulse bg-slate-600 rounded-full mt-3" />
        ) : (
          <p className="text-xs font-workSansLight text-[#71717A]">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default AvatarRow;

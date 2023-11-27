import { TopAlphaItem } from "@/types/topAlpha";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { useRouter } from "next/router";
import React, { FC } from "react";

interface IAvatarRowProps {
  item: TopAlphaItem;
  index: number;
}

const AvatarRow: FC<IAvatarRowProps> = ({ item, index }) => {
  const router = useRouter();

  const renderDes = () => {
    if (item.name === "UNKNOWN") return <div />;
    return item?.attributes?.map((attribute, index) => {
      return (
        <a
          key={attribute?.code}
          href={`/projects?chain=${attribute?.code}`}
          onClick={() => {
            mixpanelTrack(event_name_enum.on_filter_chain, {
              url: router.pathname,
              name: attribute?.name,
              code: attribute?.code,
            });
          }}
        >
          <p className="font-workSansRegular text-sm max-lg:text-xs text-secondary-500 z-50 mr-1 ">
            {attribute
              ? ` ${index === 0 ? "" : "·"} ${attribute.name} ${" "}`
              : ""}
          </p>
        </a>
      );
    });
  };

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

        <div className="flex item-center flex-wrap">{renderDes()}</div>
      </div>
    </div>
  );
};

export default AvatarRow;

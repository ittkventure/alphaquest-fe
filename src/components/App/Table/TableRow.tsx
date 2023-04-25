import { apiTwitter } from "@/api-client";
import { UserPayType } from "@/api-client/types/AuthType";
import { TwitterItem } from "@/api-client/types/TwitterType";
import { TwitterIcon } from "@/assets/icons";
import Spinner from "@/components/Spinner";
import { AuthContext, TypePayment } from "@/contexts/useAuthContext";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

enum ConstDayAgo {
  one_day_ago = "1 days ago",
}

export interface TableObject {
  index: number;
  avatar: string;
  name: string;
  des: string;
  time: string;
  heart: number;
}

interface TableRowTypes {
  item: TwitterItem;
  index: number;
  isAnimation?: boolean;
  onReduceCount?: () => void;
  onRefreshTable?: (userId: string) => void;
}

const TableRow: FC<TableRowTypes> = ({
  item,
  index,
  isAnimation,
  onReduceCount,
  onRefreshTable,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authState, accountExtendDetail, setTypePaymentAction } =
    useContext(AuthContext);
  const router = useRouter();
  const [itemState, setItemState] = useState(item);

  useEffect(() => {
    setItemState(item);
  }, [item]);

  const onAddItemToWatchList = async () => {
    if (!authState?.access_token) {
      mixpanelTrack(event_name_enum.inbound, {
        url: "/login",
      });
      router.push("/login");
      return;
    }
    if (accountExtendDetail?.currentPlanKey === UserPayType.FREE) {
      setTypePaymentAction ? setTypePaymentAction(TypePayment.PRO) : null;
      mixpanelTrack(event_name_enum.inbound, {
        url: "/pricing",
      });
      router.push("/pricing?action=open");

      return;
    }
    try {
      setIsLoading(true);

      if (authState?.access_token) {
        await apiTwitter.putToWatchList(
          itemState.userId,
          authState?.access_token
        );
        mixpanelTrack(event_name_enum.on_add_watch_list, {
          on_add_watch_list: `User add the project ${itemState.name} to watchlist`,
        });
        setItemState({ ...itemState, inWatchlist: !itemState.inWatchlist });
        onRefreshTable ? onRefreshTable(itemState.userId) : null;
      } else {
        toast.warning("Please login for use this feature");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const _renderCategories = () => {
    if (!itemState.categories) return "";
    if (itemState.categories.length === 0) return "";
    return itemState.categories.map((value) => ` · ${value.name}`);
  };

  const _renderHeartButton = () => {
    return (
      <button
        onClick={onAddItemToWatchList}
        className="max-lg:mt-2 flex justify-center items-center w-7"
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner
            customClassName="ml-0 mr-0 w-[14px] h-[14px]"
            strokeWidth="1"
          />
        ) : itemState.inWatchlist ? (
          <HeartIconSolid className="h-5 w-7 text-primary-500 transition-all duration-300" />
        ) : (
          <HeartIcon className="h-5 w-7 hover:text-success-500 transition-all duration-300" />
        )}
      </button>
    );
  };

  const _renderClassNameAnimation = () => {
    return `flex transition-all duration-500 justify-between overflow-hidden ${
      itemState.inWatchlist
        ? "mt-4 h-auto opacity-100 max-lg:pb-4"
        : "mt-0 mb-0 h-0 opacity-0"
    } max-lg:border-b max-lg:border-b-secondary-600 `;
  };

  const _renderNewTag = () => {
    const currentDate = new Date(itemState.discoveredTime).getTime();
    const now = Date.now();

    const newCheck = now - currentDate;
    const checkTimeArrange = 86400000;

    if (newCheck <= checkTimeArrange)
      return (
        <div className="bg-primary-blue-500 py-[1px] px-1 ml-2 text-xs">
          <p>New</p>
        </div>
      );
    return;
  };

  return (
    <div
      className={
        isAnimation
          ? _renderClassNameAnimation()
          : `flex justify-between  overflow-hidden mt-4 h-auto max-lg:pb-4 max-lg:border-b border-b-secondary-600 max-lg:border-b-secondary-600 `
      }
    >
      <div className="flex items-center">
        <div className="mr-4">
          <p>{index + 1}</p>
        </div>
        <div className="mr-4">
          <div
            className={`w-10 h-10 rounded-[50%]  ${
              itemState.profileImageUrl === "UNKNOWN"
                ? "animate-pulse"
                : "border border-white"
            } bg-secondary-600 overflow-hidden relative`}
          >
            {itemState.profileImageUrl === "UNKNOWN" ? (
              <div> </div>
            ) : (
              <Image
                src={itemState.profileImageUrl}
                width={40}
                height={40}
                alt="avt"
                className="object-cover"
              />
            )}
          </div>
        </div>
        <div className="mr-4">
          <div
            className={`flex items-center ${
              itemState.name !== "UNKNOWN"
                ? ""
                : "w-[160px] h-5 rounded-2xl mb-[6px] bg-secondary-600 animate-pulse"
            }`}
          >
            {itemState.name !== "UNKNOWN" ? (
              <>
                <p className="text-success-500 max-lg:text-sm font-workSansSemiBold mr-2">
                  {itemState.name}
                </p>
                <div>
                  <a
                    href={itemState.twitterUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image src={TwitterIcon} width={16} height={13} alt="t-i" />
                  </a>
                </div>
                {_renderNewTag()}
              </>
            ) : (
              <div />
            )}
          </div>
          <div className="mt-1">
            <p className="font-workSansRegular max-lg:text-xs text-sm max-lg:w-[50vw]">
              {itemState.description}
            </p>
          </div>
          <div>
            <p className="font-workSansRegular text-sm max-lg:text-xs text-secondary-500">
              {moment(itemState.discoveredTime).fromNow()}
              {itemState.chain ? ` · ${itemState.chain.name}` : ""}
              {_renderCategories()}
            </p>
          </div>
        </div>
      </div>
      <div className="flex max-lg:flex-col max-lg:justify-between  justify-end items-center ">
        <div className="border border-success-500 text-success-500 px-1 mr-2 max-lg:text-xs">
          <p>+{itemState.trendingScore}</p>
        </div>
        {_renderHeartButton()}
      </div>
    </div>
  );
};

export default React.memo(TableRow);

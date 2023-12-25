import { apiTwitter } from "@/api-client";
import { UserPayType } from "@/api-client/types/AuthType";
import { TwitterItem } from "@/api-client/types/TwitterType";
import { TwitterIcon } from "@/assets/icons";
import Spinner from "@/components/Spinner";
import { AuthContext, TypePayment } from "@/contexts/useAuthContext";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import {
  DexToolIcon,
  DiscordIcon,
  LinkTreeIcon,
  MediumIcon,
  OpenSeaIcon,
  WebIcon,
  TelegramIcon,
} from "@/assets/icons";

import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { WatchListTypes } from "@/api-client/twitter";

export const listUrl = [
  {
    key: "Telegram",
    icon: TelegramIcon,
  },
  {
    key: "Twitter",
    icon: TwitterIcon,
  },
  {
    key: "Medium",
    icon: MediumIcon,
  },
  {
    key: "Discord",
    icon: DiscordIcon,
  },
  {
    key: "DexTool",
    icon: DexToolIcon,
  },
  {
    key: "OpenSea",
    icon: OpenSeaIcon,
  },
  {
    key: "LinkTree",
    icon: LinkTreeIcon,
  },
  {
    key: "Other",
    icon: WebIcon,
  },
  {
    key: "Website",
    icon: WebIcon,
  },
];

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
  onClickAction?: () => void;
  isShowWatchList?: boolean;
}

const TableRow: FC<TableRowTypes> = ({
  item,
  index,
  isAnimation,
  onRefreshTable,
  onClickAction,
  isShowWatchList,
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
      mixpanelTrack(event_name_enum.upgrade_to_pro, {
        url: router.pathname,
      });
      if (authState) {
        setTypePaymentAction ? setTypePaymentAction(TypePayment.TRIAL) : null;
        mixpanelTrack(event_name_enum.inbound, {
          url: "/pricing",
        });
        router.push("/pricing?action=open");
      } else {
        mixpanelTrack(event_name_enum.inbound, {
          url: "/sign-up",
        });
        setTypePaymentAction ? setTypePaymentAction(TypePayment.TRIAL) : null;
        router.push("/sign-up");
      }
    }
    try {
      setIsLoading(true);

      if (authState?.access_token) {
        await apiTwitter.addWatchList(itemState.userId, WatchListTypes.PROJECT);

        mixpanelTrack(event_name_enum.on_add_watch_list, {
          on_add_watch_list: `User add the project ${itemState.name} to watchlist`,
        });
        setItemState({ ...itemState, inWatchlist: !itemState.inWatchlist });
        onRefreshTable ? onRefreshTable(itemState.userId) : null;
      } else {
        toast.warning("Please login for use this feature");
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(
        error?.response?.data?.error?.data?.messsage ?? "Error please try again"
      );
    }
  };

  const _renderCategories = () => {
    if (!itemState.categories) return "";
    if (itemState.categories.length === 0) return "";
    return itemState.categories.map((value) => (
      <a
        href={`/projects?category=${value.code}`}
        onClick={() => {
          mixpanelTrack(event_name_enum.on_filter_category, {
            url: router.pathname,
            name: value.name,
            code: value.code,
          });
        }}
      >
        <p className="font-workSansRegular text-sm max-lg:text-xs text-secondary-500 mr-1">
          {` · ${value.name}`}
        </p>
      </a>
    ));
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
      <div className="flex items-center cursor-pointer">
        <div className="mr-4">
          <p className="text-right w-6">{index + 1}</p>
        </div>
        <div
          className="mr-4"
          onClick={
            onClickAction
              ? () => {
                  if (itemState.name !== "UNKNOWN") onClickAction();
                }
              : () => {}
          }
        >
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
            className={`flex max-lg:flex-col max-lg:items-start max-lg:gap-1 items-center ${
              itemState.name !== "UNKNOWN"
                ? ""
                : "w-[160px] h-5 rounded-2xl mb-[6px] bg-secondary-600 animate-pulse"
            }`}
          >
            {itemState.name !== "UNKNOWN" ? (
              <>
                <p
                  onClick={
                    onClickAction
                      ? () => {
                          if (itemState.name !== "UNKNOWN") onClickAction();
                        }
                      : () => {}
                  }
                  className="text-success-500 max-lg:text-sm font-workSansSemiBold mr-2"
                >
                  {itemState.name}
                </p>
                <div className="flex ">
                  <button
                    onClick={() => {
                      mixpanelTrack(event_name_enum.outbound, {
                        url: itemState.twitterUrl,
                        message: "Link to twitter at project page",
                      });
                      window.open(itemState.twitterUrl, "_blank");
                    }}
                  >
                    <Image src={TwitterIcon} width={16} height={13} alt="t-i" />
                  </button>

                  {itemState?.urls?.map((value, index) => {
                    const url = listUrl.find(
                      (item) => item.key === value.type
                    ) ?? { icon: WebIcon, key: "#" };
                    return (
                      <button
                        key={value.type + index}
                        onClick={() => {
                          mixpanelTrack(event_name_enum.outbound, {
                            url: value.url,
                            message: `Link to ${url.key} at project page`,
                          });
                          window.open(value.url, "_blank");
                        }}
                        className="ml-2"
                      >
                        <Image
                          src={url.icon as any}
                          width={16}
                          height={13}
                          alt="t-i"
                        />
                      </button>
                    );
                  })}
                </div>
                {_renderNewTag()}
              </>
            ) : (
              <div />
            )}
          </div>
          <div
            className="mt-1"
            onClick={
              onClickAction
                ? () => {
                    if (itemState.name !== "UNKNOWN") onClickAction();
                  }
                : () => {}
            }
          >
            <p className="font-workSansRegular max-lg:text-xs text-sm max-lg:w-[50vw]">
              {itemState.description}
            </p>
          </div>
          <div className="flex flex-wrap">
            <p
              onClick={
                onClickAction
                  ? () => {
                      if (itemState.name !== "UNKNOWN") onClickAction();
                    }
                  : () => {}
              }
              className="font-workSansRegular text-sm max-lg:text-xs text-secondary-500 z-50 mr-1"
            >
              {moment(itemState.discoveredTime).fromNow()}
            </p>
            <a
              href={`/projects?chain=${itemState.chain?.code}`}
              onClick={() => {
                mixpanelTrack(event_name_enum.on_filter_chain, {
                  url: router.pathname,
                  name: itemState.chain?.name,
                  code: itemState.chain?.code,
                });
              }}
            >
              <p className="font-workSansRegular text-sm max-lg:text-xs text-secondary-500 z-50 mr-1 ">
                {itemState.chain ? ` · ${itemState.chain.name} ${" "}` : ""}
              </p>
            </a>
            {_renderCategories()}
          </div>
        </div>
      </div>
      <div className="flex max-lg:flex-col max-lg:justify-between  justify-end items-center ">
        <div className="border border-success-500 text-success-500 px-1 mr-2 max-lg:text-xs">
          <p>+{itemState.trendingScore}</p>
        </div>
        {isShowWatchList && _renderHeartButton()}
      </div>
    </div>
  );
};

export default React.memo(TableRow);

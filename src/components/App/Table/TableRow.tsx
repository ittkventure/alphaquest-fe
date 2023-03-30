import { TwitterItem } from "@/api-client/types/TwitterType";
import { TwitterIcon } from "@/assets/icons";
import { HeartIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

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
}

const TableRow: FC<TableRowTypes> = ({ item, index }) => {
  const _renderCategories = () => {
    if (!item.categories) return "";
    if (item.categories.length === 0) return "";
    return item.categories.map((value) => ` · ${value.name}`);
  };

  return (
    <div className="flex justify-between mt-4 max-lg:border-b max-lg:border-b-secondary-600 max-lg:pb-4">
      <div className="flex items-center">
        <div className="mr-4">
          <p>{index + 1}</p>
        </div>
        <div className="mr-4">
          <div
            className={`w-10 h-10 rounded-[50%]  ${
              item.profileImageUrl === "UNKNOWN"
                ? "animate-pulse"
                : "border border-white"
            } bg-secondary-600 overflow-hidden relative`}
          >
            {item.profileImageUrl === "UNKNOWN" ? (
              <div> </div>
            ) : (
              <Image
                src={item.profileImageUrl}
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
            className={`flex ${
              item.name !== "UNKNOWN"
                ? ""
                : "w-[160px] h-5 rounded-2xl mb-[6px] bg-secondary-600 animate-pulse"
            }`}
          >
            {item.name !== "UNKNOWN" ? (
              <>
                <p className="text-success-500 max-lg:text-[14px] font-workSansSemiBold mr-2">
                  {item.name}
                </p>
                <div>
                  <a href={item.twitterUrl} target="_blank" rel="noreferrer">
                    <Image src={TwitterIcon} width={16} height={13} alt="t-i" />
                  </a>
                </div>
              </>
            ) : (
              <div />
            )}
          </div>
          <div>
            <p className="font-workSansRegular max-lg:text-[12px] text-sm">
              {item.description}
            </p>
          </div>
          <div>
            <p className="font-workSansRegular text-sm max-lg:text-[12px] text-secondary-500">
              {moment(item.discoveredTime).fromNow()}
              {item.chain ? ` · ${item.chain.name}` : ""}
              {_renderCategories()}
            </p>
          </div>
        </div>
      </div>
      <div className="flex max-lg:flex-col max-lg:justify-between max-lg:py-2 justify-end items-center ">
        <div className="border border-success-500 text-success-500 px-1 mr-2 max-lg:text-[12px]">
          <p>+{item.trendingScore}</p>
        </div>
        {/* <button>
          <HeartIcon className="h-5 w-7" />
        </button> */}
      </div>
    </div>
  );
};

export default TableRow;

import { AlphaHunterDetail } from "@/api-client/types/TwitterType";
import { TwitterIcon } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import Spinner from "../Spinner";

interface IAlphaProfileCard {
  item?: AlphaHunterDetail;
  isLoading?: boolean;
}

const AlphaProfileCard: FC<IAlphaProfileCard> = ({ item, isLoading }) => {
  const router = useRouter();

  const _renderNewTag = () => {
    return (
      <div className="flex mt-3">
        {item?.tags?.map((value, index) => {
          return (
            <div
              key={index}
              className="border border-white text-white py-[1px] px-1 text-xs"
            >
              <p>{value}</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex max-[718px]:flex-col px-[100px] max-lg:px-[10px] w-full">
      <div className="flex justify-between items-start">
        {isLoading ? (
          <div className="h-20 w-20 rounded-[50%] min-h-fit min-w-fit animate-pulse bg-gray-800" />
        ) : (
          <img
            className="h-20 w-20 rounded-[50%] min-h-fit min-w-fit"
            src={item?.profileImageUrl}
          />
        )}
        {/* {_renderHeartButtonMobile()} */}
      </div>
      <div className="ml-5 max-[718px]:ml-0 max-[718px]:mt-4 w-full">
        <div className="flex justify-between w-full">
          <div className="w-full">
            <div className="flex w-full justify-between">
              <div className="flex items-center">
                {isLoading ? (
                  <>
                    <div className="h-5 w-48 rounded-3xl animate-pulse bg-gray-800" />
                  </>
                ) : (
                  <>
                    <p className="text-xl font-workSansSemiBold text-success-500 mr-2">
                      {item?.name}
                    </p>
                    <Link href={item?.twitterUrl ?? ""} target="_blank">
                      <Image
                        src={TwitterIcon}
                        width={16}
                        height={13}
                        alt="t-i"
                      />
                    </Link>
                  </>
                )}
              </div>
              <div className="ml-20 max-lg:ml-[20px]">
                <div className="flex max-lg:flex-col max-lg:justify-between  justify-end items-center ">
                  {/* <div>{_renderHeartButton()}</div> */}
                </div>
              </div>
            </div>
            <p className="text-sm mt-3">{item?.description}</p>

            {_renderNewTag()}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6  mt-5">
          <div className="border border-white border-opacity-10 p-4">
            <p>Current Twitter Followers</p>

            {isLoading ? (
              <Spinner />
            ) : (
              <p className="text-xl max-lg:text-sm">
                {item?.followerCount ?? 0}
              </p>
            )}
          </div>

          <div className="border border-white border-opacity-10 p-4">
            <p>Total Alpha Following</p>

            {isLoading ? (
              <Spinner />
            ) : (
              <p className="text-xl max-lg:text-sm">
                {" "}
                {item?.alphaFollowingCount ?? 0}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlphaProfileCard;

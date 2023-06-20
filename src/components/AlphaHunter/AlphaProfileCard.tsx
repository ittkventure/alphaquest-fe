import { TwitterIcon } from "@/assets/icons";
import { HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

const AlphaProfileCard = () => {
  const _renderHeartButton = () => {
    return (
      <button className="max-lg:mt-2 flex justify-center items-center w-7 max-[718px]:hidden">
        <HeartIcon className="h-5 w-7 hover:text-success-500 transition-all duration-300" />
      </button>
    );
  };

  const _renderHeartButtonMobile = () => {
    return (
      <button className="max-lg:mt-2  justify-center items-center w-7 max-[718px]:flex hidden">
        <HeartIcon className="h-5 w-7 hover:text-success-500 transition-all duration-300" />
      </button>
    );
  };

  const _renderNewTag = () => {
    return (
      <div className="flex mt-3">
        <div className="border border-white text-white py-[1px] px-1 text-xs">
          <p>Alpha Hunters</p>
        </div>
        <div className="border border-purple-400 text-purple-400 py-[1px] ml-2 px-1 text-xs">
          <p>NFT</p>
        </div>
        <div className="border border-blue-400 text-blue-400 py-[1px] px-1 ml-2 text-xs">
          <p>Defi</p>
        </div>
        <div className="border border-rose-400 text-rose-400 py-[1px] px-1 ml-2 text-xs">
          <p>Founder @pepevip</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex max-[718px]:flex-col px-[100px] max-lg:px-[10px] w-full">
      <div className="flex justify-between items-start">
        <img
          className="h-20 w-20 rounded-[50%]"
          src="https://pbs.twimg.com/media/D_eP7UDWwAA2mA8.png"
        />
        {_renderHeartButtonMobile()}
      </div>
      <div className="ml-5 max-[718px]:ml-0 max-[718px]:mt-4 w-full">
        <div className="flex justify-between w-full">
          <div className="w-full">
            <div className="flex w-full justify-between">
              <div className="flex items-center">
                <p className="text-xl font-workSansSemiBold text-success-500">
                  Danny
                </p>
                <button className="ml-2" onClick={() => {}}>
                  <Image src={TwitterIcon} width={16} height={13} alt="t-i" />
                </button>
              </div>
              <div className="ml-20 max-lg:ml-[20px]">
                <div className="flex max-lg:flex-col max-lg:justify-between  justify-end items-center ">
                  <div>{_renderHeartButton()}</div>
                </div>
              </div>
            </div>
            <p className="text-sm mt-3">
              Crypto & Defi trader - Financial Market Analyst - Communication
              Strategist (Ex: @fantomfdn) - TG http://t.me/sdafoudsaf
            </p>

            {_renderNewTag()}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6  mt-5">
          <div className="border border-white border-opacity-10 p-4">
            <p>Current Twitter Followers</p>

            <p className="text-xl max-lg:text-sm">16</p>
          </div>

          <div className="border border-white border-opacity-10 p-4">
            <p>Total Alpha Following</p>

            <p className="text-xl max-lg:text-sm">30</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlphaProfileCard;

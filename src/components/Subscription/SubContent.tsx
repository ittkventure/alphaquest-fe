import { CheckIcon } from "@heroicons/react/24/solid";
import React from "react";

const SubContent = () => {
  return (
    <div className="flex justify-center items-center max-xl:flex-col  mt-[102px] w-full px-36 max-lg:px-0 ">
      <div className="flex max-lg:flex-col justify-center max-w-[1350px]">
        <div className="relative mx-6 w-[576px] max-xl:w-full">
          <div className="rounded-[100%] w-52 h-52 custom-circle-bg absolute top-[-30px] right-[-30px]"></div>
          <div className="w-full p-10 custom-card-sub backdrop-blur-md">
            <div className="flex justify-center font-workSansSemiBold items-center border-[0.5px] border-secondary-700 text-success-600 w-[55px] py-[2px] rounded-[20px]">
              <p>FREE</p>
            </div>

            <div className="flex items-end my-6">
              <p className="text-[40px] leading-[35px] font-workSansBold text-primary-500">
                $11
              </p>
              <p className="text-xl">/month</p>
            </div>

            <div className="flex items-center font-workSansLight">
              <CheckIcon className="h-4 w-4 text-success-500" />
              <p className="ml-2">Access to discoveries with a delay</p>
            </div>

            <div className="mt-[91px] flex justify-end">
              <button className="py-3 px-6 bg-primary-500">
                <p>Public Leaderboard</p>
              </button>
            </div>
          </div>
        </div>

        <div className="relative mx-6 w-[576px] max-xl:w-full max-xl:mt-10">
          <div className="rounded-[100%] w-52 h-52 custom-circle-bg absolute top-[-30px] right-[-30px]"></div>
          <div className="col-span-1 p-10 custom-card-sub backdrop-blur-md">
            <div className="flex">
              <div className="flex font-workSansSemiBold justify-center items-center border-[0.5px] border-secondary-700 text-success-600 w-[120px] py-[2px] rounded-[20px]">
                <p>Secret Party</p>
              </div>

              <div className="flex font-workSansSemiBold ml-2 justify-center items-center border-[0.5px] border-secondary-700 w-[80px] py-[2px] rounded-[20px]">
                <p>Limited</p>
              </div>
            </div>

            <div className="flex items-end my-6">
              <p className="text-[40px] leading-[35px] font-workSansBold text-primary-500">
                $69
              </p>
              <p className="text-xl">/month</p>
            </div>

            <div className="flex items-center font-workSansLight">
              <CheckIcon className="h-4 w-4 text-success-500" />
              <p className="ml-2">Full projects & Trends database</p>
            </div>

            <div className="flex items-center font-workSansLight">
              <CheckIcon className="h-4 w-4 text-success-500" />
              <p className="ml-2">Personal Watchlist</p>
            </div>

            <div className="flex items-center font-workSansLight">
              <CheckIcon className="h-4 w-4 text-success-500" />
              <p className="ml-2">Weekly Newsletter</p>
            </div>

            <div className="mt-[43px] flex justify-end">
              <button className="py-3 px-6 bg-primary-500">
                <p>Public Leaderboard</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubContent;

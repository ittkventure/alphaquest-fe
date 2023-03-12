import {
  EmptyWallet,
  EmptyWalletGreen,
  GiftIcon,
  LogoutIcon,
  TwitterIcon,
  UserIcon,
} from "@/assets/icons";
import { CircleButton } from "@/components/AQButton";
import HomeFooter from "@/components/Layout/HomeFooter";
import HomeLayout from "@/layouts/HomeLayout";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AccountDetails = () => {
  const _renderAccountMobile = () => {
    return (
      <div className="hidden max-sm:block max-sm:mt-[33px]">
        <div className="flex justify-between border-b-[1px] border-secondary-600 pb-4">
          <p className="font-workSansLight">Your account type</p>
          <p className="font-workSansSemiBold">David Beckham</p>
        </div>
        <div className="flex mt-4 justify-between border-b-[1px] border-secondary-600 pb-4">
          <p className=" font-workSansLight">Your subscription ends</p>
          <p className=" font-workSansSemiBold">in 12 days</p>
        </div>
        <div className="flex mt-4 justify-between border-b-[1px] border-secondary-600 pb-4">
          <p className=" font-workSansLight">You joined on</p>
          <p className=" font-workSansSemiBold">Sep 05, 2022, 10:49</p>
        </div>
        <div className="flex mt-4 justify-between border-b-[1px] border-secondary-600 pb-4">
          <p className=" font-workSansLight">To change your plan</p>
          <Link href={"#"}>
            <p className="text-success-500 font-workSansLight">Click here</p>
          </Link>
        </div>

        <div className="flex mt-4 justify-between">
          <button className="flex">
            <Image src={LogoutIcon} width={24} height={24} alt="logout" />
            <p className="font-workSansLight text-primary-500 ml-2">Sign out</p>
          </button>
        </div>
      </div>
    );
  };

  return (
    <HomeLayout>
      <div className="mt-6 px-36 max-lg:px-20 max-md:px-6 mb-[150px]">
        <h1 className="font-workSansSemiBold text-[36px]">Account Details</h1>
        {_renderAccountMobile()}
        <div className="flex max-lg:flex-col w-full justify-between mt-4">
          <div className="flex flex-col w-[68%] bg-dark-800 max-lg:w-full h-[400px] p-8 max-sm:hidden">
            <div className="flex ">
              <div>
                <CircleButton>
                  <Image src={UserIcon} width={32} height={32} alt="user" />
                </CircleButton>
              </div>
              <div className="ml-8 w-[200px]">
                <p className="font-workSansLight">Your account type</p>
                <p className="mt-4 font-workSansLight">
                  Your subscription ends
                </p>
                <p className="mt-4 font-workSansLight">You joined on</p>
                <p className="mt-4 font-workSansLight">To change your plan</p>
              </div>
              <div className="ml-8">
                <p className="font-workSansSemiBold">David Beckham</p>
                <p className="mt-4 font-workSansSemiBold">in 12 days</p>
                <p className="mt-4 font-workSansSemiBold">
                  Sep 05, 2022, 10:49
                </p>
                <Link href={"#"}>
                  <p className="mt-4 text-success-500 font-workSansLight">
                    Click here
                  </p>
                </Link>
              </div>
            </div>

            <div className="flex mt-10">
              <div>
                <CircleButton>
                  <Image
                    src={EmptyWalletGreen}
                    width={32}
                    height={32}
                    alt="user"
                  />
                </CircleButton>
              </div>
              <div className="ml-8 w-[200px]">
                <p className="font-workSansLight">Your current email</p>
                <p className="mt-4 font-workSansLight">Wallet</p>
              </div>
              <div className="ml-8">
                <p className="font-workSansSemiBold">david2329@gmail.com</p>

                <Link href={"#"}>
                  <p className="mt-4 text-success-500 font-workSansLight">
                    Click here
                  </p>
                </Link>
              </div>
            </div>

            <div className="h-[1px] w-[100%] bg-[#38405B] mt-10 mb-5" />

            <button className="flex">
              <Image src={LogoutIcon} width={24} height={24} alt="logout" />
              <p className="font-workSansLight text-primary-500 ml-2">
                Sign out
              </p>
            </button>
          </div>

          {/* */}
          <div className="w-[30%] max-lg:mt-4 bg-dark-800 max-lg:w-full max-lg:h-[360px] max-md:h-[420px] max-md:px-4 h-[400px] p-8 border-[2px] custom-border-linear">
            <Image src={GiftIcon} width={60} height={60} alt="gift" />
            <p className="mt-6 text-xl">
              Earn 1 month free for every friend that signs up
            </p>
            <p className="mt-6 text-sm font-workSansLight">
              Earn 1 month free for every friend you refer that signs up using
              your referral link.
            </p>
            <Link href={"#"}>
              <p className="text-sm font-workSansLight text-success-500">
                Learn more
              </p>
            </Link>
            <div className="bg-secondary-300 flex max-lg:flex-col mt-6  py-1 justify-between">
              <div className="p-3 font-workSansLight text-sm flex  justify-center items-center">
                <Link href={"#"}>
                  <p className="text-[16px] max-2xl:text-[13px]">
                    alphaquest.com/auth/signup?inviter=593498
                  </p>
                </Link>
              </div>
              <div className="flex max-lg:flex-row max-lg:mr-0 max-lg:px-1 flex-col mr-1 justify-between">
                <button className="flex justify-center items-center max-lg:mr-[2px] bg-dark-700 max-lg:w-[50%] px-6 max-2xl:px-4 max-2xl:py-[6px] py-2">
                  <DocumentDuplicateIcon className="h-5 w-5" />
                </button>

                <button className="flex justify-center items-center max-lg:ml-[2px] bg-dark-700 max-lg:w-[50%] px-6 max-2xl:px-4 max-2xl:py-[6px] py-2 mt-[2px] max-lg:mt-0 ">
                  <DocumentDuplicateIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AccountDetails;

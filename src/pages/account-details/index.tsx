import { apiAuth } from "@/api-client";
import { UserPayType } from "@/api-client/types/AuthType";
import {
  EmptyWalletGreen,
  GiftIcon,
  LogoutIcon,
  UserIcon,
} from "@/assets/icons";
import { CircleButton } from "@/components/AQButton";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/contexts/useAuthContext";
import HomeLayout from "@/layouts/HomeLayout";
import { DocumentDuplicateIcon, StarIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AccountDetails = () => {
  const { handleLogOut, authState, accountExtendDetail } =
    useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authState) router.push("/login");
  }, [authState, router]);

  const onSendVerifyMail = async () => {
    setIsLoading(true);
    try {
      if (!authState?.access_token) {
        setIsLoading(false);
        return;
      }
      await apiAuth.verifyEmail(authState?.access_token);
      setIsLoading(false);
      router.push("/mail-sent");
    } catch (error: any) {
      setIsLoading(false);
      toast.error(
        `${error?.response?.data?.error?.message ?? error?.message}`,
        {}
      );
    }
  };

  const _renderAccountMobile = () => {
    return (
      <div className="hidden max-sm:block max-sm:mt-[33px]">
        <div className="flex justify-between border-b-[1px] border-secondary-600 pb-4">
          <p className="font-workSansLight">Username</p>
          <p className="font-workSansSemiBold">
            {accountExtendDetail?.username}
          </p>
        </div>

        <div className="flex mt-4  justify-between border-b-[1px] border-secondary-600 pb-4">
          <p className="font-workSansLight">Your account type</p>
          {accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM ? (
            <div className="border-[2px] border-purple-600 text-purple-600 rounded-xl px-2 ml-3 flex justify-center items-center py-[2px]">
              <StarIcon className="h-5 w-5" />
              <p>Premium</p>
            </div>
          ) : (
            <p
              className={`font-workSansSemiBold ${
                accountExtendDetail?.currentPlanKey === UserPayType.FREE
                  ? "text-secondary-500"
                  : "text-primary-500"
              }`}
            >
              {accountExtendDetail?.currentPlanKey}
            </p>
          )}
        </div>

        <div className="flex mt-4 justify-between border-b-[1px] border-secondary-600 pb-4">
          <p className=" font-workSansLight">Your subscription ends</p>
          <p className=" font-workSansSemiBold">
            {moment(accountExtendDetail?.planExpiredAt).fromNow()}
          </p>
        </div>
        <div className="flex mt-4 justify-between border-b-[1px] border-secondary-600 pb-4">
          <p className=" font-workSansLight">You joined on</p>
          <p className=" font-workSansSemiBold">
            {moment(accountExtendDetail?.planExpiredAt).format(
              "DD-MM-YYYY hh:mm"
            )}
          </p>
        </div>
        <div className="flex justify-between border-b-[1px] mt-4 border-secondary-600 pb-4">
          <p className="font-workSansLight">Email</p>
          <div className="flex justify-center items-center">
            <p className="font-workSansSemiBold">
              {accountExtendDetail?.email}
            </p>
            {accountExtendDetail?.confirmedEmail ? (
              ""
            ) : (
              <button
                className="ml-2"
                disabled={isLoading}
                onClick={onSendVerifyMail}
              >
                {isLoading ? (
                  <Spinner />
                ) : (
                  <p className="text-success-500 font-workSansLight">
                    Verify Email
                  </p>
                )}
              </button>
            )}
          </div>
        </div>
        <div className="flex mt-4 justify-between border-b-[1px] border-secondary-600 pb-4">
          <p className=" font-workSansLight">To change your plan</p>
          <Link href={"#"}>
            <p className="text-success-500 font-workSansLight">Click here</p>
          </Link>
        </div>
        <div className="flex mt-4 justify-between border-b-[1px] border-secondary-600 pb-4">
          <p className=" font-workSansLight">Wallet</p>
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
                <p className="font-workSansLight">Username</p>
                <p className="font-workSansLight mt-4">Your account type</p>
                <p className="mt-4 font-workSansLight">
                  Your subscription ends
                </p>
                <p className="mt-4 font-workSansLight">You joined on</p>
                <p className="mt-4 font-workSansLight">To change your plan</p>
              </div>
              <div className="ml-8">
                <p className="font-workSansSemiBold">
                  {accountExtendDetail?.username ?? " "}
                </p>
                <div className="flex items-center  mt-4">
                  {accountExtendDetail?.currentPlanKey ===
                  UserPayType.PREMIUM ? (
                    <StarIcon className="h-5 w-5 mb-1 text-purple-600" />
                  ) : null}
                  <p
                    className={`font-workSansSemiBold ml-1 ${
                      accountExtendDetail?.currentPlanKey === UserPayType.FREE
                        ? "text-secondary-500"
                        : "text-purple-600"
                    }`}
                  >
                    {accountExtendDetail?.currentPlanKey}
                  </p>
                </div>
                <p className="mt-4 font-workSansSemiBold">
                  {moment(accountExtendDetail?.planExpiredAt).fromNow()}
                </p>
                <p className="mt-4 font-workSansSemiBold">
                  {moment(accountExtendDetail?.createdAt).format(
                    "MM-DD-YYYY, hh:mm"
                  )}
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
                <div className="flex justify-center items-center">
                  <p className="font-workSansSemiBold">
                    {accountExtendDetail?.email}
                  </p>
                  {accountExtendDetail?.confirmedEmail ? (
                    ""
                  ) : (
                    <button
                      className="ml-2"
                      disabled={isLoading}
                      onClick={onSendVerifyMail}
                    >
                      {isLoading ? (
                        <div className="ml-2">
                          <Spinner />
                        </div>
                      ) : (
                        <p className="text-success-500 font-workSansLight">
                          Verify Email
                        </p>
                      )}
                    </button>
                  )}
                </div>

                <Link href={"#"}>
                  <p className="mt-4 text-success-500 font-workSansLight">
                    Click here
                  </p>
                </Link>
              </div>
            </div>

            <div className="h-[1px] w-[100%] bg-[#38405B] mt-10 mb-1" />

            <button className="flex" onClick={handleLogOut}>
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
                    alphaquest.com/auth/signup?inviter=
                    {accountExtendDetail?.inviteCode}
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

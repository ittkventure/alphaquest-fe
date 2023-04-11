import { apiAuth, apiPayment } from "@/api-client";
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
import React, { useContext, useEffect, useState, Fragment } from "react";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { KeyIcon } from "@heroicons/react/24/outline";
import ChangePasswordModal from "@/components/AQModal/ChangePasswordModal";

const AccountDetails = () => {
  const {
    handleLogOut,
    authState,
    accountExtendDetail,
    canCancel,
    getAccountExtendDetails,
    getCanCancel,
  } = useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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

  const onCancelSub = async () => {
    setIsLoading(true);
    try {
      if (authState?.access_token) {
        await apiPayment.cancelPayment(authState?.access_token);
        await getAccountExtendDetails();
        await getCanCancel();

        closeModal();
        toast.success("Cancel successful");
      } else {
        toast.error("Error when cancel please try again");
      }

      setIsLoading(false);
    } catch (error: any) {
      if (error?.response?.data?.error?.message) {
        toast.error(error?.response?.data?.error?.message);
      } else {
        toast.error("Error when payment, please try again!");
      }
      setIsLoading(false);
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
        <div className="flex mt-4 justify-between border-b-[1px] border-secondary-600 pb-4">
          <p className=" font-workSansLight">Password</p>
          <button
            className="flex"
            onClick={() => setIsOpenChangePassword(true)}
          >
            <p className="font-workSansLight text-success-500">
              Change password
            </p>
          </button>
        </div>

        <div className="flex mt-4  justify-between border-b-[1px] border-secondary-600 pb-4">
          <p className="font-workSansLight">Your account type</p>
          {accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM ? (
            <div className="flex">
              <div className="text-yellow-400 rounded-xl px-2 ml-3 flex justify-center items-center py-[2px]">
                <StarIcon className="h-5 w-5" />
                <p>PRO</p>
              </div>
              {canCancel ? (
                <button
                  onClick={openModal}
                  className="text-primary-500 font-workSansLight ml-2"
                >
                  Cancel
                </button>
              ) : null}
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

        {/* <div className="flex mt-4 justify-between border-b-[1px] border-secondary-600 pb-4">
          <p className=" font-workSansLight">Wallet</p>
          <Link href={"#"}>
            <p className="text-success-500 font-workSansLight">Click here</p>
          </Link>
        </div> */}

        <div className="flex mt-4 justify-between">
          <button
            onClick={() => {
              handleLogOut();
              router.push("login");
            }}
            className="flex"
          >
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
                <p className="font-workSansLight mt-4 ">Password</p>
                <p className="font-workSansLight mt-4">Your account type</p>
                <p className="mt-4 font-workSansLight">
                  Your subscription ends
                </p>
                <p className="mt-4 font-workSansLight">You joined on</p>
                {/* <p className="mt-4 font-workSansLight">To change your plan</p> */}
              </div>
              <div className="ml-8">
                <p className="font-workSansSemiBold">
                  {accountExtendDetail?.username ?? " "}
                </p>
                <div className="mt-4 flex items-center">
                  <button
                    className="flex"
                    onClick={() => setIsOpenChangePassword(true)}
                  >
                    <p className="font-workSansLight text-success-500">
                      Change password
                    </p>
                  </button>
                </div>
                <div className="flex items-center  mt-4">
                  {accountExtendDetail?.currentPlanKey ===
                  UserPayType.PREMIUM ? (
                    <StarIcon className="h-5 w-5 mb-1 text-yellow-400" />
                  ) : null}
                  <p
                    className={`font-workSansSemiBold ml-1 ${
                      accountExtendDetail?.currentPlanKey === UserPayType.FREE
                        ? "text-secondary-500"
                        : "text-yellow-400"
                    }`}
                  >
                    {accountExtendDetail?.currentPlanKey === UserPayType.FREE
                      ? "FREE"
                      : "PRO"}
                  </p>
                  {accountExtendDetail?.currentPlanKey ===
                    UserPayType.PREMIUM && canCancel ? (
                    <button
                      onClick={openModal}
                      className="text-primary-500 font-workSansLight ml-2"
                    >
                      Cancel
                    </button>
                  ) : null}
                </div>
                <p className="mt-4 font-workSansSemiBold">
                  {moment(accountExtendDetail?.planExpiredAt).fromNow()}
                </p>
                <p className="mt-4 font-workSansSemiBold">
                  {moment(accountExtendDetail?.createdAt).format(
                    "MM-DD-YYYY, hh:mm"
                  )}
                </p>
                {/* <Link href={"#"}>
                  <p className="mt-4 text-success-500 font-workSansLight">
                    Click here
                  </p>
                </Link> */}
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
              <div className="ml-8 w-[200px] mt-5">
                <p className="font-workSansLight">Your current email</p>
                {/* <p className="mt-4 font-workSansLight">Wallet</p> */}
              </div>
              <div className="ml-8 mt-5">
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

                {/* <Link href={"#"}>
                  <p className="mt-4 text-success-500 font-workSansLight">
                    Click here
                  </p>
                </Link> */}
              </div>
            </div>

            <div className="h-[1px] w-[100%] bg-[#38405B] mt-10 mb-1" />

            <div className="flex">
              <button
                className="flex"
                onClick={() => {
                  handleLogOut();
                  router.push("login");
                }}
              >
                <Image src={LogoutIcon} width={24} height={24} alt="logout" />
                <p className="font-workSansLight text-primary-500 ml-2">
                  Sign out
                </p>
              </button>
            </div>
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

            <div className="mt-10 flex">
              <p>Coming soon</p>
            </div>
            {/* <div className="bg-secondary-300 flex max-lg:flex-col mt-6  py-1 justify-between">
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
            </div> */}
          </div>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-dark-800 p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-primary-500"
                    >
                      Are you sure you want to unsubscribe?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your payment has been successfully submitted. We’ve sent
                        you an email with all of the details of your order.
                      </p>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center items-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                        disabled={isLoading}
                      >
                        {isLoading ? <Spinner /> : <p>No</p>}
                      </button>

                      <button
                        type="button"
                        className="inline-flex ml-3 justify-center items-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={onCancelSub}
                        disabled={isLoading}
                      >
                        {isLoading ? <Spinner /> : <p>Yes, sure</p>}
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        <ChangePasswordModal
          isOpen={isOpenChangePassword}
          closeModal={() => setIsOpenChangePassword(false)}
        />
      </div>
    </HomeLayout>
  );
};

export default AccountDetails;

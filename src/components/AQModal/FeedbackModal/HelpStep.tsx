import { DiscordIcon, MailIcon, TeleIcon } from "@/assets/icons";
import { PhaoImg } from "@/assets/images";
import { CancelContext } from "@/contexts/useCancelContext";
import { Dialog } from "@headlessui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const HelpStep = () => {
  const { nextStep, backStep } = useContext(CancelContext);

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-3xl font-workSansBold leading-6 mt-7  flex items-center"
      >
        <Image src={PhaoImg} width={40} height={40} alt="icon" />
        <p className="ml-4">We’re here to help</p>
      </Dialog.Title>
      <div className="mt-6">
        <p className="text-[16px] leading-5 text-white">
          You can contact our team at one of the followings options
        </p>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-2 gap-6">
          <Link href={"https://t.me/alphaquestio"} target="_blank">
            <div className="flex items-center py-[19px] px-5 border border-[#38405B] hover:border-success-500">
              <Image src={TeleIcon} width={32} height={26.38} alt="icon" />
              <p className="ml-5">Telegram</p>
            </div>
          </Link>

          <Link href={"https://discord.com/invite/EsMqKqjKB2"} target="_blank">
            <div className="flex items-center py-[19px] px-5 border border-[#38405B] hover:border-success-500">
              <Image src={DiscordIcon} width={32} height={26.38} alt="icon" />
              <p className="ml-5">Discord</p>
            </div>
          </Link>
        </div>
        <div className="mt-6">
          <Link href={"mailto:support@alphaquest.io"}>
            <div className="flex items-center py-[19px] px-5 border border-[#38405B] hover:border-success-500">
              <Image src={MailIcon} width={32} height={26.38} alt="icon" />
              <p className="ml-5">
                Email:{" "}
                <span className="underline">mailto:support@alphaquest.io</span>
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={backStep}
            className="flex border border-success-500 hover:border-success-600 p-3 text-success-500"
          >
            <ArrowLeftIcon className=" w-6" />
            <p className="ml-3">Back</p>
          </button>

          <button
            onClick={() => nextStep(3)}
            className="flex bg-success-500 p-3 text-white hover:bg-success-600"
          >
            <p className="mr-3">Next</p>
            <ArrowRightIcon className="w-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export default HelpStep;

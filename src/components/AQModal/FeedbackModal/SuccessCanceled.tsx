import { TickCircle } from "@/assets/icons";
import { Dialog } from "@headlessui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { FC } from "react";
interface ISuccessCanceled {
  closeModal: () => void;
}
const SuccessCanceled: FC<ISuccessCanceled> = ({ closeModal }) => {
  return (
    <>
      <div className="mt-6 flex justify-center items-center">
        <Image src={TickCircle} width={72} height={72} alt="icon" />
      </div>
      <Dialog.Title
        as="h3"
        className="text-3xl font-workSansBold leading-6 mt-7 justify-center flex items-center"
      >
        <p className="">Subscription canceled</p>
      </Dialog.Title>
      <div className="mt-6">
        <p className="text-[16px] leading-5 text-white text-center">
          You won’t be billed again
        </p>
      </div>
      <div className="mt-6">
        <div className="flex justify-center">
          <button
            onClick={closeModal}
            className="flex mb-6 w-[156px] justify-center bg-success-500 p-3 text-white hover:bg-success-600"
          >
            <p>Go to account</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default SuccessCanceled;

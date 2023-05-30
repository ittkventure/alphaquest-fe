import { CancelContext } from "@/contexts/useCancelContext";
import { Dialog } from "@headlessui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";

const WriteFeedback = () => {
  const { nextStep, backStep, setMessageStep3 } = useContext(CancelContext);

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-3xl font-workSansBold leading-6 mt-7  flex items-center"
      >
        <p className="">What could we have done better?</p>
      </Dialog.Title>
      <div className="mt-6">
        <p className="text-[16px] leading-5 text-white">
          We want to make the best product possible. We’d appreciate your honest
          feedback.
        </p>
      </div>
      <div className="mt-6">
        <textarea
          className="border border-[#38405B] bg-transparent w-full h-[178px] py-[12px] px-4"
          placeholder="We read every answer"
          onChange={(e) => setMessageStep3(e.target.value)}
        />

        <div className="mt-6 flex justify-between">
          <button
            onClick={backStep}
            className="flex border border-success-500 hover:border-success-600 p-3 text-success-500"
          >
            <ArrowLeftIcon className=" w-6" />
            <p className="ml-3">Back</p>
          </button>
          <button
            onClick={() => nextStep(4)}
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

export default WriteFeedback;

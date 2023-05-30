import { PrayImg } from "@/assets/images";
import CodeFeedbackIcon from "@/assets/reactIcons/CodeFeedbackIcon";
import DollarIcon from "@/assets/reactIcons/DollarIcon";
import HeadPhoneIcon from "@/assets/reactIcons/HeadPhoneIcon";
import MissingIcon from "@/assets/reactIcons/MissingIcon";
import XCloseIcon from "@/assets/reactIcons/XCloseIcon";
import { CancelContext, StepType } from "@/contexts/useCancelContext";
import { Dialog } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useContext, useState } from "react";

const SelectFeedback = () => {
  const { nextStep, setMessageStep2, setStepType, messageStep2 } =
    useContext(CancelContext);

  const listSelectFeedback = [
    {
      id: 0,
      stepType: "COST",
      label: "Cost",
      icon: (color: string) => <DollarIcon color={color} />,
      onClick: () => {
        nextStep(3);
      },
    },
    {
      id: 1,
      stepType: "MISSING_FEATURES",
      label: "Missing features",
      icon: (color: string) => <MissingIcon color={color} />,
      onClick: () => {
        nextStep(3);
      },
    },
    {
      id: 2,
      stepType: "TECHNICAL_ISSUES",
      label: "Technical issues",
      icon: (color: string) => <CodeFeedbackIcon color={color} />,
      onClick: () => {
        nextStep(2);
      },
    },
    {
      id: 3,
      stepType: "CUSTOMER_SUPPORT",
      label: "Customer support",
      icon: (color: string) => <HeadPhoneIcon color={color} />,
      onClick: () => {
        nextStep(2);
      },
    },
    {
      id: 4,
      stepType: "OTHER",
      label: "Other",
      icon: (color: string) => <XCloseIcon color={color} />,
      onClick: () => {
        nextStep(3);
      },
    },
  ];

  const [selectId, setSelectId] = useState(-1);

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-3xl font-workSansBold leading-6 mt-7  flex items-center"
      >
        <Image src={PrayImg} width={40} height={40} alt="icon" />
        <p className="ml-4">We’re sorry to see you go</p>
      </Dialog.Title>
      <div className="mt-6">
        <p className="text-[16px] leading-5 text-white">
          Can you tell us why you’re leaving?
        </p>
      </div>
      <div className="mt-6">
        <div className="mt-6">
          {listSelectFeedback.map((item) => (
            <div
              onClick={() => {
                setStepType(item.stepType as StepType);
                setSelectId(item.id);
              }}
              key={item.id}
              className={`flex items-center py-[15px] px-5 mb-3 border cursor-pointer  hover:border-success-600 ${
                selectId === item.id ? "border-success-500" : "border-[#38405B]"
              }`}
            >
              {item.icon(`${item.id === selectId ? "#24B592" : "white"}`)}
              <p
                className={`ml-2 ${
                  selectId === item.id ? "text-success-500" : "text-white"
                }`}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {selectId === 4 && (
          <div className="mt-6">
            <p>Could you tell us more?</p>
            <textarea
              className="border border-[#38405B] bg-transparent w-full mt-[12px] h-[84px] py-[12px] px-4"
              placeholder="We read every answer"
              onChange={(e) => setMessageStep2(e.target.value)}
            />
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              if (selectId === -1) return;
              if (selectId === 4 && !messageStep2) return;

              listSelectFeedback[selectId].onClick();
            }}
            className={`flex ${
              selectId === -1 || (selectId === 4 && !messageStep2)
                ? "bg-gray-700 bg-opacity-25 text-gray-400"
                : "bg-success-500 hover:bg-success-600 text-white"
            } p-3 `}
          >
            <p className="mr-3">Next</p>
            <ArrowRightIcon className="w-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SelectFeedback;

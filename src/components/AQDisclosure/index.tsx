import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { FC, useState } from "react";

interface IAQDisclosure {
  index: number;
  classNameContainer?: string;
  title: string;
  content: string;
}

const AQDisclosure: FC<IAQDisclosure> = ({
  index,
  classNameContainer,
  title,
  content,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className={`w-full bg-dark-800 flex flex-col py-1 px-4 items-center justify-between ${classNameContainer}`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <p>{index}</p>{" "}
          <p className="text-[40px] mx-4 font-workSansExtraLight text-success-500">
            /
          </p>{" "}
          <p className="max-lg:text-left max-lg:text-sm">{title}</p>
        </div>
        <div
          className={`transition-all duration-200 ${!open ? "" : "rotate-180"}`}
        >
          <ChevronDownIcon className="h-5 w-5 text-success-500" />
        </div>
      </div>

      <div
        className={`transition-all w-full duration-500 pr-2 text-left ml-14 font-workSansLight ${
          open ? "max-h-max py-4 max-lg:py-0 mb-6" : "h-0 py-0 overflow-hidden"
        }`}
      >
        <p className="mt-4 pr-3 max-lg:text-sm">{content}</p>
      </div>
    </button>
  );
};

export default AQDisclosure;

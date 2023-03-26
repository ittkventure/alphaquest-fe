import { TimeFrameTypes } from "@/api-client/types/TwitterType";
import { initListMonth } from "@/utils/list";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { FC, useEffect, useState } from "react";

export type MothType = {
  label?: string;
  value?: TimeFrameTypes;
};

interface MonthSelectTypes {
  onChangeSelect: (month: MothType) => void;
}

const MonthSelect: FC<MonthSelectTypes> = ({ onChangeSelect }) => {
  const [listMonth, setListMonth] = useState(initListMonth);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<MothType>({
    label: "7d",
    value: "7D",
  });

  useEffect(() => {
    onChangeSelect(selectedValue);
  }, [onChangeSelect, selectedValue]);

  return (
    <div>
      {isShowMenu ? (
        <div
          onClick={() => setIsShowMenu(false)}
          className="absolute w-[98vw] h-screen opacity-0 top-0 left-0 z-30"
        />
      ) : null}
      <div className="relative">
        <button
          onClick={() => setIsShowMenu(!isShowMenu)}
          className="text-success-500 flex justify-center items-center border-b border-success-500 px-[2px] ml-2"
        >
          <p>{selectedValue.label}</p>
          <ChevronDownIcon className="h-5 w-5 ml-2" />
        </button>
        <div
          className={`bg-secondary-600 transition-all duration-300 w-24 absolute top-[26px] z-40 ${
            isShowMenu ? "opacity-100" : "opacity-0"
          }`}
        >
          {listMonth.map((value, index) => (
            <button
              key={index.toString()}
              className={`flex justify-center items-center w-24 py-2 hover:bg-success-500 font-workSansLight ${
                isShowMenu ? "" : "hidden"
              } ${selectedValue.value === value.value ? "bg-success-500" : ""}`}
              onClick={() => {
                setSelectedValue(value as MothType);
                setIsShowMenu(false);
              }}
            >
              {value.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthSelect;

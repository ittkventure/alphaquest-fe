import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { FC, useState } from "react";

export type OptionType = {
  label?: string;
  value?: number;
};

interface SelectCustomTypes {
  placeholder?: string;
  initList: OptionType[];
}

const SelectCustom: FC<SelectCustomTypes> = ({ placeholder, initList }) => {
  const [listMonth, setListMonth] = useState(initList ?? []);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<OptionType>({
    label: placeholder ?? "Select",
    value: -1,
  });

  return (
    <div>
      {isShowMenu ? (
        <div
          onClick={() => setIsShowMenu(false)}
          className="absolute w-[95vw] h-screen opacity-0 top-0 left-0 z-30"
        />
      ) : null}
      <div className="relative">
        <button
          onClick={() => setIsShowMenu(!isShowMenu)}
          className={`w-52 max-lg:w-[44vw] bg-secondary-600 flex justify-between items-center p-2`}
        >
          <p className="text-sm">{selectedValue.label}</p>
          <ChevronDownIcon className="h-5 w-5 ml-2" />
        </button>
        <div
          className={`bg-secondary-600 transition-all duration-300 w-52 max-lg:w-[44vw] absolute top-[36px] z-40 ${
            isShowMenu ? "opacity-100" : "opacity-0"
          }`}
        >
          {listMonth.map((value, index) => (
            <button
              key={index.toString()}
              className={`flex justify-center items-center w-52 max-lg:w-[44vw] max-lg:text-[14px] py-2 hover:bg-success-500 font-workSansThin ${
                isShowMenu ? "" : "hidden"
              } ${selectedValue.value === value.value ? "bg-success-500" : ""}`}
              onClick={() => {
                setSelectedValue(value);
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

export default SelectCustom;

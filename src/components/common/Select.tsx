import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { FC, useEffect, useMemo, useState } from "react";

export type OptionType = {
  code?: string;
  name?: string | number;
};

interface SelectCustomTypes {
  placeholder?: string;
  initList: OptionType[];
  onChangeSelected?: (selectedItem?: OptionType) => void;
  selectedValue?: OptionType;
  isShowSelectOption?: boolean;
}

const SelectCustom: FC<SelectCustomTypes> = ({
  placeholder,
  initList,
  onChangeSelected,
  selectedValue,
  isShowSelectOption = true,
}) => {
  // const [listMonth, setListMonth] = useState(initList ?? []);
  const [isShowMenu, setIsShowMenu] = useState(false);

  const listMonth = useMemo(
    () =>
      isShowSelectOption
        ? [
            {
              name: placeholder ?? "Select",
              code: "",
            },
            ...initList,
          ]
        : [...initList],
    [initList, placeholder]
  );

  return (
    <div>
      {isShowMenu ? (
        <div
          onClick={() => setIsShowMenu(false)}
          className="absolute w-[100vw] h-screen opacity-0 top-0 left-[-260px] max-lg:left-0 z-30"
        />
      ) : null}
      <div className="relative">
        <button
          onClick={() => setIsShowMenu(!isShowMenu)}
          className={`w-52 max-lg:w-[44vw] bg-secondary-600 flex justify-between items-center p-2`}
        >
          <p className="text-sm">
            {selectedValue
              ? listMonth.find((value) => value.code === selectedValue.code)
                  ?.name
              : placeholder ?? "Select"}
          </p>
          <ChevronDownIcon className="h-5 w-5 ml-2" />
        </button>
        <div
          className={`bg-secondary-600 max-h-[400px] overflow-y-scroll overflow-x-hidden transition-all duration-300 w-52 max-lg:w-[44vw] absolute top-[36px] z-40 ${
            isShowMenu ? "opacity-100" : "opacity-0"
          }`}
        >
          {listMonth.map((value, index) => (
            <button
              key={index.toString()}
              className={`flex justify-center items-center w-52 max-lg:w-[44vw] max-lg: text-sm py-2 hover:bg-success-500 font-workSansLight ${
                isShowMenu ? "" : "hidden"
              } ${
                selectedValue?.code?.toString().toUpperCase() ===
                value.code?.toString().toUpperCase()
                  ? "bg-success-500"
                  : ""
              }`}
              onClick={() => {
                onChangeSelected && onChangeSelected(value);
                setIsShowMenu(false);
              }}
            >
              {value.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectCustom;

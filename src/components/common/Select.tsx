import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { FC, useEffect, useMemo, useState } from "react";

export type OptionType = {
  code?: string;
  name?: string | number;
};

interface SelectCustomTypes {
  placeholder?: string;
  initList: OptionType[];
  onChangeSelected?: (selectedItem?: OptionType) => void;
}

const SelectCustom: FC<SelectCustomTypes> = ({
  placeholder,
  initList,
  onChangeSelected,
}) => {
  // const [listMonth, setListMonth] = useState(initList ?? []);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<OptionType>({
    name: placeholder ?? "Select",
    code: "",
  });

  const listMonth = useMemo(
    () => [
      {
        name: placeholder ?? "Select",
        code: "",
      },
      ...initList,
    ],
    [initList, placeholder]
  );

  useEffect(() => {
    if (onChangeSelected) onChangeSelected(selectedValue);
  }, [onChangeSelected, selectedValue]);

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
          <p className="text-sm">{selectedValue.name}</p>
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
              className={`flex justify-center items-center w-52 max-lg:w-[44vw] max-lg:text-[14px] py-2 hover:bg-success-500 font-workSansLight ${
                isShowMenu ? "" : "hidden"
              } ${selectedValue.code === value.code ? "bg-success-500" : ""}`}
              onClick={() => {
                setSelectedValue(value);
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

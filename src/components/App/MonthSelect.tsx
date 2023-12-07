import { SortByType, TimeFrameTypes } from "@/api-client/types/TwitterType";
import { initListMonth } from "@/utils/list";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { FC, useEffect, useState } from "react";

export type MothType = {
  label?: string;
  value?: TimeFrameTypes | SortByType | any;
};

interface MonthSelectTypes {
  onChangeSelect: (month: MothType) => void;
  listData?: Array<MothType>;
  defaultData?: MothType | any;
  className?: string;
}

const MonthSelect: FC<MonthSelectTypes> = ({
  onChangeSelect,
  listData,
  defaultData,
  className,
}) => {
  const [listMonth, setListMonth] = useState(listData ?? initListMonth);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<MothType>(
    defaultData ?? {
      label: "7d",
      value: "7D",
    }
  );

  useEffect(() => {
    setSelectedValue(
      defaultData ?? {
        label: "7d",
        value: "7D",
      }
    );
  }, [defaultData]);

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
          className="text-success-500 flex justify-center items-center border-b border-success-500 px-[2px]"
        >
          <p>{selectedValue.label}</p>
          <ChevronDownIcon className="h-5 w-5 ml-2" />
        </button>
        <div
          className={`bg-secondary-600 transition-all duration-300 w-24 absolute top-[26px] z-[9999] ${
            isShowMenu ? "opacity-100" : "opacity-0"
          }`}
        >
          {listMonth.map((value, index) => (
            <button
              key={index.toString()}
              className={`flex justify-center items-center w-24 py-2 hover:bg-success-500 font-workSansLight ${
                isShowMenu ? "" : "hidden"
              } ${
                selectedValue.value === value.value ? "bg-success-500" : ""
              } ${className}`}
              onClick={() => {
                setIsShowMenu(false);
                onChangeSelect(value as MothType);
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

export default React.memo(MonthSelect);

import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { CrownIcon } from "@/assets/icons";
import Header from "./Header";
import MonthSelect from "./MonthSelect";
import SelectCustom from "../common/Select";
import { initListCategory, initListChain } from "@/utils/list";
import TableContent from "./Table/TableContent";
import TabApp from "./TabApp";

const AppContent = () => {
  return (
    <div className=" w-full">
      <div className="p-6">
        <Header />
        <div className="h-[1px] bg-white bg-opacity-20 my-4 max-lg:hidden" />
      </div>
      <div className="hidden max-lg:block">
        <TabApp />
      </div>
      <div className="px-6 pb-6">
        <div className="flex max-lg:flex-col max-lg:items-center justify-between">
          <div className="flex items-center max-lg:mt-2">
            <p>353 trending projects discovered during the last</p>
            <MonthSelect />
          </div>

          <div className="flex max-lg:items-center justify-between max-lg:mt-5">
            <div className="mr-3">
              <SelectCustom
                placeholder="Chain - All"
                initList={initListChain}
              />
            </div>
            <div>
              <SelectCustom
                placeholder="Category - All"
                initList={initListCategory}
              />
            </div>
          </div>
        </div>

        <div className="mt-7 max-lg:mt-9">
          <TableContent />
        </div>
      </div>
    </div>
  );
};

export default AppContent;

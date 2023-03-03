import React from "react";

const SkeletonRow = () => {
  return (
    <div className="flex justify-between mt-4 max-lg:border-b max-lg:border-b-secondary-600 max-lg:pb-4 animate-pulse">
      <div className="flex items-center">
        <div className="mr-4 w-2 h-2 bg-slate-500"></div>
        <div className="mr-4">
          <div className="w-10 h-10 rounded-[50%] bg-slate-500 overflow-hidden relative"></div>
        </div>
        <div className="mr-4">
          <div className="flex bg-slate-500 w-[10vw] h-2">
            <p className="text-success-500 max-lg:text-[14px] font-workSansSemiBold mr-2"></p>
          </div>
          <div className="flex bg-slate-500 w-[55vw] h-2 mt-1">
            <p className="font-workSansRegular max-lg:text-[12px] text-sm"></p>
          </div>
          <div className="flex bg-slate-500 w-[23vw] h-2 mt-1">
            <p className="font-workSansRegular text-sm max-lg:text-[12px] text-secondary-500"></p>
          </div>
        </div>
      </div>
      <div className="flex max-lg:flex-col max-lg:justify-between max-lg:py-2 justify-end items-center ">
        <div className="border bg-slate-500 px-1 mr-2 max-lg:text-[12px]"></div>
      </div>
    </div>
  );
};

export default SkeletonRow;

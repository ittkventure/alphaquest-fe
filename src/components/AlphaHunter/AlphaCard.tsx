import React from "react";
import PieChartCard from "./PieChartCard";
import { ClockIcon } from "@heroicons/react/24/outline";
import { mockAssetDistributionData } from "@/utils/mock";
import { PaletteList } from "@/utils/config";

const AlphaCard = () => {
  const renderDesktop = () => {
    return (
      <div className="w-full bg-dark-800 p-6 max-[718px]:hidden">
        <p className="text-[18px] leading-5">Alpha by Blockchain</p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="mt-10">
            {mockAssetDistributionData.map((item, index) => {
              return (
                <div
                  key={index.toString()}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="flex items-center">
                    <div
                      style={{ backgroundColor: PaletteList[index] }}
                      className="w-3 h-3 rounded-[50%] mr-3"
                    />
                    <p className="text-sm">{item.name}</p>
                  </div>
                  <p className="text-sm">{item.value}</p>
                </div>
              );
            })}
          </div>
          <PieChartCard />
        </div>

        <div className="mt-7 flex justify-end items-center">
          <ClockIcon className="h-3 w-3 text-gray-500 mr-[6px]" />
          <p className="text-sm text-gray-500">4 min ago</p>
        </div>
      </div>
    );
  };

  const renderMobile = () => {
    return (
      <div className="w-full bg-dark-800 p-6 hidden max-[718px]:block">
        <div className="flex justify-between">
          <p className="text-[18px] leading-5">Alpha by Blockchain</p>
          <div className="flex items-center">
            <ClockIcon className="h-3 w-3 text-gray-500 mr-[6px]" />
            <p className="text-sm text-gray-500">4 min ago</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-6">
          <PieChartCard />

          <div className="mt-10">
            {mockAssetDistributionData.map((item, index) => {
              return (
                <div
                  key={index.toString()}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="flex items-center">
                    <div
                      style={{ backgroundColor: PaletteList[index] }}
                      className="w-3 h-3 rounded-[50%] mr-3"
                    />
                    <p className="text-sm">{item.name}</p>
                  </div>
                  <p className="text-sm">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {renderDesktop()}
      {renderMobile()}
    </>
  );
};

export default AlphaCard;

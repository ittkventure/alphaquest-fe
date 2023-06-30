import React, { FC } from "react";
import PieChartCard from "./PieChartCard";
import { ClockIcon } from "@heroicons/react/24/outline";
import { mockAssetDistributionData } from "@/utils/mock";
import { PaletteList } from "@/utils/config";
import Spinner from "../Spinner";

interface IItems {
  name: string;
  value: string;
  color: string;
}

interface IAlphaCard {
  items?: IItems[] | any[];
  label: string;
  isLoading?: boolean;
}

const AlphaCard: FC<IAlphaCard> = ({ items, label, isLoading }) => {
  const renderDesktop = () => {
    return (
      <div className="w-full bg-dark-800 p-6 max-[718px]:hidden flex flex-col justify-between">
        <div>
          <p className="text-[18px] leading-5">{label}</p>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="mt-10">
              {!isLoading &&
                items?.map((item, index) => {
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

            {isLoading ? <Spinner /> : <PieChartCard items={items} />}
          </div>
        </div>
        <div className="mt-7 flex justify-end items-center h-auto ">
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
          <PieChartCard items={items} />

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

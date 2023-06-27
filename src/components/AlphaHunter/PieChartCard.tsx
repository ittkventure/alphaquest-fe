import { mockAssetDistributionData } from "@/utils/mock";
import React, { FC } from "react";
import { AssetPieChart } from "../AssetPieChart";
interface IItems {
  name: string;
  value: string;
  color: string;
}

interface IPieChartCard {
  items?: IItems[] | any[];
}

const PieChartCard: FC<IPieChartCard> = ({ items }) => {
  const handleProcessData = () => {
    let sum = 0;
    items?.forEach((item) => {
      sum += item.value;
    });
    const data = items?.map((item) => {
      return {
        name: item.name,
        value: (item.value * 100) / sum,
        color: item.color,
      };
    });
    console.log({ data, sum }, "asdasd");

    return { data, sum };
  };

  return (
    <div className="w-full h-full flex justify-end max-[718px]:justify-center items-center">
      <div className="relative h-56 w-56">
        <AssetPieChart data={handleProcessData()} />
      </div>
    </div>
  );
};

export default PieChartCard;

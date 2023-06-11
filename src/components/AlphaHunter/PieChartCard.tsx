import { mockAssetDistributionData } from "@/utils/mock";
import React from "react";
import { AssetPieChart } from "../AssetPieChart";

const PieChartCard = () => {
  return (
    <div className="w-full h-full flex justify-end max-[718px]:justify-center items-center">
      <div className="relative h-56 w-56">
        <AssetPieChart data={mockAssetDistributionData} />
      </div>
    </div>
  );
};

export default PieChartCard;

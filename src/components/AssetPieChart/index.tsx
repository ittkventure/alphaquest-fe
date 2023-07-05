import { PaletteList } from "@/utils/config";
import React, { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";

export interface IPieData {
  name: string;
  value: number;
}
interface IAssetPieChartProps {
  data:
    | {
        data: IPieData[];
        sum: number;
      }
    | any;
}
const renderActiveShape = (props: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: IPieData;
  percent: number;
  value: number;
}) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    payload,
    fill,
  } = props;

  return (
    <g style={{ outline: "none" }} className="cursor-pointer outline-none">
      <text
        style={{ outline: "none" }}
        x={cx + 5}
        y={cy - 10}
        fontSize={"28px"}
        dy={8}
        textAnchor="middle"
        fill="white"
      >
        {payload.value}%
      </text>

      <foreignObject
        x={0}
        y={cy + 10}
        dy={8}
        width="100%"
        height="50"
        textAnchor="middle"
        r="0"
      >
        <div className="w-full flex justify-center h-full z-[-20]">
          <p className=" text-center w-[100px] text-sm">{payload.name}</p>
        </div>
      </foreignObject>
      <Sector
        style={{ outline: "none" }}
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        r="20"
      />
      <Sector
        style={{ outline: "none" }}
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 3}
        outerRadius={outerRadius + 6}
        fill={fill}
        r="20"
      />
    </g>
  );
};
export const AssetPieChart: React.FC<IAssetPieChartProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data.data}
          innerRadius={75}
          outerRadius={100}
          dataKey="value"
          onMouseEnter={onPieEnter}
          startAngle={360}
          endAngle={0}
        >
          {data.data?.map((_entry: any, index: number) => (
            <Cell
              stroke="none"
              key={`cell-${index}`}
              fill={PaletteList[index]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CustomTooltipNotLabel from "./CustomTooltipNotLabel";

export default function Chart({ item, listData }: any) {
  return (
    <>
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart width={302} height={140} data={listData}>
          <CartesianGrid horizontal={true} vertical={false} stroke="#38405B" />

          <Tooltip
            itemStyle={{ color: "#fff" }}
            cursor={true}
            content={
              <CustomTooltipNotLabel
                dotColor={item?.growthPercent > 0 ? "#24B592" : "#E25148"}
              />
            }
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="followerCount"
            stroke={item?.growthPercent > 0 ? "#24B592" : "#E25148"}
            strokeWidth="2"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

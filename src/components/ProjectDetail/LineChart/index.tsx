import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import { ChartData } from "@/api-client/types/TwitterType";
import { formattedDate } from "@/utils/date";
import Spinner from "@/components/Spinner";
import useResponsive from "@/hooks/useWindowDimensions";

interface ILineChartCustom {
  data: ChartData[];
  loading?: boolean;
}

const LineChartCustom: React.FC<ILineChartCustom> = ({ data, loading }) => {
  if (data.length === 0) return <div></div>;
  const { isMd, isSm } = useResponsive();

  const processData = useMemo(
    () =>
      data.map((value) => {
        return {
          name: formattedDate(new Date(value.dataTime)),
          twitterFollow: value.followerCount,
          hunterFollow: value.alphaHuntersCount,
          alphaHunters: value.alphaHunters,
        };
      }),
    [data]
  );

  if (loading)
    return (
      <div className="w-full h-full">
        <Spinner />
      </div>
    );

  return (
    <ResponsiveContainer width="100%" aspect={isMd || isSm ? 1 : 3}>
      <LineChart width={500} height={300} data={processData}>
        <CartesianGrid horizontal={true} vertical={false} stroke="#38405B" />
        <XAxis
          dataKey="name"
          tick={{ fill: "#fff" }}
          fontSize={14}
          fontFamily="WorkSans-Medium"
          fontWeight={500}
          padding={{ left: 48, right: 48 }}
          domain={["twitterFollow", "hunterFollow"]}
        />
        {!isMd && !isSm && (
          <YAxis
            yAxisId="left"
            tick={{ fill: "#fff" }}
            fontSize={14}
            fontFamily="WorkSans-Medium"
          />
        )}
        {!isMd && !isSm && (
          <YAxis
            yAxisId="right"
            tick={{ fill: "#fff" }}
            fontSize={14}
            fontFamily="WorkSans-Medium"
            orientation="right"
          />
        )}
        <Tooltip
          itemStyle={{ color: "#fff" }}
          cursor={true}
          content={<CustomTooltip />}
        />

        <Line
          yAxisId="left"
          type="monotone"
          dataKey="twitterFollow"
          stroke="#24B592"
          strokeWidth="2"
          dot={false}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="hunterFollow"
          stroke="#E25148"
          strokeWidth="2"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default React.memo(LineChartCustom);

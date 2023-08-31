import { apiTwitter } from "@/api-client";
import CustomTooltip2 from "@/components/ProjectDetail/LineChart/CustomTooltip2";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/contexts/useAuthContext";
import HomeLayout from "@/layouts/HomeLayout";
import { formattedDate } from "@/utils/date";
import { HeartIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
} from "recharts";

const ChartPage = () => {
  const { authState } = useContext(AuthContext);

  const { data, isLoading } = useQuery(
    ["chartInterestOverTime", authState?.access_token],
    async () =>
      await apiTwitter.getChartNarrativeOverTime(authState?.access_token ?? "")
  );

  const renderItemsOfChart = () => {
    return data?.items?.map((item: any, index: number) => {
      const listData =
        item?.chart?.timelineData.map((value: any) => {
          console.log(value.date, "value");

          return {
            followerCount: value.values[0]?.extractedValue,
            name: value.date,
          };
        }) ?? [];
      if (index < 9) {
        return (
          <div className="w-full p-4 bg-[#1B202F]">
            <div className="w-full flex justify-between mb-4 cursor-pointer">
              <p>{item?.displayName}</p>

              <div className="flex items-center justify-center">
                <div className="flex flex-col items-end">
                  <p className="font-bold text-xl text-[#24B592]">+1200%</p>
                  <p className="text-[#A1A1AA] text-sm">Growth</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse pb-2">
              <div className="mt-4 flex items-center justify-between">
                <button className="py-2 px-3 h-8 flex justify-center items-center bg-[#FAFAFA] bg-opacity-10">
                  <p>Regular</p>
                </button>

                <button>
                  <HeartIcon className="w-6 h-6 text-white" />
                </button>
              </div>
              <div className="cursor-pointer">
                <p>{item.description}</p>
              </div>
              <ResponsiveContainer width="100%" aspect={3}>
                <LineChart width={302} height={140} data={listData}>
                  <CartesianGrid
                    horizontal={true}
                    vertical={false}
                    stroke="#38405B"
                  />

                  <Tooltip
                    itemStyle={{ color: "#fff" }}
                    cursor={true}
                    content={<CustomTooltip2 />}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#fff" }}
                    fontSize={0}
                    fontFamily="WorkSans-Medium"
                    fontWeight={500}
                    domain={["followerCount"]}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="followerCount"
                    stroke="#24B592"
                    strokeWidth="2"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <>
      <HomeLayout>
        <div className="grid grid-cols-3 gap-6 p-[100px] max-lg:grid-cols-2 max-lg:p-7">
          <div className="col-span-full">
            <h1 className="text-center text-[44px] font-workSansBold">
              Find trends & Narratives Before They Happen
            </h1>
            <p className="text-center text-lg mt-8">
              We track millions of conversations happening across the web and
              social platforms to identity crypto trends before they take off
            </p>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center col-span-full">
              <Spinner />
            </div>
          ) : (
            renderItemsOfChart()
          )}
        </div>
      </HomeLayout>
    </>
  );
};

export default ChartPage;

import { apiTwitter } from "@/api-client";
import Header from "@/components/App/Header";
import MonthSelect from "@/components/App/MonthSelect";
import CustomTooltip2 from "@/components/ProjectDetail/LineChart/CustomTooltip2";
import Spinner from "@/components/Spinner";
import SelectCustom, { OptionType } from "@/components/common/Select";
import { AuthContext } from "@/contexts/useAuthContext";
import AppLayout from "@/layouts/AppLayout";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React from "react";
import { useContext, useState } from "react";
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
  const router = useRouter();

  const [timeFrames, setTimeFrames] = useState<Array<OptionType>>([
    {
      code: "today-12-m",
      name: "Past 12 Months",
    },
    {
      code: "today-5-y",
      name: "Past 5 years",
    },
  ]);

  const [timeFrame, setTimeFrame] = useState<OptionType>({
    code: "today-12-m",
    name: "Past 12 Months",
  });
  const [keyword, setKeyword] = useState("");

  const { data, isLoading } = useQuery(
    ["chartInterestOverTime", authState?.access_token, timeFrame, keyword],
    async () =>
      await apiTwitter.getChartNarrativeOverTime(
        authState?.access_token ?? "",
        timeFrame.code,
        keyword,
        12
      )
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
            <div
              onClick={() =>
                router.push("/narratives/projects/" + item?.keyword)
              }
              className="w-full flex justify-between mb-4 cursor-pointer"
            >
              <p>{item?.displayName}</p>

              <div className="flex items-center justify-center">
                <div className="flex flex-col items-end">
                  <p className="font-bold text-xl text-[#24B592]">
                    +{item?.growthPercent}%
                  </p>
                  <p className="text-[#A1A1AA] text-sm">Growth</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse pb-2">
              {/* <div className="mt-4 flex items-center justify-between">
                <button className="py-2 px-3 h-8 flex justify-center items-center bg-[#FAFAFA] bg-opacity-10">
                  <p>Regular</p>
                </button>

                <button>
                  <HeartIcon className="w-6 h-6 text-white" />
                </button>
              </div> */}
              <div
                onClick={() =>
                  router.push("/narratives/projects/" + item?.keyword)
                }
                className="cursor-pointer"
              >
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
    <div className="w-full">
      <AppLayout>
        <div className="w-full relative min-h-[400px]">
          <div className="p-6">
            <Header title="Narratives" />
            <div className="h-[1px] bg-white bg-opacity-20 my-4 max-lg:hidden" />
          </div>
          <div className="grid grid-cols-4 gap-6 px-6 pb-6 max-lg:grid-cols-2 max-lg:p-7">
            <div className="col-span-full">
              <p className="text-start text-lg">
                We track millions of conversations happening across the web and
                social platforms to identity crypto trends before they take off
              </p>

              <div>
                <div className="flex items-center mt-6">
                  <SelectCustom
                    placeholder="Select"
                    initList={timeFrames}
                    onChangeSelected={(item: any) => {
                      mixpanelTrack(event_name_enum.on_filter_chain, {
                        url: router.pathname,
                        code: item?.code,
                        name: item?.name,
                      });
                      setTimeFrame(item);
                    }}
                    selectedValue={timeFrame}
                    isShowSelectOption={false}
                  />

                  <div className="relative mr-6  max-lg:mr-2 ">
                    <MagnifyingGlassIcon className="w-5 h-5 max-lg:w-4 max-xl:h-4 text-white absolute max-xl:top-[6px] top-[8px] left-[30px]" />

                    <input
                      className="w-52 max-lg:w-32 max-lg:py-1 bg-secondary-600 py-[6px] pl-8 max-lg:pl-7  max-lg:text-sm ml-6"
                      placeholder="Search"
                      onKeyPress={(event) => {
                        if (
                          event.key === "Enter" &&
                          event.currentTarget.value
                        ) {
                          setKeyword(event.currentTarget.value ?? "");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center col-span-full">
                <Spinner />
              </div>
            ) : (
              renderItemsOfChart()
            )}
          </div>
        </div>
      </AppLayout>
    </div>
  );
};

export default ChartPage;

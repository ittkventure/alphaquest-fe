import { useContext, useState } from "react";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip2 from "@/components/ProjectDetail/LineChart/CustomTooltip2";
import { useQuery } from "react-query";
import { apiTwitter } from "@/api-client";
import { AuthContext } from "@/contexts/useAuthContext";
import AppLayout from "@/layouts/AppLayout";
import Header from "@/components/App/Header";
import { useRouter } from "next/router";
import SelectCustom, { OptionType } from "@/components/common/Select";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import classNames from "classnames";
import Spinner from "@/components/Spinner";
import TableContent from "@/components/App/Table/TableContent";
import { formatNumber } from "@/utils/formatNumber";

const ChartDetail = () => {
  const { authState } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

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

  const { data, isLoading: isLoadingIOT } = useQuery(
    ["chartInterestOverTime", authState?.access_token, id, timeFrame],
    async () =>
      await apiTwitter.getChartInterestOverTime(
        authState?.access_token ?? "",
        id.toString(),
        timeFrame.code
      )
  );

  const { data: dataRelateList, isLoading: isLoadingRelateList } = useQuery(
    ["getRelateList", authState?.access_token, id, timeFrame],
    async () =>
      await apiTwitter.getRelateList(
        authState?.access_token ?? "",
        id.toString(),
        timeFrame.code
      )
  );

  const { data: dataRelateListProject, isLoading: isLoadingRelateListProject } =
    useQuery(
      ["getRelateListProjects", authState?.access_token, id],
      async () =>
        await apiTwitter.getRelateListProjects(
          authState?.access_token ?? "",
          id.toString()
        )
    );

  const listData =
    data?.timelineData.map((value: any) => {
      return {
        followerCount: value.values[0]?.extractedValue,
        name: value.date,
      };
    }) ?? [];

  const _renderTable = () => {
    if (!isLoadingRelateListProject && dataRelateListProject?.length === 0)
      return <p className="text-start font-workSansLight">No data</p>;
    return (
      <TableContent
        initListRows={dataRelateListProject ?? []}
        isAnimation={false}
        isShowWatchList={false}
      />
    );
  };

  return (
    <AppLayout>
      <div className="w-full relative min-h-[400px]">
        <div className="p-6">
          <Header title="Narratives" />
          <div className="h-[1px] bg-white bg-opacity-20 my-4 max-lg:hidden" />
        </div>
        <div className="flex flex-col gap-6 px-[100px]  max-lg:px-7">
          <h1 className="font-bold text-3xl text-start">{id}</h1>

          <div className="mt-10 bg-[#171B28] p-10">
            <div className="pb-10 flex justify-between">
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
              <div className="flex flex-col items-end">
                <p className="font-bold text-[32px] text-[#24B592]">
                  +{formatNumber(data?.growthPercent ?? 0)}%
                </p>
                <p className="text-[#A1A1AA]">Growth</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" aspect={3}>
              <LineChart width={500} height={300} data={listData}>
                <CartesianGrid
                  horizontal={true}
                  vertical={false}
                  stroke="#38405B"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#fff" }}
                  fontSize={14}
                  fontFamily="WorkSans-Medium"
                  fontWeight={500}
                  domain={["followerCount"]}
                />

                <Tooltip
                  itemStyle={{ color: "#fff" }}
                  cursor={true}
                  content={<CustomTooltip2 />}
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

          {/* <div className="h-[1px] bg-slate-800 w-full"></div>

        <h3 className="font-bold text-lg text-start">Categories</h3>

        <div className="flex gap-4">
          <div className="py-[11px] px-4 bg-[#2F323B] w-[108px] flex justify-center items-center">
            Education
          </div>
          <div className="py-[11px] px-4 bg-[#2F323B] w-[108px] flex justify-center items-center">
            Technology
          </div>
          <div className="py-[11px] px-4 bg-[#2F323B] w-[108px] flex justify-center items-center">
            Startup
          </div>
          <div className="py-[11px] px-4 bg-[#2F323B] w-[108px] flex justify-center items-center">
            Company
          </div>
        </div>
              <div className="h-[1px] bg-slate-800 w-full my-6"></div> */}

          <h3 className="font-bold text-lg text-start mt-6">Related Topics</h3>

          <div>
            {isLoadingRelateList && (
              <div className="w-full flex justify-center items-center">
                <Spinner />
              </div>
            )}
            {dataRelateList?.map((item: any, index: number) => (
              <div className="grid grid-cols-8 border-b border-b-slate-800 pb-2">
                <div className="col-span-2 flex items-center">
                  {item.displayName}
                </div>
                <div className="col-span-4 flex justify-center items-center min-h-[100px] mt-5">
                  <ResponsiveContainer width="100%" aspect={6}>
                    <LineChart
                      width={500}
                      height={60}
                      data={item?.chart?.timelineData?.map((value: any) => {
                        return {
                          followerCount: value.values[0]?.extractedValue,
                          name: value?.date,
                        };
                      })}
                    >
                      {/* <XAxis
                        dataKey="name"
                        tick={{ fill: "#fff" }}
                        fontSize={14}
                        fontFamily="WorkSans-Medium"
                        fontWeight={500}
                        padding={{ left: 48, right: 48 }}
                        domain={["followerCount"]}
                      /> */}

                      <Tooltip
                        itemStyle={{ color: "#fff" }}
                        cursor={true}
                        content={<CustomTooltip2 />}
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
                <div className="col-span-2 flex justify-end items-center">
                  <div>
                    <p
                      className={classNames(
                        "text-[#24B592] text-xl  max-lg:text-sm  max-lg:font-bold",
                        {
                          "text-[#E25148]": item?.growthPercent < 0,
                        }
                      )}
                    >
                      {item?.growthPercent > 0
                        ? `+${formatNumber(item?.growthPercent ?? 0)}%`
                        : `${formatNumber(item?.growthPercent ?? 0)}%`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-bold text-lg text-start mt-6">
            Related Projects
          </h3>
          {isLoadingRelateListProject && (
            <div className="w-full flex justify-center items-center">
              <Spinner />
            </div>
          )}
          {_renderTable()}
          <div className="h-10"></div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ChartDetail;

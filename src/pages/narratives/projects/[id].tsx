import HomeLayout from "@/layouts/HomeLayout";
import { useContext, useState } from "react";
import React, { useMemo } from "react";
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

const ChartDetail = () => {
  const { authState } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  const { data } = useQuery(
    ["chartInterestOverTime", authState?.access_token, id],
    async () =>
      await apiTwitter.getChartInterestOverTime(
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

  return (
    <AppLayout>
      <div className="w-full relative min-h-[400px]">
        <div className="p-6">
          <Header title="Narratives" />
          <div className="h-[1px] bg-white bg-opacity-20 my-4 max-lg:hidden" />
        </div>
        <div className="flex flex-col gap-6 px-[100px]">
          <h1 className="font-bold text-3xl text-start">Preply</h1>
          <p className="text-start font-workSansLight">
            Subscription-based stock footage library. Users can access a wide
            array of high-resolution clips.
          </p>

          <div className="mt-10 bg-[#171B28] p-10">
            <div className="pb-10 flex justify-end">
              <div className="flex flex-col items-end">
                <p className="font-bold text-[32px] text-[#24B592]">+1200%</p>
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
        <div className="h-[1px] bg-slate-800 w-full my-6"></div>

        <h3 className="font-bold text-lg text-start">Related Topics</h3>

        <div>
          <div className="grid grid-cols-8 border-b border-b-slate-800 pb-2">
            <div className="col-span-2 flex items-center">
              Experimental Music
            </div>
            <div className="col-span-4 flex justify-center items-center min-h-[100px]">
              <ResponsiveContainer width="100%" aspect={3}>
                <LineChart
                  width={500}
                  height={100}
                  data={[
                    {
                      followerCount: 20,
                      dataTime: "2011",
                    },
                    {
                      followerCount: 2120,
                      dataTime: "2012",
                    },
                    {
                      followerCount: 123,
                      dataTime: "2013",
                    },
                    {
                      followerCount: 4433,
                      dataTime: "2014",
                    },
                    {
                      followerCount: 7823,
                      dataTime: "2015",
                    },
                    {
                      followerCount: 9867,
                      dataTime: "2016",
                    },
                    {
                      followerCount: 12342,
                      dataTime: "2017",
                    },
                  ]}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#fff" }}
                    fontSize={14}
                    fontFamily="WorkSans-Medium"
                    fontWeight={500}
                    padding={{ left: 48, right: 48 }}
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
            <div className="col-span-2 flex justify-end items-center">
              <div>
                <p className="text-[#E25148]">1.6K</p>
                <p className="text-[#24B592] text-xl">+45%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-8 border-b border-b-slate-800 pb-2">
            <div className="col-span-2 flex items-center">
              Experimental Music
            </div>
            <div className="col-span-4 flex justify-center items-center min-h-[100px]">
              <ResponsiveContainer width="100%" aspect={3}>
                <LineChart
                  width={500}
                  height={100}
                  data={[
                    {
                      followerCount: 20,
                      dataTime: "2011",
                    },
                    {
                      followerCount: 2120,
                      dataTime: "2012",
                    },
                    {
                      followerCount: 123,
                      dataTime: "2013",
                    },
                    {
                      followerCount: 4433,
                      dataTime: "2014",
                    },
                    {
                      followerCount: 7823,
                      dataTime: "2015",
                    },
                    {
                      followerCount: 9867,
                      dataTime: "2016",
                    },
                    {
                      followerCount: 12342,
                      dataTime: "2017",
                    },
                  ]}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#fff" }}
                    fontSize={14}
                    fontFamily="WorkSans-Medium"
                    fontWeight={500}
                    padding={{ left: 48, right: 48 }}
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
            <div className="col-span-2 flex justify-end items-center">
              <div>
                <p className="text-[#E25148]">1.6K</p>
                <p className="text-[#24B592] text-xl">+45%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-8 border-b border-b-slate-800 pb-2">
            <div className="col-span-2 flex items-center">Marathi Language</div>
            <div className="col-span-4 flex justify-center items-center min-h-[100px]">
              <ResponsiveContainer width="100%" aspect={3}>
                <LineChart
                  width={500}
                  height={100}
                  data={[
                    {
                      followerCount: 20,
                      dataTime: "2011",
                    },
                    {
                      followerCount: 2120,
                      dataTime: "2012",
                    },
                    {
                      followerCount: 123,
                      dataTime: "2013",
                    },
                    {
                      followerCount: 4433,
                      dataTime: "2014",
                    },
                    {
                      followerCount: 7823,
                      dataTime: "2015",
                    },
                    {
                      followerCount: 9867,
                      dataTime: "2016",
                    },
                    {
                      followerCount: 12342,
                      dataTime: "2017",
                    },
                  ]}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#fff" }}
                    fontSize={14}
                    fontFamily="WorkSans-Medium"
                    fontWeight={500}
                    padding={{ left: 48, right: 48 }}
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
            <div className="col-span-2 flex justify-end items-center">
              <div>
                <p className="text-[#E25148]">1.6K</p>
                <p className="text-[#24B592] text-xl">+45%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-8 border-b border-b-slate-800 pb-2">
            <div className="col-span-2 flex items-center">Lofi Music</div>
            <div className="col-span-4 flex justify-center items-center min-h-[100px]">
              <ResponsiveContainer width="100%" aspect={3}>
                <LineChart
                  width={500}
                  height={100}
                  data={[
                    {
                      followerCount: 20,
                      dataTime: "2011",
                    },
                    {
                      followerCount: 2120,
                      dataTime: "2012",
                    },
                    {
                      followerCount: 123,
                      dataTime: "2013",
                    },
                    {
                      followerCount: 4433,
                      dataTime: "2014",
                    },
                    {
                      followerCount: 7823,
                      dataTime: "2015",
                    },
                    {
                      followerCount: 9867,
                      dataTime: "2016",
                    },
                    {
                      followerCount: 12342,
                      dataTime: "2017",
                    },
                  ]}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#fff" }}
                    fontSize={14}
                    fontFamily="WorkSans-Medium"
                    fontWeight={500}
                    padding={{ left: 48, right: 48 }}
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
            <div className="col-span-2 flex justify-end items-center">
              <div>
                <p className="text-[#E25148]">1.6K</p>
                <p className="text-[#24B592] text-xl">+45%</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
        </div>
      </div>
    </AppLayout>
  );
};

export default ChartDetail;

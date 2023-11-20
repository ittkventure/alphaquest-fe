import { useContext, useState, useEffect } from "react";
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
import { AuthContext, TypePayment } from "@/contexts/useAuthContext";
import AppLayout from "@/layouts/AppLayout";
import Header from "@/components/App/Header";
import { useRouter } from "next/router";
import SelectCustom, { OptionType } from "@/components/common/Select";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import classNames from "classnames";
import Spinner from "@/components/Spinner";
import TableContent from "@/components/App/Table/TableContent";
import { formatNumber } from "@/utils/formatNumber";
import CustomTooltipNotLabel from "@/components/ProjectDetail/LineChart/CustomTooltipNotLabel";
import Image from "next/image";
import { ChessKingHIcon, CrownIcon, InfoIcon } from "@/assets/icons";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { UserPayType } from "@/api-client/types/AuthType";
import { PlaceholderChart2 } from "@/assets/images";
import moment from "moment";
import { formatSelectOptions, formatUrlRevert } from "@/utils/string";

const ChartDetail = () => {
  const { authState, accountExtendDetail, setTypePaymentAction } =
    useContext(AuthContext);
  const router = useRouter();
  const id = formatUrlRevert(router.query?.id as string);
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

  useEffect(() => {
    if (router.query?.timeFrame) {
      const timeFrame = timeFrames.find(
        (item) =>
          item.code === formatSelectOptions(router.query?.timeFrame?.toString())
      );
      if (timeFrame) {
        setTimeFrame(timeFrame);
      }
    }
  }, [router.query]);

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
    data?.chart?.timelineData.map((value: any) => {
      console.log(value, "value.date");

      return {
        followerCount: value.values[0]?.extractedValue,
        name: moment(value?.timestamp * 1000).format("MMM YYYY"),
      };
    }) ?? [];

  const _renderTable = () => {
    if (!isLoadingRelateListProject && dataRelateListProject?.length === 0)
      return null;
    return (
      <TableContent
        initListRows={dataRelateListProject ?? []}
        isAnimation={false}
        isShowWatchList={false}
      />
    );
  };

  const onClickPaymentTrial = () => {
    mixpanelTrack(event_name_enum.upgrade_to_pro, {
      url: router.pathname,
    });
    if (authState) {
      mixpanelTrack(event_name_enum.inbound, {
        url: "/pricing",
      });
      setTypePaymentAction ? setTypePaymentAction(TypePayment.PRO) : null;
      router.push("/pricing?action=open");
    } else {
      mixpanelTrack(event_name_enum.inbound, {
        url: "/sign-up",
      });
      setTypePaymentAction ? setTypePaymentAction(TypePayment.PRO) : null;
      router.push("/sign-up");
    }
  };

  const renderUpBtn = () => {
    if (router.pathname === "/watchlist/projects") return null;
    return accountExtendDetail?.currentPlanKey === UserPayType.FREE ||
      !accountExtendDetail?.currentPlanKey ? (
      <div className="fixed w-full h-[300px] bottom-0 left-0 bg-linear-backdrop z-10 pl-64 max-lg:pl-0">
        <div className="w-full h-[300px] flex flex-col justify-center items-center z-10 mt-10">
          <p className="mb-4">Upgrade account to see all</p>

          <button
            onClick={onClickPaymentTrial}
            className="px-3 py-2 bg-primary-500 font-workSansRegular text-[1rem] flex justify-center items-center"
          >
            <Image
              src={CrownIcon}
              width={17}
              height={14}
              alt="crown-icon"
              className="mr-2"
            />
            Start 7-day trial
          </button>
        </div>
      </div>
    ) : null;
  };

  return (
    <AppLayout>
      <div className="w-full relative min-h-[400px]">
        <div className="p-6">
          <Header title="Narratives" />
          <div className="h-[1px] bg-white bg-opacity-20 my-4 max-lg:hidden" />
        </div>
        <div className="flex flex-col gap-6 px-[100px]  max-lg:px-7">
          <h1 className="font-bold text-3xl text-start">{data?.displayName}</h1>
          <p>{data?.description}</p>

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
                <p
                  className={classNames(
                    "font-bold text-[32px] text-[#24B592]",
                    {
                      "text-[#E25148]": data?.growthPercent <= 0,
                    }
                  )}
                >
                  {data?.growthPercent > 0
                    ? `+${formatNumber(data?.growthPercent ?? 0)}%`
                    : `${formatNumber(data?.growthPercent ?? 0)}%`}
                </p>
                <div className="flex gap-1 justify-center items-center">
                  <p className="text-[#A1A1AA]">
                    {data?.growthPercent > 0 ? "Growth" : "Down"}
                  </p>
                  <div
                    data-tooltip-id="info-tooltip-growth"
                    className="cursor-pointer"
                  >
                    <Image src={InfoIcon} width={16} height={16} alt="icon" />
                  </div>
                </div>
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
                  stroke={data?.growthPercent > 0 ? "#24B592" : "#E25148"}
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
          <div className="h-[1px] bg-slate-800 w-full my-6"></div>
          <h3 className="font-bold text-lg text-start mt-6">Related Topics</h3>

          <div>
            {isLoadingRelateList && (
              <div className="w-full flex justify-center items-center">
                <Spinner />
              </div>
            )}
            {dataRelateList?.map((item: any, index: number) =>
              !item ? (
                <div className="w-full h-fit relative bg-[#1B202F]">
                  <Image
                    src={PlaceholderChart2}
                    height={200}
                    alt="chart"
                    className="w-full h-fit object-cover"
                  />
                  <div className="absolute top-0 w-full h-full flex justify-center items-center gap-4">
                    <div className="flex items-center gap-5">
                      <div className="flex justify-center items-center mb-4 gap-3 h-28 pt-4">
                        <Image
                          src={ChessKingHIcon}
                          alt="icon"
                          width={17}
                          height={13}
                        />
                        <p>Pro Members only</p>
                      </div>
                      <button
                        onClick={onClickPaymentTrial}
                        className="px-6 bg-primary-500 font-workSansRegular text-[1rem] flex justify-center items-center max-lg:hidden h-10"
                      >
                        Try pro
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-8 border-b border-b-slate-800 pb-2">
                  <button
                    className="col-span-2 flex items-center"
                    onClick={() => router.push("/narratives/" + item?.keyword)}
                  >
                    {item?.displayName}
                  </button>
                  <div className="col-span-4 flex justify-center items-center min-h-[80px] mt-5">
                    <ResponsiveContainer width="100%" aspect={9}>
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
                          content={
                            <CustomTooltipNotLabel
                              dotColor={
                                item?.growthPercent > 0 ? "#24B592" : "#E25148"
                              }
                            />
                          }
                        />

                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="followerCount"
                          stroke={
                            item?.growthPercent > 0 ? "#24B592" : "#E25148"
                          }
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
              )
            )}
          </div>

          {!isLoadingRelateListProject &&
          dataRelateListProject?.length == 0 ? null : (
            <h3 className="font-bold text-lg text-start mt-6">
              Related Projects
            </h3>
          )}
          {isLoadingRelateListProject && (
            <div className="w-full flex justify-center items-center">
              <Spinner />
            </div>
          )}
          {_renderTable()}
          <div className="h-28"></div>
        </div>
        <ReactTooltip
          id="info-tooltip-growth"
          className="!bg-[#282E44] max-w-[300px] text-white text-[12px] p-4 !rounded-none"
          place="right"
          content="Numbers represent search interest relative to the highest point on the chart for the given region and time. % Growth represents growth over the time period selected"
        />
        {renderUpBtn()}
      </div>
    </AppLayout>
  );
};

export default ChartDetail;

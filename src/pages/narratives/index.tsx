import { apiTwitter } from "@/api-client";
import { ChessKingHIcon } from "@/assets/icons";
import { PlaceholderChart } from "@/assets/images";
import Header from "@/components/App/Header";
import CustomTooltipNotLabel from "@/components/ProjectDetail/LineChart/CustomTooltipNotLabel";
import TableFooter from "@/components/TableCommon/TableFooter";
import SelectCustom, { OptionType } from "@/components/common/Select";
import { AuthContext, TypePayment } from "@/contexts/useAuthContext";
import AppLayout from "@/layouts/AppLayout";
import { formatNumber } from "@/utils/formatNumber";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useContext, useState, useRef } from "react";
import { useQuery } from "react-query";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartPage = () => {
  const { authState, accountExtendDetail, setTypePaymentAction } =
    useContext(AuthContext);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const searchInputRef = useRef<any>(null);
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

  const onClickPaymentTrial = () => {
    mixpanelTrack(event_name_enum.upgrade_to_pro, {
      url: router.pathname,
    });
    if (authState) {
      setTypePaymentAction ? setTypePaymentAction(TypePayment.PRO) : null;
      mixpanelTrack(event_name_enum.inbound, {
        url: "/pricing",
      });
      router.push("/pricing?action=open");
    } else {
      mixpanelTrack(event_name_enum.inbound, {
        url: "/sign-up",
      });
      setTypePaymentAction ? setTypePaymentAction(TypePayment.PRO) : null;
      router.push("/sign-up");
    }
  };

  const { data, isLoading } = useQuery(
    [
      "chartInterestOverTime",
      authState?.access_token,
      timeFrame,
      keyword,
      page,
    ],
    async () =>
      await apiTwitter.getChartNarrativeOverTime(
        authState?.access_token ?? "",
        timeFrame.code,
        keyword,
        12,
        page
      )
  );

  const renderItemsOfChart = () => {
    return data?.items?.map((item: any, index: number) => {
      const listData =
        item?.chart?.timelineData.map((value: any) => {
          return {
            followerCount: value.values[0]?.extractedValue,
            name: value.date,
          };
        }) ?? [];

      console.log(item, "item");

      if (!item)
        return (
          <div className="w-full h-fit relative bg-[#1B202F]">
            <Image
              src={PlaceholderChart}
              width={334}
              height={200}
              alt="chart"
              className="w-full h-fit object-cover"
            />
            <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center">
              <div className="w-full flex justify-center mb-4 gap-3">
                <Image src={ChessKingHIcon} alt="icon" width={17} height={13} />
                <p>Pro Members only</p>
              </div>
              <button
                onClick={onClickPaymentTrial}
                className="px-3 py-2 bg-primary-500 font-workSansRegular text-[1rem] flex justify-center items-center max-lg:hidden"
              >
                Try pro
              </button>
            </div>
          </div>
        );

      return (
        <div className="w-full p-4 min-h-fit bg-[#1B202F]">
          <div
            onClick={() => router.push("/narratives/" + item?.keyword)}
            className="w-full flex justify-between mb-4 cursor-pointer"
          >
            <p className="font-bold text-lg">{item?.displayName}</p>

            <div className="flex items-center justify-center">
              <div className="flex flex-col items-end">
                <p
                  className={classNames("font-bold text-xl text-[#24B592]", {
                    "text-[#E25148]": item?.growthPercent < 0,
                  })}
                >
                  {item?.growthPercent > 0
                    ? `+${formatNumber(item?.growthPercent ?? 0)}%`
                    : `${formatNumber(item?.growthPercent ?? 0)}%`}
                </p>
                <p className="text-[#A1A1AA] text-sm">
                  {item?.growthPercent > 0 ? "Growth" : "Down"}
                </p>
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
              onClick={() => router.push("/narratives/" + item?.keyword)}
              className="cursor-pointer mt-4"
            >
              <p className="line-clamp-2">{item?.description}</p>
            </div>
            <ResponsiveContainer width="100%" aspect={2}>
              <LineChart width={302} height={140} data={listData}>
                <CartesianGrid
                  horizontal={true}
                  vertical={false}
                  stroke="#38405B"
                />

                <Tooltip
                  itemStyle={{ color: "#fff" }}
                  cursor={true}
                  content={
                    <CustomTooltipNotLabel
                      dotColor={item?.growthPercent > 0 ? "#24B592" : "#E25148"}
                    />
                  }
                />
                {/* <XAxis
                    dataKey="name"
                    tick={{ fill: "#fff" }}
                    fontSize={0}
                    fontFamily="WorkSans-Medium"
                    fontWeight={500}
                    domain={["followerCount"]}
                  /> */}
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
          </div>
        </div>
      );
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
                We track millions of data points to identify crypto narratives
                before they take off
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
                      ref={searchInputRef}
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
                    <button
                      onClick={() => {
                        setKeyword("");
                        if (searchInputRef) {
                          searchInputRef.current.value = "";
                        }
                      }}
                    >
                      <XMarkIcon className="w-5 h-5 max-lg:w-4 max-xl:h-4 text-white absolute max-xl:top-[6px] top-[8px] right-[10px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {isLoading
              ? Array.from(Array(12).keys()).map((item, index) => (
                  <div
                    className="animate-pulse col-span-1 h-[260px] bg-[#1B202F]"
                    key={index}
                  />
                ))
              : renderItemsOfChart()}
            <div className="col-span-full">
              <TableFooter
                paginationInfo={{
                  currentPage: page,
                  pageNumber: page,
                  pageSize: 10,
                  totalPages: data?.totalCount
                    ? Math.ceil(data?.totalCount / 20)
                    : 0,
                  totalElements: data?.totalCount ?? 0,
                }}
                onChange={(page) => {
                  setPage(page);
                }}
              />
            </div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
};

export default ChartPage;

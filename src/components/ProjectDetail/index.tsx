import React, { FC, memo, useContext, useEffect, useState } from "react";
import Spinner from "../Spinner";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useQuery } from "react-query";
import { AuthContext, TypePayment } from "@/contexts/useAuthContext";
import { apiTwitter } from "@/api-client";
import TableCommon from "../TableCommon";
import useColumFollowers from "@/hooks/useTable/useColumFollowers";
import { ChangeLogs, TwitterDetails } from "@/api-client/types/TwitterType";
import moment from "moment";
import { useRouter } from "next/router";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { UserPayType } from "@/api-client/types/AuthType";
import { toast } from "react-toastify";
import { CopyShareIcon, CrownIcon, TwitterIcon, WebIcon } from "@/assets/icons";
import Image from "next/image";
import useColumTwitterChangeLogs from "@/hooks/useTable/useColumTwitterChangeLogs";
import { listUrl } from "../App/Table/TableRow";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon as TwitterIconShare,
  TwitterShareButton,
} from "react-share";

interface IProjectDetail {
  userId?: string;
  onChangeHeart?: () => void;
  isPaddingX?: boolean;
  isPage?: boolean;
}

const ProjectDetail: FC<IProjectDetail> = ({
  userId,
  onChangeHeart,
  isPaddingX,
  isPage,
}) => {
  if (!userId) return <div />;
  const { authState, accountExtendDetail, setTypePaymentAction } =
    useContext(AuthContext);
  const [isLoadingHeart, setIsLoadingHeart] = useState<boolean>(false);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageUserChangeLog, setPageUserChangeLog] = useState(1);
  const [isDescSorted, setIsDescSorted] = useState(false);
  const [isDescSortedChangeLog, setIsDescSortedChangeLog] = useState(false);
  const [isInWatchList, setIsInWatchList] = useState<boolean>(false);

  const listAlphaHunter = useQuery(
    [
      "fetchListAlphaHunter",
      userId,
      page,
      isDescSorted,
      authState?.access_token,
    ],
    async () =>
      await apiTwitter.getListFollower(
        userId as any,
        {
          pageNumber: page,
          pageSize: 10,
          desc: isDescSorted,
        },
        authState?.access_token ?? ""
      )
  );

  const shareUrl = `https://alphaquest.io/project/${userId}`;

  const listUserChangeLog = useQuery(
    [
      "fetchListUserChangeLog",
      userId,
      pageUserChangeLog,
      isDescSortedChangeLog,
      authState?.access_token,
    ],
    async () =>
      await apiTwitter.getChangeLogUser(
        userId as any,
        {
          pageNumber: pageUserChangeLog,
          pageSize: 10,
          desc: isDescSortedChangeLog,
        },
        authState?.access_token ?? ""
      )
  );

  const listChangeLog = listUserChangeLog.data?.items
    ? listUserChangeLog.data?.items.map((item: ChangeLogs) => ({
        ...item,
        profileImageUrl: listUserChangeLog.data.profileImageUrl,
      }))
    : [];

  const twitterDetail = useQuery<TwitterDetails>({
    queryKey: [
      "getTwitterDetails",
      accountExtendDetail?.currentPlanKey,
      authState?.access_token,
    ],
    queryFn: async () =>
      await apiTwitter.getTwitterDetails(
        userId as any,
        authState?.access_token ?? ""
      ),
  });

  useEffect(() => {
    if (twitterDetail.data?.inWatchlist !== undefined)
      setIsInWatchList(twitterDetail.data?.inWatchlist);
  }, [twitterDetail.data?.inWatchlist]);

  // const twitterChartScore = useQuery<ChartData[]>({
  //   queryKey: [
  //     "getTwitterChartScore",
  //     accountExtendDetail?.currentPlanKey,
  //     authState?.access_token,
  //   ],
  //   queryFn: async () =>
  //     await apiTwitter.getScoreChartData(
  //       userId as any,
  //       authState?.access_token ?? ""
  //     ),
  // });

  // const twitterChartFollower = useQuery<ChartData[]>({
  //   queryKey: [
  //     "getFollowerChartScore",
  //     accountExtendDetail?.currentPlanKey,
  //     authState?.access_token,
  //   ],
  //   queryFn: async () =>
  //     await apiTwitter.getFollowerChartData(
  //       userId as any,
  //       authState?.access_token ?? ""
  //     ),
  // });

  const { followers } = useColumFollowers({ isLinkToAlphaHunter: true });
  const { changeLogs } = useColumTwitterChangeLogs();

  const onAddItemToWatchList = async () => {
    if (!authState?.access_token) {
      mixpanelTrack(event_name_enum.inbound, {
        url: "/login",
      });
      router.push("/login");
      return;
    }
    if (accountExtendDetail?.currentPlanKey === UserPayType.FREE) {
      setTypePaymentAction ? setTypePaymentAction(TypePayment.PRO) : null;
      mixpanelTrack(event_name_enum.inbound, {
        url: "/pricing",
      });
      router.push("/pricing?action=open");

      return;
    }
    try {
      setIsLoadingHeart(true);

      if (authState?.access_token) {
        await apiTwitter.putToWatchList(
          twitterDetail.data?.userId ?? "",
          authState?.access_token
        );
        mixpanelTrack(event_name_enum.on_add_watch_list, {
          on_add_watch_list: `User add the project ${
            twitterDetail.data?.name ?? "project"
          } to watchlist`,
        });
        onChangeHeart ? onChangeHeart() : null;

        setIsInWatchList(!isInWatchList);
      } else {
        toast.warning("Please login for use this feature");
      }
      setIsLoadingHeart(false);
    } catch (error) {
      setIsLoadingHeart(false);
    }
  };

  const _renderHeartButton = () => {
    if (twitterDetail.isLoading)
      return (
        <Spinner
          customClassName="ml-0 mr-0 w-[14px] h-[14px]"
          strokeWidth="1"
        />
      );
    return (
      <button
        onClick={onAddItemToWatchList}
        className="max-lg:mt-2 flex justify-center items-center w-7"
        disabled={isLoadingHeart}
      >
        {isLoadingHeart ? (
          <Spinner
            customClassName="ml-0 mr-0 w-[14px] h-[14px]"
            strokeWidth="1"
          />
        ) : isInWatchList ? (
          <HeartIconSolid className="h-5 w-7 text-primary-500 transition-all duration-300" />
        ) : (
          <HeartIcon className="h-5 w-7 hover:text-success-500 transition-all duration-300" />
        )}
      </button>
    );
  };

  const onClickPaymentTrial = () => {
    mixpanelTrack(event_name_enum.upgrade_to_pro, {
      url: router.pathname,
    });
    if (authState) {
      mixpanelTrack(event_name_enum.inbound, {
        url: "/pricing?action=open",
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

  const _renderNewTag = () => {
    return (
      <>
        <div className="border border-purple-400 text-purple-400 py-[1px] px-1 ml-2 text-xs">
          <p>Trending #1</p>
        </div>
        <div className="border border-blue-400 text-blue-400 py-[1px] px-1 ml-2 text-xs">
          <p>New #1</p>
        </div>
      </>
    );
  };

  return (
    <div className={`w-full h-full overflow-x-hidden`}>
      <div className="flex px-[100px] max-lg:px-[10px] w-full">
        {twitterDetail.isLoading || twitterDetail.isFetching ? (
          <div className="w-full flex justify-center items-center py-14">
            <Spinner />
          </div>
        ) : (
          <>
            <img
              className="h-20 w-20 rounded-[50%]"
              src={twitterDetail.data?.profileImageUrl}
            />
            <div className="ml-5 w-full">
              <div className="flex justify-between w-full">
                <div className="w-full">
                  <div className="flex w-full justify-between">
                    <div className="flex items-center">
                      <p className="text-xl font-workSansSemiBold text-success-500">
                        {twitterDetail.data?.name}
                      </p>
                      <button
                        className="ml-2"
                        onClick={() => {
                          mixpanelTrack(event_name_enum.outbound, {
                            url: twitterDetail.data?.twitterUrl,
                            message: "Link to twitter at project page",
                          });
                          window.open(
                            twitterDetail.data?.twitterUrl ?? "#",
                            "_blank"
                          );
                        }}
                      >
                        <Image
                          src={TwitterIcon}
                          width={16}
                          height={13}
                          alt="t-i"
                        />
                      </button>
                      {twitterDetail.data?.urls?.map((value, index) => {
                        const url = listUrl.find(
                          (item) => item.key === value.type
                        ) ?? { icon: WebIcon, key: "#" };
                        return (
                          <button
                            key={value.type + index}
                            onClick={() => {
                              mixpanelTrack(event_name_enum.outbound, {
                                url: value.url,
                                message: `Link to ${url.key} at project page`,
                              });
                              window.open(value.url, "_blank");
                            }}
                            className="ml-2"
                          >
                            <Image
                              src={url.icon as any}
                              width={16}
                              height={13}
                              alt="t-i"
                            />
                          </button>
                        );
                      })}
                    </div>
                    <div className="ml-20 max-lg:ml-[20px]">
                      <div className="flex max-lg:flex-col max-lg:justify-between  justify-end items-center ">
                        <div className="border border-success-500 text-success-500 px-1 mr-2 max-lg:text-xs">
                          <p>+{twitterDetail.data?.trendingScore}</p>
                        </div>
                        <div>{_renderHeartButton()}</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm mt-3">
                    {twitterDetail.data?.description}
                  </p>

                  <div className="flex justify-between mt-3 items-center">
                    <div className="flex">
                      {twitterDetail.data && twitterDetail.data?.categories
                        ? twitterDetail.data?.categories?.map(
                            (value, index) => (
                              <a
                                href={`/projects?category=${value?.code}`}
                                onClick={() => {
                                  mixpanelTrack(
                                    event_name_enum.on_filter_category,
                                    {
                                      url: router.pathname,
                                      name: value?.name,
                                      code: value?.code,
                                    }
                                  );
                                }}
                              >
                                <p
                                  key={index.toString()}
                                  className="text-sm border px-2 mr-2"
                                >
                                  {value.name}
                                </p>
                              </a>
                            )
                          )
                        : null}
                    </div>

                    <div className="flex max-lg:flex-col max-lg:justify-between  justify-end items-center">
                      <p>Share: </p>
                      <div className="flex items-center">
                        <TelegramShareButton url={shareUrl} className="ml-1">
                          <TelegramIcon size={22} round />
                        </TelegramShareButton>
                        <TwitterShareButton url={shareUrl} className="ml-1">
                          <TwitterIconShare size={22} round />
                        </TwitterShareButton>
                        <FacebookShareButton url={shareUrl} className="ml-1">
                          <FacebookIcon size={22} round />
                        </FacebookShareButton>

                        <div className="ml-1">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(shareUrl);
                              toast.success("Copied to clipboard");
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="#6B7280"
                              className="w-6 h-6 mt-[6px] hover:stroke-slate-200"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* {_renderNewTag()} */}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="px-[100px] text-sm max-lg:px-[10px]">
        <div className="grid grid-cols-2 gap-6  mt-5">
          <div className="border border-white rounded-lg border-opacity-10 p-4">
            <p>Twitter Followers When discovered</p>
            {twitterDetail.isLoading || twitterDetail.isFetching ? (
              <Spinner customClassName="my-1" />
            ) : (
              <p className="text-xl max-lg:text-sm">
                {twitterDetail.data?.twitterFollowersWhenDiscovered}
              </p>
            )}
          </div>

          <div className="border border-white rounded-lg border-opacity-10 p-4">
            <p>Twitter Created Date</p>

            {twitterDetail.isLoading || twitterDetail.isFetching ? (
              <Spinner customClassName="my-1" />
            ) : (
              <p className="text-xl max-lg:text-sm">
                {moment(twitterDetail.data?.twitterCreatedDate).format(
                  "MM/DD/YYYY - HH:mm"
                )}
              </p>
            )}
          </div>

          <div className="border border-white rounded-lg border-opacity-10 p-4">
            <p>Current Twitter Followers</p>
            {twitterDetail.isLoading || twitterDetail.isFetching ? (
              <Spinner customClassName="my-1" />
            ) : (
              <p className="text-xl max-lg:text-sm">
                {twitterDetail.data?.currentTwitterFollowers}
              </p>
            )}
          </div>

          <div className="border border-white rounded-lg border-opacity-10 p-4">
            <p>Discovered Date</p>
            {twitterDetail.isLoading || twitterDetail.isFetching ? (
              <Spinner customClassName="my-1" />
            ) : (
              <p className="text-xl max-lg:text-sm">
                {moment(twitterDetail.data?.discoveredDate).format(
                  "MM/DD/YYYY - HH:mm"
                )}
              </p>
            )}
          </div>
        </div>

        {/* Chart */}
        {/* 
        <h3 className="text-lg font-workSansSemiBold mt-14">
          Twitter Followers and Score Chart
        </h3>
        <div className="grid grid-cols-2 gap-6 mt-4 max-lg:grid-cols-1">
          <div className="bg-[#171B28]  pt-1 px-1">
            {twitterChartScore.isLoading ? (
              <div />
            ) : (
              <LineChart
                chartData={twitterChartScore.data ?? []}
                labelText="Score Chart"
                labelDataSet="scores"
              />
            )}
          </div>
          <div className="bg-[#171B28] ">
            {twitterChartFollower.isLoading ? (
              <div />
            ) : (
              <LineChart
                chartData={twitterChartFollower.data ?? []}
                labelText="Followers Chart"
                labelDataSet="followers"
              />
            )}
          </div>
        </div>
        */}
        <div className="flex items-center mt-14 ">
          <h3 className="text-lg font-workSansSemiBold mr-3">
            Earliest Alpha Hunter
          </h3>
        </div>
        <div className="mt-5 mx-8">
          <TableCommon
            columns={followers ?? []}
            data={listAlphaHunter.data?.items ?? []}
            onChangePage={function (_pageNumber: number): void {
              setPage(_pageNumber);
            }}
            isLoading={listAlphaHunter.isLoading}
            paginationInfo={{
              currentPage: page,
              pageNumber: page,
              pageSize: 10,
              totalPages: listAlphaHunter?.data?.totalCount
                ? Math.ceil(listAlphaHunter?.data?.totalCount / 20)
                : 0,
              totalElements: listAlphaHunter?.data?.totalCount ?? 0,
            }}
            onSort={(isSortedDesc) => {
              if (isSortedDesc === undefined) return;
              setIsDescSorted(isSortedDesc);
            }}
            isSortedDesc={isDescSorted}
          />
        </div>

        <div className="flex items-center mt-14 ">
          <h3 className="text-lg font-workSansSemiBold mr-3">
            Twitter changelogs
          </h3>

          <div className="px-[6px] py-[2px] bg-orange-400 rounded-sm text-orange-400 font-workSansSemiBold bg-opacity-30">
            BETA
          </div>
        </div>

        {listChangeLog.length > 0 ? (
          <div className="mt-5 mx-8">
            <TableCommon
              columns={changeLogs ?? []}
              data={listChangeLog}
              onChangePage={function (_pageNumber: number): void {
                setPageUserChangeLog(_pageNumber);
              }}
              isLoading={listUserChangeLog.isLoading}
              paginationInfo={{
                currentPage: pageUserChangeLog,
                pageNumber: pageUserChangeLog,
                pageSize: 10,
                totalPages: listUserChangeLog?.data?.totalCount
                  ? Math.ceil(listUserChangeLog?.data?.totalCount / 20)
                  : 0,
                totalElements: listUserChangeLog?.data?.totalCount ?? 0,
              }}
              onSort={(isSortedDesc) => {
                if (isSortedDesc === undefined) return;
                setIsDescSortedChangeLog(isSortedDesc);
              }}
              isSortedDesc={isDescSortedChangeLog}
              isShowHeader={false}
              isPaddingX={isPaddingX}
            />
          </div>
        ) : !listUserChangeLog.isLoading ? (
          <div className="w-full flex justify-start items-center mb-20 mt-4">
            <p className="text-secondary-400">
              {accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM
                ? "This Twitter account has not made any changes yet"
                : "This section is exclusively revealed to our Pro members. Upgrade your membership to get instant access!"}
            </p>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            <Spinner />
          </div>
        )}
      </div>

      {accountExtendDetail?.currentPlanKey !== UserPayType.PREMIUM ? (
        <div className="h-32" />
      ) : null}

      {accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM || isPage ? (
        <></>
      ) : (
        <div
          className={`${
            isPage ? "fixed" : "absolute"
          } bottom-0 w-full h-[200px] max-lg:pl-0 z-[999]`}
        >
          <div className="w-full h-[200px] flex flex-col justify-center items-center bg-linear-backdrop">
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
              Upgrade to Pro
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ProjectDetail);

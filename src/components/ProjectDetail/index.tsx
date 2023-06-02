import React, { FC, useContext, useState } from "react";
import Spinner from "../Spinner";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useQuery } from "react-query";
import { AuthContext, TypePayment } from "@/contexts/useAuthContext";
import { apiTwitter } from "@/api-client";
import TableCommon from "../TableCommon";
import useColumFollowers from "@/hooks/useTable/useColumFollowers";
import { ChartData, TwitterDetails } from "@/api-client/types/TwitterType";
import moment from "moment";
import { useRouter } from "next/router";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { UserPayType } from "@/api-client/types/AuthType";
import { toast } from "react-toastify";
import { CrownIcon, TwitterIcon } from "@/assets/icons";
import Image from "next/image";

interface IProjectDetail {
  userId?: string;
  onChangeHeart?: () => void;
}

const ProjectDetail: FC<IProjectDetail> = ({ userId, onChangeHeart }) => {
  if (!userId) return <div />;
  const { authState, accountExtendDetail, setTypePaymentAction } =
    useContext(AuthContext);
  const [isLoadingHeart, setIsLoadingHeart] = useState<boolean>(false);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [isDescSorted, setIsDescSorted] = useState(false);

  const listAlphaHunter = useQuery(
    ["fetchListAlphaHunter", userId, page, isDescSorted],
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

  const twitterDetail = useQuery<TwitterDetails>({
    queryKey: [
      "getTwitterDetails",
      accountExtendDetail?.currentPlanKey,
      authState?.access_token,
      isLoadingHeart,
    ],
    queryFn: async () =>
      await apiTwitter.getTwitterDetails(
        userId as any,
        authState?.access_token ?? ""
      ),
  });

  const twitterChartScore = useQuery<ChartData[]>({
    queryKey: [
      "getTwitterChartScore",
      accountExtendDetail?.currentPlanKey,
      authState?.access_token,
    ],
    queryFn: async () =>
      await apiTwitter.getScoreChartData(
        userId as any,
        authState?.access_token ?? ""
      ),
  });

  const twitterChartFollower = useQuery<ChartData[]>({
    queryKey: [
      "getFollowerChartScore",
      accountExtendDetail?.currentPlanKey,
      authState?.access_token,
    ],
    queryFn: async () =>
      await apiTwitter.getFollowerChartData(
        userId as any,
        authState?.access_token ?? ""
      ),
  });

  const { followers } = useColumFollowers();

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
        await apiTwitter.putToWatchList(userId ?? "", authState?.access_token);
        mixpanelTrack(event_name_enum.on_add_watch_list, {
          on_add_watch_list: `User add the project ${
            twitterDetail.data?.name ?? "project"
          } to watchlist`,
        });
        onChangeHeart ? onChangeHeart() : null;
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
        ) : twitterDetail.data?.inWatchlist ? (
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
    <div
      className={`w-full h-full overflow-x-hidden ${
        accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM
          ? ""
          : "overflow-hidden"
      }`}
    >
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

                  <div className="flex mt-3">
                    {twitterDetail.data && twitterDetail.data?.categories
                      ? twitterDetail.data?.categories?.map((value, index) => (
                          <p className="text-sm border px-2 mr-2">
                            {value.name}
                          </p>
                        ))
                      : null}
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
          <h3 className="text-lg font-workSansSemiBold  mr-3">
            Earliest Alpha Hunter
          </h3>

          <div className="px-[6px] py-[2px] bg-orange-400 rounded-sm text-orange-400 font-workSansSemiBold bg-opacity-30">
            BETA
          </div>
        </div>
        <div className="mt-5 ">
          <TableCommon
            columns={followers ?? []}
            data={listAlphaHunter.data?.items ?? []}
            onChangePage={function (_pageNumber: number): void {
              setPage(_pageNumber);
            }}
            isLoading={listAlphaHunter.isLoading}
            isHiddenTBody={
              accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM
                ? false
                : true
            }
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
      </div>
      {accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM ? (
        <></>
      ) : (
        <div className=" w-full h-[400px] max-lg:pl-0 ">
          <div className="w-full h-[400px] flex flex-col justify-center items-center z-10 bg-linear-backdrop">
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

export default ProjectDetail;

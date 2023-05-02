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
import LineChart from "../Chart";
import { useRouter } from "next/router";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { UserPayType } from "@/api-client/types/AuthType";
import { toast } from "react-toastify";

interface IProjectDetail {
  userId?: string;
}

const ProjectDetail: FC<IProjectDetail> = ({ userId }) => {
  if (!userId) return <div />;
  const { authState, accountExtendDetail, setTypePaymentAction } =
    useContext(AuthContext);
  const [isLoadingHeart, setIsLoadingHeart] = useState<boolean>(false);
  const router = useRouter();

  const { isLoading, data } = useQuery({
    queryKey: [
      "getListTwitter",
      accountExtendDetail?.currentPlanKey,
      authState?.access_token,
    ],
    queryFn: async () =>
      await apiTwitter.getListFollower(
        userId as any,
        {
          pageNumber: 1,
          pageSize: 20,
        },
        authState?.access_token ?? ""
      ),
  });

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
          on_add_watch_list: `User add the project ${data.name} to watchlist`,
        });
      } else {
        toast.warning("Please login for use this feature");
      }
      setIsLoadingHeart(false);
    } catch (error) {
      setIsLoadingHeart(false);
    }
  };

  const _renderHeartButton = () => {
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
        ) : data?.inWatchlist ? (
          <HeartIconSolid className="h-5 w-7 text-primary-500 transition-all duration-300" />
        ) : (
          <HeartIcon className="h-5 w-7 hover:text-success-500 transition-all duration-300" />
        )}
      </button>
    );
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
    <div className="w-full h-full">
      <div className="flex px-[100px] max-lg:px-[20px] w-full">
        <img
          className="h-20 w-20 rounded-[50%]"
          src={twitterDetail.data?.profileImageUrl}
        />
        <div className="ml-5 w-full">
          <div className="flex justify-between w-full">
            <div className="w-full">
              <div className="flex w-full justify-between">
                <p className="text-xl font-workSansSemiBold text-success-500">
                  {twitterDetail.data?.name}
                </p>
                <div className="ml-20 max-lg:ml-[20px]">
                  <div className="flex max-lg:flex-col max-lg:justify-between  justify-end items-center ">
                    <div className="border border-success-500 text-success-500 px-1 mr-2 max-lg:text-xs">
                      <p>+{twitterDetail.data?.trendingScore}</p>
                    </div>
                    <div>{_renderHeartButton()}</div>
                  </div>
                </div>
              </div>
              <p className="text-sm mt-3">{twitterDetail.data?.description}</p>

              <div className="flex mt-3">
                <p className="text-sm ">
                  {twitterDetail.data && twitterDetail.data?.categories
                    ? twitterDetail.data?.categories?.map(
                        (value) => `${value},`
                      )
                    : null}
                </p>
                {/* {_renderNewTag()} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[100px] text-sm max-lg:px-[20px]">
        <div className="grid grid-cols-2 gap-6  mt-5">
          <div className="border border-white rounded-lg border-opacity-10 p-4">
            <p>Twitter Followers When discovered</p>
            <p className="text-xl">
              {twitterDetail.data?.twitterFollowersWhenDiscovered}
            </p>
          </div>

          <div className="border border-white rounded-lg border-opacity-10 p-4">
            <p>Twitter Created Date</p>
            <p className="text-xl">
              {moment(twitterDetail.data?.twitterCreatedDate).format(
                "MM/DD/YYYY - hh:mm"
              )}
            </p>
          </div>

          <div className="border border-white rounded-lg border-opacity-10 p-4">
            <p>Current Twitter Followers</p>
            <p className="text-xl">
              {twitterDetail.data?.currentTwitterFollowers}
            </p>
          </div>

          <div className="border border-white rounded-lg border-opacity-10 p-4">
            <p>Discovered Date</p>
            <p className="text-xl">
              {moment(twitterDetail.data?.discoveredDate).format(
                "MM/DD/YYYY - hh:mm"
              )}
            </p>
          </div>
        </div>

        {/* Chart */}
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

        <h3 className="text-lg font-workSansSemiBold mt-14">
          Latest Followers
        </h3>
        <div className="mt-5 ">
          {data ? (
            <TableCommon
              columns={followers ?? []}
              data={data?.items ?? []}
              onChangePage={function (pageNumber: number): void {
                throw new Error("Function not implemented.");
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

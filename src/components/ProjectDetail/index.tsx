import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { TwitterIcon } from "@/assets/icons";
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
  const [data, setData] = useState<any>({
    items: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);

  const intObserver = useRef();
  const lastFollowerRef = useCallback(
    (_item: any) => {
      if (isLoading) return;

      let action = intObserver.current as any;
      if (intObserver.current) action.disconnect();

      action = new IntersectionObserver((_item) => {
        if (hasNextPage) {
          console.log("we are near");
          setPage((prev) => prev + 1);
        }
      }, {});
    },
    [isLoading, hasNextPage]
  );

  useEffect(() => {
    if (
      accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM &&
      authState?.access_token &&
      !hasNextPage
    )
      fetchData();
  }, [
    accountExtendDetail?.currentPlanKey,
    authState?.access_token,
    userId,
    hasNextPage,
    page,
  ]);

  useEffect(() => {
    const followerList = document.getElementById("follower-list");
    console.log(followerList?.offsetHeight);
  }, [isLoading]);

  const handleScroll = (_e: React.UIEvent<HTMLDivElement, UIEvent>) => {};

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const getData = await apiTwitter.getListFollower(
        userId as any,
        {
          pageNumber: page,
          pageSize: 20,
        },
        authState?.access_token ?? ""
      );
      setData((_prevItems: any) => {
        return { ...getData, items: [..._prevItems.items, ...getData.items] };
      });
      setPage((prevPage) => prevPage + 1);
      console.log(getData.items.length);

      setHasNextPage(getData.items.length === 0 ? true : false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

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
      <div className="flex px-[100px] max-lg:px-[10px] w-full">
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
                  <a
                    className="ml-2"
                    href={twitterDetail.data?.twitterUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image src={TwitterIcon} width={16} height={13} alt="t-i" />
                  </a>
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
              <p className="text-sm mt-3">{twitterDetail.data?.description}</p>

              <div className="flex mt-3">
                <p className="text-sm ">
                  {twitterDetail.data && twitterDetail.data?.categories
                    ? twitterDetail.data?.categories?.map(
                        (value, index) =>
                          `${value.name}${
                            index === twitterDetail?.data?.categories.length - 1
                              ? ""
                              : ","
                          }`
                      )
                    : null}
                </p>
                {/* {_renderNewTag()} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[100px] text-sm max-lg:px-[10px]">
        <div className="grid grid-cols-2 gap-6  mt-5">
          <div className="border border-white rounded-lg border-opacity-10 p-4">
            <p>Twitter Followers When discovered</p>
            <p className="text-xl max-lg:text-sm">
              {twitterDetail.data?.twitterFollowersWhenDiscovered}
            </p>
          </div>

          <div className="border border-white rounded-lg border-opacity-10 p-4">
            <p>Twitter Created Date</p>
            <p className="text-xl max-lg:text-sm">
              {moment(twitterDetail.data?.twitterCreatedDate).format(
                "MM/DD/YYYY - hh:mm"
              )}
            </p>
          </div>

          <div className="border border-white rounded-lg border-opacity-10 p-4">
            <p>Current Twitter Followers</p>
            <p className="text-xl max-lg:text-sm">
              {twitterDetail.data?.currentTwitterFollowers}
            </p>
          </div>

          <div className="border border-white rounded-lg border-opacity-10 p-4">
            <p>Discovered Date</p>
            <p className="text-xl max-lg:text-sm">
              {moment(twitterDetail.data?.discoveredDate).format(
                "MM/DD/YYYY - hh:mm"
              )}
            </p>
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

        {accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM ? (
          <>
            <h3 className="text-lg font-workSansSemiBold mt-14">
              Latest Followers
            </h3>
            <div className="mt-5 ">
              <TableCommon
                columns={followers ?? []}
                data={data?.items ?? []}
                onChangePage={function (_pageNumber: number): void {
                  throw new Error("Function not implemented.");
                }}
                onScroll={handleScroll}
                ref={lastFollowerRef}
                isLoading={isLoading}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectDetail;

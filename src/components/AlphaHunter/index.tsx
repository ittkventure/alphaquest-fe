import React, { FC, useContext, useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import { AuthContext, TypePayment } from "@/contexts/useAuthContext";
import { apiTwitter } from "@/api-client";
import { AlphaHunterDetail } from "@/api-client/types/TwitterType";
import { useRouter } from "next/router";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { UserPayType } from "@/api-client/types/AuthType";
import { toast } from "react-toastify";
import AlphaCard from "./AlphaCard";
import AlphaProfileCard from "./AlphaProfileCard";
import Spinner from "../Spinner";
import TableCommon from "../TableCommon";
import useColumTwitterChangeLogs from "@/hooks/useTable/useColumTwitterChangeLogs";
import useColumFollowersAlphaHunter from "@/hooks/useTable/useColumFollowersAlphaHunter";
import useColumnAlphaHunterMention from "@/hooks/useTable/useColumnAlphaHunterMention";
import { WatchListTypes } from "@/api-client/twitter";
import Spinner2 from "../Spinner2";
import { HeartIcon as HeartIconBold } from "@heroicons/react/24/solid";
import { HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { Tweet } from "react-twitter-widgets";

interface IAlphaHunter {
  userId?: string;
  onChangeHeart?: () => void;
}

const AlphaHunter: FC<IAlphaHunter> = ({ userId, onChangeHeart }) => {
  if (!userId) return <div />;
  const { authState, accountExtendDetail, setTypePaymentAction } =
    useContext(AuthContext);
  const [isLoadingHeart, setIsLoadingHeart] = useState<boolean>(false);
  const changelogsRef: React.MutableRefObject<any> = useRef();
  const followRef: React.MutableRefObject<any> = useRef();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageUserChangeLog, setPageUserChangeLog] = useState(1);
  const [pageLast, setPageLast] = useState(1);

  const [isDescSorted, setIsDescSorted] = useState(false);
  const [isDescSortedChangeLog, setIsDescSortedChangeLog] = useState(false);
  const [isDescSortedLast, setIsDescSortedLast] = useState(false);

  useEffect(() => {
    if (router.asPath?.includes("follow"))
      followRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    if (router.asPath?.includes("update"))
      changelogsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  });

  useContext(AuthContext);

  const listEarlyFollower = useQuery(
    [
      "getListEarlyAlphaHunterFollower",
      userId,
      page,
      isDescSorted,
      authState?.access_token,
    ],
    async () =>
      await apiTwitter.getListEarlyAlphaHunterFollower(
        userId as any,
        {
          pageNumber: page,
          pageSize: 10,
          desc: isDescSorted,
        },
        authState?.access_token ?? ""
      ),
    {
      keepPreviousData: false,
    }
  );

  const listLastFollower = useQuery(
    [
      "getListLastAlphaHunterFollower",
      userId,
      pageLast,
      isDescSortedLast,
      authState?.access_token,
    ],
    async () =>
      await apiTwitter.getListLastAlphaHunterFollower(
        userId as any,
        {
          pageNumber: pageLast,
          pageSize: 10,
          desc: isDescSortedLast,
        },
        authState?.access_token ?? ""
      ),
    {
      keepPreviousData: false,
    }
  );

  const listAlphaHunterChangeLog = useQuery(
    [
      "fetchListAlphaHunterChangeLog",
      userId,
      pageUserChangeLog,
      isDescSortedChangeLog,
      authState?.access_token,
    ],
    async () =>
      await apiTwitter.getAlphaHunterChangeLogUser(
        userId as any,
        {
          pageNumber: pageUserChangeLog,
          pageSize: 10,
          desc: isDescSortedChangeLog,
        },
        authState?.access_token ?? ""
      ),
    {
      keepPreviousData: false,
    }
  );

  const alphaHunterDetail = useQuery<AlphaHunterDetail>({
    queryKey: [
      "getAlphaHunterDetails",
      accountExtendDetail?.currentPlanKey,
      authState?.access_token,
      router.pathname,
      router.query,
    ],
    queryFn: async () =>
      await apiTwitter.getAlphaHunterDetails(
        userId as any,
        authState?.access_token ?? ""
      ),
  });

  const addWatchListAHMutate = useMutation({
    mutationFn: (params: {
      refId: string;
      type: WatchListTypes;
      subType: string;
    }) => apiTwitter.addWatchList(params.refId, params.type, params.subType),
    onSuccess: () => {
      alphaHunterDetail.refetch();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.error?.data?.messsage ?? "Error please try again"
      );
    },
  });

  const { followersAlphaHunter } = useColumFollowersAlphaHunter({
    isLinkToAlphaHunter: false,
  });
  const { changeLogs } = useColumTwitterChangeLogs();
  const { alphaHunterMention } = useColumnAlphaHunterMention();

  const onAddItemToWatchList = async () => {
    // if (!authState?.access_token) {
    //   mixpanelTrack(event_name_enum.inbound, {
    //     url: "/login",
    //   });
    //   router.push("/login");
    //   return;
    // }
    // if (accountExtendDetail?.currentPlanKey === UserPayType.FREE) {
    //   setTypePaymentAction ? setTypePaymentAction(TypePayment.PRO) : null;
    //   mixpanelTrack(event_name_enum.inbound, {
    //     url: "/pricing",
    //   });
    //   router.push("/pricing?action=open");

    //   return;
    // }
    try {
      setIsLoadingHeart(true);

      if (authState?.access_token) {
        await apiTwitter.addWatchList(userId ?? "", WatchListTypes.PROJECT);
        mixpanelTrack(event_name_enum.on_add_watch_list, {
          on_add_watch_list: `User add the project ${
            alphaHunterDetail.data?.name ?? "project"
          } to watchlist`,
        });
        onChangeHeart ? onChangeHeart() : null;
      } else {
        toast.warning("Please login for use this feature");
      }
      setIsLoadingHeart(false);
    } catch (error: any) {
      setIsLoadingHeart(false);
      toast.error(
        error?.response?.data?.error?.data?.messsage ?? "Error please try again"
      );
    }
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

  const formatDataChart = (data: Object) => {
    const result = [];

    for (const [key, value] of Object.entries(data)) {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);

      result.push({
        name: key,
        value: value,
        color: "#" + randomColor,
      });
    }

    return result;
  };

  return (
    <div className={`w-full h-full overflow-x-hidden`}>
      <div className="flex items-center">
        <div className="flex-1">
          <AlphaProfileCard
            item={alphaHunterDetail?.data}
            isLoading={
              alphaHunterDetail?.isLoading || alphaHunterDetail?.isFetching
            }
            buttonHeart={
              <button
                onClick={() => {
                  if (!authState?.access_token) {
                    onClickPaymentTrial();
                    return;
                  }
                  addWatchListAHMutate.mutate({
                    refId: alphaHunterDetail?.data?.userId ?? "",
                    type: WatchListTypes.ALPHA_HUNTER,
                    subType: "",
                  });
                }}
                disabled={addWatchListAHMutate.isLoading}
              >
                {addWatchListAHMutate.isLoading && <Spinner2 />}

                {!addWatchListAHMutate.isLoading &&
                  (alphaHunterDetail?.data?.inWatchlist ? (
                    <HeartIconBold className="h-6 w-6 text-red-500 transition-all duration-200" />
                  ) : (
                    <HeartIcon className="h-6 w-6 hover:text-success-500 transition-all duration-200" />
                  ))}
              </button>
            }
          />
        </div>
      </div>

      <div className="px-[100px]">
        <Tab.Group vertical>
          <Tab.List className="w-full border-b border-white/20">
            <Tab>
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <div
                  className={classNames(
                    "mr-6 font-workSansSemiBold text-[18px] leading-6 py-5",
                    {
                      "text-primary-500 border-b-[3px] border-primary-500":
                        selected,
                    }
                  )}
                >
                  Followed Projects
                </div>
              )}
            </Tab>
            <Tab>
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <div
                  className={classNames(
                    "mr-6 font-workSansSemiBold text-[18px] leading-6 py-5",
                    {
                      "text-primary-500 border-b-[3px] border-primary-500":
                        selected,
                    }
                  )}
                >
                  Mentioned Projects
                </div>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="grid grid-cols-2 gap-6  mt-5 max-[1450px]:px-4 w-full">
                <div className="border border-white border-opacity-10 p-4 rounded-lg">
                  <p>Current Twitter Followers</p>

                  <p className="text-xl max-lg:text-sm">
                    {alphaHunterDetail?.data?.followerCount ?? 0}
                  </p>
                </div>

                <div className="border border-white border-opacity-10 p-4 rounded-lg">
                  <p>Total Alpha Following</p>

                  <p className="text-xl max-lg:text-sm">
                    {" "}
                    {alphaHunterDetail?.data?.alphaFollowingCount ?? 0}
                  </p>
                </div>
              </div>

              {/* Alpha card */}
              <div className="max-[1450px]:px-4 grid grid-cols-2 gap-6 mt-[60px] max-md:grid-cols-1">
                <AlphaCard
                  items={formatDataChart(
                    alphaHunterDetail?.data?.domByBlockchain ?? {}
                  )}
                  label="Alpha by Blockchain"
                  isLoading={
                    alphaHunterDetail?.isLoading ||
                    alphaHunterDetail?.isFetching
                  }
                />
                <AlphaCard
                  items={formatDataChart(
                    alphaHunterDetail?.data?.domByCategory ?? {}
                  )}
                  label="Alpha by Category"
                  isLoading={
                    alphaHunterDetail?.isLoading ||
                    alphaHunterDetail?.isFetching
                  }
                />
              </div>

              {/* Earliest Discovery area */}
              <div className="flex items-center mt-14 ">
                <h3 className="text-lg font-workSansSemiBold  mr-3">
                  Earliest Discovery
                </h3>
              </div>
              <div className="mt-5 mx-8 max-[1450px]:mx-0">
                <TableCommon
                  columns={followersAlphaHunter ?? []}
                  data={listEarlyFollower.data?.items ?? []}
                  onChangePage={function (_pageNumber: number): void {
                    setPage(_pageNumber);
                  }}
                  isLoading={listEarlyFollower.isLoading}
                  paginationInfo={{
                    currentPage: page,
                    pageNumber: page,
                    pageSize: 10,
                    totalPages: listEarlyFollower?.data?.totalCount
                      ? Math.ceil(listEarlyFollower?.data?.totalCount / 20)
                      : 0,
                    totalElements: listEarlyFollower?.data?.totalCount ?? 0,
                  }}
                  onSort={(isSortedDesc) => {
                    if (isSortedDesc === undefined) return;
                    setIsDescSorted(isSortedDesc);
                  }}
                  isSortedDesc={isDescSorted}
                />
              </div>

              {/* Latest Following area */}
              <div ref={followRef}>
                <div className="flex items-center mt-14 ">
                  <h3 className="text-lg font-workSansSemiBold  mr-3">
                    Latest Following
                  </h3>

                  {/* <div className="px-[6px] py-[2px] bg-orange-400 rounded-sm text-orange-400 font-workSansSemiBold bg-opacity-30">
            BETA
          </div> */}
                </div>
                <div className="mt-5 mx-8 max-[1450px]:mx-0">
                  <TableCommon
                    columns={followersAlphaHunter ?? []}
                    data={listLastFollower.data?.items ?? []}
                    onChangePage={function (_pageNumber: number): void {
                      setPageLast(_pageNumber);
                    }}
                    isLoading={listLastFollower.isLoading}
                    paginationInfo={{
                      currentPage: pageLast,
                      pageNumber: pageLast,
                      pageSize: 10,
                      totalPages: listLastFollower?.data?.totalCount
                        ? Math.ceil(listLastFollower?.data?.totalCount / 20)
                        : 0,
                      totalElements: listLastFollower?.data?.totalCount ?? 0,
                    }}
                    onSort={(isSortedDesc) => {
                      if (isSortedDesc === undefined) return;
                      setIsDescSortedLast(isSortedDesc);
                    }}
                    isSortedDesc={isDescSortedLast}
                  />
                </div>
              </div>

              {/* Twitter changelogs area */}
              <div className="max-[1450px]:px-4 text-sm max-lg:px-[10px]">
                <div ref={changelogsRef}>
                  <div className="flex items-center mt-14 ">
                    <h3 className="text-lg font-workSansSemiBold mr-3">
                      Twitter changelogs
                    </h3>

                    {/* <div className="px-[6px] py-[2px] bg-orange-400 rounded-sm text-orange-400 font-workSansSemiBold bg-opacity-30">
              BETA
            </div> */}
                  </div>

                  {listAlphaHunterChangeLog.data?.items?.length > 0 ? (
                    <div className="mt-5 mx-8 max-[1450px]:mx-0">
                      <TableCommon
                        columns={changeLogs ?? []}
                        data={
                          listAlphaHunterChangeLog.data?.items
                            ? listAlphaHunterChangeLog.data?.items.map(
                                (item: any) => {
                                  return {
                                    ...item,
                                    profileImageUrl:
                                      listAlphaHunterChangeLog.data
                                        .profileImageUrl,
                                  };
                                }
                              )
                            : []
                        }
                        onChangePage={function (_pageNumber: number): void {
                          setPageUserChangeLog(_pageNumber);
                        }}
                        isLoading={listAlphaHunterChangeLog.isLoading}
                        paginationInfo={{
                          currentPage: pageUserChangeLog,
                          pageNumber: pageUserChangeLog,
                          pageSize: 10,
                          totalPages: listAlphaHunterChangeLog?.data?.totalCount
                            ? Math.ceil(
                                listAlphaHunterChangeLog?.data?.totalCount / 20
                              )
                            : 0,
                          totalElements:
                            listAlphaHunterChangeLog?.data?.totalCount ?? 0,
                        }}
                        onSort={(isSortedDesc) => {
                          if (isSortedDesc === undefined) return;
                          setIsDescSortedChangeLog(isSortedDesc);
                        }}
                        isSortedDesc={isDescSortedChangeLog}
                        isShowHeader={false}
                        isPaddingX
                      />
                    </div>
                  ) : !listAlphaHunterChangeLog.isLoading ? (
                    <div className="w-full flex justify-start items-center mb-20 mt-4">
                      <p className="text-secondary-400">
                        {accountExtendDetail?.currentPlanKey ===
                        UserPayType.PREMIUM
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
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="grid grid-cols-2 gap-6 mt-5 max-[1450px]:px-4 w-full">
                <div className="border border-white border-opacity-10 p-4 rounded-lg">
                  <p>Current Twitter Mentioned</p>

                  <p className="text-xl max-lg:text-sm">
                    {alphaHunterDetail?.data?.followerCount ?? 0}
                  </p>
                </div>

                <div className="border border-white border-opacity-10 p-4 rounded-lg">
                  <p>Total Alpha Mentioned</p>

                  <p className="text-xl max-lg:text-sm">
                    {" "}
                    {alphaHunterDetail?.data?.alphaFollowingCount ?? 0}
                  </p>
                </div>
              </div>

              {/* Project mentioned area */}

              <div className="mt-6">
                <h3>20 Alpha Hunters mentioned last 30 days</h3>
                <div className="mt-14">
                  <TableCommon
                    columns={alphaHunterMention ?? []}
                    data={[]}
                    onChangePage={() => {}}
                  />
                </div>
              </div>

              {/* Search area */}
              <div className="mt-6">
                <div className="flex justify-between">
                  <p>{`50 Tweets from ${alphaHunterDetail?.data?.name} Metntioning Projects`}</p>
                  <div className="relative max-lg:mr-2 max-lg:hidden">
                    <MagnifyingGlassIcon className="w-5 h-5 max-lg:w-4 max-lg:h-4 text-white absolute max-lg:top-[6px] top-[11px] left-[5px]" />

                    <input
                      className="w-52 max-lg:w-32 max-lg:py-1 bg-secondary-600 py-2 pl-8 max-lg:pl-7 max-lg:text-sm "
                      placeholder="Search"
                      value={""}
                      onChange={(e) => {
                        console.log(e);
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-center flex-col gap-3 items-center">
                  <Tweet tweetId="1771909813066436902" />
                  <Tweet tweetId="1772231064288977161" />
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default AlphaHunter;

import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Header from "./Header";
import MonthSelect from "./MonthSelect";
import SelectCustom, { OptionType } from "../common/Select";
import TableContent from "./Table/TableContent";
import ApiTwitter from "@/api-client/twitter";
import {
  SortByType,
  TimeFrameTypes,
  TwitterItem,
} from "@/api-client/types/TwitterType";
import SkeletonLoading from "./Table/SkeletonLoading";
import { useRouter } from "next/router";
import { AuthContext, TypePayment } from "@/contexts/useAuthContext";
import { UserPayType } from "@/api-client/types/AuthType";
import Image from "next/image";
import { CrownIcon, InfoIcon } from "@/assets/icons";
import { initListSort, initListSortForWatchlist } from "@/utils/list";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import Narratives from "../Narratives";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TopAlphaHunterByDiscoveries from "../TopAlphaHunterByDiscoveries";
import { Tooltip as ReactTooltip } from "react-tooltip";

type TabTypes = "narratives" | "projects" | "alpha-hunters";

interface WatchlistTypes {
  listItemsProps?: TwitterItem[];
  totalCountProps?: string;
  tab?: TabTypes;
}

const Watchlist: FC<WatchlistTypes> = ({
  listItemsProps,
  totalCountProps,
  tab,
}) => {
  const router = useRouter();
  const { authState, accountExtendDetail, setTypePaymentAction } =
    useContext(AuthContext);
  const [sortByLabel, setSortByLabel] = useState<string>(
    "Watchlist most recent date added"
  );
  const [timeLabel, setTimeLabel] = useState<string>("7D");

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [tabSelected, setTabSelected] = useState<TabTypes>(tab ?? "narratives");

  const [timeFrame, setTimeFrame] = useState<TimeFrameTypes>("7D");
  const [sortBy, setSortBy] = useState<SortByType>(
    "WATCHLIST_MOST_RECENT_DATE_ADDED"
  );
  const [hasLoadMore, setHasLoadMore] = useState(true);
  const observer: React.MutableRefObject<any> = useRef();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<string>(totalCountProps ?? "0");
  const [listItems, setListItem] = useState<TwitterItem[]>(
    listItemsProps ?? []
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [firstCalled, setFirstCalled] = useState(false);
  const [chains, setChains] = useState<Array<OptionType>>([]);
  const [category, setCategory] = useState<Array<OptionType>>([]);
  const [chainSelected, setChainSelected] = useState<OptionType>();
  const [categorySelected, setCategorySelected] = useState<OptionType>();
  const apiTwitter = new ApiTwitter();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setFirstCalled(true);
    fetchCategoryAndChain("CHAIN");
    fetchCategoryAndChain("CATEGORY");
  }, []);

  useEffect(() => {
    if (firstCalled) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountExtendDetail]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  useEffect(() => {
    if (
      pageNumber !== 1 &&
      firstCalled &&
      accountExtendDetail?.currentPlanKey !== "FREE"
    )
      fetchDataLoadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, accountExtendDetail]);

  useEffect(() => {
    if (firstCalled) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    timeFrame,
    accountExtendDetail,
    chainSelected,
    categorySelected,
    sortBy,
    keyword,
  ]);

  const onClickPaymentTrial = () => {
    mixpanelTrack(event_name_enum.upgrade_to_pro, {
      url: router.pathname,
    });
    if (authState) {
      mixpanelTrack(event_name_enum.inbound, {
        url: "/pricing?action=open",
      });
      setTypePaymentAction ? setTypePaymentAction(TypePayment.TRIAL) : null;
      router.push("/pricing?action=open");
    } else {
      mixpanelTrack(event_name_enum.inbound, {
        url: "/sign-up",
      });
      setTypePaymentAction ? setTypePaymentAction(TypePayment.TRIAL) : null;
      router.push("/sign-up");
    }
  };

  const fetchData = async (currentTab?: string) => {
    try {
      if (
        accountExtendDetail?.currentPlanKey === UserPayType.FREE ||
        !authState?.access_token
      )
        return;
      const tabCheck = currentTab ?? tab;
      setIsLoading(true);
      setErrorMsg("");
      setPageNumber(1);
      setHasLoadMore(true);
      const data = await apiTwitter.getListTwitterWatchList(
        {
          pageNumber: 1,
          pageSize:
            accountExtendDetail?.currentPlanKey === "FREE" ? 10 : pageSize,
          sortBy,
          timeFrame,
          newest: false,
          categories: categorySelected?.code ? [categorySelected.code] : [],
          chains: chainSelected?.code ? [chainSelected.code] : [],
          searchText: keyword,
        },
        authState?.access_token ?? ""
      );

      setIsLoading(false);
      if (
        data == undefined ||
        data == null ||
        data.items == undefined ||
        data.items == null
      ) {
        setErrorMsg("Not found data.");
        setListItem([]);
        setTotalCount("0");
        return;
      }
      setFirstCalled(true);
      setListItem(data.items);
      setTotalCount(data?.totalCount.toString());
    } catch (error) {
      setTotalCount("0");
      setErrorMsg("Error please try again.");
      setIsLoading(false);
    }
  };

  const fetchDataLoadMore = async () => {
    try {
      if (accountExtendDetail?.currentPlanKey === UserPayType.FREE) return;
      if (!authState?.access_token) return;
      setIsLoadingMore(true);
      setErrorMsg("");
      const data = await apiTwitter.getListTwitterWatchList(
        {
          pageNumber,
          pageSize,
          sortBy,
          timeFrame,
          newest: false,
          categories: categorySelected?.code ? [categorySelected.code] : [],
          chains: chainSelected?.code ? [chainSelected.code] : [],
          searchText: keyword,
        },
        authState?.access_token ?? ""
      );

      setIsLoadingMore(false);
      if (pageNumber === 1) setListItem([]);
      if (
        data == undefined ||
        data == null ||
        data.items == undefined ||
        data.items == null
      ) {
        setHasLoadMore(false);
        setIsLoadingMore(false);
        setTotalCount("0");
        return;
      }
      if (data.items.length === 0) setHasLoadMore(false);
      setListItem((items) => items.concat(data.items));
    } catch (error) {
      setErrorMsg("Error when load more data, please try again.");
      setTotalCount("0");
      setIsLoadingMore(false);
      setHasLoadMore(false);
    }
  };

  const _handleSelectTab = (tabIndex: number) => {
    switch (tabIndex) {
      case 0:
        setTabSelected("narratives");
        router.push("/watchlist/narratives");
        return;
      case 1:
        setTabSelected("projects");
        router.push("/watchlist/projects");
        return;
      default:
        setTabSelected("alpha-hunters");
        router.push("/watchlist/alpha-hunters");
        return;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setPageLoadMore = () => {
    if (hasLoadMore && !isLoading) setPageNumber((page) => page + 1);
  };

  const triggerElement = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageLoadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [setPageLoadMore]
  );

  const onRefreshTable = () => {
    const tcAfterRemove = Number(totalCount) - 1;
    setTotalCount(tcAfterRemove.toString());
  };

  const _renderTable = () => {
    if (
      accountExtendDetail?.currentPlanKey === UserPayType.FREE ||
      !authState?.access_token
    )
      return "";
    if (isLoading) return null;
    if (listItems.length === 0 && !errorMsg)
      return <p className="text-center">No data.</p>;
    return (
      <TableContent
        initListRows={listItems ?? []}
        isAnimation={true}
        onRefreshTable={onRefreshTable}
      />
    );
  };

  const fetchCategoryAndChain = async (type: "CHAIN" | "CATEGORY") => {
    try {
      if (type === "CHAIN") {
        const chains = await apiTwitter.getChain();
        setChains(chains);
        return;
      }
      const category = await apiTwitter.getCategory();
      setCategory(category);
    } catch (error) {}
  };

  const renderUpBtn = () => {
    if (router.pathname.indexOf("watchlist")) return null;
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

  const _renderUpPro = () => {
    if (accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM) return;
    return (
      <div className="w-full mt-5 max-lg:mt-10 flex flex-col justify-center items-center z-10">
        <div className="flex justify-center items-center mb-4">
          <div className="mr-2 py-[1px] px-2 border rounded-lg border-yellow-400 text-yellow-400 font-workSansSemiBold">
            PRO
          </div>
          <p className="">Member Only</p>
        </div>

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
    );
  };

  useEffect(() => {
    console.log("totalCount", totalCount);
  }, [totalCount]);

  const renderDes = () => {
    return (
      <div className="flex items-center max-xl:flex-col max-lg:mt-2">
        <div className="flex flex-col justify-start max-lg:w-[90vw]">
          <p>
            {totalCount.toLocaleString()} Alpha Hunters added to your watchlist
            sorted by
          </p>
          <div className="flex flex-col">
            <MonthSelect
              onChangeSelect={(month) => {
                mixpanelTrack(event_name_enum.on_sort_project, {
                  url: router.pathname,
                  value_sort:
                    (month.value as SortByType) ??
                    "WATCHLIST_MOST_RECENT_DATE_ADDED",
                  message:
                    "sorted by" + (month.value as SortByType) ??
                    "WATCHLIST_MOST_RECENT_DATE_ADDED",
                });
                setSortBy(
                  (month.value as SortByType) ??
                    "WATCHLIST_MOST_RECENT_DATE_ADDED"
                );
                setSortByLabel(month.label ?? "# of KOLs followed");
              }}
              defaultData={{
                value: sortBy,
                label: sortByLabel,
              }}
              listData={initListSortForWatchlist as Array<any>}
              selectBoxClassName="w-full"
            />
            <div className="flex mt-2">
              <p className="mr-2">
                with # of new projects followed calculated during last
              </p>

              <MonthSelect
                onChangeSelect={(month) => {
                  mixpanelTrack(event_name_enum.on_filter_project, {
                    url: router.pathname,
                    value_search: (month.value as TimeFrameTypes) ?? "ALL",
                    message:
                      "projects discovered during the last " +
                        (month.value as TimeFrameTypes) ?? "ALL",
                  });
                  setTimeFrame((month.value as TimeFrameTypes) ?? "ALL");
                  setTimeLabel(month.label ?? "ALL");
                }}
                defaultData={{
                  value: timeFrame,
                  label: timeLabel,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const selectedIndex = useMemo(() => {
    switch (tabSelected) {
      case "narratives":
        return 0;
      case "projects":
        return 1;
      default:
        return 2;
    }
  }, [tabSelected]);

  return (
    <div className="w-full relative ">
      {renderUpBtn()}
      <div className="p-6">
        <Header />
        <div className="h-[1px] bg-white bg-opacity-20 mt-4 max-lg:hidden" />
      </div>
      <Tab.Group selectedIndex={selectedIndex} onChange={_handleSelectTab}>
        <Tab.List className=" mx-6 w-full border-b border-white/20">
          <Tab>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={classNames(
                  "mr-6 font-workSansSemiBold text-[18px] leading-6 py-5",
                  {
                    "text-primary-500 border-b-[3px] border-primary-500":
                      selected,
                  }
                )}
              >
                Narratives
              </button>
            )}
          </Tab>
          <Tab>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={classNames(
                  "mr-6 font-workSansSemiBold text-[18px] leading-6 py-5",
                  {
                    "text-primary-500 border-b-[3px] border-primary-500":
                      selected,
                  }
                )}
              >
                Projects
              </button>
            )}
          </Tab>
          <Tab>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={classNames(
                  "mr-6 font-workSansSemiBold text-[18px] leading-6 py-5",
                  {
                    "text-primary-500 border-b-[3px] border-primary-500":
                      selected,
                  }
                )}
              >
                Alpha Hunters
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="py-6">
            <Narratives />
          </Tab.Panel>
          <Tab.Panel className="mt-6">
            {_renderUpPro()}

            <div className="px-6 pb-6 ">
              <div className="flex max-lg:flex-col max-lg:items-center justify-between">
                {renderDes()}
                <div className="flex max-lg:flex-col max-lg:gap-4 max-lg:items-center justify-between max-lg:mt-5">
                  <div className="flex">
                    <div className="mr-3">
                      <SelectCustom
                        placeholder="Chain - All"
                        initList={chains}
                        onChangeSelected={(item: any) => {
                          mixpanelTrack(event_name_enum.on_filter_chain, {
                            url: router.pathname,
                            code: item?.code,
                            name: item?.name,
                          });
                          setChainSelected(item);
                        }}
                        selectedValue={chainSelected}
                      />
                    </div>
                    <div>
                      <SelectCustom
                        placeholder="Category - All"
                        initList={category}
                        onChangeSelected={(item: any) => {
                          mixpanelTrack(event_name_enum.on_filter_category, {
                            url: router.pathname,
                            code: item?.code,
                            name: item?.name,
                          });
                          setCategorySelected(item);
                        }}
                        selectedValue={categorySelected}
                      />
                    </div>
                  </div>

                  <div className="relative max-lg:w-full max-lg:left-[-4px] max-lg:mr-2 ml-4 flex-1">
                    <MagnifyingGlassIcon className="w-4 h-4 max-lg:w-4 max-xl:h-4 text-white absolute max-xl:top-[8px] top-[11px] left-[5px]" />

                    <input
                      className="2xl:w-96 max-lg:w-full max-lg:h-8 max-lg:py-1 bg-secondary-600 py-[6px] pl-8 max-lg:pl-7 max-lg:text-sm "
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
                {/* <div className="flex max-lg:items-center justify-between max-lg:mt-5">
            <div className="mr-3">
              <SelectCustom
                placeholder="Chain - All"
                initList={chains}
                onChangeSelected={(item) => setChainSelected(item)}
              />
            </div>
            <div>
              <SelectCustom
                placeholder="Category - All"
                initList={category}
                onChangeSelected={(item) => setCategorySelected(item)}
              />
            </div>
          </div> */}
              </div>

              <div className="mt-7 max-lg:mt-9">
                <div className="bg-[#1F2536] h-10 px-14 flex justify-between items-center font-normal text-sm text-white mb-6 max-lg:hidden">
                  <span>Project</span>
                  <div className="flex items-center gap-1">
                    <span>New KOLs followed</span>
                    <div
                      data-tooltip-id="info-tooltip-kol"
                      className="cursor-pointer"
                    >
                      <Image src={InfoIcon} width={20} height={20} alt="icon" />
                    </div>
                  </div>
                </div>
                {_renderTable()}
                {errorMsg &&
                accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM ? (
                  <p className="mt-10 text-center">{errorMsg}</p>
                ) : null}
                {isLoading &&
                accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM ? (
                  <SkeletonLoading numberOfRow={10} />
                ) : null}
                {isLoadingMore &&
                accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM ? (
                  <SkeletonLoading numberOfRow={3} />
                ) : null}
                {!isLoadingMore &&
                !errorMsg &&
                !isLoading &&
                accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM ? (
                  <div className="h-7 w-full" ref={triggerElement}></div>
                ) : null}
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel className="p-6">
            <TopAlphaHunterByDiscoveries isWatchList={true} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <ReactTooltip
        id="info-tooltip-kol"
        className="!bg-[#282E44] max-w-[300px] text-white text-[12px] p-4 !rounded-none"
        place="bottom"
        content={`Number of new Alpha Hunters who followed ${
          timeLabel === "ALL" ? "all" : `last ${timeLabel}`
        }. Click on the project to find out which Alpha Hunters are following it.`}
      />
    </div>
  );
};

export default Watchlist;

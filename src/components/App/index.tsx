import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Header from "./Header";
import MonthSelect from "./MonthSelect";
import SelectCustom, { OptionType } from "../common/Select";
import TableContent from "./Table/TableContent";
import TabApp from "./TabApp";
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
import { initListSort } from "@/utils/list";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { SearchContext } from "@/contexts/useSearchContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface AppContentTypes {
  listItemsProps?: TwitterItem[];
  totalCountProps?: string;
  tab?: "watchlist" | "trending" | "newest" | string;
  chainsParams?: string[];
  categoryParams?: string[];
  chainQuery?: string;
  categoryQuery?: string;
}

const AppContent: FC<AppContentTypes> = ({
  listItemsProps,
  totalCountProps,
  tab,
  chainsParams,
  categoryParams,
  chainQuery,
  categoryQuery,
}) => {
  const router = useRouter();
  const { authState, accountExtendDetail, setTypePaymentAction } =
    useContext(AuthContext);
  const { setKeyword, keyword } = useContext(SearchContext);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [newest, setNewest] = useState<string>(
    tab ? tab?.toString() : "trending"
  );
  const [timeFrame, setTimeFrame] = useState<TimeFrameTypes>("7D");
  const [sortBy, setSortBy] = useState<SortByType>("SCORE");
  const [sortByLabel, setSortByLabel] = useState<string>("# of KOLs followed");
  const [timeLabel, setTimeLabel] = useState<string>("7D");

  const [hasLoadMore, setHasLoadMore] = useState(true);
  const observer: React.MutableRefObject<any> = useRef();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<string>(totalCountProps ?? "");
  const [listItems, setListItem] = useState<TwitterItem[]>(
    listItemsProps ?? []
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [firstCalled, setFirstCalled] = useState(false);
  const [chains, setChains] = useState<Array<OptionType>>([]);
  const [category, setCategory] = useState<Array<OptionType>>([]);
  const [chainSelected, setChainSelected] = useState<OptionType>({
    code: chainQuery ?? "",
    name: chainQuery ?? "Chain - All",
  });
  const [categorySelected, setCategorySelected] = useState<OptionType>({
    code: categoryQuery ?? "",
    name: categoryQuery ?? "Category - All",
  });
  const apiTwitter = new ApiTwitter();
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  useEffect(() => {
    setFirstCalled(true);
    fetchCategoryAndChain("CHAIN");
    fetchCategoryAndChain("CATEGORY");
  }, []);

  const { category: categoryQueryPath, chain: chainQueryPath } = router.query;

  useEffect(() => {
    if (categoryQuery)
      setCategorySelected({
        name: categoryQueryPath?.toString() ?? categoryQuery,
        code: categoryQuery,
      });
    else {
    }

    if (chainQuery) setChainSelected({ name: chainQuery, code: chainQuery });
  }, [categoryQuery, chainQuery]);

  useEffect(() => {
    if (!categoryQueryPath)
      setCategorySelected({ name: "Category - All", code: "" });
    if (!chainQueryPath) setChainSelected({ name: "Chain - All", code: "" });
  }, [categoryQueryPath, chainQueryPath]);

  useEffect(() => {
    if (firstCalled) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, accountExtendDetail]);

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
  }, [timeFrame, accountExtendDetail, chainSelected, categorySelected, sortBy]);

  const onClickPaymentTrial = () => {
    mixpanelTrack(event_name_enum.upgrade_to_pro, {
      url: router.pathname,
    });
    if (authState) {
      mixpanelTrack(event_name_enum.inbound, {
        url: "/pricing",
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
      const tabCheck = currentTab ?? tab;
      setIsLoading(true);
      setErrorMsg("");
      setPageNumber(1);
      setHasLoadMore(true);

      const data = await apiTwitter.getListTwitter(
        {
          pageNumber: 1,
          pageSize:
            accountExtendDetail?.currentPlanKey === "FREE" ? 10 : pageSize,
          sortBy,
          timeFrame,
          newest: tabCheck === "newest" ? true : false,
          categories:
            categoryParams ??
            (categorySelected?.code ? [categorySelected.code] : []),
          chains:
            chainsParams ?? (chainSelected?.code ? [chainSelected.code] : []),
        },
        authState?.access_token ?? "",
        authState?.access_token ? false : true
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
      tabCheck !== "watchlist"
        ? setTotalCount(data?.discoveredProjectCount.toString())
        : setTotalCount(data?.totalCount.toString());

      setIsSearchLoading(false);
    } catch (error) {
      setTotalCount("0");
      setErrorMsg("Error please try again.");
      setIsLoading(false);
      setIsSearchLoading(false);
    }
  };

  const fetchDataLoadMore = async () => {
    try {
      if (!authState?.access_token) return;
      setIsLoadingMore(true);
      setErrorMsg("");

      const data = await apiTwitter.getListTwitter(
        {
          pageNumber,
          pageSize,
          sortBy,
          timeFrame,
          newest: newest === "newest" ? true : false,
          categories:
            categoryParams ??
            (categorySelected?.code ? [categorySelected.code] : []),
          chains:
            chainsParams ?? (chainSelected?.code ? [chainSelected.code] : []),
        },
        authState?.access_token ?? "",
        authState?.access_token ? false : true
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
        setNewest("trending");
        return;
      case 1:
        setNewest("newest");
        return;
      default:
        setNewest("watchlist");
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

  const _renderTable = () => {
    return (
      <TableContent
        initListRows={listItems ?? []}
        isAnimation={newest === "watchlist" ? true : false}
        onRefreshTable={() => {
          fetchData();
        }}
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

  const renderDes = () => {
    return (
      <div className="flex items-center max-xl:flex-col max-lg:mt-2">
        <div className="flex flex-col justify-start max-lg:w-[90vw]">
          <p>
            {totalCount.toLocaleString()} projects discovered during the last
          </p>
          <div className="flex">
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
            <div className="flex">
              <p className="mx-2">sorted by</p>
              <MonthSelect
                onChangeSelect={(month) => {
                  mixpanelTrack(event_name_enum.on_sort_project, {
                    url: router.pathname,
                    value_sort: (month.value as SortByType) ?? "SCORE",
                    message:
                      "sorted by" + (month.value as SortByType) ?? "SCORE",
                  });
                  setSortBy((month.value as SortByType) ?? "SCORE");
                  setSortByLabel(month.label ?? "# of KOLs followed");
                }}
                defaultData={{
                  value: sortBy,
                  label: sortByLabel,
                }}
                listData={initListSort as Array<any>}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderUpBtn = () => {
    if (router.pathname === "/watchlist/projects") return null;
    return accountExtendDetail?.currentPlanKey === UserPayType.FREE ||
      !accountExtendDetail?.currentPlanKey ? (
      <div className="fixed w-full h-[300px] bottom-0 left-0 bg-linear-backdrop z-10 pl-64 max-lg:pl-0">
        <div className="w-full h-[300px] flex flex-col justify-center items-center z-10 mt-10">
          <p className="mb-4">Upgrade account for full access</p>

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
    <div className="w-full relative ">
      {renderUpBtn()}
      <div className="p-6">
        <Header />
        <div className="h-[1px] bg-white bg-opacity-20 my-4 max-lg:hidden" />
      </div>
      <div className="hidden max-lg:block">
        <TabApp onChangeTab={_handleSelectTab} />
      </div>
      <div className="px-6 pb-6 ">
        <div className="flex max-lg:flex-col max-lg:items-center justify-between">
          {renderDes()}
          {!chainsParams && !categoryParams && (
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
                      let query = "";
                      if (!item?.code) {
                        if (categoryQuery) {
                          query = `?category=${categoryQuery}`;
                        } else {
                          query = "";
                        }
                      } else if (categorySelected?.code) {
                        query = `?category=${categorySelected?.code}&chain=${item?.code}`;
                      } else {
                        query = `?chain=${item?.code}`;
                      }
                      router.push(`/projects/${tab ?? ""}${query}`);
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
                      let query = "";
                      if (!item?.code) {
                        if (chainQuery) {
                          query = `?chain=${chainQuery}`;
                        } else {
                          query = "";
                        }
                      } else if (chainSelected?.code) {
                        query = `?category=${item?.code}&chain=${chainSelected?.code}`;
                      } else {
                        query = `?category=${item?.code}`;
                      }

                      router.push(`/projects/${tab ?? ""}${query}`);
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
                    if (event.key === "Enter" && event.currentTarget.value) {
                      setKeyword(event.currentTarget.value ?? "");
                      router.push(
                        "/search?keyword=" + event.currentTarget.value
                      );
                    }
                  }}
                />
              </div>
            </div>
          )}
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
          {isSearchLoading ? null : _renderTable()}
          {errorMsg ? (
            <div className="h-[60vh] flex justify-center items-start">
              <p className="mt-10 text-center">{errorMsg}</p>
            </div>
          ) : null}
          {isLoading || isSearchLoading ? (
            <SkeletonLoading numberOfRow={10} />
          ) : null}
          {isLoadingMore ? <SkeletonLoading numberOfRow={3} /> : null}
          {!isLoadingMore &&
          !errorMsg &&
          !isLoading &&
          accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM ? (
            <div className="h-7 w-full" ref={triggerElement}></div>
          ) : null}
        </div>
      </div>
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

export default AppContent;

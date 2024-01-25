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
import { CrownIcon } from "@/assets/icons";
import { initListSort } from "@/utils/list";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { SearchContext } from "@/contexts/useSearchContext";
import { AQ_BLOG_URL, getUserId } from "@/utils/auth";

interface AppContentTypes {
  listItemsProps?: TwitterItem[];
  totalCountProps?: string;
  tab?: "watchlist" | "trending" | "newest" | string;
  keywordProps?: string;
}

const AppContent: FC<AppContentTypes> = ({
  listItemsProps,
  totalCountProps,
  tab,
  keywordProps,
}) => {
  const router = useRouter();
  const { authState, accountExtendDetail, setTypePaymentAction } =
    useContext(AuthContext);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [newest, setNewest] = useState<string>(
    tab ? tab?.toString() : "trending"
  );
  const [timeFrame, setTimeFrame] = useState<TimeFrameTypes>("7D");
  const [sortBy, setSortBy] = useState<SortByType>("SCORE");

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
  const [chainSelected, setChainSelected] = useState<OptionType>();
  const [categorySelected, setCategorySelected] = useState<OptionType>();
  const apiTwitter = new ApiTwitter();
  const { keyword, setKeyword } = useContext(SearchContext);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  useEffect(() => {
    setFirstCalled(true);
    fetchCategoryAndChain("CHAIN");
    fetchCategoryAndChain("CATEGORY");
  }, []);

  useEffect(() => {
    if (firstCalled) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, accountExtendDetail]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  useEffect(() => {
    if (keyword) fetchData();
  }, [keyword]);

  useEffect(() => {
    if (keyword || keywordProps)
      mixpanelTrack(event_name_enum.on_search_keyword, {
        url: router.pathname,
        value_search: keyword ?? keywordProps,
      });
  }, [keyword, keywordProps]);

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
      const userId = getUserId();
      router.push(`${AQ_BLOG_URL}/pricing?userId=${userId}&plan=trial`);
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
          searchText: keyword && keyword !== "" ? keyword : keywordProps,
          timeFrame: "7D",
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
          searchText: keyword && keyword !== "" ? keyword : keywordProps,
          timeFrame: "7D",
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
        <p>
          We Found {totalCount.toLocaleString()} Results With "
          {keywordProps ?? keyword}"
        </p>
      </div>
    );
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
        </div>

        <div className="mt-7 max-lg:mt-9">
          {isSearchLoading ? null : _renderTable()}
          {errorMsg ? <p className="mt-10 text-center">{errorMsg}</p> : null}
          {isLoading || isSearchLoading ? (
            <SkeletonLoading numberOfRow={10} />
          ) : null}
          {isLoadingMore ? <SkeletonLoading numberOfRow={3} /> : null}
          {!isLoadingMore && !errorMsg && !isLoading ? (
            <div className="h-7 w-full" ref={triggerElement}></div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AppContent;

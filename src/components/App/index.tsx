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
import SelectCustom from "../common/Select";
import { initListCategory, initListChain } from "@/utils/list";
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
import { AuthContext } from "@/contexts/useAuthContext";

interface AppContentTypes {
  listItemsProps?: TwitterItem[];
  totalCountProps?: string;
}

const AppContent: FC<AppContentTypes> = ({
  listItemsProps,
  totalCountProps,
}) => {
  const router = useRouter();
  const { tab } = router.query;
  const { authState, accountExtendDetail } = useContext(AuthContext);

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

  const apiTwitter = new ApiTwitter();

  useEffect(() => {
    setFirstCalled(true);
  }, []);

  useEffect(() => {
    if (firstCalled) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, accountExtendDetail]);

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
  }, [timeFrame, accountExtendDetail]);

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
      setTotalCount(data?.totalCount.toString());
    } catch (error) {
      setTotalCount("0");
      setErrorMsg("Error please try again.");
      setIsLoading(false);
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
    if (isLoading) return null;
    if (listItems.length === 0 && !errorMsg)
      return <p className="text-center">No data.</p>;
    return <TableContent initListRows={listItems ?? []} />;
  };

  return (
    <div className=" w-full">
      <div className="p-6">
        <Header />
        <div className="h-[1px] bg-white bg-opacity-20 my-4 max-lg:hidden" />
      </div>
      <div className="hidden max-lg:block">
        <TabApp onChangeTab={_handleSelectTab} />
      </div>
      <div className="px-6 pb-6">
        <div className="flex max-lg:flex-col max-lg:items-center justify-between">
          <div className="flex items-center max-lg:mt-2">
            <p>
              {totalCount.toLocaleString()} trending projects discovered during
              the last
            </p>
            <MonthSelect
              onChangeSelect={(month) => {
                setTimeFrame(month.value ?? "ALL");
              }}
            />
          </div>

          <div className="flex max-lg:items-center justify-between max-lg:mt-5">
            <div className="mr-3">
              <SelectCustom
                placeholder="Chain - All"
                initList={initListChain}
              />
            </div>
            <div>
              <SelectCustom
                placeholder="Category - All"
                initList={initListCategory}
              />
            </div>
          </div>
        </div>

        <div className="mt-7 max-lg:mt-9">
          {_renderTable()}
          {errorMsg ? <p className="mt-10 text-center">{errorMsg}</p> : null}
          {isLoading ? <SkeletonLoading numberOfRow={10} /> : null}
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

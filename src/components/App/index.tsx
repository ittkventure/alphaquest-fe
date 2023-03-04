import React, { useCallback, useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { CrownIcon } from "@/assets/icons";
import Header from "./Header";
import MonthSelect from "./MonthSelect";
import SelectCustom from "../common/Select";
import { initListCategory, initListChain } from "@/utils/list";
import TableContent from "./Table/TableContent";
import TabApp from "./TabApp";
import { useQuery } from "react-query";
import ApiTwitter from "@/api-client/twitter";
import {
  SortByType,
  TimeFrameTypes,
  TwitterItem,
} from "@/api-client/types/TwitterType";
import SkeletonLoading from "./Table/SkeletonLoading";
import { useRouter } from "next/router";

const AppContent = () => {
  const router = useRouter();
  const { tab } = router.query;

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [newest, setNewest] = useState<boolean>(
    tab === "newest" ? true : false
  );
  const [timeFrame, setTimeFrame] = useState<TimeFrameTypes>("ALL");
  const [sortBy, setSortBy] = useState<SortByType>("SCORE");
  const [hasLoadMore, setHasLoadMore] = useState(true);
  const observer: React.MutableRefObject<any> = useRef();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<string>("");
  const [listItems, setListItem] = useState<TwitterItem[]>([]);

  const apiTwitter = new ApiTwitter();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize, sortBy, timeFrame, newest]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setTimeout(() => console.clear(), 500);
      const data = await apiTwitter.getListTwitter({
        pageNumber,
        pageSize,
        sortBy,
        timeFrame,
        newest,
      });
      if (data == undefined || data == null || data.items == undefined || data.items == null) return;
      if (pageNumber === 1) setListItem(data.items);
      else setListItem((items) => items.concat(data.items));
      setTotalCount(data.totalCount.toString());
      setIsLoading(false);
      if (data.items.length === 0) setHasLoadMore(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const _handleSelectTab = (tabIndex: number) => {
    switch (tabIndex) {
      case 0:
        setPageNumber(1);
        setNewest(false);
        return;
      case 1:
        setPageNumber(1);
        setNewest(true);
        return;
      default:
        setPageNumber(1);
        setNewest(false);
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
              onChangeSelect={(month) => setTimeFrame(month.value ?? "ALL")}
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
          <TableContent initListRows={listItems ?? []} />

          {isLoading ? (
            <SkeletonLoading numberOfRow={pageNumber === 1 ? 10 : 2} />
          ) : null}
          {!isLoading ? (
            <div className="h-7 w-full bg-white" ref={triggerElement}></div>
          ) : null}         
        </div>
      </div>
    </div>
  );
};

export default AppContent;
function setPage(arg0: (page: any) => any) {
  throw new Error("Function not implemented.");
}

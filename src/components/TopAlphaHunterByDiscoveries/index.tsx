import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import MonthSelect from "../App/MonthSelect";
import { TimeFrameTypes } from "@/api-client/types/TwitterType";
import SelectCustom, { OptionType } from "../common/Select";
import TableTopAlphaHunterByDiscoveries from "./Table";
import { useQuery } from "react-query";
import { apiTwitter } from "@/api-client";
import { AuthContext } from "@/contexts/useAuthContext";
import Spinner from "../Spinner";
import { UserPayType } from "@/api-client/types/AuthType";
import { TopAlphaItem } from "@/types/topAlpha";
import UpgradeProButton from "../UpgradeProButton";

const TopAlphaHunterByDiscoveries: FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrameTypes>("30D");
  const [timeLabel, setTimeLabel] = useState<string>("30D");

  const [followers, setFollowers] = useState<TimeFrameTypes | any>("500");
  const [followersLabel, setFollowersLabel] = useState<string>("500 followers");

  const [chainSelected, setChainSelected] = useState<OptionType>({
    code: "",
    name: "Chain - All",
  });
  const [categorySelected, setCategorySelected] = useState<OptionType>({
    code: "",
    name: "Category - All",
  });
  const [chains, setChains] = useState<Array<OptionType>>([]);
  const [category, setCategory] = useState<Array<OptionType>>([]);
  const { authState, accountExtendDetail } = useContext(AuthContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasLoadMore, setHasLoadMore] = useState(true);
  const [topAlphaListState, setTopAlphaListState] = useState<TopAlphaItem[]>(
    []
  );

  const topAlphaQuery = useQuery({
    queryKey: [
      "topAlphaHunterByDiscoveries",
      pageNumber,
      timeFrame,
      authState?.access_token,
      followers,
    ],
    queryFn: () =>
      apiTwitter.getTopByEarlyDiscoveries(
        {
          pageNumber: pageNumber,
          pageSize: 20,
          timeFrame: timeFrame,
          numberOfEarlyDiscoveries: followers,
        },
        authState?.access_token ?? ""
      ),
  });

  const totalCount = topAlphaQuery.data?.totalCount ?? 0;

  useEffect(() => {
    if (!topAlphaQuery.data?.items) return;
    if (
      topAlphaQuery.data?.items.length === 0 &&
      UserPayType.PREMIUM === accountExtendDetail?.currentPlanKey
    ) {
      setHasLoadMore(false);
      setTopAlphaListState((prev) => [...prev, ...topAlphaQuery.data?.items]);
      return;
    }

    setTopAlphaListState((prev) => [...prev, ...topAlphaQuery.data?.items]);
  }, [topAlphaQuery.data]);

  useEffect(() => {
    setHasLoadMore(true);
    setPageNumber(1);
    setTopAlphaListState(topAlphaQuery.data?.items ?? []);
  }, [timeFrame, followers]);

  const observer: React.MutableRefObject<any> = useRef();

  const setPageLoadMore = () => {
    if (hasLoadMore && !topAlphaQuery.isLoading)
      setPageNumber((page) => page + 1);
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
    <div className="px-6 tooltipBoundary">
      <div className="flex max-lg:flex-col max-lg:items-center justify-between">
        <div>
          <div className="flex items-center gap-1">
            <p>{totalCount ?? "..."} Alpha Hunters tracking in the last </p>

            <MonthSelect
              onChangeSelect={(month) => {
                setTimeFrame((month.value as TimeFrameTypes) ?? "ALL");
                setTimeLabel(month.label ?? "ALL");
              }}
              defaultData={{
                value: timeFrame,
                label: timeLabel,
              }}
              listData={[
                {
                  label: "7d",
                  value: "7D",
                },
                {
                  label: "30d",
                  value: "30D",
                },
                {
                  label: "90d",
                  value: "90D",
                },
                {
                  label: "All",
                  value: "ALL",
                },
              ]}
            />
          </div>
          <div className="flex items-center mt-4 gap-1">
            <p>sorted by # of projects with less than </p>
            <MonthSelect
              onChangeSelect={(month) => {
                setFollowers((month.value as TimeFrameTypes) ?? "500");
                setFollowersLabel(month.label ?? "500 followers");
              }}
              defaultData={{
                value: followers,
                label: followersLabel,
              }}
              listData={[
                {
                  label: "100 followers",
                  value: "100",
                },
                {
                  label: "500 followers",
                  value: "500",
                },
                {
                  label: "1000 followers",
                  value: "1000",
                },
              ]}
            />
            <p className="ml-1">they discovered</p>
          </div>
        </div>
        <div className="flex max-lg:items-center justify-between max-lg:mt-5">
          {/* <div className="mr-3">
            <SelectCustom
              placeholder="Tokens - All"
              initList={chains}
              onChangeSelected={(item: any) => {
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
                setCategorySelected(item);
              }}
              selectedValue={categorySelected}
            />
          </div> */}
        </div>
      </div>

      <div className="mt-6">
        {topAlphaListState.length > 0 && (
          <TableTopAlphaHunterByDiscoveries
            timeFrame={timeFrame}
            topAlphaList={topAlphaListState}
          />
        )}
        {topAlphaQuery.isLoading && (
          <div className="flex justify-center items-center mt-8">
            <Spinner />
          </div>
        )}
        {accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM ? (
          <div className="h-7 w-full" ref={triggerElement}></div>
        ) : null}
      </div>
      <UpgradeProButton />
    </div>
  );
};

export default TopAlphaHunterByDiscoveries;

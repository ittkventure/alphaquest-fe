import { UserPayType } from "@/api-client/types/AuthType";
import { CrownIcon, InfoIcon } from "@/assets/icons";
import { AuthContext } from "@/contexts/useAuthContext";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Header from "../App/Header";
import SelectCustom, { OptionType } from "../common/Select";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Tooltip as ReactTooltip } from "react-tooltip";
import TableContent from "../App/Table/TableContent";
import MonthSelect from "../App/MonthSelect";
import { SortByType, TimeFrameTypes } from "@/api-client/types/TwitterType";
import { initListMonth, initListSort } from "@/utils/list";
import { useQuery } from "react-query";
import Spinner from "../Spinner";
import { useProjectsMention } from "@/hooks/useProjectsMention";
import { AlphaMentionProjectsParams } from "@/api-client/mentioned/projects";
import SkeletonLoading from "../App/Table/SkeletonLoading";
import { fetchFilterBar } from "@/api-client/filter";
import { convertOptionsFilterData } from "@/utils/filter";

type ProjectMentionProps = {
  chainQuery?: string;
  categoryQuery?: string;
};

type SortByMentionProject = "most-mentioned" | "followers"

const sortMentions = [
  {
    label: "# of KOLs mentioned",
    value: "most-mentioned",
  },
  {
    label: "Followers",
    value: "followers",
  }
]

export default function ProjectMention({
  chainQuery,
  categoryQuery,
}: ProjectMentionProps) {
  const router = useRouter();
  const { accountExtendDetail } = useContext(AuthContext);

  const [chainSelected, setChainSelected] = useState<OptionType>({
    code: chainQuery ?? "",
    name: chainQuery ?? "Chain - All",
  });
  const [categorySelected, setCategorySelected] = useState<OptionType>({
    code: categoryQuery ?? "",
    name: categoryQuery ?? "Category - All",
  });
  
  const [timeFrame, setTimeFrame] = useState<TimeFrameTypes>("7D");
  const [sortBy, setSortBy] = useState<SortByMentionProject>("most-mentioned");
  const [sortByLabel, setSortByLabel] = useState<string>("# of KOLs mentioned");
  const [timeLabel, setTimeLabel] = useState<string>("7D");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState(search);

  const { data: chains } = useQuery(
    ["getChainsBar", categorySelected.code, timeFrame, searchText],
    () => fetchFilterBar("CHAIN", categorySelected.code, "CATEGORY", timeFrame, searchText)
  );
  const { data: categories } = useQuery(
    ["getCategoriesBar", chainSelected.code, timeFrame],
    () => fetchFilterBar("CATEGORY", chainSelected.code, "CHAIN", timeFrame, searchText)
  );

  const params = useMemo(() => {
    let newParams: AlphaMentionProjectsParams = {
      searchText,
      pageNumber: 1,
      pageSize: 20,
      timeFrame,
      sortBy,
    };
    if (chainSelected.code) {
      newParams = {
        ...newParams,
        chains: chainSelected.code,
      };
    }
    if (categorySelected.code) {
      newParams = {
        ...newParams,
        categories: categorySelected.code,
      };
    }
    return newParams;
  }, [chainSelected.code, categorySelected.code, searchText, timeFrame, sortBy]);

  const {
    projectsMention,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useProjectsMention(
    params,
    accountExtendDetail?.currentPlanKey === UserPayType.FREE
  );

  // IntersectionObserver to handle Infinite Scroll
  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage]
  );

  const renderUpBtn = () => {
    if (router.pathname === "/watchlist/projects") return null;
    return accountExtendDetail?.currentPlanKey === UserPayType.FREE ||
      !accountExtendDetail?.currentPlanKey ? (
      <div className="fixed w-full h-[300px] bottom-0 left-0 bg-linear-backdrop z-10 pl-64 max-lg:pl-0">
        <div className="w-full h-[300px] flex flex-col justify-center items-center z-10 mt-10">
          <p className="mb-4">Upgrade account for full access</p>

          <button
            // onClick={onClickPaymentTrial}
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

  const renderDes = () => {
    return (
      <div className="flex items-center max-xl:flex-col max-lg:mt-2">
        <div className="flex flex-col justify-start max-lg:w-[90vw]">
          <p>
            {`${Number(
              10
            ).toLocaleString()} projects mentioned during the last`}
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
              listData={initListMonth}
            />
            <div className="flex">
              <p className="mx-2">sorted by</p>
              <MonthSelect
                onChangeSelect={(month) => {
                  setSortBy((month.value as SortByMentionProject) ?? "most-mentioned");
                  const label = "# of KOLs mentioned";
                  setSortByLabel(month.label ?? label);
                }}
                defaultData={{
                  value: sortBy,
                  label: sortByLabel,
                }}
                listData={sortMentions}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full">
          <div className="p-6">
            <Header />
            <div className="h-[1px] bg-white bg-opacity-20 my-4 max-lg:hidden" />
          </div>
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      ) : (
        <div className="w-full relative ">
          {renderUpBtn()}
          <div className="p-6">
            <Header />
            <div className="h-[1px] bg-white bg-opacity-20 my-4 max-lg:hidden" />
          </div>
          <div className="px-6 pb-6 ">
            <div className="flex max-lg:flex-col max-lg:items-center justify-between">
              {renderDes()}

              <div className="flex max-lg:flex-col max-lg:gap-4 max-lg:items-center justify-between max-lg:mt-5">
                <div className="flex">
                  <div className="mr-3">
                    <SelectCustom
                      placeholder="Chain - All"
                      initList={convertOptionsFilterData(chains || []) || []}
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
                        router.push(`/projects/most-mentioned/${query}`);
                      }}
                      selectedValue={chainSelected}
                    />
                  </div>
                  <div>
                    <SelectCustom
                      placeholder="Category - All"
                      initList={
                        convertOptionsFilterData(categories || []) || []
                      }
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

                        router.push(`/projects/most-mentioned/${query}`);
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
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSearchText(search);
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-7 max-lg:mt-9">
              <div className="bg-[#1F2536] h-10 px-14 flex justify-between items-center font-normal text-sm text-white mb-6 max-lg:hidden">
                <span>Project</span>
                <div className="flex items-center gap-1">
                  <span>New KOLs mentioned</span>

                  <div
                    data-tooltip-id="info-tooltip-kol"
                    className="cursor-pointer"
                  >
                    <Image src={InfoIcon} width={20} height={20} alt="icon" />
                  </div>
                </div>
              </div>
              <TableContent
                initListRows={projectsMention?.items ?? []}
                isAnimation={false}
                onRefreshTable={() => {
                  refetch();
                }}
                lastElement={lastElementRef}
                isMentioned
              />
              {isFetchingNextPage ? <SkeletonLoading numberOfRow={3} /> : null}
              {/* {errorMsg ? (
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
          ) : null} */}
            </div>
          </div>
          <ReactTooltip
            id="info-tooltip-kol"
            className="!bg-[#282E44] max-w-[300px] text-white text-[12px] p-4 !rounded-none"
            place="bottom"
            content={`Number of new Alpha Hunters who mentioned ${
              timeLabel === "ALL" ? "all" : `last ${timeLabel}`
            }. Click on the project to find out which Alpha Hunters are mentioning it.`}
          />
        </div>
      )}
    </>
  );
}

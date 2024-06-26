import { useAllTweets } from "@/api-client/mentioned/projects/useAllTweets";
import SkeletonLoading from "@/components/App/Table/SkeletonLoading";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import TweetPage from "../../components/ProjectDetail/Mention/TweetPage";
import MonthSelect from "@/components/App/MonthSelect";

const sortMentions = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "30 days",
    value: "30D",
  },
  {
    label: "7 days",
    value: "7D",
  },
];

export default function TweetMention() {
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState(search);
  const [timeFrame, setTimeFrame] = useState("30D");
  const [timeLabel, setTimeLabel] = useState("30 days");

  const params = useMemo(() => {
    return {
      searchText,
      pageNumber: 1,
      pageSize: 10,
      timeFrame,
    };
  }, [searchText, timeFrame]);
  const {
    tweetsMention,
    isLoading,
    hasNextPage,
    fetchNextPage,
    total,
    isFetching,
    status,
    error,
    isFetchingNextPage,
  } = useAllTweets(params);

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <div className="flex gap-1">
          <p>{`${total ?? 0} Tweets mentioned last`}</p>
          <MonthSelect
            onChangeSelect={(month) => {
              setTimeFrame(month.value ?? "30D");
              setTimeLabel(month.label ?? "30 days");
            }}
            defaultData={{
              value: timeFrame,
              label: timeLabel,
            }}
            listData={sortMentions}
          />
        </div>
        <div className="relative max-lg:mr-2 max-lg:hidden">
          <MagnifyingGlassIcon className="w-5 h-5 max-lg:w-4 max-lg:h-4 text-white absolute max-lg:top-[6px] top-[11px] left-[5px]" />

          <input
            className="w-52 max-lg:w-32 max-lg:py-1 bg-secondary-600 py-2 pl-8 max-lg:pl-7 max-lg:text-sm "
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
      {status === "loading" ? (
        <div className="flex justify-center">
          <SkeletonLoading numberOfRow={6} />
        </div>
      ) : status === "error" ? (
        <div>Error</div>
      ) : (
        <div className="flex gap-2 justify-center mt-6">
          <div className="flex flex-col gap-2 flex-1">
            {tweetsMention?.items
              ?.filter((d, index) => index % 2 === 0)
              ?.map((tweet) => (
                <div key={tweet.tweetId}>
                  <TweetPage tweetContent={tweet} />
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-2 flex-1">
            {tweetsMention?.items
              ?.filter((d, index) => index % 2 === 1)
              .map((tweet) => (
                <div key={tweet.tweetId}>
                  <TweetPage tweetContent={tweet} />
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-center p-4">
        <button
          className="p-2 min-w-32 border-[2px] flex justify-center items-center bg-slate-800 hover:text-success-500 hover:border-success-500 duration-100 transition-all"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
}

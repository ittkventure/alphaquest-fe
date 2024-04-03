import { useTweetsMention } from "@/api-client/mentioned/projects/useTweetMetion";
import { UserPayType } from "@/api-client/types/AuthType";
import SkeletonLoading from "@/components/App/Table/SkeletonLoading";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/contexts/useAuthContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { Tweet } from "react-twitter-widgets";

type TweetMentionProps = {
  username: string;
  name: string | undefined;
};

export default function TweetMention({ username, name }: TweetMentionProps) {
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState(search);
  const { accountExtendDetail } = useContext(AuthContext);

  const params = useMemo(() => {
    return {
      searchText,
      pageNumber: 1,
      pageSize: 6,
      timeFrame: "30D",
    };
  }, [searchText]);
  const {
    tweetsMention,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useTweetsMention(
    username,
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

  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <p>{`50 Tweets from ${name} Projects`}</p>
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
      {isLoading ? (
        <div className="w-full">
          <div className="flex justify-center">
            <SkeletonLoading numberOfRow={10} />
          </div>
        </div>
      ) : (
        <>
          {tweetsMention && tweetsMention?.items?.length ? (
            <div className="flex justify-center flex-col gap-3 items-center">
              {tweetsMention?.items?.map((tweet, index) => (
                <div
                  key={tweet.tweetId}
                  ref={
                    tweetsMention?.items?.length === index + 1
                      ? lastElementRef
                      : null
                  }
                >
                  <Tweet tweetId={tweet?.tweetId} />
                </div>
              ))}
            </div>
          ) : (
            <div className="font-medium text-base flex justify-center h-48 w-full">
              Not found data
            </div>
          )}
        </>
      )}
    </div>
  );
}

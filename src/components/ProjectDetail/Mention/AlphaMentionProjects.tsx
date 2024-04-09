import Spinner from "@/components/Spinner";
import AvatarArea from "./AvatarArea";
import MentionTimeline from "./MentionTimeline";
import { AlphaMentionProjectsParams } from "@/api-client/mentioned/projects";
import { useAlphaMentionProjects } from "@/api-client/mentioned/projects/useTableMention";
import { useCallback, useRef } from "react";

type Props = {
  username: string;
};

export default function AlphaMentionProjects({ username }: Props) {
  const params: AlphaMentionProjectsParams = {
    timeFrame: "30D",
    pageNumber: 1,
    pageSize: 10,
  };
  const {
    alphaMentionProjects,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useAlphaMentionProjects(username, params, false);

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
    <div className="w-full overflow-auto mt-6">
      <div className="min-w-[1260px] ">
        <div className="flex flex-row bg-[#1F2536] py-3">
          <div className={`w-[293px] pl-11 ${"mr-24"}`}>Account</div>
          <div className="w-[127px]">Followers</div>

          <div className="w-[214px]"># of mentions</div>

          <div className="w-[521px] ml-3">Mentioned tweets</div>
        </div>

        {isLoading ? (
          <div className="w-full h-80 flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            {alphaMentionProjects?.items?.map((alpha, index) => (
              <div
                className="flex flex-row items-center py-3"
                key={alpha.userId}
                ref={
                  alphaMentionProjects?.items?.length === index + 1
                    ? lastElementRef
                    : null
                }
              >
                <div className="w-[333px] pl-[14px] pr-6 mr-14">
                  <AvatarArea item={alpha} />
                </div>
                <div className="w-[127px] flex items-start">
                  <p>{alpha.followersCount}</p>
                </div>
                <div className="w-[214px]">
                  <p>{alpha.mentionsCount}</p>
                </div>
                <div className="w-[521px] ml-3">
                  <MentionTimeline tweetTimeline={alpha.tweetTimeline} />
                </div>
              </div>
            ))}
          </>
        )}
        {isFetchingNextPage && (
          <div className="w-full h-8 flex justify-center items-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

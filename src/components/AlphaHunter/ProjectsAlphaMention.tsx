import Spinner from "@/components/Spinner";
import { AlphaMentionProjectsParams } from "@/api-client/mentioned/projects";
import { useQuery } from "react-query";
import { useMemo, useState } from "react";
import Pagination from "rc-pagination/lib/Pagination";
import { getMentionProjectsFromAlpha } from "@/api-client/mentioned/alphaHunter";
import AvatarArea from "../ProjectDetail/Mention/AvatarArea";
import MentionTimeline from "../ProjectDetail/Mention/MentionTimeline";

type Props = {
  username: string;
};

export default function AlphaMentionProjects({ username }: Props) {
  const [pageNumber, setPageNumber] = useState(1);
  const params: AlphaMentionProjectsParams = useMemo(() => {
    return {
      timeFrame: "30D",
      pageNumber: pageNumber,
      pageSize: 10,
    };
  }, [pageNumber]);

  const { isLoading, data: alphaMentionProjects } = useQuery(
    ["getMentionProjectsFromAlpha", username, params],
    () => getMentionProjectsFromAlpha(username, params)
  );

  return (
    <div className="w-full overflow-auto mt-6">
      <h3 className="mb-6">
        {alphaMentionProjects?.data?.totalCount ?? 0} projects mentioned last 30
        days
      </h3>
      <div className="min-w-[1260px] ">
        <div className="flex flex-row bg-[#1F2536] py-3">
          <div className="w-[293px] pl-11 2xl:mr-24 mr-12">Account</div>
          <div className="w-[127px]">Followers</div>

          <div className="2xl:w-[214px] w-28"># of mentions</div>

          <div className="w-[521px] ml-3">Mentioned tweets</div>
        </div>

        {isLoading ? (
          <div className="w-full h-80 flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="flex flex-row items-center py-3">
              <div className="w-[333px] pl-[14px] pr-6 2xl:mr-14 mr-4" />
              <div className="w-[127px] flex items-start" />
              <div className="2xl:w-[214px] w-28">
                <p>{alphaMentionProjects?.data?.totalMentionCount || 0}</p>
              </div>
              <div className="w-[521px] ml-3">
                <MentionTimeline
                  tweetTimeline={
                    alphaMentionProjects?.data?.summaryTweetTimeline
                  }
                />
              </div>
            </div>
            {alphaMentionProjects?.data?.items?.map((alpha: any) => (
              <div
                className="flex flex-row items-center py-3"
                key={alpha.userId}
              >
                <div className="w-[333px] pl-[14px] pr-6 2xl:mr-14 mr-4">
                  <AvatarArea item={alpha} />
                </div>
                <div className="w-[127px] flex items-start">
                  <p>{alpha.followersCount}</p>
                </div>
                <div className="2xl:w-[214px] w-28">
                  <p>{alpha.mentionsCount}</p>
                </div>
                <div className="w-[521px] ml-3">
                  <MentionTimeline tweetTimeline={alpha.tweetTimeline} />
                </div>
              </div>
            ))}
            {alphaMentionProjects?.data?.totalCount > 0 && (
              <div className="flex justify-center items-center p-4">
                <Pagination
                  total={alphaMentionProjects?.data?.totalCount}
                  pageSize={10}
                  onChange={(_page) => setPageNumber(_page)}
                  current={pageNumber}
                  prevIcon={<></>}
                  nextIcon={<></>}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

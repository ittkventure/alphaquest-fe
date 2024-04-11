import Spinner from "@/components/Spinner";
import AvatarArea from "./AvatarArea";
import MentionTimeline from "./MentionTimeline";
import {
  AlphaMentionProjectsParams,
  getAlphaMentionProjects,
} from "@/api-client/mentioned/projects";
import { useQuery } from "react-query";
import { useMemo, useState } from "react";
import Pagination from "rc-pagination/lib/Pagination";

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
    ["getAlphaMentionProjects", username, params],
    () => getAlphaMentionProjects(username, params)
  );

  return (
    <div className="w-full overflow-auto mt-6">
      <div className="min-w-[1260px] ">
        <div className="flex flex-row bg-[#1F2536] py-3">
          <div className={`w-[293px] pl-11 ${"2xl:mr-24 mr-12"}`}>Account</div>
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
          </>
        )}
      </div>
    </div>
  );
}

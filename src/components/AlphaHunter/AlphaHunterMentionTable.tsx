import { BaseResponse } from "@/api-client/types/BaseResponse";
import { AlphaMentionProject } from "@/types/mention";
import AvatarArea from "../ProjectDetail/Mention/AvatarArea";
import MentionTimeline from "../ProjectDetail/Mention/MentionTimeline";

type Props = {
  timeLabel: string;
  alphaMentionProjects: BaseResponse<AlphaMentionProject> | undefined;
  lastElement?: (node: HTMLDivElement) => void;
};

export default function AlphaHunterMentionTable({
  timeLabel,
  alphaMentionProjects,
  lastElement,
}: Props) {
  return (
    <div className="w-full overflow-auto mt-6">
      <div className="min-w-[1260px] ">
        <div className="flex flex-row bg-[#1F2536] py-3">
          <div className={`w-[293px] pl-11 ${"mr-24"}`}>Account</div>
          <div className="w-[127px]">Followers</div>

          <div className="w-[214px]">
            # of projects mentioned last {timeLabel}
          </div>

          <div className="w-[521px] ml-3">Projects mentioned</div>
        </div>

        {alphaMentionProjects?.items?.map((alpha, index) => (
          <div
            className="flex flex-row items-center py-3"
            key={alpha.userId}
            ref={
              alphaMentionProjects?.items?.length === index + 1
                ? lastElement
                : null
            }
          >
            <div className="w-[333px] pl-[14px] pr-6 mr-14">
              <AvatarArea item={alpha} isMentioned />
            </div>
            <div className="w-[127px] flex items-start">
              <p>{alpha.followersCount}</p>
            </div>
            <div className="w-[214px]">
              <p>{alpha.mentionsCount}</p>
            </div>
            <div className="w-[521px] ml-3">
              <MentionTimeline tweetTimeline={alpha.tweetTimeline} isAlphaHunter />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

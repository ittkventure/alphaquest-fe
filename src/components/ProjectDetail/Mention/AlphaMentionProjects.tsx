import { alphaMentionProjects } from "@/mocks";
import AvatarArea from "./AvatarArea";
import MentionTimeline from "./MentionTimeline";

export default function AlphaMentionProjects() {
  return (
    <div className="w-full overflow-auto">
      <div className="min-w-[1260px] ">
        <div className="flex flex-row bg-[#1F2536] py-3">
          <div className={`w-[293px] pl-11 ${"mr-24"}`}>Account</div>
          <div className="w-[127px]">Followers</div>

          <div className="w-[214px]"># of mentions</div>

          <div className="w-[521px] ml-3">Mentioned tweets</div>
        </div>

        {alphaMentionProjects?.items?.map((alpha) => (
          <div className="flex flex-row items-center py-3 ">
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
              <MentionTimeline />
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
}

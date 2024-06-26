import useResponsive from "@/hooks/useWindowDimensions";
import Popup from "reactjs-popup";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "@/contexts/useAuthContext";
import { useRouter } from "next/router";

type Props = {
  tweetTimeline: {
    from: string;
    to: string;
    tweetCount: number;
    mentionedProjectTweets: {
      name: string;
      profileImageUrl: string;
      profileUrl: string;
      userId: string;
      username: string;
      tweetUrl: string;
      mentionedAt: string;
    }[];
  }[];
  isProjectDetail?: boolean;
  avatar?: string;
  pjName?: string;
  isAlphaHunter?: boolean;
};

export default function MentionTimeline({
  tweetTimeline,
  isProjectDetail,
  avatar,
  pjName,
  isAlphaHunter,
}: Props) {
  const { isSm, isMd } = useResponsive();
  const router = useRouter();
  const { authState } = useContext(AuthContext);
  return (
    <div className="relative flex items-center">
      <div className="absolute w-full pr-10">
        <div className="w-full border-[0.5px] border-dashed border-[#2D354D] " />
      </div>
      <div className="flex gap-3 justify-center items-center w-full pr-10">
        {tweetTimeline?.slice(0, 10).map((tweet) => {
          const id = uuidv4();
          if (tweet.tweetCount === 0)
            return (
              <div className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-full" />
            );
          return (
            <>
              <Popup
                trigger={
                  <div className="relative cursor-pointer">
                    <Image
                      src={
                        !isProjectDetail
                          ? tweet?.mentionedProjectTweets[0]?.profileImageUrl
                          : avatar || ""
                      }
                      alt=""
                      width={32}
                      height={32}
                      className="w-8 h-8 min-w-[32px] min-h-[32px] bg-white rounded-full"
                    />
                    {tweet.tweetCount > 1 && (
                      <div className="absolute -top-1 -right-[2px] w-4 h-4 rounded-full bg-[#E25148] flex justify-center items-center">
                        <p className="text-[10px] font-workSansMedium">
                          +{tweet.tweetCount - 1}
                        </p>
                      </div>
                    )}
                  </div>
                }
                key={`tweet-mention-${id}`}
                arrowStyle={{ color: "#282E44" }}
                on={["hover", "focus"]}
                // keepTooltipInside=".tooltipBoundary"
                arrow={isMd || isSm ? false : true}
              >
                <div className="bg-[#282E44] z-[9999] pt-4 pb-2 max-h-[377px] max-lg:w-full max-lg:fixed max-lg:bottom-0 max-lg:right-0 overflow-y-scroll overflow-x-hidden">
                  {tweet.mentionedProjectTweets?.map((url) => {
                    if (url.username === "UNKNOWN")
                      return (
                        <div className="flex items-center gap-2 mb-3 bg-[#282E44] px-6">
                          <p>Metion</p>
                          <img
                            src={url.profileImageUrl}
                            alt=""
                            className="w-8 h-8 min-w-[32px] min-h-[32px] bg-white rounded-full"
                          />
                          <p className="font-workSansMedium">
                            <span
                              onClick={() => {
                                if (authState) {
                                  router.push("/pricing?action=open");
                                } else {
                                  router.push("/sign-up");
                                }
                              }}
                              className="italic underline cursor-pointer"
                            >
                              Upgrade to Access
                            </span>{" "}
                            on{" "}
                            {moment(url.mentionedAt).utc().format("MM/DD/YYYY")}
                          </p>
                        </div>
                      );

                    return (
                      <div className="flex items-center gap-2 mb-3 bg-[#282E44] px-6">
                        {isAlphaHunter ? (
                          <>
                            <p>mentioned</p>
                            <Link
                              key={url.userId}
                              href={`/project/${url.username}?mentioned`}
                              target={
                                url.username === "UNKNOWN" ? "_self" : "_blank"
                              }
                            >
                              <img
                                src={url.profileImageUrl}
                                alt=""
                                className="w-8 h-8 min-w-[32px] min-h-[32px] bg-white rounded-full"
                              />
                            </Link>
                            <p className="">
                              {url?.name} on{" "}
                              <Link
                                href={url?.tweetUrl}
                                target="_blank"
                                className="underline"
                              >
                                {moment(url?.mentionedAt)
                                  .utc()
                                  .format("MM/DD/YYYY")}
                              </Link>
                            </p>
                          </>
                        ) : (
                          <>
                            <Link
                              key={url.userId}
                              href={`/project/${url.username}?mentioned`}
                              target={
                                url.username === "UNKNOWN" ? "_self" : "_blank"
                              }
                            >
                              <img
                                src={url.profileImageUrl}
                                alt=""
                                className="w-8 h-8 min-w-[32px] min-h-[32px] bg-white rounded-full"
                              />
                            </Link>
                            <p>{url?.name} mentioned</p>
                            <p className="">
                              this project on{" "}
                              <Link
                                href={url?.tweetUrl}
                                target="_blank"
                                className="underline"
                              >
                                {moment(url?.mentionedAt)
                                  .utc()
                                  .format("MM/DD/YYYY")}
                              </Link>
                            </p>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Popup>
            </>
          );
        })}
      </div>
    </div>
  );
}

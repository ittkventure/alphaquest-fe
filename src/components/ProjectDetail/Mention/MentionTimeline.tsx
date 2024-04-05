import useResponsive from "@/hooks/useWindowDimensions";
import Popup from "reactjs-popup";
import { v4 as uuidv4 } from "uuid";
import { TwitterBlueIcon } from "@/assets/icons";
import Link from "next/link";
import Image from "next/image";

type Props = {
  tweetTimeline: {
    from: string;
    to: string;
    tweetCount: number;
    tweetUrls: string[];
  }[];
};

export default function MentionTimeline({ tweetTimeline }: Props) {
  const { isSm, isMd } = useResponsive();
  return (
    <div className="relative flex items-center">
      <div className="absolute w-full pr-10">
        <div className="w-full border-[0.5px] border-dashed border-[#2D354D] " />
      </div>
      <div className="flex gap-3 justify-center items-center w-full pr-10">
        {tweetTimeline?.slice(0,10).map((tweet) => {
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
                      src={TwitterBlueIcon}
                      alt=""
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
                <div className="bg-[#282E44] pt-4 pb-2 max-h-[377px] max-lg:w-full max-lg:fixed max-lg:bottom-0 max-lg:right-0 overflow-y-scroll overflow-x-hidden">
                  {tweet.tweetUrls.map((url) => {
                    return (
                      <Link
                        key={url}
                        href={`${url}`}
                        target="_blank"
                      >
                        <div className="flex items-center gap-2 mb-3 bg-[#282E44] px-6">
                          <p>Mention link: </p>
                          <p className="font-workSansMedium text-blue-500 underline">
                            {url}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </Popup>
            </>
          )
        })}
      </div>
    </div>
  );
}

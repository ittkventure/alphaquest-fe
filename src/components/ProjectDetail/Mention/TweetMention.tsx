import { tweetsMention } from "@/mocks";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Tweet } from "react-twitter-widgets";

export default function TweetMention() {
  return (
    <>
      <div className="flex justify-between">
        <p>{`50 Tweets from Metntioning Projects`}</p>
        <div className="relative max-lg:mr-2 max-lg:hidden">
          <MagnifyingGlassIcon className="w-5 h-5 max-lg:w-4 max-lg:h-4 text-white absolute max-lg:top-[6px] top-[11px] left-[5px]" />

          <input
            className="w-52 max-lg:w-32 max-lg:py-1 bg-secondary-600 py-2 pl-8 max-lg:pl-7 max-lg:text-sm "
            placeholder="Search"
            value={""}
            onChange={(e) => {
              console.log(e);
            }}
          />
        </div>
      </div>
      <div className="flex justify-center flex-col gap-3 items-center">
        {tweetsMention?.items?.map((tweet) => <Tweet tweetId={tweet?.tweetId} />)}
      </div>
    </>
  );
}

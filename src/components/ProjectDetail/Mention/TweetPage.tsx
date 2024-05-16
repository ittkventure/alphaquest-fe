import { Tweet } from "@/types/mention";
import Image from "next/image";
import { XIcon } from "@/assets/icons";
import moment from "moment";
import { Retweet } from "@/assets/images";

type Props = {
  tweetContent: Tweet;
};

const convertInnerHTML = (data: Tweet) => {
  let innerHTML = data?.fullText;
  data?.objects?.forEach((object) => {
    if (
      object.type === "mention" ||
      object.type === "symbol" ||
      object.type === "url" ||
      object.type === "tag"
    ) {
      innerHTML = innerHTML.replaceAll(
        `[[${object.id}]]`,
        `<a href="${object.url}" target="_blank" class="text-[#1D9BF0] hover:underline">${object.displayText}</a>`
      );
    }
    if (
      object.type === "video" ||
      object.type === "photo" ||
      object.type === "animated_gif"
    ) {
      innerHTML = innerHTML.replaceAll(
        `[[${object.id}]]`,
        `<img src="${object.url}" class="rounded-xl" />`
      );
    }
  });
  innerHTML = innerHTML.replaceAll(`\n`, `<br />`);
  return innerHTML;
};

export default function TweetPage({ tweetContent }: Props) {
  const isRetweet = tweetContent?.fullText?.substring(0, 2) === "RT";
  const repostedOrReply =
    tweetContent?.hasOwnProperty("repostedOrReplyTweet") &&
    tweetContent?.repostedOrReplyTweet != null;
  const isReposted = isRetweet && repostedOrReply;
  return (
    <div className="bg-[#19232E] p-4 rounded-xl">
      {isReposted && (
        <div className="flex gap-2 ml-3 mb-2">
          <Image src={Retweet} width={16} height={14} alt="retweet" />
          <a
            className="font-medium text-xs hover:underline"
            href={tweetContent?.owner?.profileUrl}
            target="_blank"
          >
            {tweetContent?.owner?.name} reposted
          </a>
        </div>
      )}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img
            src={
              isReposted
                ? tweetContent?.repostedOrReplyTweet?.owner?.profileImageUrl
                : tweetContent?.owner?.profileImageUrl
            }
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col gap-[2px]">
            <a
              className="font-semibold"
              href={
                isReposted
                  ? tweetContent?.repostedOrReplyTweet?.owner?.profileUrl
                  : tweetContent?.owner?.profileUrl
              }
              target="_blank"
            >
              {isReposted
                ? tweetContent?.repostedOrReplyTweet?.owner?.name
                : tweetContent?.owner?.name}
            </a>
            <span className="text-[#8B98A5]">
              @
              {isReposted
                ? tweetContent?.repostedOrReplyTweet?.owner?.username
                : tweetContent?.owner?.username}
            </span>
          </div>
        </div>
        <a href={tweetContent?.tweetUrl} target="_blank">
          <Image src={XIcon} width={24} height={24} alt="x-icon" />
        </a>
      </div>
      {isReposted ? (
        <div
          className="mt-2 break-all"
          dangerouslySetInnerHTML={{
            __html: convertInnerHTML(tweetContent?.repostedOrReplyTweet),
          }}
        />
      ) : (
        <div
          className="mt-2 break-all"
          dangerouslySetInnerHTML={{ __html: convertInnerHTML(tweetContent) }}
        />
      )}

      <div className="mt-2 text-[#8B98A5]">
        {moment(
          isReposted
            ? tweetContent?.repostedOrReplyTweet?.createdAt
            : tweetContent?.createdAt
        )
          .utc()
          .format("h:mm A · MMM DD, YYYY")}
      </div>
    </div>
  );
}

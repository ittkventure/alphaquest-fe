import SkeletonLoading from "@/components/App/Table/SkeletonLoading";
import { Tweet } from "@/types/mention";
import Image from "next/image";
import { XIcon } from "@/assets/icons";
import moment from "moment";

type Props = {
  tweetContent: Tweet;
};

const convertInnerHTML = (data: Tweet) => {
  let innerHTML = data?.fullText;
  data?.objects?.forEach((object) => {
    if (
      object.type === "mention" ||
      object.type === "symbol" ||
      object.type === "url"
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
  return (
    <div className="bg-[#19232E] p-4 rounded-xl">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img
            src={tweetContent?.owner?.profileImageUrl}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col gap-[2px]">
            <a
              className="font-semibold"
              href={tweetContent?.owner?.profileUrl}
              target="_blank"
            >
              {tweetContent?.owner?.name}
            </a>
            <span className="text-[#8B98A5]">
              @{tweetContent?.owner?.username}
            </span>
          </div>
        </div>
        <a href={tweetContent?.tweetUrl} target="_blank">
          <Image src={XIcon} width={24} height={24} alt="x-icon" />
        </a>
      </div>
      <div
        className="mt-2"
        dangerouslySetInnerHTML={{ __html: convertInnerHTML(tweetContent) }}
      />
      <div className="mt-2 text-[#8B98A5]">
        {moment(tweetContent?.createdAt).utc().format("h:mm A · MMM DD, YYYY")}
      </div>
    </div>
  );
}

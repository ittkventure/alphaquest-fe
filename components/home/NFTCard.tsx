import { TypeLink } from "@/types/dashboard";
import Image from "next/image";
import ImageWithFallback from "../layouts/ImageWithFallback";

export default function NFTCard({
  name,
  description,
  profileImageUrl,
  chain,
  category,
  urls,
}: Dashboard) {
  const urlTele = urls?.find((url) => url.type === TypeLink.TELEGRAM);
  const urlWeb = urls?.find((url) => url.type === TypeLink.WEBSITE);
  const urlDiscord = urls?.find((url) => url.type === TypeLink.DISCORD);
  const urlLinkTree = urls?.find((url) => url.type === TypeLink.LINKTREE);
  const urlTwitter = urls?.find((url) => url.type === TypeLink.TWITTER);
  return (
    <div className="min-h-60 bg-card p-6 flex gap-4">
      <div className="w-16 h-16">
        <ImageWithFallback
          src={profileImageUrl}
          alt="dashboard icon"
          width={64}
          height={64}
          className="object-fill max-w-fit h-full rounded-full"
          fallback="/icons/default-coin.svg"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <span>{name}</span>
          <div className="flex gap-2 cursor-pointer">
            {urlTwitter && (
              <a href={urlTwitter.url} target="_blank">
                <Image
                  src="/icons/twitter.svg"
                  alt="tw icon"
                  width={16}
                  height={16}
                />
              </a>
            )}

            {urlLinkTree && (
              <a href={urlLinkTree.url} target="_blank">
                <Image
                  src="/icons/linktree.svg"
                  alt="linktree icon"
                  width={16}
                  height={16}
                />
              </a>
            )}

            {urlTele && (
              <a href={urlTele.url} target="_blank">
                <Image
                  src="/icons/telegram.svg"
                  alt="tele icon"
                  width={16}
                  height={16}
                />
              </a>
            )}

            {urlWeb && (
              <a href={urlWeb.url} target="_blank">
                <Image
                  src="/icons/web.svg"
                  alt="web icon"
                  width={16}
                  height={16}
                />
              </a>
            )}

            {urlDiscord && (
              <a href={urlDiscord.url} target="_blank">
                <Image
                  src="/icons/discord.svg"
                  alt="discord icon"
                  width={16}
                  height={16}
                />
              </a>
            )}
          </div>
        </div>
        <span className="break-all">{description}</span>
        <div className="flex gap-2 text-xs">
          {category?.name && (
            <div className="px-3 py-2 bg-item">{category?.name}</div>
          )}
          {chain?.name && (
            <div className="px-3 py-2 bg-item">{chain?.name}</div>
          )}
        </div>
      </div>
    </div>
  );
}

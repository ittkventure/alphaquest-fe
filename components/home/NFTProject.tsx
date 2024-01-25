import { fetchPageConfig } from "@/apis/blog";
import { getProjectNameByPageConfig } from "@/utils/action";
import { AQ_APP_URL } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";

type NFTProjectProps = {
  code: string;
};

export default async function NFTProject({ code }: NFTProjectProps) {
  const data = await fetchPageConfig(code);

  const generateDiscoverLink = (data: BlogProject) => {
    if (data?.hasRelatedCategory)
      return `${AQ_APP_URL}/projects?category=${data?.category?.refId}`;
    if (data?.hasRelatedChain)
      return `${AQ_APP_URL}/projects?chain=${data?.chain?.refId}`;
    return `${AQ_APP_URL}/projects?category=${data?.category?.refId}&chain=${data?.chain?.refId}`;
  };

  return (
    <div className="flex max-lg:flex-col justify-between mt-8 max-lg:gap-6">
      <div className="flex flex-col lg:gap-8 gap-6">
        <h1 className="font-semibold lg:text-5xl text-2xl">
          {data?.pageTitle}
        </h1>
        <div className="flex flex-col gap-4 text-lg">
          <div className="flex flex-col gap-2">{data?.pageDescription}</div>
          <div>
            For a comprehensive and real-time list, please visit{" "}
            <a
              className="text-main underline cursor-pointer"
              href={`${AQ_APP_URL}`}
              target="_blank"
            >
              the AlphaQuest App
            </a>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute top-0 right-0 z-0 blur-[2px]">
          <Image
            src="/images/nft_elipse.svg"
            alt="NFT elipse"
            width={218}
            height={218}
          />
        </div>
        <div className="relative">
          <div className="mr-16 h-[324px] w-[324px] backdrop-blur-sm bg-gradient-to-l from-main to-btn rounded-full p-[2px] opacity-60">
            <div className="h-80 w-80 rounded-full flex flex-col items-center justify-center gap-6 bg-primary"></div>
          </div>
          <div className="flex flex-col absolute top-16 left-12 w-3/5">
            <div className="text-center gap-2 text-2xl">
              <span>
                Want to find the best {data && getProjectNameByPageConfig(data)}{" "}
                to follow?
              </span>
            </div>
          </div>
          <Link href={data && generateDiscoverLink(data)} target="_blank">
            <div className="py-3 px-6 bg-btn cursor-pointer 2xl:w-[40%] absolute bottom-12 left-[84px]">
              Discover Now
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

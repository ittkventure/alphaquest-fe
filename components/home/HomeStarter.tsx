import { fetchGemCounts } from "@/apis/home";
import { AQ_APP_URL } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";

export default async function HomeStarter() {
  const gemCount = await fetchGemCounts();
  return (
    <div className="border-t flex flex-col items-center lg:pt-20 pt-12 max-lg:px-4 border-item">
      <div className="flex flex-col items-center gap-3 lg:text-4xl text-2xl font-semibold">
        <div>Discover the hottest cryto</div>
        <div className="flex max-lg:flex-col max-lg:items-center lg:gap-1">
          <span className="text-main max-lg:text-4xl">projects</span>
          <span>before they take off</span>
        </div>
      </div>
      <div className="flex flex-col gap-8 mt-8 items-center">
        <span className="text-lg font-normal text-center">
          Be the first to uncover the next big thing in crypto with our powerful
          crypto research tool
        </span>
        <div className="flex items-center z-50">
          <Link href={`${AQ_APP_URL}/sign-up`} target="_blank">
            <button className="bg-btn py-4 px-6 z-10">
              Start 7-Day Trial for $9
            </button>
          </Link>
        </div>
        <span className="text-sm font-normal">
          +{gemCount ?? "0"} hidden gems discovered in the last 30 days
        </span>
        <div className="flex justify-center mt-8 relative">
          <Image
            src="/images/home-bg.png"
            width={1360}
            height={1198}
            alt="home-bg"
            className="absolute z-[0] top-[-300px] max-lg:top-[0px] object-fill"
          />
          <Image
            src="/images/home.svg"
            width={952.81}
            height={549}
            alt="home-image"
            className="z-[5] border-2 border-solid border-[#393F52]"
          />
        </div>
      </div>
    </div>
  );
}

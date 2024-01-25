import { AQ_APP_URL } from "@/util/data";
import Image from "next/image";
import Link from "next/link";

export default function FindTrending() {
  return (
    <div className="relative">
      <div className="absolute top-[-3.5rem] lg:right-[-2rem] right-[-1rem] z-0">
        <Image
          src="/images/nft_elipse.svg"
          alt="NFT elipse"
          width={198}
          height={198}
        />
      </div>
      <div className="px-10 pb-10 2xl:pt-40 pt-36 lg:h-[516px] h-[336px] max-lg:pt-6 custom-card-sub-border-linear border-2 backdrop-blur-sm">
        <div className="flex flex-col lg:gap-8 gap-6">
          <div className="lg:text-3xl text-2xl lg:leading-10 leading-8 font-semibold">
            <span>
              Find Trending Narratives and Projects before they take off
            </span>
          </div>
          <div className="leading-6 font-normal">
            <span>
              Be the first to uncover the next big thing in crypto with our
              powerful crypto research tool
            </span>
          </div>
          <Link href={`${AQ_APP_URL}/projects`} target="_blank">
            <div className="py-3 px-6 bg-btn cursor-pointer w-40">
              Discover Now
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

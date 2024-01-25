import Image from "next/image";
import Link from "next/link";
import { fetchNarratives } from "@/apis/home";
import Chart from "./Chart";
import { AQ_APP_URL } from "@/utils/data";

export default async function NarrativesChart() {
  const data = await fetchNarratives();

  const formatNumber = (number: number) => {
    return Math.round(number);
  };

  return data?.items?.map((item: any, index: number) => {
    const listData =
      item?.chart?.timelineData.map((value: any) => {
        return {
          followerCount: value.values[0]?.extractedValue,
          name: value.date,
        };
      }) ?? [];

    if (!item)
      return (
        <div className="w-full h-fit relative bg-[#1B202F]">
          <Image
            src={"/images/placeholder.png"}
            width={334}
            height={200}
            alt="chart"
            className="w-full h-fit object-cover"
          />
          <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center">
            <div className="w-full flex justify-center mb-4 gap-3">
              <Image
                src={"/icons/chess-king-icon-h.svg"}
                alt="icon"
                width={17}
                height={13}
              />
              <p>Pro Members only</p>
            </div>
            <Link href={`${AQ_APP_URL}/sign-up`} target="_blank">
              <button className="px-3 py-2 bg-btn font-workSansRegular text-[1rem] flex justify-center items-center max-lg:hidden">
                Try AlphaQuest Pro
              </button>
            </Link>
          </div>
        </div>
      );

    return (
      <div className="w-full p-4 min-h-fit bg-[#1B202F]" key={item?.keyword}>
        <Link
          href={`${AQ_APP_URL}/narratives/${item?.keyword}`}
          target="_blank"
        >
          <div className="w-full flex justify-between mb-4 cursor-pointer">
            <p className="font-semibold text-lg">{item?.displayName}</p>

            <div className="flex items-center justify-center">
              <div className="flex flex-col items-end">
                <p
                  className={`font-semibold text-xl text-main ${
                    item?.growthPercent < 0 ? "text-btn" : ""
                  }`}
                >
                  {item?.growthPercent > 0
                    ? `+${formatNumber(item?.growthPercent ?? 0)}%`
                    : `${formatNumber(item?.growthPercent ?? 0)}%`}
                </p>
                <p className="text-[#A1A1AA] text-sm">
                  {item?.growthPercent > 0 ? "Growth" : "Down"}
                </p>
              </div>
            </div>
          </div>
        </Link>
        <div className="flex flex-col-reverse pb-2">
          <Link
            href={`${AQ_APP_URL}/narratives/${item?.keyword}`}
            target="_blank"
          >
            <div className="cursor-pointer mt-4">
              <p className="line-clamp-2">{item?.description}</p>
            </div>
          </Link>
          <Chart listData={listData} item={item} />
        </div>
      </div>
    );
  });
}

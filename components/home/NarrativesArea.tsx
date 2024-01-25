import Link from "next/link";
import NarrativesChart from "./NarrativesChart";
import { AQ_APP_URL } from "@/utils/data";

export default function NarrativesArea() {
  return (
    <>
      <div className="flex flex-wrap justify-center lg:mt-32 mt-16">
        <div className="grid grid-cols-3 gap-6 lg:px-12 2xl:px-[150px] max-lg:px-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-w-[1500px]">
          <NarrativesChart />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Link href={`${AQ_APP_URL}/narratives`} target="_blank">
          <button className="px-6 py-4 bg-btn font-workSansRegular text-[1.125rem]">
            Discover now
          </button>
        </Link>
      </div>
    </>
  );
}

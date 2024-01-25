import { listDiscoverProjects } from "@/utils/data/discovers";
import DiscoverProjectItem from "./DiscoverProjectItem";
import Link from "next/link";
import { AQ_APP_URL } from "@/utils/data";

export default function DiscoverArea() {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center mt-16 w-full">
        <div className="flex flex-wrap justify-center max-w-[1500px]">
          {listDiscoverProjects.map((value, index) => {
            return <DiscoverProjectItem key={index} {...value} />;
          })}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Link href={`${AQ_APP_URL}/sign-up`} target="_blank">
          <button className="px-6 py-4 bg-btn font-workSansRegular text-[1.125rem]">
            Start 7-day trial for $9
          </button>
        </Link>
      </div>
    </>
  );
}

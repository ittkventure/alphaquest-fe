import { AQ_APP_URL } from "@/utils/data";
import Link from "next/link";

export default function DiscoverCard() {
  return (
    <div className="bg-card min-h-60 border-2 custom-card-sub-border-linear p-6 flex flex-col justify-between">
      <div className="text-xl leading-8">
        <span>
          Looking for a more comprehensive and real-time list of projects
        </span>
      </div>
      <Link href={`${AQ_APP_URL}/projects`} target="_blank">
        <div className="py-3 px-6 bg-btn cursor-pointer w-40">Discover Now</div>
      </Link>
    </div>
  );
}

import { subscriptions } from "@/utils/data/subscriptions";
import SubscriptionItem from "./SubscriptionItem";
import Link from "next/link";
import { AQ_APP_URL } from "@/utils/data";

export default function SubscriptionArea() {
  return (
    <div className="py-[120px] lg:mt-[120px] max-lg:pb-16 mt-16 linear-bg-gradient-subscription">
      <h3 className="text-3xl font-semibold text-center max-lg:px-4">
        What’s Included In Your Subscription
      </h3>

      <div className="flex flex-wrap justify-center mt-12">
        {subscriptions?.map((sub) => (
          <SubscriptionItem key={sub.name} {...sub} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link href={`${AQ_APP_URL}/sign-up`} target="_blank">
          <button className="px-6 py-4 bg-btn font-workSansRegular text-[1.125rem]">
            Start 7-day trial for $9
          </button>
        </Link>
      </div>
    </div>
  );
}

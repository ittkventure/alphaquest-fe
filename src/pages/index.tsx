import { DocumentTextIcon, QuoteIcon } from "@/assets/icons";
import { ChartImg, HomeImg } from "@/assets/images";
import { DiscoverProjectItem } from "@/components/Home";
import CommentItem from "@/components/Home/CommentItem";
import SubscriptionItem from "@/components/Home/SubscriptionItem";
import HomeLayout from "@/layouts/HomeLayout";
import Image from "next/image";

export default function Home() {
  return (
    <HomeLayout>
      <div className="max-lg:px-5">
        <div className="flex flex-col items-center justify-center text-[2.75rem] font-workSansSemiBold ">
          <p>Discover the hottest crypto</p>
          <p>
            <span className="text-success-500">projects</span> before they take
            off
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <p>
            Be the first to uncover the next big thing in crypto with our
            powerful crypto research tool
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <button className="px-6 py-4 bg-primary-500 font-workSansRegular text-[1.125rem]">
            Start 7-Day Trial for $9
          </button>
        </div>

        <div>
          <p className="text-sm text-center mt-6 font-workSansLight">
            +136 hidden gems discovered in the last 30 days
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <Image src={HomeImg} width={952.81} height={549} alt="home-image" />
        </div>

        <div className="flex justify-center items-center max-lg:flex-col  mt-[102px] w-full px-36 max-lg:px-0 ">
          <div className="flex justify-center max-w-[1350px]">
            <CommentItem />
            <CommentItem />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-32 ">
          <p className="text-[2.75rem] font-workSansSemiBold">
            Find trends & Narratives Before They Happen
          </p>

          <p className="font-thin">
            Be the first to uncover the next big thing in crypto with our
            powerful crypto research tool
          </p>
        </div>

        <div className="flex flex-wrap justify-center mt-32">
          <div className="flex flex-wrap justify-center max-w-[1500px]">
            <div className="m-3">
              <Image src={ChartImg} width={392} height={345} alt="avt" />
            </div>
            <div className="m-3">
              <Image src={ChartImg} width={392} height={345} alt="avt" />
            </div>
            <div className="m-3">
              <Image src={ChartImg} width={392} height={345} alt="avt" />
            </div>
            <div className="m-3">
              <Image src={ChartImg} width={392} height={345} alt="avt" />
            </div>
            <div className="m-3">
              <Image src={ChartImg} width={392} height={345} alt="avt" />
            </div>
            <div className="m-3">
              <Image src={ChartImg} width={392} height={345} alt="avt" />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button className="px-6 py-4 bg-primary-500 font-workSansRegular text-[1.125rem]">
            Start 7-Day Trial for $9
          </button>
        </div>

        <div className="flex flex-col items-center justify-center mt-32">
          <p className="text-[2.75rem] font-workSansSemiBold">
            Discover Promising Projects
          </p>

          <p className="font-thin">
            Find hidden gems with early, exponential growth signals
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center mt-16 w-full">
          <div className="flex flex-wrap justify-center max-w-[1500px]">
            <DiscoverProjectItem />
            <DiscoverProjectItem />
            <DiscoverProjectItem />
            <DiscoverProjectItem />
            <DiscoverProjectItem />
            <DiscoverProjectItem />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button className="px-6 py-4 bg-primary-500 font-workSansRegular text-[1.125rem]">
            Start 7-Day Trial for $9
          </button>
        </div>

        <div className="py-[120px] mt-[120px] linear-bg-gradient-subscription">
          <h3 className="text-3xl font-workSansSemiBold text-center max-lg:px-4">
            What’s Included In Your Subscription
          </h3>

          <div className="flex flex-wrap justify-center mt-12">
            <SubscriptionItem />
            <SubscriptionItem />
            <SubscriptionItem />
          </div>

          <div className="flex justify-center mt-8">
            <button className="px-6 py-4 bg-primary-500 font-workSansRegular text-[1.125rem]">
              Start 7-Day Trial for $9
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

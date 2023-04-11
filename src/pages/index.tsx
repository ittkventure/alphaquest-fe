import {
  CodeIconHome,
  DocumentTextIcon,
  HeartIconHome,
  NotificationCircleIconHome,
  QuoteIcon,
} from "@/assets/icons";
import { ChartImg, HomeBgImg, HomeImg, User1, User2 } from "@/assets/images";
import { DiscoverProjectItem } from "@/components/Home";
import CommentItem from "@/components/Home/CommentItem";
import SubscriptionItem from "@/components/Home/SubscriptionItem";
import HomeLayout from "@/layouts/HomeLayout";
import { listDiscoverProjects } from "@/utils/list";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

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

        <div className="flex justify-center mt-8 z-50">
          <button
            onClick={() => router.push("/pricing")}
            className="px-6 py-4 bg-primary-500 font-workSansRegular text-[1.125rem] z-50"
          >
            Start 7-Day Trial for $9
          </button>
        </div>

        <div>
          <p className="text-sm text-center mt-6 font-workSansLight">
            +136 hidden gems discovered in the last 30 days
          </p>
        </div>

        <div className="flex justify-center mt-8 relative">
          <Image
            src={HomeBgImg}
            width={1360}
            height={1198}
            alt="home-bg"
            className="absolute z-[0] top-[-300px] max-lg:top-[0px] object-fill"
          />
          <Image
            src={HomeImg}
            width={952.81}
            height={549}
            alt="home-image"
            className="z-[5]"
          />
        </div>

        <div className="flex justify-center items-center max-lg:flex-col  mt-[102px] w-full px-36 max-lg:px-0 ">
          <div className="flex max-lg:flex-col justify-center max-w-[1350px]">
            <div className="w-[650px] max-lg:w-full">
              <CommentItem
                avatar={User1}
                content={
                  "This has been our secret weapon for identifying early-stage crypto projects since 2021. We’re thrilled to finally release this powerful tool to the public, offering everyone the opportunity to benefit from our in-house expertise and insights."
                }
                name="Shayne"
                des="Head of Ventures at TK Ventures"
              />
            </div>
            <div className="w-[650px] max-lg:w-full">
              <CommentItem
                avatar={User2}
                content={
                  "AlphaQuest is my go-to resource for discovering promising crypto projects in their infancy. Their weekly newsletter keeps me updated and ready to capitalize on greatest alpha. Highly recommended!"
                }
                name="James R"
                des="Crypto Degen"
              />
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col items-center justify-center mt-32 ">
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
          <button
            onClick={() => router.push("/pricing")}
            className="px-6 py-4 bg-primary-500 font-workSansRegular text-[1.125rem]"
          >
            Start 7-Day Trial for $9
          </button>
        </div> */}

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
            {listDiscoverProjects.map((value, index) => {
              return <DiscoverProjectItem key={index} {...value} />;
            })}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => router.push("/pricing")}
            className="px-6 py-4 bg-primary-500 font-workSansRegular text-[1.125rem]"
          >
            Start 7-Day Trial for $9
          </button>
        </div>

        <div className="py-[120px] mt-[120px] linear-bg-gradient-subscription">
          <h3 className="text-3xl font-workSansSemiBold text-center max-lg:px-4">
            What’s Included In Your Subscription
          </h3>

          <div className="flex flex-wrap justify-center mt-12">
            <SubscriptionItem
              icon={DocumentTextIcon}
              name="Weekly Newsletter"
              description={`Each week we send you a newletter containing all newly discovered projects and trends for the week`}
            />
            <SubscriptionItem
              icon={DocumentTextIcon}
              name="Full Projects and trends database"
              description={`Use our growing database to easily find emerging trends and projects`}
            />
            <SubscriptionItem
              icon={HeartIconHome}
              name="Personal Watchlist"
              description={`Keep track of projects and trends you find interesting to get up-to-date on their growth and development`}
            />
            <SubscriptionItem
              icon={NotificationCircleIconHome}
              name="Intelligent Alerts"
              description={`Get instantly notified via Telegram when a new project or narrative emerges, so you can stay ahead of the game`}
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => router.push("/pricing")}
              className="px-6 py-4 bg-primary-500 font-workSansRegular text-[1.125rem]"
            >
              Start 7-Day Trial for $9
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

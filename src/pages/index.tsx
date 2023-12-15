import { apiTwitter } from "@/api-client";
import {
  ChessKingHIcon,
  DocumentTextIcon,
  HeartIconHome,
  NotificationCircleIconHome,
} from "@/assets/icons";
import {
  ChartImg,
  HomeBgImg,
  HomeImg,
  PlaceholderChart,
  User1,
  User2,
} from "@/assets/images";
import { DiscoverProjectItem } from "@/components/Home";
import CommentItem from "@/components/Home/CommentItem";
import SubscriptionItem from "@/components/Home/SubscriptionItem";
import CustomTooltipNotLabel from "@/components/ProjectDetail/LineChart/CustomTooltipNotLabel";
import { AuthContext, TypePayment } from "@/contexts/useAuthContext";
import HomeLayout from "@/layouts/HomeLayout";
import { formatNumber } from "@/utils/formatNumber";
import { listDiscoverProjects } from "@/utils/list";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import classNames from "classnames";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useQuery } from "react-query";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
interface HomePageType {
  gemCount?: number;
}

const Home: NextPage<HomePageType> = ({ gemCount }) => {
  const router = useRouter();
  const { setTypePaymentAction, authState } = useContext(AuthContext);

  const { data, isLoading } = useQuery(
    ["chartInterestOverTime", authState?.access_token, "today-12-m", "", 1],
    async () =>
      await apiTwitter.getChartNarrativeOverTime(
        authState?.access_token ?? "",
        "today-12-m",
        "",
        6,
        1
      )
  );

  const renderItemsOfChart = () => {
    return data?.items?.map((item: any, index: number) => {
      const listData =
        item?.chart?.timelineData.map((value: any) => {
          return {
            followerCount: value.values[0]?.extractedValue,
            name: value.date,
          };
        }) ?? [];

      console.log(item, "item");

      if (!item)
        return (
          <div className="w-full h-fit relative bg-[#1B202F]">
            <Image
              src={PlaceholderChart}
              width={334}
              height={200}
              alt="chart"
              className="w-full h-fit object-cover"
            />
            <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center">
              <div className="w-full flex justify-center mb-4 gap-3">
                <Image src={ChessKingHIcon} alt="icon" width={17} height={13} />
                <p>Pro Members only</p>
              </div>
              <button
                onClick={onClickPaymentTrial}
                className="px-3 py-2 bg-primary-500 font-workSansRegular text-[1rem] flex justify-center items-center max-lg:hidden"
              >
                Try AlphaQuest Pro
              </button>
            </div>
          </div>
        );

      return (
        <div className="w-full p-4 min-h-fit bg-[#1B202F]">
          <div
            onClick={() => router.push("/narratives/" + item?.keyword)}
            className="w-full flex justify-between mb-4 cursor-pointer"
          >
            <p className="font-bold text-lg">{item?.displayName}</p>

            <div className="flex items-center justify-center">
              <div className="flex flex-col items-end">
                <p
                  className={classNames("font-bold text-xl text-[#24B592]", {
                    "text-[#E25148]": item?.growthPercent < 0,
                  })}
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
          <div className="flex flex-col-reverse pb-2">
            {/* <div className="mt-4 flex items-center justify-between">
                <button className="py-2 px-3 h-8 flex justify-center items-center bg-[#FAFAFA] bg-opacity-10">
                  <p>Regular</p>
                </button>

                <button>
                  <HeartIcon className="w-6 h-6 text-white" />
                </button>
              </div> */}
            <div
              onClick={() => router.push("/narratives/" + item?.keyword)}
              className="cursor-pointer mt-4"
            >
              <p className="line-clamp-2">{item?.description}</p>
            </div>
            <ResponsiveContainer width="100%" aspect={2}>
              <LineChart width={302} height={140} data={listData}>
                <CartesianGrid
                  horizontal={true}
                  vertical={false}
                  stroke="#38405B"
                />

                <Tooltip
                  itemStyle={{ color: "#fff" }}
                  cursor={true}
                  content={
                    <CustomTooltipNotLabel
                      dotColor={item?.growthPercent > 0 ? "#24B592" : "#E25148"}
                    />
                  }
                />
                {/* <XAxis
                    dataKey="name"
                    tick={{ fill: "#fff" }}
                    fontSize={0}
                    fontFamily="WorkSans-Medium"
                    fontWeight={500}
                    domain={["followerCount"]}
                  /> */}
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="followerCount"
                  stroke={item?.growthPercent > 0 ? "#24B592" : "#E25148"}
                  strokeWidth="2"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    });
  };
  const onClickPaymentTrial = () => {
    if (authState) {
      setTypePaymentAction ? setTypePaymentAction(TypePayment.TRIAL) : null;
      mixpanelTrack(event_name_enum.inbound, { url: "/pricing" });
      router.push("/pricing?action=open");
    } else {
      mixpanelTrack(event_name_enum.inbound, { url: "/sign-up" });
      setTypePaymentAction ? setTypePaymentAction(TypePayment.TRIAL) : null;
      router.push("/sign-up");
    }
  };

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
            onClick={onClickPaymentTrial}
            className="px-6 py-4 bg-primary-500 font-workSansRegular text-[1.125rem] z-50"
          >
            Upgrade your account for full access for $9
          </button>
        </div>

        <div>
          <p className="text-sm text-center mt-6 font-workSansLight">
            +{gemCount ?? "0"} hidden gems discovered in the last 30 days
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
            className="z-[5] border-2 border-solid border-[#393F52]"
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
                name="Tung Tran"
                des="Co-founder of TK Ventures"
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

        <div className="flex flex-col items-center justify-center mt-32 ">
          <p className="text-[2.75rem] font-workSansSemiBold">
            Find trends & Narratives Before They Happen
          </p>

          <p className="font-thin">
            We track millions of data points to identify crypto narratives
            before they take off
          </p>
        </div>

        <div className="flex flex-wrap justify-center mt-32">
          <div className="grid grid-cols-3 gap-6 px-[150px] max-lg:px-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-w-[1500px]">
            {renderItemsOfChart()}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => router.push("/narratives")}
            className="px-6 py-4 bg-primary-500 font-workSansRegular text-[1.125rem]"
          >
            Discover now
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
            {listDiscoverProjects.map((value, index) => {
              return <DiscoverProjectItem key={index} {...value} />;
            })}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={onClickPaymentTrial}
            className="px-6 py-4 bg-primary-500 font-workSansRegular text-[1.125rem]"
          >
            Upgrade your account for full access for $9
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
              onClick={onClickPaymentTrial}
              className="px-6 py-4 bg-primary-500 font-workSansRegular text-[1.125rem]"
            >
              Upgrade your account for full access for $9
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;

export async function getServerSideProps() {
  const getGemCount = await apiTwitter.getGameCount();

  return {
    props: {
      gemCount: getGemCount,
    }, // will be passed to the page component as props
  };
}

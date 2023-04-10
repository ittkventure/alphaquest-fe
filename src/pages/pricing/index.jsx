import { apiPayment } from "@/api-client";
import AQDisclosure from "@/components/AQDisclosure";
import CommentSwiper from "@/components/CommentSwiper";
import SubContent from "@/components/Subscription/SubContent";
import { AuthContext } from "@/contexts/useAuthContext";
import HomeLayout from "@/layouts/HomeLayout";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";

const Subscription = () => {
  const { handleLogged, authState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const listSub = [
    {
      title: "Can I use Alpha Quest if I’m new to cryptocurrency?",
      content: `A: Yes, Alpha Quest is designed to be easy to use and accessible to everyone, regardless of their level of experience with cryptocurrency.`,
    },
    {
      title: "What’s included in the subscription?",
      content: `A: Your Alpha Quest subscription includes a weekly newsletter, a full projects and trends database, a personal watchlist, and intelligent alerts.`,
    },
    {
      title: "What happens after my trial ends?",
      content: `A: After your 7-day trial ends, you’ll have the option to continue using Alpha Quest by subscribing to one of our paid plans.`,
    },
    {
      title: "How much does Alpha Quest cost?",
      content: `A: You can start a 7-day trial for just $9 to try the app’s features. After that, it’s $99 per month.`,
    },
    {
      title: "Can I cancel my subscription?",
      content: `A: Yes, you can cancel your subscription at any time.`,
    },
    {
      title: "How can I get help if I have questions or issues with the app?",
      content: `A: Our customer support team is available to help you via telegram at https://t.me/alphaquestio`,
    },
    {
      title: "Is Alpha Quest available on all devices?",
      content: `A: Alpha Quest is accessible from your desktop or laptop computer, as well as your iOS or Android mobile device, so you can stay connected and informed wherever you are`,
    },
    {
      title: "Is the payment process secure?",
      content: `A: Yes, Alpha Quest uses secure payment processing methods to protect your payment information.`,
    },
    {
      title: "What kind of data does Alpha Quest collect?",
      content: `A: Alpha Quest collects data related to crypto projects and trends, as well as user data related to subscription preferences and usage of the app. We take privacy and security very seriously and only collect data necessary to provide our services.`,
    },
  ];

  useEffect(() => {}, []);
  const router = useRouter();
  const getPaymentLink = async (withoutTrial) => {
    setIsLoading(true);
    try {
      if (authState?.access_token) {
        const paymentLink = await apiPayment.getLinkPayment(
          authState?.access_token,
          withoutTrial
        );
        Paddle.Checkout.open({
          override: paymentLink,
        });
        setIsLoading(false);
      } else {
        router.push("/login");
        setIsLoading(false);
      }
    } catch (error) {
      if (error?.response?.data?.error?.message) {
        toast.error(error?.response?.data?.error?.message);
      } else {
        toast.error("Error when payment, please try again!");
      }
      setIsLoading(false);
    }
  };

  return (
    <HomeLayout>
      <div className="max-lg:px-5 flex flex-col items-center">
        <div className="flex flex-col items-center justify-center text-[2rem] font-workSansSemiBold ">
          <p>Uncover The Next Big Thing in Crypto Now</p>
        </div>
        <div className="flex justify-center mt-8 font-workSansLight text-center">
          <p className=" w-[900px]">
            Your Alpha Quest Pro subscription includes a weekly newsletter, a
            full projects and trends database, a personal watchlist, and
            intelligent alerts.
          </p>
        </div>

        <SubContent isLoading={isLoading} onPayment={getPaymentLink} />
        <div className="flex items-center justify-between w-[1205px] max-xl:w-full max-w-[1350px] py-[33px] px-10 bg-dark-800 mt-11">
          <div>
            <p className="font-workSansBold text-2xl">
              Uncover The Next Big Thing in Crypto Now
            </p>
            <p className="font-workSansLight mt-2">
              Try the Pro Plan for 7 days
            </p>
          </div>

          <div>
            <button
              onClick={() => getPaymentLink(false)}
              className="px-6 py-[10px] bg-success-600 font-workSansRegular text-[1.125rem] flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="mr-1">
                  <Spinner />
                </div>
              ) : null}
              Try the Pro Plan for 7 days
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-[2rem] font-workSansSemiBold mt-[120px]">
          <p>Over 100,000+ Investors Use AlphaQuest</p>
        </div>

        <div className="flex items-center justify-between w-[1205px] max-xl:w-full max-w-[1350px] py-[120px]  mt-11">
          <CommentSwiper />
        </div>

        {/* <div className="flex w-full items-center justify-center text-[2rem] font-workSansSemiBold mt-[30px]">
          <div className="h-[1px] w-[430px] bg-white opacity-20"></div>
          <p className="mx-9">As seen as</p>
          <div className="h-[1px] w-[430px] bg-white opacity-20"></div>
        </div>

        <div className="grid grid-cols-6 gap-6 justify-between w-[1205px] max-xl:w-full max-w-[1350px] py-[33px] mt-11">
          <div className="py-10 px-2 bg-dark-800 flex items-center justify-center">
            <Image src={Logo1} alt="" height={36} />
          </div>

          <div className="py-10 px-2 bg-dark-800 flex items-center justify-center">
            <Image src={Logo2} alt="" height={36} />
          </div>

          <div className="py-10 px-2 bg-dark-800 flex items-center justify-center">
            <Image src={Logo3} alt="" height={36} />
          </div>

          <div className="py-10 bg-dark-800 flex items-center justify-center">
            <Image src={Logo1} alt="" height={36} />
          </div>

          <div className="py-10 bg-dark-800 flex items-center justify-center">
            <Image src={Logo1} alt="" height={36} />
          </div>

          <div className="py-10 bg-dark-800 flex items-center justify-center">
            <Image src={Logo1} alt="" height={36} />
          </div>
        </div> */}

        <div className="flex w-full items-center justify-center text-[2rem] font-workSansSemiBold mt-[70px]">
          <p className="mx-9">Frequently Asked Questions</p>
        </div>
        <div className="mt-12 w-[835px] max-xl:w-full max-w-[1350px]">
          {listSub.map((value, index) => {
            return (
              <AQDisclosure
                title={value.title}
                content={value.content}
                index={index + 1}
                classNameContainer="mt-4"
              />
            );
          })}
        </div>

        <div className="flex justify-center items-center mt-[120px] mb-12 h-[400px] w-full relative">
          <div className="h-[400px] w-full linear-bg-gradient-subscription-2 absolute z-0" />
          <div className="flex flex-col w-full items-center justify-center text-[2rem] font-workSansSemiBold z-50">
            <p className="mx-9">Need Help Deciding on a Plan?</p>
            <div className="mt-10">
              <button className="px-6 py-[10px] bg-success-600 font-workSansRegular text-[1.125rem]">
                Talk to a Specialist
              </button>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Subscription;

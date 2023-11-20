import { apiPayment } from "@/api-client";
import AQDisclosure from "@/components/AQDisclosure";
import CommentSwiper from "@/components/CommentSwiper";
import SubContent from "@/components/Subscription/SubContent";
import { AuthContext, TypePayment } from "@/contexts/useAuthContext";
import HomeLayout from "@/layouts/HomeLayout";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";

const Subscription = () => {
  const { authState, typePayment, setTypePaymentAction } =
    useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const listSub = [
    {
      title: "Can I use Alpha Quest if I’m new to cryptocurrency?",
      content: `Yes, Alpha Quest is designed to be easy to use and accessible to everyone, regardless of their level of experience with cryptocurrency.`,
    },
    {
      title: "What’s included in the subscription?",
      content: `Your Alpha Quest subscription includes a weekly newsletter, a full projects and trends database, a personal watchlist, and intelligent alerts.`,
    },
    {
      title: "What happens after my trial ends?",
      content: `After your 7-day trial ends, you’ll have the option to continue using Alpha Quest by subscribing to one of our paid plans.`,
    },
    {
      title: "How much does Alpha Quest cost?",
      content: `You can start a 7-day trial for just $9 to try the app’s features. After that, it’s $99 per month.`,
    },
    {
      title: "Can I cancel my subscription?",
      content: `Yes, you can cancel your subscription at any time.`,
    },
    {
      title: "How can I get help if I have questions or issues with the app?",
      content: `Our customer support team is available to help you via telegram at https://t.me/alphaquestio`,
    },
    {
      title: "Is Alpha Quest available on all devices?",
      content: `Alpha Quest is accessible from your desktop or laptop computer, as well as your iOS or Android mobile device, so you can stay connected and informed wherever you are`,
    },
    {
      title: "Is the payment process secure?",
      content: `Yes, Alpha Quest uses secure payment processing methods to protect your payment information.`,
    },
    {
      title: "What kind of data does Alpha Quest collect?",
      content: `Alpha Quest collects data related to crypto projects and trends, as well as user data related to subscription preferences and usage of the app. We take privacy and security very seriously and only collect data necessary to provide our services.`,
    },
    {
      title:
        "I don't have Paypal, Visa or Master card? Can I subscribe to the AlphaQuest Pro Plan using crypto?",
      content: `Using Paypal or Credit card would be more convenient for renewals. However, we also accept cryptocurrency payments if you prefer not to use those methods. Please reach out to https://t.me/alphaquestio for detailed instructions`,
    },
  ];

  const router = useRouter();

  useEffect(() => {
    if (router.query?.action === "open" && authState?.access_token) {
      if (typePayment === TypePayment.TRIAL) {
        getPaymentLink(false);
      } else if (typePayment === TypePayment.PRO) {
        getPaymentLink(true);
      }
    }
  }, [typePayment, router.query]);

  const getPaymentLink = async (withoutTrial, isYear) => {
    setIsLoading(true);
    try {
      if (authState) {
        const paymentLink = await apiPayment.getLinkPayment(
          authState?.access_token,
          withoutTrial,
          isYear
        );
        Paddle.Checkout.open({
          override: paymentLink,
        });
        setIsLoading(false);
      } else {
        setTypePaymentAction
          ? setTypePaymentAction(
              withoutTrial ? TypePayment.PRO : TypePayment.TRIAL
            )
          : null;
        mixpanelTrack(event_name_enum.inbound, { url: "/sign-up" });

        router.push("/sign-up");
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
      <div className="max-lg:px-5 flex flex-col items-center overflow-hidden transition-all duration-200">
        <div className="flex flex-col items-center justify-center text-[2rem] max-lg:text-3xl text-center font-workSansSemiBold ">
          <p>Uncover The Next Big Thing in Crypto Now</p>
        </div>
        <div className="flex justify-center mt-8 font-workSansLight text-center">
          <p className=" w-[900px] max-lg:w-full">
            Your Alpha Quest Pro subscription includes a weekly newsletter, a
            full projects and trends database, a personal watchlist, and
            intelligent alerts.
          </p>
        </div>

        <SubContent isLoading={isLoading} onPayment={getPaymentLink} />

        <div className="flex max-lg:flex-col items-center justify-between w-[1205px] max-xl:w-full max-w-[1350px] py-[33px] px-10 bg-dark-800 mt-11">
          <div>
            <p className="font-workSansBold text-2xl max-lg:text-center">
              Uncover The Next Big Thing in Crypto Now
            </p>
            <p className="font-workSansLight mt-2 max-lg:mt-4 max-lg:text-center">
              Try the Pro Plan for 7 days
            </p>
          </div>

          <div className="max-lg:w-full max-lg:mt-6">
            <button
              onClick={() => getPaymentLink(false)}
              className="px-6 max-lg:text-sm max-lg:w-full py-[10px] bg-success-600 font-workSansRegular text-[1.125rem] flex  justify-center items-center"
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

        <div className="flex max-lg:text-center max-lg:text-2xl max-lg:mt-16 flex-col items-center justify-center text-[2rem] font-workSansSemiBold mt-[120px]">
          <p>Over 100,000+ Investors Use AlphaQuest</p>
        </div>

        <div className="flex items-center justify-between w-[1205px] max-xl:w-full max-w-[1350px] py-[120px] max-lg:py-5 mt-11 max-lg:mt-0">
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

        <div className="flex w-full items-center justify-center text-[2rem] font-workSansSemiBold max-lg:text-2xl max-lg:text-center mt-[70px] max-lg:mt-15">
          <p className="mx-9 max-lg:mx-2">Frequently Asked Questions</p>
        </div>
        <div className="mt-12 max-lg:mt-3 w-[835px] max-xl:w-full max-w-[1350px]">
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

        <div className="flex justify-center items-center max-lg:mt-10 mt-[120px] max-lg:mb-0 mb-12 h-[400px] w-full relative">
          <div className="h-[400px] max-lg:h-[300px] w-full linear-bg-gradient-subscription-2 absolute z-0" />
          <div className="flex flex-col w-full items-center justify-center text-[2rem] font-workSansSemiBold z-50">
            <p className="mx-9 max-lg:mx-2 max-lg:text-center max-lg:text-3xl">
              Need Help Deciding on a Plan?
            </p>
            <div className="mt-10">
              <a
                onClick={() => {
                  mixpanelTrack(event_name_enum.outbound, {
                    url: "https://t.me/alphaquestio",
                  });
                }}
                href="https://t.me/alphaquestio"
                className="px-6 py-[13px] bg-success-600 font-workSansRegular text-[1.125rem]"
                target={"_blank"}
              >
                Talk to a Specialist
              </a>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Subscription;

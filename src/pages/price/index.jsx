import { apiPayment } from "@/api-client";
import { Logo1, Logo2, Logo3 } from "@/assets/images";
import AQDisclosure from "@/components/AQDisclosure";
import CommentSwiper from "@/components/CommentSwiper";
import SubContent from "@/components/Subscription/SubContent";
import { AuthContext } from "@/contexts/useAuthContext";
import HomeLayout from "@/layouts/HomeLayout";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Subscription = () => {
  const { handleLogged, authState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {}, []);

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
        toast.warning("Please login or register before payment!");
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
          <p className=" w-[922px]">
            Access our automated projects sourcing to discover and connect with
            a large number of stealth and about to launch protocols &
            applications before anyone else
          </p>
        </div>

        <SubContent isLoading={isLoading} onPayment={getPaymentLink} />
        <div className="flex items-center justify-between w-[1205px] max-xl:w-full max-w-[1350px] py-[33px] px-10 bg-dark-800 mt-11">
          <div>
            <p className="font-workSansBold text-2xl">
              Uncover The Next Big Thing in Crypto Now
            </p>
            <p className="font-workSansLight mt-2">
              Try the Standart plan for 7 days
            </p>
          </div>

          <div>
            <button
              onClick={() => router.push("/price")}
              className="px-6 py-[10px] bg-success-600 font-workSansRegular text-[1.125rem]"
            >
              Start 7-Day Trial for $9
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-[2rem] font-workSansSemiBold mt-[120px]">
          <p>Over 100,000+ Investors Use AlphaQuest</p>
        </div>

        <div className="flex items-center justify-between w-[1205px] max-xl:w-full max-w-[1350px] py-[120px]  mt-11">
          <CommentSwiper />
        </div>

        <div className="flex w-full items-center justify-center text-[2rem] font-workSansSemiBold mt-[30px]">
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
        </div>

        <div className="flex w-full items-center justify-center text-[2rem] font-workSansSemiBold mt-[120px]">
          <p className="mx-9">Frequently Asked Questions</p>
        </div>
        <div className="mt-12 w-[835px] max-xl:w-full max-w-[1350px]">
          <AQDisclosure index={1} classNameContainer="mt-4" />
          <AQDisclosure index={2} classNameContainer="mt-4" />
          <AQDisclosure index={3} classNameContainer="mt-4" />
          <AQDisclosure index={4} classNameContainer="mt-4" />
          <AQDisclosure index={5} classNameContainer="mt-4" />
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

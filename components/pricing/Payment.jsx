"use client";

import { useState } from "react";
import Image from "next/image";
import { AQ_APP_URL } from "@/utils/data";
import { fetchPaylinkByUserId } from "@/apis/payment";
import { Toaster, toast } from "sonner";

export default function Payment({ userId }) {
  const [isYear, setIsYear] = useState(false);

  const getPayment = async (userId, withoutTrial, isAnnualPlan) => {
    if (!userId) window.location.replace(`${AQ_APP_URL}/login`)
    try {
      const paymentLink = await fetchPaylinkByUserId(
        userId,
        withoutTrial,
        isAnnualPlan
      );
      Paddle.Checkout.open({
        override: paymentLink,
      });
    } catch (err) {
      toast.error(err?.message)
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="mt-24">
        <div className="flex justify-center items-center">
          <div className="p-[2px] border border-main flex gap-[1px]">
            <div
              className={`px-10 py-1 hover:bg-main cursor-pointer transition-all duration-300 ${
                !isYear ? "bg-main" : ""
              }`}
              onClick={() => setIsYear(false)}
            >
              <p>Pay monthly</p>
            </div>
            <div
              className={`px-10 py-1 hover:bg-main cursor-pointer transition-all duration-300 ${
                isYear ? "bg-main" : ""
              }`}
              onClick={() => setIsYear(true)}
            >
              <p>Pay Annually - get 2 months free</p>
            </div>
          </div>
        </div>
        <div className="flex max-lg:flex-col justify-center mt-24">
          <div className="relative lg:mx-6 flex-1 max-xl:w-full">
            <div className="absolute lg:top-[-36px] lg:right-[-30px] top-[-48px] right-[-16px]">
              <Image
                src="/images/nft_elipse.svg"
                alt="elipse img"
                width={218}
                height={218}
              />
            </div>

            <div className="w-full p-10 max-lg:p-5 custom-card-sub backdrop-blur-md">
              <div className="flex justify-center font-semibold items-center border-[0.5px] border-item text-main w-[55px] py-[2px] rounded-[20px] uppercase">
                <p>Free</p>
              </div>
              <div className="flex items-end my-6">
                <p className="text-4xl leading-[35px] text-btn font-semibold">
                  $0
                </p>
                <p className="text-xl">/month</p>
              </div>

              {isYear && (
                <div className="flex items-end my-6">
                  <p className="text-lg mr-2 line-through">$0</p>
                  <div className="flex">
                    <p className="text-lg text-primary-500">$0</p>
                    <p className="text-lg text-primary-500">/year</p>
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <Image
                  src="/icons/check.svg"
                  alt="check icon"
                  width={20}
                  height={20}
                />
                <p className="ml-2">
                  Access to a limited projects & trends database
                </p>
              </div>
              <div className="mt-[91px] max-lg:mt-5 max-lg:w-full  max-lg:justify-center flex justify-end">
                <button
                  className={`py-3 px-6 flex items-center bg-btn`}
                  onClick={() => window.open(`${AQ_APP_URL}/projects/trending`)}
                >
                  <p>Access Now</p>
                </button>
              </div>
            </div>
          </div>
          <div className="relative mx-6 max-lg:mx-0 flex-1 max-xl:w-full max-xl:mt-10 ">
            <div className="absolute lg:top-[-36px] lg:right-[-30px] top-[-48px] right-[-16px]">
              <Image
                src="/images/nft_elipse.svg"
                alt="elipse img"
                width={218}
                height={218}
              />
            </div>
            <div className="w-[100%] max-lg:p-5  p-10 border-[2px] custom-card-sub-border-linear backdrop-blur-md">
              <div className="flex">
                <div className="flex justify-center font-semibold items-center border-[0.5px] border-item text-main w-[60px] py-[2px] rounded-[20px]">
                  <p>PRO</p>
                </div>

                <div className="flex ml-2 justify-center font-semibold items-center border-[0.5px] border-item w-[80px] py-[2px] rounded-[20px]">
                  <p>Limited</p>
                </div>
              </div>

              <div className="flex items-end my-6">
                <p className="text-[40px] leading-[35px] font-semibold text-btn">
                  {isYear ? "$82.5" : "$99"}
                </p>
                <p className="text-xl">/month</p>
              </div>

              {isYear && (
                <div className="flex items-end my-6">
                  <p className="text-lg mr-2 line-through">$1,188</p>
                  <div className="flex">
                    <p className="text-lg text-primary-500">$990</p>
                    <p className="text-lg text-primary-500">/year</p>
                  </div>
                </div>
              )}

              <div className="flex items-center font-workSansLight">
                <Image
                  src="/icons/check.svg"
                  alt="check icon"
                  width={20}
                  height={20}
                />
                <p className="ml-2">Full projects & Trends database</p>
              </div>

              <div className="flex items-center font-workSansLight">
                <Image
                  src="/icons/check.svg"
                  alt="check icon"
                  width={20}
                  height={20}
                />
                <p className="ml-2">Personal Watchlist</p>
              </div>

              <div className="flex items-center font-workSansLight">
                <Image
                  src="/icons/check.svg"
                  alt="check icon"
                  width={20}
                  height={20}
                />
                <p className="ml-2">Weekly Newsletter</p>
              </div>

              <div className="mt-[43px] max-lg:mt-5 max-lg:w-full max-lg:justify-center flex justify-end">
                <button
                  className={`py-3 px-6 bg-primary-500 flex items-center bg-btn`}
                  onClick={() => getPayment(userId, true, isYear)}
                >
                  <p>Subscribe Now</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex max-lg:flex-col items-center justify-between py-[33px] px-10 bg-card mt-11 lg:mx-[24px]">
        <div>
          <p className="font-semibold text-2xl max-lg:text-center">
            Uncover The Next Big Thing in Crypto Now
          </p>
          <p className="font-light mt-2 max-lg:mt-4 max-lg:text-center">
            Try the Pro Plan for 7 days
          </p>
        </div>

        <div className="max-lg:w-full max-lg:mt-6">
          <button
            className="px-6 max-lg:text-sm max-lg:w-full py-[10px] bg-main text-[1.125rem] flex justify-center items-center"
            onClick={() => getPayment(userId, false, false)}
          >
            Try the Pro Plan for 7 days
          </button>
        </div>
      </div>
    </>
  );
}

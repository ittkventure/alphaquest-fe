import CommentSwiper from "@/components/CommentSwiper";
import CommentItem from "@/components/Home/CommentItem";
import SubContent from "@/components/Subscription/SubContent";
import AppLayout from "@/layouts/AppLayout";
import HomeLayout from "@/layouts/HomeLayout";
import { CheckIcon } from "@heroicons/react/24/outline";
import React from "react";

const Subscription = () => {
  return (
    <HomeLayout>
      <div className="max-lg:px-5 flex flex-col items-center">
        <div className="flex flex-col items-center justify-center text-[2.75rem] font-workSansSemiBold ">
          <p>Uncover The Next Big Thing in Crypto Now</p>
        </div>
        <div className="flex justify-center mt-8 font-workSansLight text-center">
          <p className=" w-[922px]">
            Access our automated projects sourcing to discover and connect with
            a large number of stealth and about to launch protocols &
            applications before anyone else
          </p>
        </div>

        <SubContent />
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
            <button className="px-6 py-[10px] bg-success-600 font-workSansRegular text-[1.125rem]">
              Start 7-Day Trial for $9
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-[2.75rem] font-workSansSemiBold mt-[120px]">
          <p>Over 100,000+ Investors Use AlphaQuest</p>
        </div>

        <div className="flex items-center justify-between w-[1205px] max-xl:w-full max-w-[1350px] py-[33px]  mt-11">
          <CommentSwiper />
        </div>
      </div>
    </HomeLayout>
  );
};

export default Subscription;

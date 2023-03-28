import { BlurBgImg } from "@/assets/images";
import HomeLayout from "@/layouts/HomeLayout";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

const MainSent = () => {
  return (
    <HomeLayout hiddenFooter>
      <div className="w-[100vw] mt-8 flex justify-center items-center relative">
        <Image
          src={BlurBgImg}
          width={1360}
          height={1198}
          alt="home-bg"
          className="absolute z-[2] top-[-300px]  max-lg:top-[0px] object-fill max-md:hidden"
        />
        <div className="w-[520px] bg-dark-800 max-md:bg-transparent max-md:p-6 max-lg:p-8 p-10 z-[100]">
          <div className="flex justify-center">
            <EnvelopeIcon className="h-[100px] w-[100px] text-success-500" />
          </div>
          <p className="text-center text-lg mt-2">
            The verification link has been sent to your email, please check your
            mail (include spam)
          </p>
        </div>
      </div>
    </HomeLayout>
  );
};

export default MainSent;

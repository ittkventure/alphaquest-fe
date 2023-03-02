import { QuoteIcon } from "@/assets/icons";
import Image from "next/image";
import React from "react";

const CommentItem = () => {
  return (
    <div className="mx-4  max-lg:mt-5">
      <div className="">
        <div className="border border-success-500 px-8 pt-8 ">
          <p className="text-lg">
            By far the most superior Twitter analytics product in the indie
            hackers space. I&apos;ve been using it for a few days now, and
            it&apos;s really impressive.
          </p>
          <div className="flex justify-end mb-4">
            <Image src={QuoteIcon} width={37} height={26} alt="quote-icon" />
          </div>
        </div>
      </div>
      <div className="flex mt-[30px]">
        <div className="w-11 h-11 rounded-[50%] overflow-hidden">
          <Image
            src={
              "https://tk-storage.s3.ap-southeast-1.amazonaws.com/host/ckeditor/croppedfavicon32x32_20221121050419.png"
            }
            width={44}
            height={44}
            alt="avt"
          />
        </div>
        <div className="ml-3 text-sm">
          <p className="font-workSansBold ">Simon Høiberg</p>
          <p className="text-secondary-400">CEO @ FeedHiveHøiberg</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;

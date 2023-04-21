import { QuoteIcon } from "@/assets/icons";
import Image from "next/image";
import React, { FC } from "react";

interface ICommentItem {
  name: string;
  content: string;
  avatar: any;
  des: string;
}

const CommentItem: FC<ICommentItem> = ({ name, content, avatar, des }) => {
  return (
    <div className="mx-4 max-lg:mt-5 ">
      <div className="">
        <div className="border border-success-500 px-8 pt-8 min-h-[230px] flex flex-col justify-between">
          <p className="text-lg max-lg:text-sm">{content}</p>
          <div className="flex justify-end mb-4">
            <Image src={QuoteIcon} width={37} height={26} alt="quote-icon" />
          </div>
        </div>
      </div>
      <div className="flex mt-[30px]">
        <div className="w-11 h-11 rounded-[50%] overflow-hidden">
          <Image src={avatar} width={44} height={44} alt="avt" />
        </div>
        <div className="ml-3 text-sm">
          <p className="font-workSansBold ">{name}</p>
          <p className="text-secondary-400">{des}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;

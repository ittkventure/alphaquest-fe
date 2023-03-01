import { DocumentTextIcon } from "@/assets/icons";
import Image from "next/image";
import React, { FC } from "react";

interface SubscriptionItemTypes {}

const SubscriptionItem: FC<SubscriptionItemTypes> = () => {
  return (
    <div className="flex flex-col justify-center items-center w-64 mx-6 mt-3">
      <div>
        <Image src={DocumentTextIcon} width={33} height={36} alt="icon" />
      </div>

      <div className="h-[1px] w-[88px] bg-success-500 my-4"></div>

      <div>
        <p className="text-[20px] font-workSansSemiBold text-center">
          Weekly Newsletter
        </p>
        <p className="text-[16px] font-workSansRegular text-center">
          Each week we send you a newletter containing all newly discovered
          projects and trends for the weeek
        </p>
      </div>
    </div>
  );
};

export default SubscriptionItem;

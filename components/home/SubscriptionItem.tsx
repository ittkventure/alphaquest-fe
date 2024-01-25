import Image from "next/image";
import React, { FC } from "react";

interface SubscriptionItemTypes {
  icon: string;
  name: string;
  description: string;
}

const SubscriptionItem: FC<SubscriptionItemTypes> = ({
  icon,
  name,
  description,
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-64 mx-6 mt-3">
      <div>
        <Image src={icon} width={33} height={36} alt="icon" />
      </div>

      <div className="h-[1px] w-[88px] bg-main my-4"></div>

      <div>
        <p className="text-[20px] font-semibold text-center">{name}</p>
        <p className="text-[16px] text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SubscriptionItem;

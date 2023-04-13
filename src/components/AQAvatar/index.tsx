import { UserPayType } from "@/api-client/types/AuthType";
import { ChestKingIcon, CrownIcon } from "@/assets/icons";
import { LogoCircle } from "@/assets/images";
import { AuthContext } from "@/contexts/useAuthContext";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const AQAvatar = () => {
  const { accountExtendDetail } = useContext(AuthContext);

  return (
    <Link href={"/account-details"}>
      <div className="ml-6 max-lg:ml-3 mr-6 max-lg:mr-0 flex items-center relative">
        <div
          className={`w-10 h-10 rounded-[50%] border-[1px]  ${
            accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM
              ? "border-yellow-400"
              : "border-white"
          } overflow-hidden relative`}
        >
          <Image
            src={LogoCircle}
            width={40}
            height={40}
            alt="avt"
            className="object-cover z-10"
          />
        </div>
        {accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM ? (
          <div className="absolute z-50 left-[29px] top-[-5px] max-lg:left-[31px]">
            <Image src={ChestKingIcon} width={20} height={20} alt="" />
          </div>
        ) : null}

        <div className="pl-2">
          <p className=" text-[16px] max-lg:hidden">
            {accountExtendDetail?.username}
          </p>
          {accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM ? (
            <p className="max-lg:hidden text-yellow-400">PRO</p>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

export default AQAvatar;

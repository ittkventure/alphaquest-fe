import { CrownIcon } from "@/assets/icons";
import { LogoWithText } from "@/assets/images";
import { AuthContext } from "@/contexts/useAuthContext";
import { capitalized } from "@/utils/tools";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import AQAvatar from "../AQAvatar";

const Header = () => {
  const router = useRouter();
  const { tab } = router.query;

  const { authState } = useContext(AuthContext);

  const onGoLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <h1 className="font-workSansSemiBold text-[36px] max-lg:hidden">
          {capitalized(tab ? tab?.toString() : "Trending")}
        </h1>
        <div className="hidden max-lg:block">
          <Image src={LogoWithText} width={169} height={40} alt="logo" />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="relative  max-lg:hidden">
          <MagnifyingGlassIcon className="w-5 h-5 text-white absolute top-[11px] left-[5px]" />

          <input
            className="w-52 bg-secondary-600 py-2 pl-8"
            placeholder="Search"
          />
        </div>

        <button>
          <MagnifyingGlassIcon className="w-5 h-5 text-white hidden max-lg:block" />
        </button>
        {authState ? (
          <AQAvatar />
        ) : (
          <div className="mx-6">
            <button
              onClick={onGoLogin}
              className="py-2 px-6 bg-success-500 text-white"
            >
              Login
            </button>
          </div>
        )}

        <div>
          <button className="px-3 py-2 bg-primary-500 font-workSansRegular text-[1rem] flex justify-center items-center max-lg:hidden">
            <Image
              src={CrownIcon}
              width={17}
              height={14}
              alt="crown-icon"
              className="mr-2"
            />
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

import { UserPayType } from "@/api-client/types/AuthType";
import { CrownIcon } from "@/assets/icons";
import { LogoWithText } from "@/assets/images";
import { AuthContext } from "@/contexts/useAuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useContext } from "react";
import AQAvatar from "../AQAvatar";

interface HomeNavTypes {}

const HomeNav: FC<HomeNavTypes> = () => {
  const router = useRouter();

  const { handleLogged, authState, accountExtendDetail } =
    useContext(AuthContext);

  const onGoLogin = () => {
    router.push("/login");
  };

  const onGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex max-lg:flex-col h-24 justify-between p-6 max-lg:mb-5 z-[100] absolute w-full">
      <button onClick={onGoHome} className="cursor-pointer">
        <Image src={LogoWithText} width={169} height={40} alt="logo" />
      </button>
      <div>
        <ul className="flex items-center max-lg: text-sm mt-3 max-lg:border-b max-lg:border-b-secondary-600 max-lg:pb-2">
          <li className="max-lg:flex-1 mr-6">
            <Link href="/projects">Projects</Link>
          </li>
          <li className="max-lg:flex-1 mr-6">
            <Link href="/pricing">Pricing</Link>
          </li>

          <li>
            {accountExtendDetail?.currentPlanKey === UserPayType.FREE &&
            authState?.access_token ? (
              <div>
                <button
                  onClick={() => router.push("/pricing")}
                  className="px-3 py-2 bg-primary-500 font-workSansRegular text-[1rem] flex justify-center items-center max-lg:hidden"
                >
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
            ) : null}
          </li>

          <li className="max-lg:flex-1 max-lg:hidden">
            {authState ? (
              <AQAvatar />
            ) : (
              <button
                onClick={onGoLogin}
                className="py-2 px-6 bg-success-500 text-white"
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeNav;

import { CrownIcon } from "@/assets/icons";
import { LogoWithText } from "@/assets/images";
import { AuthContext, TypePayment } from "@/contexts/useAuthContext";
import { capitalized } from "@/utils/tools";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useContext } from "react";
import AQAvatar from "../AQAvatar";
import { UserPayType } from "@/api-client/types/AuthType";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { SearchContext } from "@/contexts/useSearchContext";

interface IHeader {
  title?: string;
}

const Header: FC<IHeader> = ({ title }) => {
  const router = useRouter();
  const { tab } = router.query;
  const { setKeyword, keyword } = useContext(SearchContext);
  const { authState, accountExtendDetail, setTypePaymentAction } =
    useContext(AuthContext);

  const onGoLogin = () => {
    mixpanelTrack(event_name_enum.inbound, {
      url: "/login",
    });
    router.push("/login");
  };

  const onClickPaymentTrial = () => {
    mixpanelTrack(event_name_enum.upgrade_to_pro, {
      url: router.pathname,
    });
    if (authState) {
      setTypePaymentAction ? setTypePaymentAction(TypePayment.PRO) : null;
      mixpanelTrack(event_name_enum.inbound, {
        url: "/pricing",
      });
      router.push("/pricing?action=open");
    } else {
      mixpanelTrack(event_name_enum.inbound, {
        url: "/sign-up",
      });
      setTypePaymentAction ? setTypePaymentAction(TypePayment.PRO) : null;
      router.push("/sign-up");
    }
  };
  const onGoSignup = () => {
    mixpanelTrack(event_name_enum.inbound, {
      url: "/sign-up",
    });
    router.push("/sign-up");
  };

  const renderTitle = () => {
    if (router.pathname === "/watchlist/projects") return "Watchlist";
    if (router.pathname.indexOf("/search") !== -1) return "Search";
    if (router.pathname.indexOf("/alpha-hunter") !== -1) return "Alpha Hunter";
    if (router.pathname.indexOf("/chain") !== -1) return "Chain";
    if (router.pathname.indexOf("/category") !== -1) return "Category";

    if (title) return title;

    return capitalized(tab ? tab?.toString() : "Trending");
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <h1 className="font-workSansSemiBold text-[36px] max-lg:hidden">
          {renderTitle()}
        </h1>
        <div className="hidden max-lg:block">
          <Image
            src={LogoWithText}
            width={169}
            height={40}
            alt="logo"
            className="max-lg:w-[120px]"
          />
        </div>
      </div>

      <div className="flex justify-center items-center ">
        <div className="relative mr-6  max-lg:mr-2 ml-4">
          <MagnifyingGlassIcon className="w-5 h-5 max-lg:w-4 max-xl:h-4 text-white absolute max-xl:top-[6px] top-[11px] left-[5px]" />

          <input
            className="w-52 max-lg:w-32 max-lg:py-1 bg-secondary-600 py-2 pl-8 max-lg:pl-7  max-lg:text-sm "
            placeholder="Search"
            onKeyPress={(event) => {
              if (event.key === "Enter" && event.currentTarget.value) {
                setKeyword(event.currentTarget.value ?? "");
                router.push("/search?keyword=" + event.currentTarget.value);
              }
            }}
          />
        </div>
        {/* 
        <button id="search-btn">
          <MagnifyingGlassIcon className="w-5 h-5 text-white hidden max-lg:block" />
        </button> */}

        {!authState && (
          <div className="max-lg:flex-1 max-lg:hidden">
            <button
              onClick={onGoSignup}
              className="py-2 px-6 bg-success-500 text-white"
            >
              Sign up
            </button>
          </div>
        )}

        {authState ? (
          <AQAvatar />
        ) : (
          <div className="mx-6 max-lg:mx-0">
            <button
              onClick={onGoLogin}
              className="py-2 px-6  border border-[#00e3b4]  text-white"
            >
              Login
            </button>
          </div>
        )}

        {accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM ? null : (
          <div>
            <button
              onClick={onClickPaymentTrial}
              className="px-3 py-2 bg-primary-500 font-workSansRegular text-[1rem] flex justify-center items-center max-lg:hidden"
            >
              <Image
                src={CrownIcon}
                width={17}
                height={14}
                alt="crown-icon"
                className="mr-2"
              />
              Start 7-day trial
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

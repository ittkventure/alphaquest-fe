import { CrownIcon } from "@/assets/icons";
import { LogoWithText } from "@/assets/images";
import { NotificationHeader } from "@/assets/icons";
import { AuthContext, TypePayment } from "@/contexts/useAuthContext";
import { capitalized } from "@/utils/tools";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import AQAvatar from "../AQAvatar";
import { UserPayType } from "@/api-client/types/AuthType";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { SearchContext } from "@/contexts/useSearchContext";
import NotificationContent from "./NotificationContent";
import { useQuery } from "react-query";
import NumberNotification from "./NumberNotification";
import { fetchNotifications } from "@/api-client/notification";
import QuickSearch from "./QuickSearch";

interface IHeader {
  title?: string;
}

const Header: FC<IHeader> = ({ title }) => {
  const router = useRouter();
  const { tab } = router.query;
  const { setKeyword, keyword } = useContext(SearchContext);
  const [searchString, setSearchString] = useState("");
  const { authState, accountExtendDetail, setTypePaymentAction } =
    useContext(AuthContext);

  const [openQuickSearch, setOpenQuickSearch] = useState(false);
  let searchRef: React.MutableRefObject<any> = useRef();

  const [openNotification, setOpenNotification] = useState(false);
  let notiRef: React.MutableRefObject<any> = useRef();
  useEffect(() => {
    // click outside to close notification content
    let handler = (e: any) => {
      if (notiRef.current && !notiRef.current?.contains(e.target))
        setOpenNotification(false);
      if (searchRef.current && !searchRef.current?.contains(e.target))
        setOpenQuickSearch(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  });

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
      setTypePaymentAction ? setTypePaymentAction(TypePayment.TRIAL) : null;
      mixpanelTrack(event_name_enum.inbound, {
        url: "/pricing",
      });
      router.push("/pricing?action=open");
    } else {
      mixpanelTrack(event_name_enum.inbound, {
        url: "/sign-up",
      });
      setTypePaymentAction ? setTypePaymentAction(TypePayment.TRIAL) : null;
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
    if (router.pathname.indexOf("/alpha-hunter") !== -1) return "Alpha Hunters";
    if (router.pathname.indexOf("/chain") !== -1) return "Chain";
    if (router.pathname.indexOf("/category") !== -1) return "Category";
    if (router.pathname.indexOf("/alpha-hunters") !== -1)
      return "Top Alpha Hunters by Early Discoveries";

    if (title) return title;

    return capitalized(tab ? tab?.toString() : "Trending");
  };

  const { data: notifications } = useQuery(["getNotificationsTotal"], () =>
    fetchNotifications(authState?.access_token || "")
  );

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
        <div className="relative mr-6  max-lg:mr-2 ml-4" ref={searchRef}>
          <MagnifyingGlassIcon className="w-5 h-5 max-lg:w-4 max-lg:h-4 text-white absolute max-lg:top-[6px] top-[11px] left-[5px]" />

          <input
            className="w-52 max-lg:w-32 max-lg:py-1 bg-secondary-600 py-2 pl-8 max-lg:pl-7  max-lg:text-sm "
            placeholder="Search"
            value={searchString}
            onChange={(e) => {
              setSearchString(e?.target?.value);
              setOpenQuickSearch(true);
            }}
            // onKeyPress={(event) => {
            //   if (event.key === "Enter" && event.currentTarget.value) {
            //     setKeyword(event.currentTarget.value ?? "");
            //     router.push("/search?keyword=" + event.currentTarget.value);
            //   }
            // }}
          />
          {searchString?.length > 2 && openQuickSearch && (
            <QuickSearch
              searchString={searchString}
              closeQuickSearch={() => setOpenQuickSearch(false)}
              resetSearch={() => setSearchString("")}
            />
          )}
        </div>
        {/* 
        <button id="search-btn">
          <MagnifyingGlassIcon className="w-5 h-5 text-white hidden max-lg:block" />
        </button> */}

        {authState && (
          <div className="lg:relative" ref={notiRef}>
            <Image
              src={NotificationHeader}
              alt="notification header icon"
              width={40}
              height={40}
              className="cursor-pointer"
              onClick={() => setOpenNotification(!openNotification)}
            />
            {notifications?.totalCount && (
              <NumberNotification count={notifications?.totalCount} />
            )}
            {openNotification && (
              <NotificationContent
                closeNotification={() => setOpenNotification(false)}
              />
            )}
          </div>
        )}

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

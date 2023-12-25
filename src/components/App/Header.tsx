import { CrownIcon } from "@/assets/icons";
import { LogoWithText } from "@/assets/images";
import { NotificationHeader } from "@/assets/icons";
import { AuthContext, TypePayment } from "@/contexts/useAuthContext";
import { capitalized } from "@/utils/tools";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import AQAvatar from "../AQAvatar";
import { UserPayType } from "@/api-client/types/AuthType";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { SearchContext } from "@/contexts/useSearchContext";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import NotificationContent from "./NotificationContent";
import { useMutation, useQuery } from "react-query";
import NumberNotification from "./NumberNotification";
import {
  checkTotalUnreadCount,
  clearAllNotiByClick,
} from "@/api-client/notification";
import QuickSearch from "./QuickSearch";
import { CoinWhiteIcon } from "@/assets/icons";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import {
  FireIcon,
  HeartIcon,
  BoltIcon,
  FolderIcon,
} from "@heroicons/react/24/solid";
import classNames from "classnames";
import { Profile } from "iconsax-react";
import Link from "next/link";
import { MenuItemType } from "../Layout/SideMenu";

interface IHeader {
  title?: string;
}

const Header: FC<IHeader> = ({ title }) => {
  const router = useRouter();
  const { setKeyword, keyword } = useContext(SearchContext);
  const [searchString, setSearchString] = useState("");
  const { authState, accountExtendDetail, setTypePaymentAction } =
    useContext(AuthContext);

  const [openQuickSearch, setOpenQuickSearch] = useState(false);
  let searchRef: React.MutableRefObject<any> = useRef();
  const [openSeachMobile, setOpenSearchMobile] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  let notiRef: React.MutableRefObject<any> = useRef();
  useEffect(() => {
    // click outside to close notification content
    let handler = (e: any) => {
      if (notiRef.current && !notiRef.current?.contains(e.target))
        setOpenNotification(false);
      if (!searchRef.current || !searchRef.current?.contains(e.target))
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
    if (router.pathname.indexOf("watchlist") !== -1) return "Watchlist";
    if (router.pathname.indexOf("/search") !== -1) return "Search";
    if (router.pathname.indexOf("/alpha-hunter") !== -1) return "Alpha Hunters";
    if (router.pathname.indexOf("/chain") !== -1) return "Chain";
    if (router.pathname.indexOf("/category") !== -1) return "Category";
    if (router.pathname.indexOf("/alpha-hunters") !== -1)
      return "Top Alpha Hunters by Early Discoveries";

    if (title) return title;

    return capitalized(tab ? tab?.toString() : "Trending");
  };

  const { data: unreadCount, refetch: fetchUnreadCount } = useQuery(
    "getUnreadCount",
    checkTotalUnreadCount
  );
  const { mutate: clearAllNoti } = useMutation(
    "clearAllNoti",
    clearAllNotiByClick,
    {
      onSuccess() {
        fetchUnreadCount();
      },
    }
  );

  const { tab } = router.query;

  const onGoApp = () => {
    mixpanelTrack(event_name_enum.inbound, { url: "/projects" });
  };

  const [isShowSubMenuProject, setIsShowSubMenuProject] = useState(true);

  const [listMenu, setListMenu] = useState<MenuItemType[]>([
    {
      key: "watchlist",
      icon: <HeartIcon className="h-5 w-5 mr-2" />,
      label: "Watchlist",
      active: false,
    },
    {
      key: "narratives",
      icon: (
        <Image
          src={CoinWhiteIcon}
          width={20}
          height={20}
          alt="icon"
          className="mr-2"
        />
      ),
      label: "Narratives",
      active: false,
    },
  ]);

  const [listMenuProject, setListMenuProject] = useState<MenuItemType[]>([
    {
      key: "trending",
      icon: <FireIcon className="h-5 w-5 mr-2" />,
      label: "Trending",
      active: false,
    },
    {
      key: "newest",
      icon: <BoltIcon className="h-5 w-5 mr-2" />,
      label: "Newest",
      active: false,
    },
  ]);

  const _checkActiveTab = (item: MenuItemType, index: number) => {
    if (
      router.pathname?.indexOf("watchlist") !== -1 &&
      item.key === "narratives"
    )
      return "hover:bg-secondary-600";
    if (router.pathname?.indexOf(item.key) !== -1 && item.key === "watchlist")
      return "bg-success-500";
    if (tab) {
      if (tab === item.key) return "bg-success-500";
      return "hover:bg-secondary-600";
    }

    if (router.pathname?.includes(item.key)) return "bg-success-500";
    return "hover:bg-secondary-600";
  };

  const renderUrl = (item: MenuItemType) => {
    if (item.key === "narratives") return "/narratives";
    return item.key === "watchlist"
      ? "/watchlist/narratives"
      : `/projects/${item.key}`;
  };

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="font-workSansSemiBold text-[36px] max-lg:hidden">
            {renderTitle()}
          </h1>
          <div className="hidden max-lg:flex gap-2">
            <Bars3Icon
              onClick={() => {
                setOpenMobileMenu(true);
              }}
              className="w-6 h-6 text-white cursor-pointer"
            />

            <Image src={LogoWithText} width={169} height={40} alt="logo" />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div
            className="relative mr-6 max-lg:mr-2 ml-4 max-lg:hidden"
            ref={searchRef}
          >
            <MagnifyingGlassIcon className="w-5 h-5 max-lg:w-4 max-lg:h-4 text-white absolute max-lg:top-[6px] top-[11px] left-[5px]" />

            <input
              className="w-52 max-lg:w-32 max-lg:py-1 bg-secondary-600 py-2 pl-8 max-lg:pl-7 max-lg:text-sm "
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
          <div className="hidden max-lg:block">
            {openSeachMobile ? (
              <div className="fixed h-screen bg-dark-900 z-[1000] top-0 left-0 w-full flex flex-col gap-4 px-6 pt-6">
                <XMarkIcon
                  className="h-7 w-7 transition-all duration-300"
                  onClick={() => setOpenSearchMobile(false)}
                />
                <div className="relative max-lg:overflow-auto" ref={searchRef}>
                  <MagnifyingGlassIcon className="w-5 h-5 text-white absolute top-2 left-[5px]" />
                  <input
                    className="w-full bg-secondary-600 py-2 pl-8 text-sm"
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
                      closeSearchMobile={() => setOpenSearchMobile(false)}
                    />
                  )}
                </div>
              </div>
            ) : (
              <MagnifyingGlassIcon
                className="w-6 h-6 text-white max-lg:mr-3"
                onClick={() => {
                  setSearchString("");
                  setOpenSearchMobile(true);
                }}
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
                onClick={() => {
                  setOpenNotification(!openNotification);
                  if (!!unreadCount?.unreadCount) {
                    clearAllNoti();
                  }
                }}
              />
              {!!unreadCount?.unreadCount && (
                <NumberNotification count={unreadCount?.unreadCount} />
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

          <div className="max-lg:hidden flex">
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
          </div>

          {accountExtendDetail?.currentPlanKey ===
          UserPayType.PREMIUM ? null : (
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

      <div
        className={classNames(
          "w-full h-screen top-0 absolute duration-300 z-[10000] transition-all bg-[#11141E] left-0 px-[16px] py-[26px] hidden flex-col",
          {
            "max-lg:hidden": !openMobileMenu,
            "max-lg:flex": openMobileMenu,
          }
        )}
      >
        <XMarkIcon
          className="h-7 w-7 transition-all duration-300 cursor-pointer"
          onClick={() => {
            console.log("openMobileMenu", openMobileMenu);

            setOpenMobileMenu(false);
          }}
        />

        <div>
          <ul className="w-full pt-9">
            {listMenu.map((value, index) => {
              return (
                <li className="mt-2" key={value.key}>
                  <div
                    className={`p-[13px] transition-all duration-300 ${_checkActiveTab(
                      value,
                      index
                    )} border-b border-[#27272A] w-full`}
                  >
                    <Link
                      onClick={() => {
                        mixpanelTrack(event_name_enum.inbound, {
                          url: renderUrl(value),
                        });
                      }}
                      href={renderUrl(value)}
                      className={`flex transition-all duration-300 text-white`}
                    >
                      {value.icon}
                      {value.label}
                    </Link>
                  </div>
                </li>
              );
            })}

            <ul className="">
              <button
                className="mt-2 w-full border-b border-[#27272A]"
                onClick={() => setIsShowSubMenuProject(!isShowSubMenuProject)}
              >
                <div className="p-[13px] flex justify-between items-center w-full">
                  <div className="flex items-center">
                    <FolderIcon className="h-5 w-5 mr-2" />
                    <p className="text-white">Projects</p>
                  </div>
                  {
                    <ChevronDownIcon
                      className={classNames(
                        "h-5 w-5 transition-all duration-200",
                        {
                          "transform rotate-180": isShowSubMenuProject,
                        }
                      )}
                    />
                  }
                </div>
              </button>
              <div className="pl-11">
                {listMenuProject.map((value, index) => {
                  return (
                    <li
                      className={classNames(
                        "mt-2 transition-all duration-200 border-b border-[#27272A]",
                        {
                          "h-[50px] opacity-100": isShowSubMenuProject,
                          "h-0 opacity-0": !isShowSubMenuProject,
                        }
                      )}
                      key={value.key}
                    >
                      <div
                        className={`py-[13px] transition-all duration-300 ${_checkActiveTab(
                          value,
                          index
                        )} w-full`}
                      >
                        <Link
                          onClick={() => {
                            mixpanelTrack(event_name_enum.inbound, {
                              url:
                                value.key === "watchlist"
                                  ? "/watchlist/projects"
                                  : `/projects/${value.key}`,
                            });
                          }}
                          href={
                            value.key === "watchlist"
                              ? "/watchlist/projects"
                              : `/projects/${value.key}`
                          }
                          className={`flex transition-all duration-300 text-white`}
                        >
                          <p className="">{value.label}</p>
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </div>
            </ul>
            <button
              className="mt-2 w-full"
              onClick={() => router.push("/alpha-hunters")}
            >
              <div
                className={classNames(
                  "p-[13px] flex justify-between items-center w-full transition-all duration-300",
                  {
                    "bg-success-500":
                      router.pathname.includes("/alpha-hunters"),
                    "hover:bg-secondary-600":
                      !router.pathname.includes("/alpha-hunters"),
                  }
                )}
              >
                <div className="flex items-center">
                  <Profile variant="Bold" className="h-6 w-6 mr-2" />
                  <p className="text-white">Alpha Hunters</p>
                </div>
                {/* {
              <ChevronDownIcon
                className={classNames("h-5 w-5 transition-all duration-200", {
                  "transform rotate-180": isShowSubMenuProject,
                })}
              />
            } */}
              </div>
            </button>

            <li>
              <button
                onClick={() => router.push("/account-details")}
                className="w-full mt-4"
              >
                <div className="p-[13px] flex justify-between items-center w-full bg-[#FFFFFF] bg-opacity-5">
                  <AQAvatar isShowText />
                  <ChevronRightIcon className="h-5 w-5 text-white" />
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;

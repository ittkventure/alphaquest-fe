import { CoinWhiteIcon } from "@/assets/icons";
import { LogoWithText } from "@/assets/images";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import {
  FireIcon,
  HeartIcon,
  BoltIcon,
  FolderIcon,
} from "@heroicons/react/24/solid";
import classNames from "classnames";
import { Profile } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface MenuItemType {
  key: string;
  icon: JSX.Element;
  label: string;
  active: boolean;
}

const SideMenu = () => {
  const router = useRouter();
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
      ? "/watchlist/projects"
      : `/projects/${item.key}`;
  };

  return (
    <aside className="fixed transition-all duration-300 top-0 left-0 z-40 w-64 h-screen border-r border-white border-opacity-20 px-3 py-6 max-lg:hidden">
      <ul className="w-full">
        <li className="mb-8">
          <button onClick={onGoApp} className="cursor-pointer">
            <a href="/projects">
              <Image src={LogoWithText} width={169} height={40} alt="logo" />
            </a>
          </button>
        </li>

        {listMenu.map((value, index) => {
          return (
            <li className="mt-2" key={value.key}>
              <div
                className={`p-[13px] transition-all duration-300 ${_checkActiveTab(
                  value,
                  index
                )} w-full`}
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
            className="mt-2 w-full"
            onClick={() => setIsShowSubMenuProject(!isShowSubMenuProject)}
          >
            <div className="p-[13px] flex justify-between items-center w-full">
              <div className="flex items-center">
                <FolderIcon className="h-5 w-5 mr-2" />
                <p className="text-white">Projects</p>
              </div>
              {
                <ChevronDownIcon
                  className={classNames("h-5 w-5 transition-all duration-200", {
                    "transform rotate-180": isShowSubMenuProject,
                  })}
                />
              }
            </div>
          </button>
          {listMenuProject.map((value, index) => {
            return (
              <li
                className={classNames("mt-2 transition-all duration-200", {
                  "h-[50px] opacity-100": isShowSubMenuProject,
                  "h-0 opacity-0": !isShowSubMenuProject,
                })}
                key={value.key}
              >
                <div
                  className={`p-[13px] transition-all duration-300 ${_checkActiveTab(
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
                    <p className="ml-7">{value.label}</p>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
        <button
          className="mt-2 w-full"
          onClick={() => router.push("/alpha-hunters")}
        >
          <div
            className={classNames(
              "p-[13px] flex justify-between items-center w-full transition-all duration-300",
              {
                "bg-success-500": router.pathname.includes(
                  "/alpha-hunters"
                ),
                "hover:bg-secondary-600": !router.pathname.includes(
                  "/alpha-hunters"
                ),
              }
            )}
          >
            <div className="flex items-center">
              <Profile variant="Bold" className="h-6 w-6 mr-2" />
              <p className="text-white">Alpha Hunter</p>
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
      </ul>

      <div className="absolute left-0 bottom-0 border-t border-white border-opacity-20 w-full px-6 pt-4 pb-6">
        <ul>
          <li className="mt-2">
            <Link
              onClick={() => {
                mixpanelTrack(event_name_enum.outbound, {
                  url: "https://twitter.com/alphaquestio",
                });
              }}
              href={"https://twitter.com/alphaquestio"}
              target="_blank"
            >
              Twitter
            </Link>
          </li>

          <li className="mt-2">
            <Link
              onClick={() => {
                mixpanelTrack(event_name_enum.outbound, {
                  url: "https://t.me/alphaquestio",
                });
              }}
              href={"https://t.me/alphaquestio"}
              target="_blank"
            >
              Support
            </Link>
          </li>
          <li className="mt-2">
            <Link
              onClick={() => {
                mixpanelTrack(event_name_enum.outbound, {
                  url: "https://discord.gg/EsMqKqjKB2",
                });
              }}
              href={"https://discord.gg/EsMqKqjKB2"}
              target="_blank"
            >
              Discord
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideMenu;

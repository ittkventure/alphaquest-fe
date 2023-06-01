import { LogoWithText } from "@/assets/images";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { FireIcon, HeartIcon, BoltIcon } from "@heroicons/react/24/solid";
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

    router.push("/projects");
  };

  const [listMenu, setListMenu] = useState<MenuItemType[]>([
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
    {
      key: "watchlist",
      icon: <HeartIcon className="h-5 w-5 mr-2" />,
      label: "Watchlist",
      active: false,
    },
  ]);

  const _checkActiveTab = (item: MenuItemType, index: number) => {
    if (router.pathname === `/watchlist/projects` && item.key === "watchlist")
      return "bg-success-500";
    if (!tab && router.pathname === `/projects/${item.key}` && index != 0)
      return "bg-success-500";
    if (!tab && index === 0 && router.pathname !== `/watchlist/projects`)
      return "bg-success-500";
    return tab === item.key ? "bg-success-500" : "hover:bg-secondary-600";
  };

  return (
    <aside className="fixed transition-all duration-300 top-0 left-0 z-40 w-64 h-screen border-r border-white border-opacity-20 px-3 py-6 max-lg:hidden">
      <ul className="w-full">
        <li className="mb-8">
          <button onClick={onGoApp} className="cursor-pointer">
            <Image src={LogoWithText} width={169} height={40} alt="logo" />
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
                  className={`flex transition-all duration-300 ${
                    tab === value.key ? "text-dark-900 " : "text-white"
                  }`}
                >
                  {value.icon}
                  {value.label}
                </Link>
              </div>
            </li>
          );
        })}
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

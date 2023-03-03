import { NewestIcon, TrendingIcon } from "@/assets/icons";
import { LogoWithText } from "@/assets/images";
import { FireIcon, HeartIcon, BoltIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SideMenu = () => {
  const router = useRouter();
  const { tab } = router.query;

  const [listMenu, setListMenu] = useState([
    {
      key: "trending",
      url: "/app/trending",
      icon: <FireIcon className="h-5 w-5 mr-2" />,
      label: "Trending",
      active: false,
    },
    {
      key: "newest",
      url: "/app/newest",
      icon: <BoltIcon className="h-5 w-5 mr-2" />,
      label: "Newest",
      active: false,
    },
    {
      key: "watchlist",
      url: "/app/watchlist",
      icon: <HeartIcon className="h-5 w-5 mr-2" />,
      label: "Watch List",
      active: false,
    },
  ]);

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen border-r border-white border-opacity-20 px-3 py-6 max-lg:hidden">
      <ul className="w-full">
        <li className="mb-6">
          <Image src={LogoWithText} width={169} height={40} alt="logo" />
        </li>

        {listMenu.map((value, index) => {
          return (
            <li className="mt-2" key={value.key}>
              <div
                className={`p-[13px] ${
                  tab === value.key
                    ? "bg-success-500"
                    : "hover:bg-secondary-600"
                } w-full`}
              >
                <a
                  href={`/app/${value.key}`}
                  className={`flex ${
                    tab === value.key ? "text-dark-900 " : "text-white"
                  }`}
                >
                  {value.icon}
                  {value.label}
                </a>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="absolute left-0 bottom-0 border-t border-white border-opacity-20 w-full px-6 pt-4 pb-6">
        <ul>
          <li className="mt-2">
            <a href="#">About</a>
          </li>
          <li className="mt-2">
            <a href="#">Twitter</a>
          </li>
          <li className="mt-2">
            <a href="#">Discord</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideMenu;

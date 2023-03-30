import React, { FC } from "react";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";

interface TabAppTypes {
  onChangeTab: (tabIndex: number) => void;
}

const TabApp: FC<TabAppTypes> = ({ onChangeTab }) => {
  const router = useRouter();
  const { tab } = router.query;

  const _handleSelectTab = (): number | undefined => {
    switch (tab) {
      case "trending":
        return 0;
      case "newest":
        return 1;
      case "watchlist":
        return 2;
      default:
        return 0;
    }
  };

  return (
    <Tab.Group selectedIndex={_handleSelectTab()} onChange={onChangeTab}>
      <Tab.List className="flex mb-3">
        <Tab
          onClick={() => {
            router.push("/app/trending");
          }}
          className="flex-1 h-full py-2 ui-selected:border-b-[3px] ui-selected:border-b-success-500 text-white ui-not-selected:border-b ui-not-selected:border-b-secondary-600"
        >
          Trending
        </Tab>
        <Tab
          onClick={() => router.push("/app/newest")}
          className="flex-1 h-full py-2 ui-selected:border-b-[3px] ui-selected:border-b-success-500 text-white ui-not-selected:border-b ui-not-selected:border-b-secondary-600"
        >
          Newest
        </Tab>
        {/* <Tab
          onClick={() => router.push("/app/watchlist")}
          className="flex-1 h-full py-2 ui-selected:border-b-[3px] ui-selected:border-b-success-500 text-white ui-not-selected:border-b ui-not-selected:border-b-secondary-600"
        >
          Watchlist
        </Tab> */}
      </Tab.List>
    </Tab.Group>
  );
};

export default TabApp;

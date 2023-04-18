import React, { FC, useContext } from "react";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/useAuthContext";
import { UserPayType } from "@/api-client/types/AuthType";

interface TabAppTypes {
  onChangeTab: (tabIndex: number) => void;
}

const TabApp: FC<TabAppTypes> = ({ onChangeTab }) => {
  const router = useRouter();
  const { tab } = router.query;
  const { accountExtendDetail } = useContext(AuthContext);

  const _handleSelectTab = (): number | undefined => {
    if (router.pathname === "/projects/watchlist/me") return 2;
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
            router.push("/projects/trending");
          }}
          className="flex-1 h-full py-2 ui-selected:border-b-[3px] ui-selected:border-b-success-500 text-white ui-not-selected:border-b ui-not-selected:border-b-secondary-600"
        >
          Trending
        </Tab>
        <Tab
          onClick={() => router.push("/projects/newest")}
          className="flex-1 h-full py-2 ui-selected:border-b-[3px] ui-selected:border-b-success-500 text-white ui-not-selected:border-b ui-not-selected:border-b-secondary-600"
        >
          Newest
        </Tab>
        {accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM ? (
          <Tab
            onClick={() => router.push("/projects/watchlist/me")}
            className="flex-1 h-full py-2 ui-selected:border-b-[3px] ui-selected:border-b-success-500 text-white ui-not-selected:border-b ui-not-selected:border-b-secondary-600"
          >
            Watchlist
          </Tab>
        ) : null}
      </Tab.List>
    </Tab.Group>
  );
};

export default TabApp;

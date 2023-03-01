import React, { FC } from "react";
import { Tab } from "@headlessui/react";

const TabApp: FC = () => {
  return (
    <Tab.Group>
      <Tab.List className="flex mb-3">
        <Tab className="flex-1 h-full py-2 ui-selected:border-b-[3px] ui-selected:border-b-success-500 text-white ui-not-selected:border-b ui-not-selected:border-b-secondary-600">
          Trending
        </Tab>
        <Tab className="flex-1 h-full py-2 ui-selected:border-b-[3px] ui-selected:border-b-success-500 text-white ui-not-selected:border-b ui-not-selected:border-b-secondary-600">
          Newest
        </Tab>
        <Tab className="flex-1 h-full py-2 ui-selected:border-b-[3px] ui-selected:border-b-success-500 text-white ui-not-selected:border-b ui-not-selected:border-b-secondary-600">
          Watchlist
        </Tab>
      </Tab.List>
    </Tab.Group>
  );
};

export default TabApp;

import SideMenu from "@/components/Layout/SideMenu";
import SEO from "@/components/SEO";
import React, { FC } from "react";

interface AppLayoutTypes {
  children: React.ReactElement;
}

const AppLayout: FC<AppLayoutTypes> = ({ children }) => {
  return (
    <div>
      <SEO />
      <div className="flex pl-64 max-lg:pl-0 overflow-x-hidden">
        {children}

        <SideMenu />
      </div>
    </div>
  );
};

export default AppLayout;

import Header from "@/components/App/Header";
import Spinner from "@/components/Spinner";
import TopAlphaHunterByDiscoveries from "@/components/TopAlphaHunterByDiscoveries";
import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import React from "react";

const TopAlphaHunterByDiscoveriesPage: NextPage = () => {
  return (
    <AppLayout>
      <div className="w-full">
        <div className="p-6">
          <Header />
          <div className="h-[1px] bg-white bg-opacity-20 my-4 max-lg:hidden" />
        </div>
        <TopAlphaHunterByDiscoveries />
      </div>
    </AppLayout>
  );
};

export default TopAlphaHunterByDiscoveriesPage;

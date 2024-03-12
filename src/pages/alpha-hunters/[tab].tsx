import Header from "@/components/App/Header";
import TopAlphaHunterByDiscoveries from "@/components/TopAlphaHunterByDiscoveries";
import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const AlphaHunterMention: NextPage = () => {
  const router = useRouter();
  const { tab } = router.query;
  return (
    <AppLayout>
      <div className="w-full">
        <div className="p-6">
          <Header />
          <div className="h-[1px] bg-white bg-opacity-20 my-4 max-lg:hidden" />
        </div>
        <TopAlphaHunterByDiscoveries isMentioned={tab === "mentioned"} />
      </div>
    </AppLayout>
  );
};

export default AlphaHunterMention;

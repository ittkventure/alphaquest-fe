import ApiTwitter from "@/api-client/twitter";
import { UserPayType } from "@/api-client/types/AuthType";
import { TwitterItem } from "@/api-client/types/TwitterType";
import AppContent from "@/components/App";
import Header from "@/components/App/Header";
import Watchlist from "@/components/App/Watchlist";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/contexts/useAuthContext";
import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

const AppPage: NextPage = () => {
  const { authState, accountExtendDetail } = useContext(AuthContext);
  const apiTwitter = new ApiTwitter();
  const router = useRouter();
  const { isLoading, error, data } = useQuery({
    queryKey: [
      "getWatchListTwitter",
      accountExtendDetail?.currentPlanKey,
      authState?.access_token,
      router.pathname,
    ],
    queryFn: async () => {
      if (accountExtendDetail?.currentPlanKey === UserPayType.FREE)
        return { data: {} };

      return await apiTwitter.getListTwitterWatchList(
        {
          pageNumber: 1,
          pageSize: accountExtendDetail?.currentPlanKey === "FREE" ? 10 : 20,
          timeFrame: "7D",
          sortBy: "SCORE",
          newest: false,
        },
        authState?.access_token ?? ""
      );
    },
  });

  return (
    <AppLayout>
      {isLoading === false ? (
        <Watchlist
          listItemsProps={data?.items ?? []}
          totalCountProps={data?.totalCount ?? 0}
        />
      ) : (
        <div className="w-full">
          <div className="p-6">
            <Header />
            <div className="h-[1px] bg-white bg-opacity-20 my-4 max-lg:hidden" />
          </div>
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default AppPage;

export async function getServerSideProps({ params }: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

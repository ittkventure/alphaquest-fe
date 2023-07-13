import ApiTwitter from "@/api-client/twitter";
import { UserPayType } from "@/api-client/types/AuthType";
import { TwitterItem } from "@/api-client/types/TwitterType";
import AppContent from "@/components/App";
import Header from "@/components/App/Header";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/contexts/useAuthContext";
import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

interface Props {
  chainQuery?: string;
  categoryQuery?: string;
}

const AppPage: NextPage<Props> = ({ chainQuery, categoryQuery }) => {
  const { authState, accountExtendDetail } = useContext(AuthContext);
  const apiTwitter = new ApiTwitter();

  const { isLoading, error, data } = useQuery({
    queryKey: [
      "getListTwitter",
      accountExtendDetail?.currentPlanKey,
      authState?.access_token,
    ],
    queryFn: async () =>
      await apiTwitter.getListTwitter(
        {
          pageNumber: 1,
          pageSize: accountExtendDetail?.currentPlanKey === "FREE" ? 10 : 20,
          timeFrame: "7D",
          sortBy: "SCORE",
          newest: false,
          chains: chainQuery ? [chainQuery] : [],
          categories: categoryQuery ? [categoryQuery] : [],
        },
        authState?.access_token ?? "",
        authState?.access_token &&
          accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM
          ? false
          : true
      ),
  });

  return (
    <AppLayout>
      {isLoading === false ? (
        <AppContent
          listItemsProps={data.items}
          totalCountProps={data.discoveredProjectCount}
          chainQuery={chainQuery}
          categoryQuery={categoryQuery}
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

export async function getServerSideProps({ params, query }: any) {
  return {
    props: {
      chainQuery: query?.chain ?? null,
      categoryQuery: query?.category ?? null,
    }, // will be passed to the page component as props
  };
}

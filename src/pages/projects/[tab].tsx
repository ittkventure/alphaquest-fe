import ApiTwitter from "@/api-client/twitter";
import { UserPayType } from "@/api-client/types/AuthType";
import AppContent from "@/components/App";
import Header from "@/components/App/Header";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/contexts/useAuthContext";
import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import React, { useContext } from "react";
import { useQuery } from "react-query";

interface Props {
  tab?: string;
  newest: boolean;
}

const AppPage: NextPage<Props> = ({ tab, newest }: Props) => {
  const { authState, accountExtendDetail } = useContext(AuthContext);
  const apiTwitter = new ApiTwitter();

  const { isLoading, data } = useQuery({
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
          newest: newest,
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
          totalCountProps={
            tab === "watchlist" ? data.totalCount : data.discoveredProjectCount
          }
          tab={tab}
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
    props: {
      tab: params?.tab,
      newest: params?.tab === "newest" ? true : false,
    }, // will be passed to the page component as props
  };
}

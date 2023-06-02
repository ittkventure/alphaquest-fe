import ApiTwitter from "@/api-client/twitter";
import { UserPayType } from "@/api-client/types/AuthType";
import Header from "@/components/App/Header";
import SearchView from "@/components/App/Search";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/contexts/useAuthContext";
import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useQuery } from "react-query";

interface IAppPage {
  keyword: string;
}

const AppPage: NextPage<IAppPage> = ({ keyword }) => {
  const { authState, accountExtendDetail } = useContext(AuthContext);
  const apiTwitter = new ApiTwitter();
  const router = useRouter();
  const { isLoading, data } = useQuery({
    queryKey: [
      "getWatchListTwitter",
      accountExtendDetail?.currentPlanKey,
      authState?.access_token,
      router.pathname,
    ],
    queryFn: async () => {
      if (
        accountExtendDetail?.currentPlanKey === UserPayType.FREE ||
        !authState?.access_token
      )
        return { data: {} };

      return await apiTwitter.getListTwitter(
        {
          pageNumber: 1,
          pageSize: accountExtendDetail?.currentPlanKey === "FREE" ? 10 : 20,
          searchText: keyword,
        },
        authState?.access_token ?? ""
      );
    },
  });

  return (
    <AppLayout>
      {isLoading === false ? (
        <SearchView
          listItemsProps={data?.items ?? []}
          totalCountProps={data?.totalCount ?? 0}
          keywordProps={keyword}
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

export async function getServerSideProps(context: any) {
  const { keyword } = context.query; // params.keyword

  return {
    props: {
      keyword: keyword ?? "",
    }, // will be passed to the page component as props
  };
}

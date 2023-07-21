import ApiTwitter from "@/api-client/twitter";
import { UserPayType } from "@/api-client/types/AuthType";
import AppContent from "@/components/App";
import Header from "@/components/App/Header";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/contexts/useAuthContext";
import AppLayout from "@/layouts/AppLayout";
import React, { FC, useContext } from "react";
import { useQuery } from "react-query";

interface Props {
  name?: string;
}

const CategoryPage: FC<Props> = ({ name }) => {
  const { authState, accountExtendDetail } = useContext(AuthContext);
  const apiTwitter = new ApiTwitter();

  const { isLoading, error, data } = useQuery({
    queryKey: [
      "getListTwitter" + name,
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
          categories: [name ?? ""],
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
          categoryParams={[name ?? ""]}
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

export default CategoryPage;

export async function getServerSideProps({ params }: any) {
  const { name } = params;

  if (!name) {
    return "404";
  }

  return {
    props: {
      name,
    }, // will be passed to the page component as props
  };
}

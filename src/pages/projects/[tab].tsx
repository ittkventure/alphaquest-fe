import ApiTwitter from "@/api-client/twitter";
import { TwitterItem } from "@/api-client/types/TwitterType";
import AppContent from "@/components/App";
import Header from "@/components/App/Header";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/contexts/useAuthContext";
import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

interface Props {
  tab?: string;
  newest: boolean;
}

const AppPage: NextPage<Props> = ({ tab, newest }: Props) => {
  const { authState, accountExtendDetail } = useContext(AuthContext);
  const router = useRouter();
  const [listItems, setListItems] = useState<TwitterItem[]>([]);
  const [totalCount, setTotalCount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const apiTwitter = new ApiTwitter();

  const getData = async () => {
    const getData = await apiTwitter.getListTwitter(
      {
        pageNumber: 1,
        pageSize: accountExtendDetail?.currentPlanKey === "FREE" ? 10 : 20,
        timeFrame: "7D",
        sortBy: "SCORE",
        newest: newest,
      },
      authState?.access_token ?? "",
      authState?.access_token ? false : true
    );

    setIsLoading(false);
    setListItems(getData.items ?? []);
    setTotalCount(getData.totalCount?.toString() ?? "");
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState?.access_token, accountExtendDetail]);

  return (
    <AppLayout>
      {isLoading === false ? (
        <AppContent listItemsProps={listItems} totalCountProps={totalCount} />
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

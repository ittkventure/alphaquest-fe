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
  listItems?: TwitterItem[];
  totalCount?: string;
}

const AppPage: NextPage<Props> = () => {
  const { authState } = useContext(AuthContext);
  const router = useRouter();
  const [listItems, setListItems] = useState<TwitterItem[]>([]);
  const [totalCount, setTotalCount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const apiTwitter = new ApiTwitter();

  const getData = async () => {
    const getData = await apiTwitter.getListTwitter(
      {
        pageNumber: 1,
        pageSize: 20,
        timeFrame: "7D",
        sortBy: "SCORE",
        newest: false,
      },
      authState?.access_token ?? ""
    );

    setListItems(getData.items ?? []);
    setTotalCount(getData.totalCount?.toString() ?? "");
    setIsLoading(false);
  };

  useEffect(() => {
    if (authState?.access_token) getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState?.access_token]);

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
    props: {}, // will be passed to the page component as props
  };
}

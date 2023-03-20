import ApiTwitter from "@/api-client/twitter";
import { TwitterItem } from "@/api-client/types/TwitterType";
import AppContent from "@/components/App";
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
  const { authState } = useContext(AuthContext);
  const router = useRouter();
  const [listItems, setListItems] = useState<TwitterItem[]>([]);
  const [totalCount, setTotalCount] = useState<string>("");
  const apiTwitter = new ApiTwitter();

  const getData = async () => {
    const getData = await apiTwitter.getListTwitter(
      {
        pageNumber: 1,
        pageSize: 20,
        timeFrame: "7D",
        sortBy: "SCORE",
        newest: newest,
      },
      authState?.access_token ?? ""
    );

    setListItems(getData.items ?? []);
    setTotalCount(getData.totalCount?.toString() ?? "");
  };

  useEffect(() => {
    if (authState?.access_token) getData();
  }, []);

  return (
    <AppLayout>
      <AppContent
        listItemsProps={listItems ?? []}
        totalCountProps={totalCount}
      />
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

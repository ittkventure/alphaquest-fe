import ApiTwitter from "@/api-client/twitter";
import { TwitterItem } from "@/api-client/types/TwitterType";
import AppContent from "@/components/App";
import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import React from "react";

interface Props {
  listItems?: TwitterItem[];
  totalCount?: string;
}

const AppPage: NextPage<Props> = ({ listItems, totalCount }: Props) => {
  return (
    <AppLayout>
      <AppContent listItemsProps={listItems} totalCountProps={totalCount} />
    </AppLayout>
  );
};

export default AppPage;

export async function getServerSideProps({ params }: any) {
  const apiTwitter = new ApiTwitter();

  const getData = await apiTwitter.getListTwitter({
    pageNumber: 1,
    pageSize: 20,
    timeFrame: "7D",
    sortBy: "SCORE",
    newest: false,
  });

  return {
    props: {
      listItems: getData.items ?? [],
      totalCount: getData.totalCount ?? "",
    }, // will be passed to the page component as props
  };
}

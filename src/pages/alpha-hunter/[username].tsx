import AlphaHunter from "@/components/AlphaHunter";
import Header from "@/components/App/Header";
import AppLayout from "@/layouts/AppLayout";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect } from "react";

type IAlphaHunterPage = {
  username: string;
};

const AlphaHunterPage: NextPage<IAlphaHunterPage> = ({ username }) => {
  useEffect(() => {
    mixpanelTrack(event_name_enum.on_open_alpha_hunter, {
      projectName: username,
    });
  }, []);
  return (
    <AppLayout>
      <div className="w-full">
        <div className="p-6">
          <Header title="Project" />
          <div className="h-[1px] bg-white bg-opacity-20 my-4 max-lg:hidden" />
        </div>
        <div className="flex flex-col mx-2 ">
          <AlphaHunter userId={username} />
        </div>
      </div>
    </AppLayout>
  );
};

export default AlphaHunterPage;

export const getServerSideProps: GetServerSideProps<
  IAlphaHunterPage | {}
> = async ({ params }) => {
  if (!params?.username) {
    return { notFound: true };
  }

  return { props: { username: params.username } };
};

import AlphaHunterMention from "@/components/AlphaHunter/AlphaHunterMention";
import Header from "@/components/App/Header";
import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";

const AlphaHunterMentionPage: NextPage = () => {
  return (
    <AppLayout>
      <div className="w-full">
        <div className="p-6">
          <Header />
          <div className="h-[1px] bg-white bg-opacity-20 my-4 max-lg:hidden" />
        </div>
        <AlphaHunterMention />
      </div>
    </AppLayout>
  );
};

export default AlphaHunterMentionPage;

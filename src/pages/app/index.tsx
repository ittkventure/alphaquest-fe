import ApiTwitter from "@/api-client/twitter";
import AppContent from "@/components/App";
import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import React from "react";

const AppPage: NextPage = () => {
  return (
    <AppLayout>
      <AppContent />
    </AppLayout>
  );
};

export default AppPage;

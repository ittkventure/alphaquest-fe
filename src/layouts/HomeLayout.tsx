import { LogoWithText } from "@/assets/images";
import HomeFooter from "@/components/Layout/HomeFooter";
import HomeNav from "@/components/Layout/HomeNav";
import SEO from "@/components/SEO";
import Image from "next/image";
import React, { FC } from "react";

interface HomeLayoutTypes {
  children: React.ReactElement;
}

const HomeLayout: FC<HomeLayoutTypes> = ({ children }) => {
  return (
    <div>
      <SEO />
      <HomeNav />
      {children}
      <HomeFooter />
    </div>
  );
};

export default HomeLayout;

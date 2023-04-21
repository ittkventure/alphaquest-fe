import { LogoWithText } from "@/assets/images";
import HomeFooter from "@/components/Layout/HomeFooter";
import HomeNav from "@/components/Layout/HomeNav";
import SEO from "@/components/SEO";
import Image from "next/image";
import React, { FC } from "react";

interface HomeLayoutTypes {
  children: React.ReactElement;
  hiddenFooter?: boolean;
  isApp?: boolean;
}

const HomeLayout: FC<HomeLayoutTypes> = ({
  hiddenFooter,
  children,
  isApp = false,
}) => {
  return (
    <div>
      <SEO />
      <HomeNav isApp={isApp} />
      <div className="pt-[100px]">{children}</div>
      {!hiddenFooter ? <HomeFooter /> : null}
    </div>
  );
};

export default HomeLayout;

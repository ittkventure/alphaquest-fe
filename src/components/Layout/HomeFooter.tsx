import { LogoWithText } from "@/assets/images";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface HomeFooterTypes {}

const HomeFooter: FC<HomeFooterTypes> = () => {
  return (
    <div className="flex flex-col justify-center items-center py-[30px]">
      <div>
        <Image src={LogoWithText} width={169} height={40} alt="logo" />
      </div>
      <ul className="flex max-lg:flex-wrap max-lg:justify-center mt-2">
        <li>
          <Link
            onClick={() => {
              mixpanelTrack(event_name_enum.outbound, {
                url: "https://twitter.com/alphaquestio",
              });
            }}
            href={"https://twitter.com/alphaquestio"}
            target="_blank"
          >
            Twitter <span className="mr-1 text-success-500">/</span>
          </Link>
        </li>

        <li>
          <Link
            onClick={() => {
              mixpanelTrack(event_name_enum.inbound, {
                url: "/privacy-policy",
              });
            }}
            href={"/privacy-policy"}
          >
            Privacy policy <span className="mr-1 text-success-500">/</span>
          </Link>
        </li>

        <li>
          <Link
            onClick={() => {
              mixpanelTrack(event_name_enum.inbound, {
                url: "/terms",
              });
            }}
            href={"/terms"}
          >
            Terms <span className="mr-1 text-success-500">/</span>
          </Link>
        </li>

        <li>
          <Link
            onClick={() => {
              mixpanelTrack(event_name_enum.outbound, {
                url: "https://t.me/alphaquestio",
              });
            }}
            href={"https://t.me/alphaquestio"}
            target="_blank"
          >
            Contact us <span className="mr-1 text-success-500">/</span>
          </Link>
        </li>

        <li>
          <Link
            onClick={() => {
              mixpanelTrack(event_name_enum.outbound, {
                url: "https://coinwire.com/",
              });
            }}
            href={"https://coinwire.com/"}
            target="_blank"
          >
            CoinWire <span className="mr-1 text-success-500">/</span>
          </Link>
        </li>

        <li>
          <Link
            onClick={() => {
              mixpanelTrack(event_name_enum.outbound, {
                url: "https://chainplay.gg/",
              });
            }}
            href={"https://chainplay.gg/"}
            target="_blank"
          >
            Chainplay
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HomeFooter;

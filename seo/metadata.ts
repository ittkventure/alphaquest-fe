import { AQ_APP_URL } from "../utils/data";
import { Metadata } from "next";

export const AQMetadata: Metadata = {
  metadataBase: new URL(`${AQ_APP_URL}`),
  title: "Alpha Quest - Uncover The Next Big Thing in Crypto Now - Blog page",
  description:
    "Discover the hottest cryptocurrency projects before they take off with Alpha Quest. Start your 7-day trial for only $9!",
  openGraph: {
    images: `${AQ_APP_URL}/images/thumb.png`,
    title: "Alpha Quest - Uncover The Next Big Thing in Crypto Now - Blog page",
    description:
      "Discover the hottest cryptocurrency projects before they take off with Alpha Quest. Start your 7-day trial for only $9!",
  },
};

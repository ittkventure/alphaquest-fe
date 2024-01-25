"use client";
import { AQ_APP_URL } from "@/utils/data";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathName = usePathname();
  const isBlog = pathName?.includes("blog");
  const isPricing = pathName?.includes("pricing");
  return (
    <div className="lg:px-6 px-4 bg-primary flex max-lg:flex-col max-lg:gap-4 max-lg:py-6 justify-between lg:items-center text-white lg:h-24 fixed z-[100] top-0 w-full">
      <Image
        src="/images/aq_logo.svg"
        alt="AQ logo"
        width={166}
        height={28}
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />
      <div className="flex gap-6 items-center max-lg:justify-between cursor-pointer">
        <div className="flex lg:gap-6 gap-4 items-center">
          <span
            onClick={() => window.open(`https://docs.alphaquest.io/`)}
            className={`pb-2`}
          >
            Docs
          </span>
          <span
            onClick={() => router.push("/blog")}
            className={`${
              isBlog ? "text-btn border-b-[3px] border-btn" : ""
            } pb-2`}
          >
            Blog
          </span>
          <span
            onClick={() => router.push("/pricing")}
            className={`${
              isPricing ? "text-btn border-b-[3px] border-btn" : ""
            } pb-2`}
          >
            Pricing
          </span>
        </div>
        <div className="h-10 bg-main flex items-center px-6 py-3">
          <a href={`${AQ_APP_URL}`} target="_blank">
            Launch App
          </a>
        </div>
      </div>
    </div>
  );
}

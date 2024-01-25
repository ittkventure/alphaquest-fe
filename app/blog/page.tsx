import BlogList from "@/component/blog/BlogList";
import CrytoProject from "@/component/blog/CrytoProject";
import EditerPick from "@/component/blog/EditerPick";
import Research from "@/component/blog/Research";
import Tutorial from "@/component/blog/Turtorial";
import { Metadata } from "next";
import { AQMetadata } from "@/seo/metadata";

export const metadata: Metadata = {
  ...AQMetadata
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="lg:px-56 px-4 lg:mt-28 mt-36">
      <div className="lg:text-[40px] text-2xl font-bold lg:mb-20 mb-8">AlphaQuest Blog</div>
      <EditerPick />
      <CrytoProject searchParams={searchParams} />
      <BlogList searchParams={searchParams} />
      {/* <Research />
      <Tutorial /> */}
    </div>
  );
}

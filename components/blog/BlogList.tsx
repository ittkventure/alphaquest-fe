import Image from "next/image";
import BlogItem from "./BlogItem";
import { fetchAllList } from "@/apis/blog";
import BlogPagination from "../layouts/BlogPagination";

export default async function BlogList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // blogList
  const pageBlog =
    typeof searchParams?.pageBlog === "string"
      ? Number(searchParams.pageBlog)
      : 1;
  const blogList = await fetchAllList(pageBlog);

  return (
    <div className="mt-20">
      <div className="flex gap-3 items-center mb-6">
        <Image
          src="/icons/menu-circle.svg"
          alt="menu circle"
          width={32}
          height={32}
        />
        <span className="lg:text-3xl text-2xl font-semibold">All list</span>
      </div>

      <div className="grid lg:grid-cols-3 grid-rows-1 gap-6">
        {blogList?.items?.map((blog: BlogProject) => (
          <BlogItem {...blog} key={blog?.code} />
        ))}
      </div>
      <div className="flex justify-center mt-6 mb-20">
        <BlogPagination total={blogList?.totalCount} pageSize={9} />
      </div>
    </div>
  );
}

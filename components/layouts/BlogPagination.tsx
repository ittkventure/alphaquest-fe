"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "rc-pagination/lib/Pagination";
import { useEffect, useState } from "react";

type PaginationProps = {
  total: number;
  pageSize: number;
};

export default function BlogPagination({ total, pageSize }: PaginationProps) {
  const searchParams = useSearchParams();
  const pageBlog = Number(searchParams.get("pageBlog")) || 1;
  const [page, setPage] = useState(pageBlog);
  
  useEffect(() => {
    if (!searchParams.has("pageBlog")) setPage(1);
  }, [searchParams])

  const pathname = usePathname();
  const hasPageBlog = searchParams.has("pageBlog");
  const router = useRouter();

  const handleChangePage = (page: number) => {
    setPage(page);
    if (!hasPageBlog)
      router.push(`${pathname}?${searchParams}&pageBlog=${page}`);
    const query = new URLSearchParams(searchParams);
    query.set("pageBlog", `${page}`);
    router.push(`${pathname}?${query}`);
  };

  return (
    <Pagination
      total={total}
      pageSize={pageSize}
      onChange={(_page) => handleChangePage(_page)}
      current={page}
      prevIcon={<></>}
      nextIcon={<></>}
    />
  );
}

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "rc-pagination/lib/Pagination";
import { useEffect, useState } from "react";

type PaginationProps = {
  total: number;
  pageSize: number;
};

export default function ProjectPagination({ total, pageSize }: PaginationProps) {
  const searchParams = useSearchParams();
  const pageProject = Number(searchParams.get("pageProject")) || 1;
  const [page, setPage] = useState(pageProject);
  
  useEffect(() => {
    if (!searchParams.has("pageProject")) setPage(1);
  }, [searchParams])

  const pathname = usePathname();
  const hasPageBlog = searchParams.has("pageProject");
  const router = useRouter();

  const handleChangePage = (page: number) => {
    setPage(page);
    if (!hasPageBlog)
      router.push(`${pathname}?${searchParams}&pageProject=${page}`);
    const query = new URLSearchParams(searchParams);
    query.set("pageProject", `${page}`);
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

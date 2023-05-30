/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { FC, memo, useMemo } from "react";
import { DOTS, usePagination } from "@/hooks/useTable/usePagination";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (current: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount: totalItems,
    pageSize: itemsPerPage,
    siblingCount: 1,
  });

  if (
    currentPage === 0 ||
    paginationRange === undefined ||
    paginationRange.length < 2
  ) {
    return null;
  }

  const onNextClick = () => {
    onPageChange(currentPage + 1);
  };

  const onPreviousClick = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div
      className="flex items-center space-x-0.5 font-medium "
      aria-label="Pagination"
    >
      {paginationRange.map((pageNumber, idx) =>
        pageNumber === DOTS ? (
          <div
            key={idx}
            className="w-8 h-8 flex items-center justify-center rounded-lg"
          >
            &#8230;
          </div>
        ) : (
          <button
            key={idx}
            className={`w-8 h-8 flex items-center justify-center  ${
              currentPage === Number(pageNumber)
                ? "bg-success-500 text-white"
                : "hover:bg-success-600"
            }`}
            onClick={() => onPageChange(Number(pageNumber))}
          >
            {pageNumber}
          </button>
        )
      )}

      <button
        disabled={currentPage === 1}
        onClick={onPreviousClick}
        className={`w-8 h-8 flex items-center justify-center border border-[#38405B] hover:bg-success-500 dark:hover:bg-[#38405B] ${
          currentPage !== 1 ? "text-white" : ""
        }`}
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </button>
      <button
        disabled={currentPage === lastPage}
        onClick={onNextClick}
        className={`w-8 h-8 flex items-center justify-center border border-[#38405B] hover:bg-success-500 ${
          currentPage !== lastPage ? "text-white" : ""
        } dark:hover:bg-[#38405B]`}
      >
        <ChevronRightIcon className="w-4 h-4 " />
      </button>
    </div>
  );
};

export default memo(Pagination);

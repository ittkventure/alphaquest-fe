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
      className="flex items-center space-x-0.5 font-medium"
      aria-label="Pagination"
    >
      <button
        disabled={currentPage === 1}
        onClick={onPreviousClick}
        className={`w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#edf2f7] dark:hover:bg-trueGray-800 ${
          currentPage === 1 ? "hidden" : ""
        }`}
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </button>

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
            className={`w-8 h-8 flex items-center justify-center rounded-lg ${
              currentPage === Number(pageNumber)
                ? "bg-secondary-500 text-white"
                : "hover:bg-[#edf2f7]"
            }`}
            onClick={() => onPageChange(Number(pageNumber))}
          >
            {pageNumber}
          </button>
        )
      )}

      <button
        disabled={currentPage === lastPage}
        onClick={onNextClick}
        className={`w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#edf2f7] ${
          currentPage === lastPage ? "hidden" : ""
        }`}
      >
        <ChevronRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default memo(Pagination);

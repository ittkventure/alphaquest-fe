import React, { memo } from "react";
import Pagination from "./../Pagination";

export interface PaginationInfo {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  currentPage: number;
}

interface Props {
  paginationInfo: PaginationInfo;
  onChange: (pageNumber: number) => void;
}

const TableFooter = ({ paginationInfo, onChange }: Props) => {
  const { pageNumber, pageSize, totalPages, totalElements } = paginationInfo;

  const handlePageChange = (selectedItem: { selected: number }) => {
    if (selectedItem.selected === pageNumber) return;

    onChange(selectedItem.selected);
  };

  return (
    <div className="pt-5 flex flex-col md:flex-row justify-between items-center text-slate-500 dark:text-trueGray-500 text-sm">
      <div>
        <p className="my-5 md:my-0">
          showing{" "}
          {Math.min(
            paginationInfo.currentPage * pageSize - pageSize + 1,
            paginationInfo.totalElements || 0
          )}{" "}
          -{" "}
          {Math.min(
            paginationInfo.currentPage * pageSize,
            paginationInfo.totalElements || 0
          )}{" "}
          out of {paginationInfo.totalElements}
        </p>
      </div>
      <div className="order-first md:order-none">
        <Pagination
          totalItems={paginationInfo.totalElements || 0}
          itemsPerPage={pageSize}
          currentPage={paginationInfo.currentPage}
          onPageChange={onChange}
        />
      </div>
    </div>
  );
};

export default memo(TableFooter);

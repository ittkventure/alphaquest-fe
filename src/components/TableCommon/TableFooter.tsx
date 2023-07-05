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
    <div
      className={`pt-5 mb-20 flex flex-col md:flex-row md:mt-5 justify-end items-center text-sm ${
        totalPages > 1 ? " mt-20" : " mt-0"
      }`}
    >
      <div>
        <p className={`my-5 md:my-0 ${totalPages > 1 ? "mr-4" : "mr-0"}`}>
          Showing rows{" "}
          {Math.min(
            paginationInfo.currentPage * pageSize - pageSize + 1,
            paginationInfo.totalElements || 0
          )}{" "}
          to{" "}
          {Math.min(
            paginationInfo.currentPage * pageSize,
            paginationInfo.totalElements || 0
          )}{" "}
          of {paginationInfo.totalElements}
        </p>
      </div>
      {totalPages > 1 && (
        <div className="order-first md:order-none ">
          <Pagination
            totalItems={paginationInfo.totalElements || 0}
            itemsPerPage={pageSize}
            currentPage={paginationInfo.currentPage}
            onPageChange={onChange}
          />
        </div>
      )}
    </div>
  );
};

export default memo(TableFooter);

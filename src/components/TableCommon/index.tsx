import Spinner from "./../Spinner";
import TableFooter, { PaginationInfo } from "./TableFooter";
import React, { FC } from "react";
import { Column, useTable } from "react-table";

interface ITableCustom
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  columns: Column<any>[];
  data: any[];
  isLoading?: boolean;
  paginationInfo?: PaginationInfo;
  onChangePage: (pageNumber: number) => void;
  refLast?: any;
}

const TableCustom: FC<ITableCustom> = ({
  columns,
  data,
  isLoading,
  paginationInfo,
  onChangePage,
  refLast,
  ...rest
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: data || [] });

  return (
    <div className="w-full h-full">
      <div className=" flex flex-auto flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="max-h-[744px] overflow-y-scroll shadow " {...rest}>
              <table
                className="w-full divide-y divide-gray-200 divide-opacity-5 bg-[#171B28]"
                {...getTableProps()}
              >
                <thead className="bg-[#1F2536] sticky top-0">
                  {
                    // Loop over the header rows
                    headerGroups.map(
                      (headerGroup: {
                        getHeaderGroupProps: any;
                        headers: any[];
                      }) => (
                        // Apply the header row props
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {
                            // Loop over the headers in each row
                            headerGroup.headers.map((column) => {
                              return (
                                // Apply the header cell props
                                <th
                                  {...column.getHeaderProps()}
                                  className={`${
                                    column.columns ? "text-center" : "text-left"
                                  } px-6 py-3 text-sm  uppercase tracking-wider font-bold text-white`}
                                >
                                  {
                                    // Render the header
                                    column.render("Header")
                                  }
                                </th>
                              );
                            })
                          }
                        </tr>
                      )
                    )
                  }
                </thead>
                <tbody
                  className="divide-y divide-gray-200 divide-opacity-5  bg-[#171B28]"
                  {...getTableBodyProps()}
                >
                  {
                    // Loop over the table rows
                    rows.map((row: any, index: number) => {
                      // Prepare the row for display
                      prepareRow(row);
                      if (rows.length === index + 1)
                        return (
                          <tr
                            {...row.getRowProps()}
                            className="hover:bg-opacity-10"
                            ref={refLast}
                          >
                            {
                              // Loop over the rows cells
                              row.cells.map((cell: any) => {
                                // Apply the cell props
                                return (
                                  <td
                                    {...cell.getCellProps()}
                                    className="max-w-xs break-all px-6 py-4 text-sm text-white"
                                  >
                                    {
                                      // Render the cell contents
                                      cell.render("Cell")
                                    }
                                  </td>
                                );
                              })
                            }
                          </tr>
                        );
                      return (
                        // Apply the row props
                        <tr
                          {...row.getRowProps()}
                          className="hover:bg-opacity-10"
                        >
                          {
                            // Loop over the rows cells
                            row.cells.map((cell: any) => {
                              // Apply the cell props
                              return (
                                <td
                                  {...cell.getCellProps()}
                                  className="max-w-xs break-all px-6 py-4 text-sm text-white"
                                >
                                  {
                                    // Render the cell contents
                                    cell.render("Cell")
                                  }
                                </td>
                              );
                            })
                          }
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
              {isLoading && (
                <div className="m-auto my-10 flex w-full justify-center align-middle">
                  <Spinner />
                </div>
              )}
              {data === null && <div className="h-36 w-full" />}
              {data && !data.length && (
                <div className="w-full">
                  <div className="my-20 text-center text-lg"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <TableFooter paginationInfo={paginationInfo} onChange={onChangePage} /> */}
    </div>
  );
};

export default React.memo(TableCustom);

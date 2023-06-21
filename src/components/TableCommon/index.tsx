import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Spinner from "./../Spinner";
import TableFooter, { PaginationInfo } from "./TableFooter";
import React, { FC, useContext } from "react";
import { Column, useTable } from "react-table";
import { AuthContext } from "@/contexts/useAuthContext";
import { UserPayType } from "@/api-client/types/AuthType";

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
  isHiddenTBody?: boolean;
  onSort?: (isSortedDesc: boolean) => void;
  isSortedDesc?: boolean;
  isShowHeader?: boolean;
}

const TableCustom: FC<ITableCustom> = ({
  columns,
  data,
  isLoading,
  paginationInfo,
  onChangePage,
  refLast,
  isHiddenTBody,
  onSort,
  isSortedDesc,
  isShowHeader = true,
  ...rest
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: data || [],
    });
  const { authState, accountExtendDetail, setTypePaymentAction } =
    useContext(AuthContext);
  return (
    <div className="w-full h-full">
      <div className=" flex flex-auto flex-col">
        <div className="-my-2 sm:-mx-6 lg:-mx-8">
          <div
            className={`shadow relative w-full  ${
              authState?.access_token &&
              accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM
                ? "overflow-x-scroll"
                : ""
            }`}
            {...rest}
          >
            <table
              className={`divide-y divide-gray-200 divide-opacity-5 bg-[#171B28] ${
                authState?.access_token &&
                accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM
                  ? "max-h-[800px] h-fit"
                  : ""
              } w-full min-w-[400px] `}
              {...getTableProps()}
            >
              {isShowHeader && (
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
                                  } ${
                                    column.render("Header") === "Accounts"
                                      ? "sticky z-10 top-0 left-[-5px] bg-[#1F2536]"
                                      : ""
                                  } px-6 py-3 text-sm  uppercase tracking-wider font-bold text-white`}
                                >
                                  <div
                                    onClick={() => {
                                      if (
                                        column.render("Header") ===
                                        "Following Date"
                                      ) {
                                        onSort && onSort(!isSortedDesc);
                                      }
                                    }}
                                    className={`flex items-center cursor-pointer ${
                                      column.render("Header") === "Accounts"
                                        ? "max-lg:min-w-[200px] sticky  z-10 top-0 left-[-5px]"
                                        : ""
                                    } ${
                                      column.render("Header") === "Tags"
                                        ? "max-lg:min-w-[200px]"
                                        : ""
                                    } ${
                                      column.render("Header") ===
                                      "Following Date"
                                        ? "max-lg:min-w-[200px]"
                                        : ""
                                    }`}
                                  >
                                    {
                                      // Render the header
                                      column.render("Header")
                                    }
                                    {column.render("Header") ===
                                      "Following Date" &&
                                      (isSortedDesc ? (
                                        <ChevronDownIcon className="h-5 w-5 ml-1" />
                                      ) : (
                                        <ChevronUpIcon className="h-5 w-5 ml-1" />
                                      ))}
                                  </div>
                                </th>
                              );
                            })
                          }
                        </tr>
                      )
                    )
                  }
                </thead>
              )}
              {isHiddenTBody ? null : (
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
                                    className={`${
                                      cell.column?.Header === "Accounts"
                                        ? `sticky ${
                                            isShowHeader && "px-6"
                                          } z-10 left-[-5px] bg-dark-800`
                                        : ""
                                    } max-w-xs break-all py-4 text-sm text-white`}
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
                                  className={`${
                                    cell.column?.Header === "Accounts"
                                      ? `sticky ${
                                          isShowHeader && "px-6"
                                        } z-10 left-[-5px] bg-dark-800`
                                      : ""
                                  } max-w-xs break-all py-4 text-sm text-white`}
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
              )}
            </table>
            {isLoading &&
              (isHiddenTBody ? null : (
                <div className="m-auto my-10 flex w-full justify-center align-middle">
                  <Spinner />
                </div>
              ))}
            {data === null && <div className="h-36 w-full" />}
          </div>
        </div>
      </div>

      {paginationInfo &&
        (accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM &&
        authState?.access_token ? (
          <TableFooter
            paginationInfo={paginationInfo}
            onChange={onChangePage}
          />
        ) : null)}
    </div>
  );
};

export default React.memo(TableCustom);

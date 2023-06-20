import moment from "moment";
import React, { useMemo } from "react";
import { CellProps, Column } from "react-table";
import { ChangeLogs } from "@/api-client/types/TwitterType";
import Image from "next/image";
import { LogoCircle } from "@/assets/images";
import { addLinksToText } from "@/utils/regex";

const useColumTwitterChangeLogs = () => {
  const changeLogs: Column<ChangeLogs>[] = useMemo(
    () => [
      {
        Header: "New Value",
        accessor: "message",
        Cell: ({ value, row }: CellProps<ChangeLogs>) => {
          return (
            <div className="flex items-center">
              <div
                className={`w-10 h-10 min-w-fit min-h-fit rounded-[50%] border-[1px]  border-yellow-400 overflow-hidden relative`}
              >
                <img
                  src={row.original.profileImageUrl}
                  width={40}
                  height={40}
                  alt="avt"
                  className="object-cover z-10"
                />
              </div>
              <div
                className="ml-3 text-[16px] a-custom"
                dangerouslySetInnerHTML={{ __html: addLinksToText(value) }}
              />
            </div>
          );
        },
      },
      {
        Header: "Data Time",
        accessor: "dataTime",
        Cell: ({ value }: CellProps<ChangeLogs>) => (
          <div className="w-full flex justify-end">
            <p className="text-success-500">
              {moment(value).format("MMM DD, YYYY, h:mm:ss A")}
            </p>
          </div>
        ),
      },
    ],
    []
  );

  return {
    changeLogs,
  };
};

export default useColumTwitterChangeLogs;

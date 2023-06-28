import moment from "moment";
import React, { useContext, useMemo } from "react";
import { CellProps, Column } from "react-table";
import { ChangeLogs } from "@/api-client/types/TwitterType";
import { AuthContext } from "@/contexts/useAuthContext";
import { UserPayType } from "@/api-client/types/AuthType";

const useColumTwitterChangeLogs = () => {
  const { accountExtendDetail } = useContext(AuthContext);
  const changeLogs: Column<ChangeLogs>[] = useMemo(
    () => [
      {
        Header: "New Value",
        accessor: "message",
        Cell: ({ value, row }: CellProps<ChangeLogs>) => {
          return (
            <div className="flex items-center">
              <div
                className={`w-10 h-10 min-w-[40px] min-h-[40px] rounded-[50%] border-[1px]   overflow-hidden relative border-yellow-400`}
              >
                <img
                  src={row.original.profileImageUrl}
                  width={40}
                  height={40}
                  alt="avt"
                  className="object-cover z-10"
                />
              </div>
              <p className="ml-3 text-sm">
                {value}{" "}
                {accountExtendDetail?.currentPlanKey !==
                  UserPayType.PREMIUM && (
                  <span>
                    <i>
                      (This section is exclusively revealed to our Pro members.
                      Upgrade your membership to get instant access!)
                    </i>
                  </span>
                )}
              </p>
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

import { TwitterItem } from "@/api-client/types/TwitterType";
import React, { FC, useEffect, useState } from "react";
import TableRow from "./TableRow";

interface TableContentTypes {
  initListRows: TwitterItem[];
  isAnimation?: boolean;
  onReduceCount?: () => void;
}

const TableContent: FC<TableContentTypes> = ({ initListRows, isAnimation }) => {
  const [listRows, setListRows] = useState<TwitterItem[]>(initListRows);

  useEffect(() => {
    setListRows(initListRows);
  }, [initListRows]);

  return (
    <div>
      {listRows.map((value, index) => {
        return (
          <TableRow
            key={index}
            item={value}
            index={index}
            isAnimation={false}
          />
        );
      })}
    </div>
  );
};

export default TableContent;

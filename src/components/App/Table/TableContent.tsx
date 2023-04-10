import { TwitterItem } from "@/api-client/types/TwitterType";
import React, { FC, useEffect, useState } from "react";
import TableRow from "./TableRow";

interface TableContentTypes {
  initListRows: TwitterItem[];
}

const TableContent: FC<TableContentTypes> = ({ initListRows }) => {
  const [listRows, setListRows] = useState<TwitterItem[]>(initListRows);

  useEffect(() => {
    setListRows(initListRows);
  }, [initListRows]);

  return (
    <div>
      {listRows.map((value, index) => {
        return <TableRow key={index} item={value} index={index} />;
      })}
    </div>
  );
};

export default TableContent;

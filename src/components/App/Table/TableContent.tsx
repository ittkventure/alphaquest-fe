import { listRowMock } from "@/utils/list";
import React, { useState } from "react";
import TableRow from "./TableRow";

const TableContent = () => {
  const [listRows, setListRows] = useState(listRowMock);

  return (
    <div>
      {listRows.map((value) => {
        return <TableRow key={value.index} item={value} />;
      })}
    </div>
  );
};

export default TableContent;

import { TwitterItem } from "@/api-client/types/TwitterType";
import ProjectDetailModal from "@/components/AQModal/ProjectDetailModal";
import React, { FC, useEffect, useState } from "react";
import TableRow from "./TableRow";

interface TableContentTypes {
  initListRows: TwitterItem[];
  isAnimation?: boolean;
  onRefreshTable?: (userId: string) => void;
}

const TableContent: FC<TableContentTypes> = ({
  initListRows,
  isAnimation,
  onRefreshTable,
}) => {
  const [listRows, setListRows] = useState<TwitterItem[]>(initListRows);
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");

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
            isAnimation={isAnimation}
            onRefreshTable={onRefreshTable}
            onClickAction={() => {
              setUserId(value.userId);
              setIsOpen(true);
            }}
          />
        );
      })}

      <ProjectDetailModal
        isOpen={isOpen}
        closeModal={() => {
          setIsOpen(false);
        }}
        userId={userId}
      />
    </div>
  );
};

export default TableContent;

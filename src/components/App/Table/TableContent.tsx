import { TwitterItem } from "@/api-client/types/TwitterType";
import ProjectDetailModal from "@/components/AQModal/ProjectDetailModal";
import React, { FC, useEffect, useState } from "react";
import TableRow from "./TableRow";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";

interface TableContentTypes {
  initListRows: TwitterItem[];
  isAnimation?: boolean;
  onRefreshTable?: () => void;
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
            onClickAction={() => {
              setUserId(value.userId);
              mixpanelTrack(event_name_enum.on_open_project_detail, {
                projectName: value.name,
              });
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
        onChangeHeart={onRefreshTable}
      />
    </div>
  );
};

export default TableContent;

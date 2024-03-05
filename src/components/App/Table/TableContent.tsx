import { TwitterItem } from "@/api-client/types/TwitterType";
import ProjectDetailModal from "@/components/AQModal/ProjectDetailModal";
import React, { FC, memo, useEffect, useState } from "react";
import TableRow from "./TableRow";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { useWindowSize } from "usehooks-ts";
import { useRouter } from "next/router";

interface TableContentTypes {
  initListRows: TwitterItem[];
  isAnimation?: boolean;
  onRefreshTable?: () => void;
  isShowWatchList?: boolean;
}

const TableContent: FC<TableContentTypes> = ({
  initListRows,
  isAnimation,
  onRefreshTable,
  isShowWatchList = true,
}) => {
  const [listRows, setListRows] = useState<TwitterItem[]>(initListRows);
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const { width } = useWindowSize();
  const router = useRouter();

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
              // when user using mobile redirect project detail page
              if (width <= 430) {
                router.push(`/project/${value?.username}`);
                return;
              }
              setUserId(value.username);
              mixpanelTrack(event_name_enum.on_open_project_detail, {
                projectName: value.name,
              });
              setIsOpen(true);
            }}
            isShowWatchList={isShowWatchList}
            onRefreshTable={onRefreshTable}
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

export default memo(TableContent);

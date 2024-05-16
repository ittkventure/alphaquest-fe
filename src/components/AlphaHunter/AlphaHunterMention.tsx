import { useAlphaHuntersMention } from "@/api-client/mentioned/alphaHunter/useAlphaHunterMention";
import { UserPayType } from "@/api-client/types/AuthType";
import { AuthContext } from "@/contexts/useAuthContext";
import classNames from "classnames";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import MonthSelect from "../App/MonthSelect";
import { TimeFrameTypes } from "@/api-client/types/TwitterType";
import UpgradeProButton from "../UpgradeProButton";
import Spinner from "../Spinner";
import { AlphaMentionProjectsParams } from "@/api-client/mentioned/projects";
import AlphaMentionProjects from "../ProjectDetail/Mention/AlphaMentionProjects";
import AlphaHunterMentionTable from "./AlphaHunterMentionTable";

type Props = {
  isWatchList?: boolean;
};

export default function AlphaHunterMention({ isWatchList }: Props) {
  const [timeFrame, setTimeFrame] = useState("30D");
  const [timeLabel, setTimeLabel] = useState<string>("30D");

  const params = useMemo(() => {
    const newParams: AlphaMentionProjectsParams = {
      pageNumber: 1,
      pageSize: 20,
      timeFrame,
    };
    return newParams;
  }, [timeFrame]);

  const { accountExtendDetail } = useContext(AuthContext);

  const {
    alphaHuntersMention,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useAlphaHuntersMention(
    params,
    accountExtendDetail?.currentPlanKey === UserPayType.FREE
  );

  // IntersectionObserver to handle Infinite Scroll
  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage]
  );

  return (
    <div
      className={classNames("tooltipBoundary", {
        "px-0": isWatchList,
        "px-6": !isWatchList,
      })}
    >
      <div className="flex max-lg:flex-col max-lg:items-center justify-between">
        <div>
          <div className="flex items-center gap-1">
            <p>
              {alphaHuntersMention?.totalCount ?? "..."} Alpha Hunters tracking
              in the last{" "}
            </p>

            <MonthSelect
              onChangeSelect={(month) => {
                setTimeFrame((month.value as TimeFrameTypes) ?? "ALL");
                setTimeLabel(month.label ?? "ALL");
              }}
              defaultData={{
                value: timeFrame,
                label: timeLabel,
              }}
              listData={[
                {
                  label: "7d",
                  value: "7D",
                },
                {
                  label: "30d",
                  value: "30D",
                },
                {
                  label: "90d",
                  value: "90D",
                },
                {
                  label: "All",
                  value: "ALL",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <AlphaHunterMentionTable
          timeLabel={timeLabel}
          alphaMentionProjects={alphaHuntersMention}
          lastElement={lastElementRef}
        />
        {isLoading && (
          <div className="flex justify-center items-center mt-8">
            <Spinner />
          </div>
        )}
      </div>
      {isFetchingNextPage && (
        <div className="w-full h-12 flex justify-center items-center">
          <Spinner />
        </div>
      )}
      <UpgradeProButton length={alphaHuntersMention?.items?.length} />
    </div>
  );
}

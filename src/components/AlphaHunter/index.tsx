import React, { FC, useContext, useState } from "react";
import Spinner from "../Spinner";
import { ClockIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useQuery } from "react-query";
import { AuthContext, TypePayment } from "@/contexts/useAuthContext";
import { apiTwitter } from "@/api-client";
import useColumFollowers from "@/hooks/useTable/useColumFollowers";
import { ChartData, TwitterDetails } from "@/api-client/types/TwitterType";
import { useRouter } from "next/router";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { UserPayType } from "@/api-client/types/AuthType";
import { toast } from "react-toastify";
import AlphaCard from "./AlphaCard";
import AlphaProfileCard from "./AlphaProfileCard";

interface IAlphaHunter {
  userId?: string;
  onChangeHeart?: () => void;
}

const AlphaHunter: FC<IAlphaHunter> = ({ userId, onChangeHeart }) => {
  if (!userId) return <div />;
  const { authState, accountExtendDetail, setTypePaymentAction } =
    useContext(AuthContext);
  const [isLoadingHeart, setIsLoadingHeart] = useState<boolean>(false);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [isDescSorted, setIsDescSorted] = useState(false);

  const listAlphaHunter = useQuery(
    ["fetchListAlphaHunter", userId, page, isDescSorted],
    async () =>
      await apiTwitter.getListFollower(
        userId as any,
        {
          pageNumber: page,
          pageSize: 10,
          desc: isDescSorted,
        },
        authState?.access_token ?? ""
      )
  );

  const twitterDetail = useQuery<TwitterDetails>({
    queryKey: [
      "getTwitterDetails",
      accountExtendDetail?.currentPlanKey,
      authState?.access_token,
      isLoadingHeart,
    ],
    queryFn: async () =>
      await apiTwitter.getTwitterDetails(
        userId as any,
        authState?.access_token ?? ""
      ),
  });

  const twitterChartScore = useQuery<ChartData[]>({
    queryKey: [
      "getTwitterChartScore",
      accountExtendDetail?.currentPlanKey,
      authState?.access_token,
    ],
    queryFn: async () =>
      await apiTwitter.getScoreChartData(
        userId as any,
        authState?.access_token ?? ""
      ),
  });

  const twitterChartFollower = useQuery<ChartData[]>({
    queryKey: [
      "getFollowerChartScore",
      accountExtendDetail?.currentPlanKey,
      authState?.access_token,
    ],
    queryFn: async () =>
      await apiTwitter.getFollowerChartData(
        userId as any,
        authState?.access_token ?? ""
      ),
  });

  const { followers } = useColumFollowers();

  const onAddItemToWatchList = async () => {
    if (!authState?.access_token) {
      mixpanelTrack(event_name_enum.inbound, {
        url: "/login",
      });
      router.push("/login");
      return;
    }
    if (accountExtendDetail?.currentPlanKey === UserPayType.FREE) {
      setTypePaymentAction ? setTypePaymentAction(TypePayment.PRO) : null;
      mixpanelTrack(event_name_enum.inbound, {
        url: "/pricing",
      });
      router.push("/pricing?action=open");

      return;
    }
    try {
      setIsLoadingHeart(true);

      if (authState?.access_token) {
        await apiTwitter.putToWatchList(userId ?? "", authState?.access_token);
        mixpanelTrack(event_name_enum.on_add_watch_list, {
          on_add_watch_list: `User add the project ${
            twitterDetail.data?.name ?? "project"
          } to watchlist`,
        });
        onChangeHeart ? onChangeHeart() : null;
      } else {
        toast.warning("Please login for use this feature");
      }
      setIsLoadingHeart(false);
    } catch (error) {
      setIsLoadingHeart(false);
    }
  };

  const onClickPaymentTrial = () => {
    mixpanelTrack(event_name_enum.upgrade_to_pro, {
      url: router.pathname,
    });
    if (authState) {
      mixpanelTrack(event_name_enum.inbound, {
        url: "/pricing?action=open",
      });
      setTypePaymentAction ? setTypePaymentAction(TypePayment.PRO) : null;
      router.push("/pricing?action=open");
    } else {
      mixpanelTrack(event_name_enum.inbound, {
        url: "/sign-up",
      });
      setTypePaymentAction ? setTypePaymentAction(TypePayment.PRO) : null;
      router.push("/sign-up");
    }
  };

  return (
    <div className={`w-full h-full overflow-x-hidden`}>
      <div>
        <AlphaProfileCard />
      </div>

      <div className="px-[100px] max-[1024px]:px-4 grid grid-cols-2 gap-6 mt-[60px] max-[1452px]:grid-cols-1">
        <AlphaCard />
        <AlphaCard />
      </div>

      <div className="px-[100px] text-sm max-lg:px-[10px]">
        {/* <div className="flex items-center mt-14 ">
          <h3 className="text-lg font-workSansSemiBold  mr-3">
            Earliest Alpha Hunter
          </h3>

          <div className="px-[6px] py-[2px] bg-orange-400 rounded-sm text-orange-400 font-workSansSemiBold bg-opacity-30">
            BETA
          </div>
        </div> */}
        <div className="mt-5 ">
          {/* <TableCommon
            columns={followers ?? []}
            data={listAlphaHunter.data?.items ?? []}
            onChangePage={function (_pageNumber: number): void {
              setPage(_pageNumber);
            }}
            isLoading={listAlphaHunter.isLoading}
            isHiddenTBody={
              accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM
                ? false
                : true
            }
            paginationInfo={{
              currentPage: page,
              pageNumber: page,
              pageSize: 10,
              totalPages: listAlphaHunter?.data?.totalCount
                ? Math.ceil(listAlphaHunter?.data?.totalCount / 20)
                : 0,
              totalElements: listAlphaHunter?.data?.totalCount ?? 0,
            }}
            onSort={(isSortedDesc) => {
              if (isSortedDesc === undefined) return;
              setIsDescSorted(isSortedDesc);
            }}
            isSortedDesc={isDescSorted}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default AlphaHunter;

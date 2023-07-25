import React, { useContext, useMemo, useState } from "react";
import { CellProps, Column } from "react-table";
import { TwitterAlphaLike } from "@/api-client/types/TwitterType";
import Image from "next/image";
import { WebIcon } from "@/assets/icons";
import Link from "next/link";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { AuthContext, TypePayment } from "@/contexts/useAuthContext";
import { UserPayType } from "@/api-client/types/AuthType";
import { useRouter } from "next/router";
import { apiTwitter } from "@/api-client";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { listUrl } from "@/components/App/Table/TableRow";
import { TwitterIcon } from "@/assets/icons";

interface IAlphaHunterFollowers {
  isLinkToAlphaHunter?: boolean;
  onRefreshTable?: () => void;
}

const useColumAlphaLike = ({
  isLinkToAlphaHunter,
  onRefreshTable,
}: IAlphaHunterFollowers) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { accountExtendDetail, authState, setTypePaymentAction } =
    useContext(AuthContext);
  const router = useRouter();
  const onAddItemToWatchList = async (userId: string, name: string) => {
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
      setIsLoading(true);

      if (authState?.access_token) {
        await apiTwitter.putToWatchList(userId, authState?.access_token);
        mixpanelTrack(event_name_enum.on_add_watch_list, {
          on_add_watch_list: `User add the project ${name} to watchlist`,
        });
        onRefreshTable ? onRefreshTable() : null;
      } else {
        toast.warning("Please login for use this feature");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const twitterAlphaLikeColumn: Column<TwitterAlphaLike>[] = useMemo(
    () => [
      {
        Header: "Project",
        accessor: "profileImageUrl",
        Cell: ({ row }: CellProps<TwitterAlphaLike>) => {
          return isLinkToAlphaHunter ? (
            <Link href={`/project/${row.original.username}`}>
              <div className="flex items-center cursor-pointer">
                <div className="mr-4">
                  <div
                    className={`w-10 h-10 rounded-[50%]  ${
                      row.original?.profileImageUrl === "UNKNOWN"
                        ? "animate-pulse"
                        : "border border-white"
                    } bg-secondary-600 overflow-hidden relative`}
                  >
                    {row.original.profileImageUrl === "UNKNOWN" ? (
                      <div> </div>
                    ) : (
                      <Image
                        src={row.original.profileImageUrl}
                        width={40}
                        height={40}
                        alt="avt"
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="mr-4">
                  <div
                    className={`flex items-center ${
                      row.original.name !== "UNKNOWN"
                        ? ""
                        : "w-[160px] h-5 rounded-2xl mb-[6px] bg-secondary-600 animate-pulse"
                    }`}
                  >
                    {row.original.name !== "UNKNOWN" ? (
                      <>
                        <p className="text-success-500 max-lg:text-sm font-workSansSemiBold mr-2">
                          {row.original.name}
                        </p>
                        <div className="flex">
                          <button
                            onClick={() => {
                              mixpanelTrack(event_name_enum.outbound, {
                                url: row.original.twitterUrl,
                                message: "Link to twitter at project page",
                              });
                              window.open(row.original.twitterUrl, "_blank");
                            }}
                          >
                            <Image
                              src={TwitterIcon as any}
                              width={16}
                              height={13}
                              alt="t-i"
                            />
                          </button>

                          {row.original?.urls?.map((value, index) => {
                            const url = listUrl.find(
                              (item) => item.key === value.type
                            ) ?? { icon: WebIcon, key: "#" };
                            return (
                              <button
                                key={value.type + index}
                                onClick={() => {
                                  mixpanelTrack(event_name_enum.outbound, {
                                    url: value.url,
                                    message: `Link to ${url.key} at project page`,
                                  });
                                  window.open(value.url, "_blank");
                                }}
                                className="ml-2"
                              >
                                <Image
                                  src={url.icon as any}
                                  width={16}
                                  height={13}
                                  alt="t-i"
                                />
                              </button>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <div />
                    )}
                  </div>
                  <div className="mt-1">
                    <p className="font-workSansRegular max-lg:text-xs text-sm max-lg:w-[50vw]">
                      {row.original.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div />
          );
        },
      },
      {
        Header: "# of Mutual Alpha Hunters Following",
        accessor: "mutualAlphaHunterFollowingCount",
        Cell: ({ value }: CellProps<TwitterAlphaLike>) => (
          <p className="text-end mr-10">{value === 0 ? "N/A" : value}</p>
        ),
      },
      {
        Header: "",
        accessor: "inWatchlist",
        Cell: ({ value, row }: CellProps<TwitterAlphaLike>) => (
          <button
            onClick={() => {
              onAddItemToWatchList(row.original.userId, row.original.name);
            }}
            className="max-lg:mt-2 flex justify-center items-center w-7"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner
                customClassName="ml-0 mr-0 w-[14px] h-[14px]"
                strokeWidth="1"
              />
            ) : value ? (
              <HeartIconSolid className="h-5 w-7 text-primary-500 transition-all duration-300" />
            ) : (
              <HeartIcon className="h-5 w-7 hover:text-success-500 transition-all duration-300" />
            )}
          </button>
        ),
      },
    ],
    [accountExtendDetail, accountExtendDetail?.currentPlanKey, isLoading]
  );

  return {
    twitterAlphaLikeColumn,
  };
};

export default useColumAlphaLike;

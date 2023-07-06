import moment from "moment";
import React, { useContext, useMemo } from "react";
import { CellProps, Column } from "react-table";
import { FollowerItem } from "@/api-client/types/TwitterType";
import Image from "next/image";
import { TwitterBlueIcon } from "@/assets/icons";
import Link from "next/link";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { AuthContext } from "@/contexts/useAuthContext";
import { UserPayType } from "@/api-client/types/AuthType";

interface IAlphaHunterFollowers {
  isLinkToAlphaHunter?: boolean;
}

const useColumFollowersAlphaHunter = ({
  isLinkToAlphaHunter,
}: IAlphaHunterFollowers) => {
  const { accountExtendDetail } = useContext(AuthContext);
  const followersAlphaHunter: Column<FollowerItem>[] = useMemo(
    () => [
      {
        Header: "Accounts",
        accessor: "profileImageUrl",
        Cell: ({ value, row }: CellProps<FollowerItem>) => {
          return isLinkToAlphaHunter && row.original.username !== "UNKNOWN" ? (
            <Link href={`/alpha-hunter/${row.original.username}`}>
              <div className="flex items-center cursor-pointer">
                <div
                  className={`h-10 w-10 rounded-[50%] overflow-hidden ${
                    accountExtendDetail?.currentPlanKey !==
                      UserPayType.PREMIUM &&
                    "bg-secondary-600 animate-pulse border-secondary-500 border"
                  }`}
                >
                  {accountExtendDetail?.currentPlanKey ===
                    UserPayType.PREMIUM && (
                    <img src={value} alt="avt" className="object-contain" />
                  )}
                </div>
                <div className="ml-2 ">
                  {accountExtendDetail?.currentPlanKey ===
                  UserPayType.PREMIUM ? (
                    <div className="flex">
                      <Link
                        onClick={() => {
                          mixpanelTrack(event_name_enum.outbound, {
                            url: row.original.twitterUrl,
                            message: "Link to twitter at project detail page",
                          });
                        }}
                        href={row.original.twitterUrl}
                        target="_blank"
                      >
                        <Image
                          src={TwitterBlueIcon}
                          width={15}
                          height={15}
                          alt="twitter icon"
                        />
                      </Link>
                      <p className="ml-1 text-xs text-gray-500">
                        @{row.original.username}
                      </p>
                    </div>
                  ) : (
                    <div className="w-20 h-3 rounded-2xl bg-secondary-600 animate-pulse" />
                  )}
                  {accountExtendDetail?.currentPlanKey ===
                  UserPayType.PREMIUM ? (
                    <p className="ml-1 mt-1 text-[16px]">{row.original.name}</p>
                  ) : (
                    <div className="w-40 h-3 mt-1  rounded-2xl bg-secondary-600 animate-pulse" />
                  )}
                </div>
              </div>
            </Link>
          ) : (
            <Link href={`/project/${row.original.username}`}>
              <div className="flex items-center">
                <div
                  className={`h-10 w-10 rounded-[50%] overflow-hidden ${
                    accountExtendDetail?.currentPlanKey !==
                      UserPayType.PREMIUM &&
                    "bg-secondary-600 animate-pulse border-secondary-500 border"
                  }`}
                >
                  {accountExtendDetail?.currentPlanKey ===
                    UserPayType.PREMIUM && (
                    <img src={value} alt="avt" className="object-contain" />
                  )}
                </div>
                <div className="ml-2 ">
                  {accountExtendDetail?.currentPlanKey ===
                  UserPayType.PREMIUM ? (
                    <div className="flex">
                      <Link
                        onClick={() => {
                          mixpanelTrack(event_name_enum.outbound, {
                            url: row.original.twitterUrl,
                            message: "Link to twitter at project detail page",
                          });
                        }}
                        href={row.original.twitterUrl}
                        target="_blank"
                      >
                        <Image
                          src={TwitterBlueIcon}
                          width={15}
                          height={15}
                          alt="twitter icon"
                        />
                      </Link>
                      <p className="ml-1 text-xs text-gray-500">
                        @{row.original.username}
                      </p>
                    </div>
                  ) : (
                    <div className="w-20 h-3 rounded-2xl bg-secondary-600 animate-pulse" />
                  )}
                  {accountExtendDetail?.currentPlanKey ===
                  UserPayType.PREMIUM ? (
                    <p className="ml-1 mt-1 text-[16px]">{row.original.name}</p>
                  ) : (
                    <div className="w-40 h-3 mt-1  rounded-2xl bg-secondary-600 animate-pulse" />
                  )}
                </div>
              </div>
            </Link>
          );
        },
      },
      {
        Header: "FOLLOWERS AT TIME",
        accessor: "followerCountAtTime",
        Cell: ({ value, row }: CellProps<FollowerItem>) =>
          value ? (
            <p className="text-center">{value === 0 ? "N/A" : value}</p>
          ) : (
            <p className="text-center">
              {row.original.followersAtTime === 0
                ? "N/A"
                : row.original.followersAtTime}
            </p>
          ),
      },
      {
        Header: "Following Time",
        accessor: "followingTime",
        Cell: ({ value }: CellProps<FollowerItem>) => (
          <p className="pl-10">{moment(value).format("MM/DD/YYYY, HH:mm")}</p>
        ),
      },
      {
        Header: "Tags",
        accessor: "tags",
        Cell: ({ value }: CellProps<FollowerItem>) => {
          if (!value) return <div className="flex"></div>;
          return (
            <div className="flex">
              {value.map((value: any, index: number) => (
                <p
                  key={index.toString()}
                  className="px-2 py-[2px] bg-white bg-opacity-10 flex justify-center items-center mr-1"
                >
                  {value}
                </p>
              ))}
            </div>
          );
        },
      },
    ],
    [accountExtendDetail, accountExtendDetail?.currentPlanKey]
  );

  return {
    followersAlphaHunter,
  };
};

export default useColumFollowersAlphaHunter;

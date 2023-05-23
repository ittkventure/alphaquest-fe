import moment from "moment";
import React, { useMemo } from "react";
import { CellProps, Column } from "react-table";
import { FollowerItem } from "@/api-client/types/TwitterType";
import Image from "next/image";
import { TwitterBlueIcon } from "@/assets/icons";
import Link from "next/link";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";

const useColumFollowers = () => {
  const followers: Column<FollowerItem>[] = useMemo(
    () => [
      {
        Header: "Accounts",
        accessor: "profileImageUrl",
        Cell: ({ value, row }: CellProps<FollowerItem>) => {
          return (
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-[50%] overflow-hidden">
                <img src={value} alt="avt" className="object-contain" />
              </div>
              <div className="ml-2 ">
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
                <p className="ml-1 mt-1 text-[16px]">{row.original.name}</p>
              </div>
            </div>
          );
        },
      },
      {
        Header: "FOLLOWERS AT TIME",
        accessor: "followerCountAtTime",
        Cell: ({ value }: CellProps<FollowerItem>) => (
          <p>{value === 0 ? "N/A" : value}</p>
        ),
      },
      {
        Header: "Following Date",
        accessor: "followingDate",
        Cell: ({ value }: CellProps<FollowerItem>) => (
          <p>{moment(value).format("YYYY-MM-DD, hh:mm")}</p>
        ),
      },
      {
        Header: "Tags",
        accessor: "tags",
        Cell: ({ value }: CellProps<FollowerItem>) => {
          if (!value)
            return (
              <div className="flex">
                <p className="px-2 py-[2px] bg-white bg-opacity-10 flex justify-center items-center mr-1">
                  Coming Soon
                </p>
              </div>
            );
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
    []
  );

  return {
    followers,
  };
};

export default useColumFollowers;

import moment from "moment";
import React, { useMemo } from "react";
import { CellProps, Column } from "react-table";
import { FollowerItem } from "@/api-client/types/TwitterType";
import Image from "next/image";

const useColumFollowers = () => {
  const followers: Column<FollowerItem>[] = useMemo(
    () => [
      {
        Header: "Key Profile",
        accessor: "profileImageUrl",
        Cell: ({ value }: CellProps<FollowerItem>) => {
          return (
            <div className="h-10 w-10 rounded-[50%] overflow-hidden">
              <img
                src={value}
                width={40}
                height={40}
                alt="avt"
                className="object-cover"
              />
            </div>
          );
        },
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Followers at time",
        accessor: "followerCountAtTime",
      },
      {
        Header: "Following Date",
        accessor: "followingDate",
        Cell: ({ value }: CellProps<FollowerItem>) => (
          <p>{moment(value).format("YYYY-MM-DD")}</p>
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
                  No tags
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

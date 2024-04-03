import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import request from "@/api-client/notification/request";
import { BaseResponse } from "@/api-client/types/BaseResponse";
import { AlphaMentionProjectsParams } from "@/api-client/mentioned/projects";
import qs from "qs";

const fetcher = async (
  page: number,
  username: string,
  params: AlphaMentionProjectsParams,
  isUserFree: boolean
) => {
  if (isUserFree)
    params = {
      ...params,
      pageSize: 5,
    };
  const newParams = {
    ...params,
    pageNumber: page,
  };
  let url = `api/app/twitter/alpha-hunter-mentioned-tweets?username=${username}&`;
  if (params) url = `${url}${qs.stringify(newParams)}`;
  const res = await request.get(`${url}`);
  return res.data;
};

export const useTweetsMention = (
  username: string,
  params: AlphaMentionProjectsParams,
  isUserFree: boolean
) => {
  const {
    data,
    error,
    fetchNextPage,
    status,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery(
    ["getProjectsMention", params],
    ({ pageParam = 1 }) => fetcher(pageParam, username, params, isUserFree),
    {
      getNextPageParam: (
        _lastPage: BaseResponse<{ tweetId: string }>,
        pages: BaseResponse<{ tweetId: string }>[]
      ) => {
        if (isUserFree) return undefined;
        const totalPage = Math.floor(_lastPage.totalCount / 6);
        if (pages.length < totalPage + 1) {
          return pages.length + 1;
        } else return undefined;
      },
    }
  );

  const tweetsMention = useMemo(
    () =>
      data?.pages.reduce(
        (
          prev: BaseResponse<{ tweetId: string }>,
          page: BaseResponse<{ tweetId: string }>
        ) => {
          return {
            items: [...prev.items, ...page.items],
            totalCount: prev?.totalCount,
          };
        }
      ),
    [data]
  );

  return {
    error,
    fetchNextPage,
    status,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    refetch,
    tweetsMention,
    data,
  };
};

import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import request from "@/api-client/notification/request";
import { BaseResponse } from "@/api-client/types/BaseResponse";
import { AlphaMentionProjectsParams } from "@/api-client/mentioned/projects";
import qs from "qs";
import { Tweet } from "@/types/mention";

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
  let total;
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
        _lastPage: BaseResponse<Tweet>,
        pages: BaseResponse<Tweet>[]
      ) => {
        if (isUserFree) return undefined;
        total = _lastPage.totalCount;
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
          prev: BaseResponse<Tweet>,
          page: BaseResponse<Tweet>
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
    total,
  };
};

import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import request from "@/api-client/notification/request";
import { BaseResponse } from "@/api-client/types/BaseResponse";
import { AlphaMentionProjectsParams } from "@/api-client/mentioned/projects";
import qs from "qs";
import { Tweet } from "@/types/mention";

const fetcher = async (
  page: number,
  params: AlphaMentionProjectsParams,
) => {
  const newParams = {
    ...params,
    pageNumber: page,
  };
  let url = `/api/app/project-mentioned/mentioned-tweets?&`;
  if (params) url = `${url}${qs.stringify(newParams)}`;
  const res = await request.get(`${url}`);
  return res.data;
};

export const useAllTweets = (
  params: AlphaMentionProjectsParams,
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
    ({ pageParam = 1 }) => fetcher(pageParam, params),
    {
      getNextPageParam: (
        _lastPage: BaseResponse<Tweet>,
        pages: BaseResponse<Tweet>[]
      ) => {
        total = _lastPage.totalCount;
        const totalPage = Math.floor(_lastPage.totalCount / 10);
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

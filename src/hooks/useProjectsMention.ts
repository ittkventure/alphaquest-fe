import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import request from "@/api-client/notification/request";
import { BaseResponse } from "@/api-client/types/BaseResponse";
import { AlphaMentionProjectsParams } from "@/api-client/mentioned/projects";
import qs from "qs";
import { ProjectsMention } from "@/types/mention";

const fetcher = async (
  page: number,
  params: AlphaMentionProjectsParams,
  isUserFree: boolean
) => {
  if (isUserFree)
    params = {
      ...params,
      pageSize: 10,
    };
  const newParams = {
    ...params,
    pageNumber: page
  }
  let url = `api/app/twitter/most-mentioned`;
  if (params) url = `${url}?${qs.stringify(newParams)}`;
  const res = await request.get(`${url}`);
  return res.data;
};

export const useProjectsMention = (
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
    ({ pageParam = 1 }) => fetcher(pageParam, params, isUserFree),
    {
      getNextPageParam: (
        _lastPage: BaseResponse<ProjectsMention>,
        pages: BaseResponse<ProjectsMention>[]
      ) => {
        if (isUserFree) return undefined;
        const totalPage = Math.floor(_lastPage.totalCount / 20);
        if (pages.length < totalPage + 1) {
          return pages.length + 1;
        } else return undefined;
      },
    }
  );

  const projectsMention = useMemo(
    () =>
      data?.pages.reduce(
        (
          prev: BaseResponse<ProjectsMention>,
          page: BaseResponse<ProjectsMention>
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
    projectsMention,
    data,
  };
};

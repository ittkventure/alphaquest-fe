import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import request from "@/api-client/notification/request";
import { BaseResponse } from "@/api-client/types/BaseResponse";
import { AlphaMentionProjectsParams } from "@/api-client/mentioned/projects";
import qs from "qs";
import { AlphaMentionProject } from "@/types/mention";

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
  let url = `api/app/twitter/alpha-hunters-mentioned?username=${username}&`;
  if (params) url = `${url}${qs.stringify(newParams)}`;
  const res = await request.get(`${url}`);
  return res.data;
};

export const useAlphaMentionProjects = (
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
    ["getTableProjectsMention", params],
    ({ pageParam = 1 }) => fetcher(pageParam, username, params, isUserFree),
    {
      getNextPageParam: (
        _lastPage: BaseResponse<AlphaMentionProject>,
        pages: BaseResponse<AlphaMentionProject>[]
      ) => {
        if (isUserFree) return undefined;
        let totalPage = Math.floor(_lastPage.totalCount / 10);
        if (pages.length === totalPage) return undefined;
        if (pages.length < totalPage + 1) {
          return pages.length + 1;
        } else return undefined;
      },
    }
  );

  const alphaMentionProjects = useMemo(
    () =>
      data?.pages.reduce(
        (
          prev: BaseResponse<AlphaMentionProject>,
          page: BaseResponse<AlphaMentionProject>
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
    alphaMentionProjects,
    data,
  };
};

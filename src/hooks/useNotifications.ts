import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import request from "@/api-client/notification/request";
import { BaseResponse } from "@/api-client/types/BaseResponse";

const fetcher = async (page: number, unread: boolean) => {
    const url = !unread ? "/api/app/notification?pageSize=20&pageNumber=" : "/api/app/notification?unread=true&pageSize=20&pageNumber="
    const res = await request.get(`${url}${page}`)
    return res.data;
}

export const useNotifications = (unread: boolean) => {

    const { data, error, fetchNextPage, status, hasNextPage, isFetching, isLoading, refetch } = useInfiniteQuery(
        ['getNotifications', unread],
        ({ pageParam = 1 }) => fetcher(pageParam, unread),
        {
            getNextPageParam: (_lastPage: BaseResponse<Notification>, pages: BaseResponse<Notification>[]) => {
                const totalPage = Math.floor(_lastPage.totalCount / 20);
                if (pages.length < (totalPage + 1)) {
                    return pages.length + 1
                } else return undefined
            }
        }
    )

    const notifications = useMemo(() => data?.pages.reduce((prev: BaseResponse<Notification>, page: BaseResponse<Notification>) => {
        return {
            items: [...prev.items, ...page.items],
            totalCount: prev?.totalCount,
        }
    }), [data])

    return {
        error, fetchNextPage, status, hasNextPage, isFetching, isLoading, refetch,
        notifications,
        data
    }
}
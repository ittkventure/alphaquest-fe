import { BASE_URL } from '@/utils/config';
import qs from 'qs';
import request from './request';

export const fetchNotifications = async (accessToken: string, unread?: boolean, params?: { pageNumber: number, pageSize: number }) => {
    const notiUrl = unread ? `${BASE_URL}/api/app/notification?unread=${unread}&${qs.stringify(params)}` : `${BASE_URL}/api/app/notification?${qs.stringify(params)}`
    const res = await request.get(`${notiUrl}`)
    return res.data;
}

export const checkAsReadNotification = async (id: string) => {
    const res = await request.post(`${BASE_URL}/api/app/notification/${id}/check-as-read`)
    return res;
}
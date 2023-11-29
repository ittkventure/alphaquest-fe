import { BASE_URL } from '@/utils/config';
import axios from 'axios';
import qs from 'qs';

export const fetchNotifications = async (accessToken: string, unread: boolean, params?: {pageNumber: number, pageSize: number}) => {
    const res = await axios.get(`${BASE_URL}/api/app/notification?unread=${unread}&${qs.stringify(params)}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    return res.data;
}

export const checkAsReadNotification = async (accessToken: string, id: string) => {
    const res = await axios.post(`${BASE_URL}/api/app/notification/${id}/check-as-read`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    return res.data;
}
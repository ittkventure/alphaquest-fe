import { BASE_URL } from '@/utils/config';
import axios from 'axios';
import qs from 'qs';

const getTokenFromLocalStorage = () => {
    const AQToken = localStorage.getItem("AQToken") || ""
    if (AQToken) return JSON.parse(AQToken).access_token
    return ""
}

export const fetchNotifications = async (accessToken: string, unread?: boolean, params?: { pageNumber: number, pageSize: number }) => {
    const notiUrl = unread ? `${BASE_URL}/api/app/notification?unread=${unread}&${qs.stringify(params)}` : `${BASE_URL}/api/app/notification?${qs.stringify(params)}`
    const res = await axios.get(`${notiUrl}`, {
        headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage() || accessToken}`
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
import { BASE_URL } from '@/utils/config';
import request from './request';

export const checkAsReadNotification = async (id: string) => {
    const res = await request.post(`${BASE_URL}/api/app/notification/${id}/check-as-read`)
    return res;
}

export const checkTotalUnreadCount = async () => {
    const res = await request.get(`/api/app/notification/state`);
    return res.data;
}

export const clearAllNotiByClick = async () => {
    const res = await request.post(`/api/app/notification/read`);
    return res;
}
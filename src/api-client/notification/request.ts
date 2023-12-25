import { BASE_URL } from '@/utils/config';
import axios from 'axios';

const getTokenFromLocalStorage = () => {
    const AQToken = localStorage.getItem("AQToken") || ""
    if (AQToken) return JSON.parse(AQToken).access_token
    return ""
}

const request = axios.create({
    baseURL: BASE_URL,
})

request.interceptors.request.use((config: any) => {
    const token = getTokenFromLocalStorage();
    config.headers = {
        Authorization: `Bearer ${token}`
    }
    return config;
})

export default request;
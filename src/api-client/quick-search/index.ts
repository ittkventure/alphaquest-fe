import { AxiosResponse } from "axios";
import request from "../notification/request"
import { SearchItem } from "../types/QuickSearch";

export const fetchQuickSearch = async (keyword: string, take: number) => {
    const res = await request.get(`/api/app/quick-search?keyword=${keyword}&take=${take}`);
    return res.data;
}
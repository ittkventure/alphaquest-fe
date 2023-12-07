import { AxiosResponse } from "axios";
import request from "../notification/request"
import { SearchItem } from "../types/QuickSearch";

export const fetchQuickSearch = async () => {
    const res = await request.get("/api/app/quick-search");
    return res;
}
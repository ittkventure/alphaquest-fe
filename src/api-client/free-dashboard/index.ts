import request from "../notification/request";
import { TwitterGetListRequest } from "../types/TwitterType";
import qs from "qs";

export const fetchFreeDashboard = async (
  slug: string | string[],
  params?: TwitterGetListRequest
) => {
  const url = params
    ? `/api/app/free-dashboard?slug=${slug}&${qs.stringify(params)}`
    : `/api/app/free-dashboard?slug=${slug}&pageNumber=1&pageSize=10&sortBy=SCORE`;
  const res = await request.get(`${url}`);
  return res.data;
};

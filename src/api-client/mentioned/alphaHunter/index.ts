import request from "@/api-client/notification/request";
import { AlphaMentionProjectsParams } from "../projects";
import qs from "qs";

export const getMentionProjectsTab = async (userName: string) => {
  const res = await request.get(
    `/api/app/twitter-alpha-hunter/mentioned-detail?username=${userName}`
  );
  return res.data;
};

export const getMentionProjectsFromAlpha = async (
  userName: string,
  params: AlphaMentionProjectsParams
) => {
  let url = `api/app/twitter-alpha-hunter/project-mentioned?username=${userName}`;
  if (params) url = `${url}&${qs.stringify(params)}`;
  const res = await request.get(`${url}`);
  return res;
};

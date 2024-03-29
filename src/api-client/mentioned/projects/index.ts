import request from "@/api-client/notification/request";
import qs from "qs";

type AlphaMentionProjectsParams = {
  timeFrame?: string;
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
};

export const getMentionDetailTab = async (userName: string) => {
  const res = await request.get(
    `/api/app/twitter/alpha-mention-detail?username=${userName}`
  );
  return res;
};

export const getAlphaMentionProjects = async (
  userName: string,
  params: AlphaMentionProjectsParams
) => {
  let url = `api/app/twitter/alpha-hunters-mentioned?username=${userName}`;
  if (params) url = `${url}&${qs.stringify(params)}`;
  const res = await request.get(`${url}`);
  return res;
};

export const getAlphaMentionTweet = async (
    userName: string,
    params: AlphaMentionProjectsParams
  ) => {
    let url = `api/app/twitter/alpha-hunter-mentioned-tweets?username=${userName}`;
    if (params) url = `${url}&${qs.stringify(params)}`;
    const res = await request.get(`${url}`);
    return res;
  };

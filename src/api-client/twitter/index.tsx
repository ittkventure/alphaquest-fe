import { SelectedDateEnum } from "@/components/ProjectDetail";
import ApiClientBase from "../ApiClientBase";
import { BaseResponse } from "../types/BaseResponse";
import {
  AlphaHunterDetail,
  ChangeLogs,
  ChartData,
  EarlyFollowItem,
  FollowerRequest,
  TwitterAlphaLike,
  TwitterDetails,
  TwitterGetListRequest,
  TwitterItem,
} from "../types/TwitterType";
import qs from "qs";

class ApiTwitter extends ApiClientBase {
  constructor() {
    super();
  }

  /**
   * getListTwitter
   */
  public async getListTwitter(
    params: TwitterGetListRequest,
    access_token: string,
    is_guest?: boolean
  ): Promise<BaseResponse<TwitterItem> | any> {
    const res = await this.instance.get(
      !is_guest
        ? `/api/app/twitter?${qs.stringify(params)}`
        : `/api/app/twitter/for-guest?${qs.stringify(params)}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  /**
   * getListTwitter
   */
  public async getListTwitterOnlyAvax(
    params: TwitterGetListRequest,
    access_token: string
  ): Promise<BaseResponse<TwitterItem> | any> {
    const res = await this.instance.get(
      `/api/app/twitter/avax-list?${qs.stringify(params)}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  /**
   * getListTwitterWatchList
   */
  public async getListTwitterWatchList(
    params: TwitterGetListRequest,
    access_token: string
  ): Promise<BaseResponse<TwitterItem> | any> {
    const res = await this.instance.get(
      `/api/app/twitter/watchlist-item?${qs.stringify(params)}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  /**
   * getCategory
   */
  public async getCategory() {
    const res = await this.instance.get(`/api/app/twitter-attribute/category`);
    return res.data;
  }

  /**
   * getChain
   */
  public async getChain() {
    const res = await this.instance.get(`/api/app/twitter-attribute/chain`);
    return res.data;
  }

  /**
   * getGemCount
   */
  public async getGameCount() {
    const res = await this.instance.get(
      `/api/app/twitter/gem-count?newest=true`
    );
    return res.data;
  }

  /**
   * putToWatchList
   */
  public async putToWatchList(twitterUserId: string, access_token: string) {
    const res = await this.instance.put(
      `/api/app/watchlist?twitterUserId=${twitterUserId}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  /**
   * getTwitterDetails
   */
  public async getTwitterDetails(
    userId: string,
    access_token: string
  ): Promise<TwitterDetails | any> {
    const res = await this.instance.get(
      `/api/app/twitter/detail-by-username?username=${userId}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  /**
   * getAlphaHunterDetails
   */
  public async getAlphaHunterDetails(
    userId: string,
    access_token: string
  ): Promise<AlphaHunterDetail | any> {
    const res = await this.instance.get(
      `/api/app/twitter-alpha-hunter/by-username?username=${userId}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  /**
   * getListFollower
   */
  public async getListFollower(
    userId: string,
    params: FollowerRequest,
    access_token: string
  ): Promise<BaseResponse<TwitterItem> | any> {
    const res = await this.instance.get(
      `/api/app/twitter/lastest-followers-by-username?username=${userId}&${qs.stringify(
        params
      )}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  /**
   * getListEarlyAlphaHunterFollower
   */
  public async getListEarlyAlphaHunterFollower(
    userId: string,
    params: FollowerRequest,
    access_token: string
  ): Promise<BaseResponse<EarlyFollowItem> | any> {
    const res = await this.instance.get(
      `/api/app/twitter-alpha-hunter/earliest-discovery-by-username?username=${userId}&${qs.stringify(
        params
      )}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  /**
   * getListLastAlphaHunterFollower
   */
  public async getListLastAlphaHunterFollower(
    userId: string,
    params: FollowerRequest,
    access_token: string
  ): Promise<BaseResponse<EarlyFollowItem> | any> {
    const res = await this.instance.get(
      `/api/app/twitter-alpha-hunter/lastest-following-by-username?username=${userId}&${qs.stringify(
        params
      )}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  /**
   * getChangeLogUser
   */
  public async getChangeLogUser(
    userId: string,
    params: FollowerRequest,
    access_token: string
  ): Promise<BaseResponse<ChangeLogs> | any> {
    const res = await this.instance.get(
      `/api/app/twitter/user-change-log-by-username?username=${userId}&${qs.stringify(
        params
      )}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  /**
   * getAlphaHunterChangeLogUser
   */
  public async getAlphaHunterChangeLogUser(
    userId: string,
    params: FollowerRequest,
    access_token: string
  ): Promise<BaseResponse<ChangeLogs> | any> {
    const res = await this.instance.get(
      `/api/app/twitter-alpha-hunter/user-change-log-by-username?username=${userId}&${qs.stringify(
        params
      )}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }
  /**
   * getScoreChartData
   */
  public async getScoreChartData(
    userId: string,
    access_token: string
  ): Promise<ChartData[] | any> {
    const res = await this.instance.get(
      `/api/app/twitter/score-chart-data/${userId}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  /**
   * getFollowerChartData
   */
  public async getFollowerChartData(
    userId: string,
    access_token: string,
    timeFrame: SelectedDateEnum
  ): Promise<ChartData[] | any> {
    const res = await this.instance.get(
      `/api/app/twitter/followers-chart-data-by-username?username=${userId}&timeFrame=${timeFrame}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  /**
   * getListTwitterAlphaLike
   */
  public async getListTwitterAlphaLike(
    userId: string,
    params: FollowerRequest,
    access_token: string
  ): Promise<BaseResponse<TwitterAlphaLike[]> | any> {
    const res = await this.instance.get(
      `/api/app/twitter/alpha-like-by-username?username=${userId}&${qs.stringify(
        params
      )}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  /**
   * getChartInterestOverTime
   */
  public async getChartInterestOverTime(
    access_token: string,
    id?: string,
    timeFrame?: string
  ): Promise<any[] | any> {
    const keyword = id;
    const timeframe = timeFrame ?? "today-5-y";

    const res = await this.instance.get(
      `/api/app/narrative/interest-over-time?${qs.stringify({
        keyword,
        timeframe,
      })}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  /**
   * getChartNarrativeOverTime
   */
  public async getChartNarrativeOverTime(
    access_token: string,
    timeframeCode?: string,
    keywordParam?: string,
    pageSizeParam?: number,
    pageNumberParam?: number
  ): Promise<any[] | any> {
    const pageNumber = pageNumberParam ?? 1;
    const pageSize = pageSizeParam ?? 30;
    const keyword = keywordParam ?? "";
    const timeframe = timeframeCode ?? "today-12-m";

    const res = await this.instance.get(
      `/api/app/narrative?${qs.stringify({
        pageNumber,
        pageSize,
        timeframe,
        keyword,
      })}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  /**
   * getRelateList
   */
  public async getRelateList(
    access_token: string,
    id?: string,
    timeFrame?: string
  ): Promise<any[] | any> {
    const keyword = id;
    const timeframe = timeFrame ?? "today-5-y";

    const res = await this.instance.get(
      `/api/app/narrative/relate-list?${qs.stringify({
        keyword,
        timeframe,
        take: 5,
      })}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  /**
   * getRelateListProjects
   */
  public async getRelateListProjects(
    access_token: string,
    id?: string
  ): Promise<any[] | any> {
    const keyword = id;

    const res = await this.instance.get(
      `/api/app/twitter/relate-by-narrative-keyword?${qs.stringify({
        keyword,
        take: 5,
      })}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }
}

export default ApiTwitter;

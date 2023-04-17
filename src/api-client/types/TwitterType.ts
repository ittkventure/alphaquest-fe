export type TimeFrameTypes = "ALL" | "30D" | "7D" | "1D";
export type SortByType =
  | "SCORE"
  | "DISCOVERED_DATE"
  | "TWITTER_FOLLOWER"
  | "TWITTER_CREATED_DATE";

export interface TwitterGetListRequest {
  pageNumber: number;
  pageSize: number;
  timeFrame: TimeFrameTypes;
  sortBy: SortByType;
  newest: boolean;
  chains?: Array<string>;
  categories?: Array<string>;
}

export interface TwitterChain {
  code: string;
  name: string;
}

export interface TwitterCategory {
  code: string;
  name: string;
}

export interface TwitterItem {
  name: string;
  username: string;
  userId: string;
  userType: string;
  description: string;
  infoUrl: string;
  twitterUrl: string;
  profileImageUrl: string;
  discoveredTime: Date;
  createdAt: Date;
  score: number;
  trendingScore: number;
  influencerFollowingCount1D: number;
  influencerFollowingCount7D: number;
  influencerFollowingCount30D: number;
  influencerFollowingCountAll: number;
  lastUpdatedTime: Date;
  followersCount?: any;
  followersCountChange?: any;
  followingCount?: any;
  followingCountChange?: any;
  tweetCount?: any;
  tweetCountChange?: any;
  listedCount?: any;
  listedCountChange?: any;
  chain?: TwitterChain;
  categories?: Array<TwitterCategory>;
  inWatchlist?: boolean;
}

export type TimeFrameTypes = "ALL" | "30D" | "7D" | "1D";
export type SortByType =
  | "SCORE"
  | "DISCOVERED_DATE"
  | "TWITTER_FOLLOWER"
  | "TWITTER_CREATED_DATE";

export interface TwitterGetListRequest {
  pageNumber: number;
  pageSize: number;
  timeFrame?: TimeFrameTypes;
  sortBy?: SortByType;
  newest?: boolean;
  chains?: Array<string>;
  categories?: Array<string>;
  searchText?: string;
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
  urls: URLS[];
}

export interface URLS {
  type: string;
  url: string;
}

export interface FollowerItemResponse {
  items: FollowerItem[];
  totalCount: number;
}

export interface FollowerItem {
  userId: string;
  profileImageUrl: string;
  name: string;
  username: string;
  followerCountAtTime: number;
  followingDate: string;
  tags?: string[];
  twitterUrl: string;
  followersAtTime?: number;
  followingTime?: string;
  attributes?: AttributesType[];
}

export interface AttributesType {
  code: string;
  name: string;
  type: "CHAIN" | "CATEGORY";
}

export interface FollowerRequest {
  pageNumber: number;
  pageSize: number;
  desc?: boolean;
}

export interface Category {
  code: string;
  name: string;
}
export interface TwitterDetails {
  name: string;
  profileImageUrl: string;
  description: string;
  userId: string;
  categories: AttributesType[];
  chains: AttributesType[];
  trendingScore: number;
  twitterFollowersWhenDiscovered: number;
  currentTwitterFollowers: number;
  twitterCreatedDate: string;
  discoveredDate: string;
  inWatchlist: boolean;
  twitterUrl: string;
  urls: URLS[];
}

export interface ChartData {
  dataTime: string;
  alphaHuntersCount: number;
  followerCount: number;
  alphaHunters: AlphaHunterDetail[];
}

export interface ChangeLogs {
  dataTime: string;
  message: string;
  newValue: string;
  originalData: string;
  dataType: string;
  profileImageUrl?: string;
}

export interface AlphaHunterDetail {
  userId: string;
  name: string;
  username: string;
  description: string;
  profileImageUrl: string;
  twitterUrl: string;
  followerCount: number;
  alphaFollowingCount: number;
  tags: string[];
  domByBlockchain: DomByBlockchain;
  domByCategory: DomByCategory;
  attributes: AttributesType[];
}

export interface DomByBlockchain {
  additionalProp1: number;
  additionalProp2: number;
  additionalProp3: number;
}

export interface DomByCategory {
  additionalProp1: number;
  additionalProp2: number;
  additionalProp3: number;
}

export interface EarlyFollowItem {
  userId: string;
  name: string;
  username: string;
  twitterUrl: string;
  profileImageUrl: string;
  followersAtTime: number;
  followingTime: string;
  tags: string[];
}

export interface TwitterAlphaLike {
  name: string;
  username: string;
  userId: string;
  description: string;
  twitterUrl: string;
  profileImageUrl: string;
  inWatchlist: boolean;
  mutualAlphaHunterFollowingCount: number;
  urls: Url[];
}

export interface Url {
  type: string;
  url: string;
}

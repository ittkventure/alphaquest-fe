import { Category } from "./../api-client/types/TwitterType";
export interface TopAlphaResponse {
  items: TopAlphaItem[];
  totalCount: number;
}

export interface TopAlphaItem {
  userId: string;
  name: string;
  username: string;
  description: string;
  profileImageUrl: string;
  twitterUrl: string;
  followerCount: number;
  numberOfEarlyDiscoveries: number;
  alphaFollowingCount: number;
  projectsFollowedLastXDays: ProjectsFollowedLastXday[];
  chain: any;
  category: any;
  attributes?: any[];
  inWatchlist?: boolean;
}

export interface ProjectsFollowedLastXday {
  from: string;
  to: string;
  projectsCount: number;
  projects: Project[];
}

export interface Project {
  kolUserId: string;
  userId: string;
  name: string;
  username: string;
  profileImageUrl: string;
  followingTime: string;
}

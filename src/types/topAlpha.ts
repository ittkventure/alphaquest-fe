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

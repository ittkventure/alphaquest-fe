export type AlphaMentionProject = {
  userId: string;
  name: string;
  username: string;
  profileImageUrl: string;
  profileUrl: string;
  urls: string[] | null;
  attributes: {
    code: string;
    name: string;
    type: string;
  }[];
  followersCount: number;
  mentionsCount: number;
  tweetTimeline: {
    from: string;
    to: string;
    tweetCount: number;
    tweetUrls: string[];
    mentionedProjectTweets: {
      name: string;
      profileImageUrl: string;
      profileUrl: string;
      userId: string;
      username: string;
    }[]
  }[];
};

export type ProjectsMention = {
  name: string;
  username: string;
  userId: string;
  description?: string;
  infoUrl?: string;
  twitterUrl?: string;
  profileImageUrl: string;
  discoveredTime: string;
  createdAt?: string;
  chain?: {
    code: string;
    name: string;
    type: string;
  },
  categories?: {
    code: string;
    name: string;
    type: string;
  }[],
  urls?: {
    type: string;
    url: string;
  }[]
  score?: number;
  trendingScore?: number;
  followersCount?: number;
  inWatchlist?: boolean;
}

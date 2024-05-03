export type TweetTimeline = {
  from: string;
  to: string;
  tweetCount: number;
  mentionedProjectTweets: {
    name: string;
    profileImageUrl: string;
    profileUrl: string;
    userId: string;
    username: string;
    tweetUrl: string;
    mentionedAt: string;
  }[];
};

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
  tweetTimeline: TweetTimeline[];
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
  };
  categories?: {
    code: string;
    name: string;
    type: string;
  }[];
  urls?: {
    type: string;
    url: string;
  }[];
  score?: number;
  trendingScore?: number;
  mentionedCount?: number;
  followersCount?: number;
  inWatchlist?: boolean;
};

export type Tweet = {
  tweetId: string;
  tweetUrl: string;
  fullText: string;
  createdAt: string;
  objects?: {
    id: string;
    displayText: string;
    type: string;
    url: string;
  }[];
  owner: {
    name: string;
    username: string;
    profileUrl: string;
    profileImageUrl: string;
  };
  repostedOrReplyTweet: Tweet;
  viewsCount?: number;
};

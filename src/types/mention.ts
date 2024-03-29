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
  }[];
};

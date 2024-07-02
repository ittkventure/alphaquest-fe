import { TweetTimeline } from "@/types/mention";

export interface BaseResponse<T> {
  items: T[];
  totalCount: number;
  profileImageUrl?: string;
  summaryTweetTimeline?: TweetTimeline[];
  totalMentionCount?: number;
  totalAlphaHunterTrackingCount?: number;
}

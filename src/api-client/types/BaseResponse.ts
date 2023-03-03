import { TwitterItem } from "./TwitterType";

export interface BaseResponse {
  items: TwitterItem[];
  totalCount: number;
}

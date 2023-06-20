export interface BaseResponse<T> {
  items: T[];
  totalCount: number;
}

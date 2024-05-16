import { FilterBar } from "@/utils/filter";
import request from "../notification/request";

export const fetchFilterBar = async (
  attrType: string,
  selectedAttrCode?: string,
  selectedAttrType?: string,
  timeFrame?: string,
  searchText?: string,
  newest?: boolean,
) => {
  let url = searchText ? `/api/app/twitter-attribute?attributeType=${attrType}&timeFrame=${timeFrame}&searchText=${searchText}` : `/api/app/twitter-attribute?attributeType=${attrType}&timeFrame=${timeFrame}`;
  if (newest) {
    url = `${url}&newest=true`
  }
  if (selectedAttrCode) {
    url = `${url}&selectedAttributeCode=${selectedAttrCode}&selectedAttributeType=${selectedAttrType}`;
  }
  const res = await request.get(`${url}`);
  return res.data as FilterBar[];
};

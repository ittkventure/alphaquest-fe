import { FilterBar } from "@/utils/filter";
import request from "../notification/request";

export const fetchFilterBar = async (
  attrType: string,
  selectedAttrCode?: string,
  selectedAttrType?: string
) => {
  let url = `/api/app/twitter-attribute?attributeType=${attrType}`;
  if (selectedAttrCode) {
    url = `/api/app/twitter-attribute?attributeType=${attrType}&selectedAttributeCode=${selectedAttrCode}&selectedAttributeType=${selectedAttrType}`;
  }
  const res = await request.get(`${url}`);
  return res.data as FilterBar[];
};

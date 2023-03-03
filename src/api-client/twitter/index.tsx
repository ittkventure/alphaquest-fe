import ApiClientBase from "../ApiClientBase";
import { BaseResponse } from "../types/BaseResponse";
import { TwitterGetListRequest } from "../types/TwitterType";
import qs from "qs";

class ApiTwitter extends ApiClientBase {
  constructor() {
    super();
  }

  /**
   * getListTwitter
   */
  public async getListTwitter(
    params: TwitterGetListRequest
  ): Promise<BaseResponse> {
    const res = await this.instance.get(
      `/api/app/twitter?${qs.stringify(params)}`
    );
    return res.data;
  }
}

export default ApiTwitter;

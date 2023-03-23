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
    params: TwitterGetListRequest,
    access_token: string,
    is_guest?: boolean
  ): Promise<BaseResponse> {
    console.log(is_guest, "is_guest");

    const res = await this.instance.get(
      !is_guest
        ? `/api/app/twitter?${qs.stringify(params)}`
        : `/api/app/twitter/for-guest?${qs.stringify(params)}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }
}

export default ApiTwitter;

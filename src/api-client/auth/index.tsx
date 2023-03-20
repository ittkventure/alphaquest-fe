import ApiClientBase from "../ApiClientBase";
import { BaseResponse } from "../types/BaseResponse";
import { LoginParamsType, LoginResponseType } from "../types/AuthType";
import qs from "qs";

class ApiAuth extends ApiClientBase {
  constructor() {
    super();
    this.instance.defaults.headers["Content-Type"] =
      "application/x-www-form-urlencoded";
  }

  /**
   * Login
   */
  public async login(params: LoginParamsType): Promise<LoginResponseType> {
    const res = await this.instance.post(
      "/connect/token",
      qs.stringify(params)
    );
    return res.data;
  }

  public async getUserInfo(access_token: string): Promise<LoginResponseType> {
    const res = await this.instance.get("/api/account/my-profile", {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    return res.data;
  }
}

export default ApiAuth;

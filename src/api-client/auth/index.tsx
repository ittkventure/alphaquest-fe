import ApiClientBase from "../ApiClientBase";
import { BaseResponse } from "../types/BaseResponse";
import {
  AccountDetailResponse,
  LoginParamsType,
  LoginResponseType,
  RegisterParamsType,
} from "../types/AuthType";
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

  /**
   * sign up
   */
  public async signUp(params: RegisterParamsType): Promise<any> {
    const res = await this.instance.post(
      "/api/app/account-extend/register",
      params,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }

  /**
   * confirm email
   */
  public async confirmEmail(token: string, access_token: string): Promise<any> {
    const res = await this.instance.post(
      "/api/app/account-extend/confirm-email",
      {
        token: token.replaceAll(" ", ""),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  public async verifyEmail(access_token: string): Promise<any> {
    const res = await this.instance.post(
      "/api/app/account-extend/verify-email",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      }
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

  public async getAccountExtendDetails(
    access_token: string
  ): Promise<AccountDetailResponse> {
    const res = await this.instance.get(
      "/api/app/account-extend/account-detail",
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }
}

export default ApiAuth;

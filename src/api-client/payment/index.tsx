import ApiClientBase from "../ApiClientBase";
import { BaseResponse } from "../types/BaseResponse";

class ApiPayment extends ApiClientBase {
  constructor() {
    super();
  }

  /**
   * getLinkPayment
   */
  public async getLinkPayment(
    access_token: string
  ): Promise<BaseResponse | any> {
    const res = await this.instance.get("/api/app/payment/pay-link", {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    return res.data;
  }

  /**
   * cancelPayment
   */
  public async cancelPayment(
    access_token: string
  ): Promise<BaseResponse | any> {
    const res = await this.instance.post(
      "/api/app/payment/cancel-subcription",
      {},
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  /**
   * checkPaymentOrderStatus
   */
  public async checkPaymentOrderStatus(
    idOrder: string,
    access_token: string
  ): Promise<BaseResponse | any> {
    const res = await this.instance.post(
      `/api/app/payment/${idOrder}/check-order-payment-status`,
      {},
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }
}

export default ApiPayment;

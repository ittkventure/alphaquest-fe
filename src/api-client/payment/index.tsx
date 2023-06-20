import ApiClientBase from "../ApiClientBase";
import { BaseResponse } from "../types/BaseResponse";
import { TwitterItem } from "../types/TwitterType";

class ApiPayment extends ApiClientBase {
  constructor() {
    super();
  }

  /**
   * getLinkPayment
   */
  public async getLinkPayment(
    access_token: string,
    withoutTrial: boolean
  ): Promise<BaseResponse<TwitterItem> | any> {
    const res = await this.instance.get(
      `/api/app/payment/pay-link?withoutTrial=${withoutTrial}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  /**
   * cancelPayment
   */
  public async cancelPayment(
    access_token: string,
    reasonType: string,
    reasonText?: string,
    feedback?: string
  ): Promise<BaseResponse<TwitterItem> | any> {
    const res = await this.instance.post(
      "/api/app/payment/cancel-subcription",
      {
        reasonType,
        reasonText,
        feedback,
      },
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
  ): Promise<BaseResponse<TwitterItem> | any> {
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

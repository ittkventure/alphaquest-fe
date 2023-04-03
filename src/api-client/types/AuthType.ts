export interface LoginParamsType {
  client_id: string;
  grant_type: string;
  username: string;
  password: string;
  scope: string;
}

export interface LoginResponseType {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface AccountDetailResponse {
  name: string;
  currentPlanKey: string;
  planExpiredAt: string;
  createdAt: string;
  email: string;
  inviteCode: string;
  confirmedEmail: boolean;
  username: string;
}

export interface RegisterParamsType {
  userName: string;
  emailAddress: string;
  password: string;
  appName: string;
}

export enum UserPayType {
  FREE = "FREE",
  PREMIUM = "PREMIUM",
}

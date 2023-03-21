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
}

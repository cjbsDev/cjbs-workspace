export interface ApiResponse {
  data: any;
  success: boolean;
  code: string;
  message: string;
}

export interface TokenDto {
  accessToken?: string;
  atExpires?: number;
  refreshToken?: string;
  rtExpires?: number;
  needInfo?: string;
  error?: string;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    atExpires: number;
    needInfo?: string;
    uid: number;
    email: string;
    authorities: string;
    error?: "RefreshAccessTokenError";
  }
}

export interface GET_API {
  (url: string, option?: object, headers?: any): Promise<ApiResponse>; //TODO any가 아니라 AxiosResponse 교체
}

export interface POST_API {
  (
    url: string,
    body?: object,
    option?: any,
    headers?: any
  ): Promise<ApiResponse>;
}

export interface DELETE_API {
  (url: string, body?: object): Promise<ApiResponse>;
}

export interface REQUEST_API {
  (
    url: string,
    method: string,
    body?: object | null,
    option?: object,
    headers?: any
  ): Promise<ApiResponse>;
}
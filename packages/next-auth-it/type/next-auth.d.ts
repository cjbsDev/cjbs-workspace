import { Session, User } from "next-auth"
import {JWT} from "next-auth/jwt"

export interface TokenDto {
    accessToken?: string
    atExpires?: number
    refreshToken?: string
    rtExpires?: number
    needInfo?: string
    error?: string
    serviceType?: string
}

export interface RetrunRefreshAccessToken {
    accessToken?: string
    atExpires?: number
    refreshToken?: string
    rtExpires?: number
    needInfo?: string
    email?: string,
    uid?: number
    authorities?: string
    error?: "RefreshAccessTokenError"
    serviceType?: string
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    // token: {
    //   accessToken: string
    //   atExpires: number
    // }
    accessToken: string
    atExpires: number
    needInfo?: string
    uid: number
    email: string
    authorities: string
    error?: "RefreshAccessTokenError"
    serviceType?: string
  }

  interface User {
    tokenDto: TokenDto
    userId: number
    email: string
    authorities: string
    error?: "RefreshAccessTokenError"
    serviceType?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    atExpires?: number
    refreshToken?: string
    rtExpires?: number
    needInfo?: string
    uid: number
    authorities: string
    serviceType?: string
    error?: "RefreshAccessTokenError"
  }
}
 

import { getSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { ApiResponse } from "./type";
import { getToken } from "next-auth/jwt";
import { redirect } from "next/navigation";

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

interface GET_API {
  (url: string, option?: object, headers?: any): Promise<Response>; //TODO any가 아니라 AxiosResponse 교체
}

interface REQUEST_API {
  (
    url: string,
    method: string,
    body?: object | null,
    option?: object,
    headers?: any
  ): Promise<Response>;
}

export const GET_SERVER: GET_API = async (url, option, headers) => {
  return await request(url, "GET", null, option, headers);
};

const request: REQUEST_API = async (url, method, body, option) => {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const accessToken = token?.accessToken;
  if (!token || !accessToken) {
    redirect("/signout");
  }

  return new Promise(async function (resolve, reject) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
          "Accept-Language": "ko",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        ...option,
      });

      if (response.ok) {
        resolve(response);
      } else if (response.status === 401) {
        // Access token expired, try to refresh it

        const newAuthResponse = await fetch("/api/auth/session?update");
        const newAuth = await newAuthResponse.json();

        const retryResponse = await fetch(url, {
          method,
          body: body ? JSON.stringify(body) : null,
          headers: {
            Authorization: `Bearer ${newAuth.accessToken}`,
            "Accept-Language": "ko",
            "Content-Type": "application/json",
          },
          ...option,
        });

        if (retryResponse.ok) {
          resolve(retryResponse);
        } else {
          console.log("토큰 갱신에 실패함.");
          redirect("/");
          //    signOut({ callbackUrl: "/" });
        }
      } else {
        toast("A network problem has occurred.(A102)");
        console.log(`API call failed with status code ${response.status}`);
      }
    } catch (error) {
      toast("A network problem has occurred.(A101)");
      console.log("error >", error);
    }
  });
};

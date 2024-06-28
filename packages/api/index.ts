"use client";
import { getSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";
import {

  GET_API,
  POST_API,
  PUT_API,
  DELETE_API,
  GET_BOLB_API,
  POST_BOLB_API,
  PUT_BOLB_API,
  REQUEST_API,
  POST_MULTIPART_API,
  PUT_MULTIPART_API,
  REQUEST_BLOB_API,
} from "./type";
import axios from "axios";

export const FETCHER_GET: GET_API = async (url, option, headers) => {
  return await request(url, "GET", null, option, headers);
};

export const FETCHER_GET_BLOB: GET_BOLB_API = async (
  url,
  body,
  option,
  headers,
) => {
  return await requestBLOB(url, "GET", body, option, headers);
};

export const FETCHER_POST_BLOB: POST_BOLB_API = async (
  url,
  body,
  option,
  headers,
) => {
  return await requestBLOB(url, "POST", body, option, headers);
};

export const FETCHER_POST: POST_API = async (url, body, option, headers) => {
  return await request(url, "POST", body, option, headers);
};

export const FETCHER_PUT: PUT_API = async (url, body, option, headers) => {
  return await request(url, "PUT", body, option, headers);
};

export const FETCHER_DELETE: DELETE_API = async (url, body) => {
  return await request(url, "DELETE", body);
};

export const GET: GET_API = async (url, option, headers) => {
  return await request(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    "GET",
    null,
    option,
    headers,
  );
};

export const GET_BLOB: GET_BOLB_API = async (url, option, headers) => {
  return await requestBLOB(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    "GET",
    option,
    headers,
  );
};

export const POST_BLOB: POST_BOLB_API = async (url, body, option, headers) => {
  return await requestBLOB(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    "POST",
    body,
    option,
    headers,
  );
};

export const PUT_BLOB: PUT_BOLB_API = async (url, body, option, headers) => {
  return await requestBLOB(
      `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      "PUT",
      body,
      option,
      headers,
  );
};

export const POST: POST_API = async (url, body, option, headers) => {
  return await request(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    "POST",
    body,
    option,
    headers,
  );
};

// @ts-ignore
export const POST_MULTIPART: POST_MULTIPART_API = async (
  url,
  body,
  option,
  headers,
) => {
  return await request_multipart(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    "POST",
    body,
    option,
    headers,
  );
};

export const PUT: PUT_API = async (url, body, option, headers) => {
  return await request(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    "PUT",
    body,
    option,
    headers,
  );
};

export const PUT_MULTIPART: PUT_MULTIPART_API = async (
  url,
  body,
  option,
  headers,
) => {
  return await request_multipart(url, "PUT", body, option, headers);
};

export const DELETE: DELETE_API = async (url, body) => {
  return await request(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    "DELETE",
    body,
  );
};

const request: REQUEST_API = async (url, method, body, option) => {
  const session = await getSession();
  const accessToken = session?.accessToken;
  if (!session || !accessToken) {
    window.location.href = "/";
  }

  return new Promise(async function (resolve, reject) {
    try {
      const response = await fetch(url, {
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
        const data = await response.json();
        resolve(data);
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
          const data = await retryResponse.json();
          resolve(data);
        } else {
          console.log("토큰 갱신에 실패함.");
          //    signOut({ callbackUrl: "/" });
        }
      } else if (response.status === 403) {
        toast("권한이 없습니다.(A103-1)");
        console.log(`API call failed with status code ${response.status}`);
      } else {
        toast("네트워크 문제가 발생했습니다.(A102-1)");
        console.log(`API call failed with status code ${response.status}`);
      }
    } catch (error) {
      toast("네트워크 문제가 발생했습니다.(A101)");
      console.log("error >", error);
    }
  });
};

const request_multipart: REQUEST_API = async (url, method, body, option) => {
  const session = await getSession();
  const accessToken = session?.accessToken;
  if (!session || !accessToken) {
    window.location.href = "/";
  }

  return new Promise(async function (resolve, reject) {
    try {
      const response = await axios({
        url: url,
        method,
        data: body,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        validateStatus: function (status) {
          // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
          return (
            (status >= 200 && status < 300) ||
            status === 401 ||
            status === 400 ||
            status === 500
          );
        },
      });
      return resolve(response);

      // const response = await fetch(url, {
      //   method,
      //   body: body,
      //   headers: {
      //     "Accept-Language": "ko",
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      //   ...option,
      // });
      //
      // if (response.ok) {
      //   const data = await response.json();
      //   resolve(data);
      // } else if (response.status === 401) {
      //   // Access token expired, try to refresh it
      //
      //   const newAuthResponse = await fetch("/api/auth/session?update");
      //   const newAuth = await newAuthResponse.json();
      //
      //   const retryResponse = await fetch(url, {
      //     method,
      //     body: body ? JSON.stringify(body) : null,
      //     headers: {
      //       Authorization: `Bearer ${newAuth.accessToken}`,
      //       "Accept-Language": "ko",
      //       "Content-Type": "application/json",
      //     },
      //     ...option,
      //   });
      //
      //   if (retryResponse.ok) {
      //     const data = await retryResponse.json();
      //     resolve(data);
      //   } else {
      //     console.log("토큰 갱신에 실패함.");
      //     //    signOut({ callbackUrl: "/" });
      //   }
      // } else if (response.status === 403) {
      //   toast("권한이 없습니다.(A103-2)");
      //   console.log(`API call failed with status code ${response.status}`);
      // } else {
      //   toast("A network problem has occurred.(A102-2)");
      //   console.log(`API call failed with status code ${response.status}`);
      // }
    } catch (error) {
      toast("A network problem has occurred.(A101)");
      console.log("error >", error);
    }
  });
};

const requestBLOB: REQUEST_BLOB_API = async (url, method, body, option) => {
  const session = await getSession();
  const accessToken = session?.accessToken;
  if (!session || !accessToken) {
    window.location.href = "/";
  }

  return new Promise(async function (resolve, reject) {
    try {
      const response = await axios({
        url: url,
        method,
        data: body,
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        validateStatus: function (status) {
          // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
          return (
            (status >= 200 && status < 300) ||
            status === 401 ||
            status === 400 ||
            status === 500
          );
        },
      });
      return resolve(response);
      // const response = await fetch(url, {
      //   method,
      //   body: body ? JSON.stringify(body) : null,
      //   headers: {
      //     "Accept-Language": "ko",
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      //   ...option,
      // });
      //
      // if (response.ok) {
      //   const data = await response.blob();
      //   resolve(data);
      // } else if (response.status === 401) {
      //   // Access token expired, try to refresh it
      //
      //   const newAuthResponse = await fetch("/api/auth/session?update");
      //   const newAuth = await newAuthResponse.json();
      //
      //   if (newAuth.error) {
      //     window.location.href = "/signout";
      //   }
      //
      //   const retryResponse = await fetch(url, {
      //     method,
      //     body: body ? JSON.stringify(body) : null,
      //     headers: {
      //       Authorization: `Bearer ${newAuth.accessToken}`,
      //       "Accept-Language": "ko",
      //       "Content-Type": "application/json",
      //     },
      //     ...option,
      //   });
      //
      //   if (retryResponse.ok) {
      //     const data = await retryResponse.json();
      //     resolve(data);
      //   } else {
      //     console.log("토큰 갱신에 실패함.");
      //     //    signOut({ callbackUrl: "/" });
      //   }
      // } else if (response.status === 403) {
      //   toast("권한이 없습니다.(A103-2)");
      //   console.log(`API call failed with status code ${response.status}`);
      // } else {
      //   toast("A network problem has occurred.(A102-2)");
      //   console.log(`API call failed with status code ${response.status}`);
      // }
    } catch (error) {
      toast("A network problem has occurred.(A101)");
      console.log("error >", error);
    }
  });
};

export const fetcher = (url: string) =>
  FETCHER_GET(`${process.env.NEXT_PUBLIC_API_URL}${url}`).then(
    (res) => res.data,
  );

export const metaFetcher = (url: string) =>
  FETCHER_GET(`${process.env.NEXT_PUBLIC_API_URL}${url}`);

export const fetcherOrsh = (url: string) =>
  FETCHER_GET(`${process.env.NEXT_PUBLIC_API_URL_ORSH}${url}`);

export const fetcherPost = (data: any[]) =>
  FETCHER_POST(`${process.env.NEXT_PUBLIC_API_URL}${data[0]}`, data[1]);

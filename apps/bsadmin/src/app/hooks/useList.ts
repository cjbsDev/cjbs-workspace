"use client";
import useSWR from "swr";
import fetcher from "../func/fetcher";
// import { fetcher } from "api";

export const useList = (
  apiName: string,
  page: number = 1,
  perPage: number = 20
) => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiName}/list?page=${page}&size=${perPage}`,
    fetcher,
    {
      suspense: true,
      retry: 1,
    }
  );

  return {
    data: data,
  };
};

"use client";
import useSWR from "swr";
import { fetcher } from "api";

export const useList = (
  apiName: string,
  page: number = 1,
  perPage: number = 20
) => {
  const { data } = useSWR(
    `/${apiName}/list?page=${page}&size=${perPage}`,
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

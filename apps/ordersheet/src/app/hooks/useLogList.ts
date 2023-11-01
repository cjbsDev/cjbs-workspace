"use client";
import useSWR from "swr";
import { fetcher } from "api";

export const useLogList = (
  apiName: string,
  filters: string,
) => {
  const { data } = useSWR(
    `/${apiName}?${filters}`,
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

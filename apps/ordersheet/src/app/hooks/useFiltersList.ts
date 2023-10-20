"use client";
import useSWR from "swr";
import { fetcher } from "api";

export const useFiltersList = (
  apiName: string,
  filters: string,
) => {
  const { data } = useSWR(
    `/${apiName}/list?${filters}`,
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

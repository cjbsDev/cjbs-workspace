"use client";
import useSWR from "swr";
import fetcher from "../func/fetcher";

export const useList = (apiName: string) => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiName}/list`,
    fetcher,
    {
      suspense: true,
    }
  );

  return {
    data: data,
  };
};

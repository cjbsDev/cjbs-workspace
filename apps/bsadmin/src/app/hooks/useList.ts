"use client";
import useSWR from "swr";
import fetcher from "../func/fetcher";

export const useList = (apiName: string) => {
  const { data } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/${apiName}/list`,
    fetcher,
    {
      suspense: true,
    }
  );

  return {
    data: data,
  };
};

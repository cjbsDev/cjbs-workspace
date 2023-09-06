import useSWR from "swr";
import axios from "axios";
import { fetcher } from "api";

export const useLogList = (apiName: string, uKey: string) => {
  const { data } = useSWR(`/${apiName}/log/${uKey}`, fetcher, {
    suspense: true,
  });

  return {
    logData: data,
  };
};

import useSWR from "swr";
import { fetcher } from "api";

export const mngrLogList = (apiName: string, uKey: string) => {
  const { data } = useSWR(`/mngr/${apiName}/log/${uKey}`, fetcher, {
    suspense: true,
  });

  return {
    logData: data,
  };
};

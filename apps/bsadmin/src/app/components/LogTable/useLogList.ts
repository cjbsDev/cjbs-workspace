import useSWR from "swr";
import axios from "axios";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useLogList = (apiName: string, uKey: string) => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiName}/log/${uKey}`,
    fetcher,
    {
      suspense: true,
    }
  );

  return {
    logData: data,
  };
};

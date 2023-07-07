import useSWR from "swr";
import axios from "axios";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface LogListProps {
  apiName: string;
  uKey: string;
}
export const useLogList = (apiName: string, uKey: string): object => {
  // const { apiName, uKey } = props;
  // const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher)

  const { data } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/${apiName}/log/${uKey}`,
    fetcher,
    {
      suspense: true,
    }
  );

  return {
    logData: data,
  };
};

import useSWR from "swr";
import { fetcher } from "api";

const useStatusTypeList = (topValue: string, midValue: string) => {
  const { data, error } = useSWR(
    `/code/list/shortly/value?topValue=${topValue}&midValue=${midValue}`,
    fetcher,
    { suspense: true },
  );

  return {
    data, // 데이터 반환
    isLoading: !error && !data, // 로딩 상태
    isError: error, // 에러 발생 시
  };
};

export default useStatusTypeList;

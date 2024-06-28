import useSWR from "swr";
import { fetcher } from "api";

export const useUnifiedLogList = (
  type: string | undefined,
  apiName: string,
  uKey: string | string[] | undefined,
  subUkey?: string | undefined,
) => {
  let url = ""; // 초기 URL은 빈 문자열로 설정

  console.log("TYPE^^^^^^", type, uKey);

  // type에 따라 API URL을 설정
  if (type === "mngr") {
    url = `/mngr/${apiName}/log/${uKey}`;
  } else if (type === "topMid") {
    url = `/mngr/log/${uKey}/${subUkey}?enumMngrCode=${apiName}`;
  } else {
    url = `/${apiName}/log/${uKey}`;
  }
  const { data } = useSWR(url, fetcher, {
    suspense: true,
  });

  return {
    logData: data,
  };
};

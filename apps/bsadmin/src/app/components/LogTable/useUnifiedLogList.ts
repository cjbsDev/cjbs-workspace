import useSWR from "swr";
import { fetcher } from "api";

export const useUnifiedLogList = (
  type: string,
  apiName: string,
  slug: string | string[] | undefined,
  subUkey?: string | undefined,
) => {
  let url = ""; // 초기 URL은 빈 문자열로 설정

  // type에 따라 API URL을 설정
  if (type === "mngr") {
    url = `/mngr/${apiName}/log/${slug}`;
  } else if (type === "topMid") {
    url = `/mngr/log/${slug}/${subUkey}?enumMngrCode=${apiName}`;
  } else {
    url = `/${apiName}/log/${slug}`;
  }
  const { data } = useSWR(url, fetcher, {
    suspense: true,
  });

  return {
    logData: data,
  };
};

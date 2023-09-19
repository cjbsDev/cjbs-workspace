import useSWR from "swr";
import { fetcher } from "api";

// topCodeMc: string, -> uKey
// midCodeMc: string, -> subUkey
// enumMngrCode: string -> apiName

export const topMidTypeLogList = (
  uKey: string,
  apiName: string,
  subUkey?: string
) => {
  //topCodeMc : BS_0100007001 / midCodeMc : none / enumMngrCode : SRVC_TYPE
  console.log(uKey + " / " + subUkey + " / " + apiName);
  const { data } = useSWR(
    `/mngr/log/${uKey}/${subUkey}?enumMngrCode=${apiName}`,
    fetcher,
    {
      suspense: true,
    }
  );
  return {
    logData: data,
  };
};

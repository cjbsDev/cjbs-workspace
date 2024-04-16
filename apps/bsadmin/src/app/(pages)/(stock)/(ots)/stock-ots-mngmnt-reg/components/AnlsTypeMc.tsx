import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { SelectBox } from "cjbsDSTM";

const AnlsTypeMc = () => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Ots Anlaysis Type&midValue=none`,
    fetcher,
    {
      suspense: true,
    },
  );
  return (
    <SelectBox
      required={true}
      errorMessage="분석 종류를 선택헤 주세요."
      inputName="anlsTypeMc"
      options={data}
      // sx={{ width: "100%" }}
    />
  );
};

export default AnlsTypeMc;

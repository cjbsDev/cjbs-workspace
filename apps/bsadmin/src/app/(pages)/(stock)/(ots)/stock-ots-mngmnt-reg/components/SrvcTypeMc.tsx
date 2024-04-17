import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { SelectBox } from "cjbsDSTM";

const SrvcTypeMc = () => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Ots Service Type&midValue=none`,
    fetcher,
    {
      suspense: true,
    },
  );
  return (
    <SelectBox
      required={true}
      errorMessage="서비스 종류를 선택헤 주세요."
      inputName="srvcTypeMc"
      options={data}
      // sx={{ width: "100%" }}
    />
  );
};

export default SrvcTypeMc;

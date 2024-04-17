import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { SelectBox } from "cjbsDSTM";

const AgncCc = () => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=ots&midValue=company`,
    fetcher,
    {
      suspense: true,
    },
  );
  return (
    <SelectBox
      required={true}
      errorMessage="업체를 선택헤 주세요."
      inputName="agncCc"
      options={data}
      // sx={{ width: "100%" }}
    />
  );
};

export default AgncCc;

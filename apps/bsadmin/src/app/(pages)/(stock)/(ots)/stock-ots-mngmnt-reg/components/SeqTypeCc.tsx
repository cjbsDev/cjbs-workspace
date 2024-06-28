import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { SelectBox } from "cjbsDSTM";

const SeqTypeCc = () => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=seq&midValue=type`,
    fetcher,
    {
      suspense: true,
    },
  );
  return (
    <SelectBox
      required={true}
      errorMessage="구분 종류를 선택헤 주세요."
      inputName="seqTypeCc"
      options={data}
      // sx={{ width: "100%" }}
    />
  );
};

export default SeqTypeCc;

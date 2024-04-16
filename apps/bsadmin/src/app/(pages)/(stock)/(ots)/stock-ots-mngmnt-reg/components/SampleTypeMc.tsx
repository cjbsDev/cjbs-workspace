import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { SelectBox } from "cjbsDSTM";

const SampleTypeMc = () => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Ots Sample Type&midValue=none`,
    fetcher,
    {
      suspense: true,
    },
  );
  return (
    <SelectBox
      required={true}
      errorMessage="샘플 종류를 선택헤 주세요."
      inputName="sampleTypeMc"
      options={data}
      // sx={{ width: "100%" }}
    />
  );
};

export default SampleTypeMc;

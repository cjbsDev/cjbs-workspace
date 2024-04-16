import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { SelectBox } from "cjbsDSTM";

const PltfMc = () => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Ots Platform Type&midValue=none`,
    fetcher,
    {
      suspense: true,
    },
  );
  return (
    <SelectBox
      required={true}
      errorMessage="플랫폼 선택헤 주세요."
      inputName="pltfMc"
      options={data}
      // sx={{ width: "100%" }}
    />
  );
};

export default PltfMc;

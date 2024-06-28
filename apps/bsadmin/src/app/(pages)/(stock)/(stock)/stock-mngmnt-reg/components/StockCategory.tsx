import React from "react";
import { RadioGV } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";

const StockCategory = () => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=stock&midValue=category`,
    fetcher,
    {
      suspense: true,
    },
  );
  return (
    <RadioGV
      data={data}
      inputName="stockCtgrCc"
      required={true}
      errorMessage="필수 선택입니다."
    />
  );
};

export default StockCategory;

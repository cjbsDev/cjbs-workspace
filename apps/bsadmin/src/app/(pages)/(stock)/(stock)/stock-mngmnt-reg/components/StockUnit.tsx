import React from "react";
import { RadioGV, SelectBox } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";
import { groupDepartMngrListData } from "../../../../../data/inputDataLists";

const StockCategory = () => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=stock&midValue=unit`,
    fetcher,
    {
      suspense: true,
    },
  );
  return (
    <SelectBox
      required={true}
      errorMessage="단위를 선택헤 주세요."
      inputName="unitCc"
      options={data}
    />
  );
};

export default StockCategory;

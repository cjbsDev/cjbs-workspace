import React from "react";
import { RadioGV, SelectBox } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";
import { groupDepartMngrListData } from "../../../../../data/inputDataLists";

const StockMachine = () => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Stock Machine&midValue=none`,
    fetcher,
    {
      suspense: true,
    },
  );
  return (
    <SelectBox
      // required={true}
      // errorMessage="사용기계를 선택헤 주세요."
      inputName="mchnMc"
      options={data}
    />
  );
};

export default StockMachine;

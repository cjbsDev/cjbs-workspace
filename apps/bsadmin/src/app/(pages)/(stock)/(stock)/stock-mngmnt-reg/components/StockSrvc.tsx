import React from "react";
import { RadioGV, SelectBox } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";
import { groupDepartMngrListData } from "../../../../../data/inputDataLists";

const StockSrvc = () => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Stock Service&midValue=none`,
    fetcher,
    {
      suspense: true,
    },
  );
  return (
    <SelectBox
      required={true}
      errorMessage="서비스를 선택헤 주세요."
      inputName="srvcMc"
      options={data}
    />
  );
};

export default StockSrvc;

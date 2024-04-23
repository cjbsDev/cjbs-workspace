import React from "react";
import { RadioGV, SelectBox } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";
import { groupDepartMngrListData } from "../../../../../data/inputDataLists";

const StockPlace = () => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue= Stock Place&midValue=none`,
    fetcher,
    {
      suspense: true,
    },
  );
  return (
    <SelectBox
      required={true}
      errorMessage="재고 위치를 선택헤 주세요."
      inputName="strgPlaceMc"
      options={data}
    />
  );
};

export default StockPlace;

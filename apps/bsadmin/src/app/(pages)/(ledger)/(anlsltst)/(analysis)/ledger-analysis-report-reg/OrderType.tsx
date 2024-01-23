import React from "react";
// import fetcher from "../../../func/fetcher";
import { fetcher } from "api";
import useSWR from "swr";
import { cjbsTheme, RadioGV } from "cjbsDSTM";

const OrderType = () => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=order&midValue=type`,
    fetcher,
    {
      suspense: true,
    }
  );
  console.log("OrderType List", data);
  const orderTypeData = data;

  return (
    <RadioGV
      data={orderTypeData}
      inputName="orderTypeCc"
      required={true}
      errorMessage="오더 타입을 선택해 주세요."
    />
  );
};

export default OrderType;

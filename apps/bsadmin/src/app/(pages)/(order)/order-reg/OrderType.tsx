import React from "react";
import fetcher from "../../../func/fetcher";
import useSWR from "swr";
import { cjbsTheme, RadioGV } from "cjbsDSTM";

const OrderType = () => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly/value?topValue=order&midValue=type`,
    fetcher,
    {
      suspense: true,
    }
  );
  console.log("OrderType List", data.data);
  const orderTypeData = data.data;

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

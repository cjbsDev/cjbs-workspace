import React from "react";
import { CheckboxGV } from "cjbsDSTM";
import useSWR from "swr";
import fetcher from "../../../../../../func/fetcher";

const OrderTypeChck = () => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly/value?topValue=order&midValue=type`,
    fetcher,
    {
      suspense: true,
    }
  );

  const orderTypeValue = data.data;

  console.log("오더타입 리스트", orderTypeValue);

  return <CheckboxGV data={orderTypeValue} inputName="typeCcList" />;
};

export default OrderTypeChck;

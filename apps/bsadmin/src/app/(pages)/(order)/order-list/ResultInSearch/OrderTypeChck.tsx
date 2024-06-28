import React from "react";
import { CheckboxGV } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";

const OrderTypeChck = () => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=order&midValue=type`,
    fetcher,
    {
      suspense: true,
    },
  );

  // const orderTypeValue = data.data;
  //
  // console.log("오더타입 리스트", orderTypeValue);

  return <CheckboxGV data={data} inputName="typeCcList" />;
};

export default OrderTypeChck;

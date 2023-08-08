import React from "react";
import { CheckboxGV } from "cjbsDSTM";
import useSWR from "swr";
import fetcher from "../../../../func/fetcher";

const OrderTypeChck = () => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly/value?topValue=order&midValue=type`,
    fetcher,
    {
      suspense: true,
    }
  );

  const orderTypeValue = data.data;

  console.log(orderTypeValue);

  return <CheckboxGV data={orderTypeValue} inputName="checkGVTest" />;
};

export default OrderTypeChck;

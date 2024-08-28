import React from "react";
import { CheckboxGV } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";

const OrderTypeChck = () => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Analaysis Type&midValue=`,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("분석종류 리스트", data);

  return <CheckboxGV data={data} inputName="anlsTypeMcList" />;
};

export default OrderTypeChck;

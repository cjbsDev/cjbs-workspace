import React from "react";
import { NewRadio2, Radio } from "cjbsDSTM";
import { Stack } from "@mui/material";
import fetcher from "../../../func/fetcher";
import useSWR from "swr";
import axios from "axios";

const OrderType = () => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/value?topValue=order&midValue=type`,
    fetcher,
    {
      suspense: true,
    }
  );
  console.log("OrderType List", data.data.order.type);
  const orderTypeData = data.data.order.type;

  return (
    <NewRadio2 data={orderTypeData} inputName="orderTypeCc" />
    // <Stack direction="row">
    //   {orderTypeData.map((item) => {
    //     const { codeNm, uniqueCode } = item;
    //     return (
    //       <Radio
    //         key={uniqueCode}
    //         inputName="orderTypeCc"
    //         required={true}
    //         errorMessage="sdfljljlj"
    //         labelText={codeNm}
    //         value={uniqueCode}
    //       />
    //     );
    //   })}
    // </Stack>
  );
};

export default OrderType;

import React from "react";
import { SelectBox } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";

const ServiceTypeSelectbox = ({ inputName }) => {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Service Type&midValue=none`,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("Service Type List", data);

  return (
    <SelectBox
      errorMessage="서비스타입을 선택해 주세요."
      inputName={inputName}
      options={data}
      required={true}
      disabled={true}
      fullWidth={true}
      sx={{
        ".Mui-disabled ": {
          border: "0px",
          textFillColor: "#757575 !important",
          pr: "0px !important",
          cursor: "no-drop",
        },
        "&.Mui-disabled": {
          backgroundColor: "#F1F3F5",
        },
      }}
    />
  );
};

export default ServiceTypeSelectbox;

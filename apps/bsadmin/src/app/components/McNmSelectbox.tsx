import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";
import React from "react";

// 장비
export default function McNmSelectbox(props) {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Experiment Machine`,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("SSSSSSSSS", data);

  return (
    <SelectBox
      {...props}
      inputName="mcNmCc"
      options={data}
      sx={{ width: "100%" }}
    />
  );
}

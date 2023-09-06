import { SelectBox } from "cjbsDSTM";
import { fetcher } from "api";
import useSWR from "swr";
import dynamic from "next/dynamic";
import React from "react";

export default function SelectDept() {
  const { data } = useSWR(
    `/code/list/shortly?topUniqueCode=BS_0100003`,
    fetcher,
    {
      suspense: true,
    }
  );

  return (
    <>
      <SelectBox
        sx={{ width: "200px" }}
        required={true}
        defaultOption={false}
        inputName="departCodeMc"
        options={data}
      />
    </>
  );
}

import { SelectBox } from "cjbsDSTM";
import fetcher from "../../../func/fetcher";
import useSWR from "swr";
import dynamic from "next/dynamic";
import React from "react";

export default function SelectDept() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly?topUniqueCode=BS_0100003`,
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
        options={data.data}
      />
    </>
  );
}

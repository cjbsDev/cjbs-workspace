import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { SelectBox } from "cjbsDSTM";

const ClrUkey = () => {
  const { data } = useSWR(`/code/user/BS_0100003011/list`, fetcher, {
    suspense: true,
  });
  return (
    <SelectBox
      required={true}
      errorMessage="발주자를 선택헤 주세요."
      inputName="clrUkey"
      options={data}
      // sx={{ width: "100%" }}
    />
  );
};

export default ClrUkey;

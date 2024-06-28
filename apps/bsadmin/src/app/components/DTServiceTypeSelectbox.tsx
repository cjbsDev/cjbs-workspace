import React, { useEffect } from "react";

import { fetcher } from "api";
import useSWR from "swr";
import { SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
interface InputNameProps {
  inputName: string;
  index: number;
}
// 서비스 타입
const DTServiceTypeSelectbox = ({ inputName, index }: InputNameProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Service Type&midValue=none`,
    fetcher,
    {
      suspense: true,
    }
  );

  return (
    <SelectBox
      inputName={inputName}
      options={data}
      required={true}
      errorMessage="서비스 타입을 선택해 주세요"
      sx={{ width: "100%" }}
    />
  );
};

export default DTServiceTypeSelectbox;

import React, { useEffect } from "react";

import { fetcher } from "api";
import useSWR from "swr";
import { SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
interface InputNameProps {
  inputName: string;
  index: number;
}
// 서비스 분류
const ServiceCategorySelectbox = ({ inputName, index }: InputNameProps) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();

  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Service Classification&midValue=`,
    fetcher,
    {
      suspense: true,
    },
  );

  return (
    <SelectBox
      inputName={inputName}
      options={data}
      required={true}
      errorMessage="서비스 분류를 선택해 주세요"
      sx={{ width: "100%" }}
      defaultValue={"BS_0100005001"}
    />
  );
};

export default ServiceCategorySelectbox;

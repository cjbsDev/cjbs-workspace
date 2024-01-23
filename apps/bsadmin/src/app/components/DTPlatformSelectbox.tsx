import React, { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext, useWatch } from "react-hook-form";
import { Typography } from "@mui/material";
import { SelectBox, InputValidation } from "cjbsDSTM";

interface InputNameProps {
  inputName: string;
  fieldName: string;
  control: any;
  index: number;
}

const DTPlatformSelectbox = ({
  inputName,
  fieldName,
  control,
  index,
}: InputNameProps) => {
  const {
    formState: { errors },
  } = useFormContext();
  const productValue = useWatch({ name: fieldName, control });
  const anlsTypeMc = productValue[index]?.anlsTypeMc;

  const { data, error, isValidating } = useSWR(
    anlsTypeMc ? `/code/order/pltf/list?type=${anlsTypeMc}` : null,
    fetcher
  );
  if (error) return <Typography>오류 발생: {error.message}</Typography>;
  if (isValidating) return <Typography>로딩 중...</Typography>;

  // anlsTypeMc 값이 없으면 SelectBox를 렌더링하지 않음
  if (!anlsTypeMc) {
    return null;
  }

  return (
    <SelectBox
      inputName="platformMc"
      options={data}
      required={true}
      errorMessage="플랫폼을 선택해 주세요."
    />
  );
};

export default DTPlatformSelectbox;

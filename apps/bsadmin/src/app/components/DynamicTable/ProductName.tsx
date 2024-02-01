import React, { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext, useWatch } from "react-hook-form";
import { Typography } from "@mui/material";
import { InputValidation } from "cjbsDSTM";

interface InputNameProps {
  inputName: string;
  fieldName: string;
  control: any;
  index: number;
}

const ProductName = ({
  inputName,
  fieldName,
  control,
  index,
}: InputNameProps) => {
  const {
    setValue,
    resetField,
    formState: { errors },
  } = useFormContext();
  const productValue = useWatch({ name: fieldName, control });
  const anlsTypeMc = productValue[index]?.anlsTypeMc;

  const { data, error, isValidating } = useSWR(
    anlsTypeMc ? `/mngr/esPrMng/anlsType/${anlsTypeMc}` : null,
    fetcher,
  );

  useEffect(() => {
    if (anlsTypeMc === "BS_0100006015") {
      resetField(inputName);
    } else if (data) {
      setValue(inputName, data.prNm);
    }
  }, [anlsTypeMc, data, inputName, resetField, setValue]);

  if (error) return <Typography>오류 발생: {error.message}</Typography>;
  if (isValidating) return <Typography>로딩 중...</Typography>;

  return (
    <>
      {anlsTypeMc === "" ? (
        <Typography variant="body2" color="secondary">
          분석 종류를 선택해 주세요
        </Typography>
      ) : anlsTypeMc === "BS_0100006015" ? (
        <InputValidation
          inputName={inputName}
          required={true}
          errorMessage="품명을 입력하세요."
        />
      ) : (
        <Typography variant="body2">{data.prNm}</Typography>
      )}
    </>
  );
};

export default ProductName;

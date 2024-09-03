import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { cjbsTheme, InputPriceType } from "cjbsDSTM";
import { Typography } from "@mui/material";
import { useParams } from "next/navigation";

const UnitPrice = ({ fieldArrayName, index }) => {
  const params = useParams<{ tag: string; item: string }>();
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  const productValue = useWatch({ name: fieldArrayName, control });
  // console.log("ProductValue {}{} ==>>", productValue);
  const sampleSize =
    productValue[index]?.sampleSize === undefined
      ? 0
      : productValue[index]?.sampleSize;
  const unitPrice =
    productValue[index]?.unitPrice === undefined
      ? 0
      : productValue[index]?.unitPrice;

  const handleOnBlurSupplyPrice = () => {
    setValue(`${fieldArrayName}[${index}].supplyPrice`, sampleSize * unitPrice);
  };

  return (
    <>
      <Controller
        name={`${fieldArrayName}[${index}].unitPrice`}
        control={control}
        rules={{ required: "단가를 입력해야 합니다." }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <NumericFormat
            defaultValue={0}
            value={value}
            thousandSeparator={true}
            onValueChange={(values) => {
              onChange(values.floatValue); // 또는 `values.value`를 사용하여 문자열로 처리
            }}
            // onBlur={params.slug !== undefined ? handleOnBlurSupplyPrice : null}
            onBlur={() => handleOnBlurSupplyPrice()}
            customInput={InputPriceType}
          />
        )}
      />
      {errors.costList?.[index]?.unitPrice && (
        <Typography variant="body2" color={cjbsTheme.palette.warning.main}>
          단가를 입력 해주세요
        </Typography>
      )}
    </>
  );
};

export default UnitPrice;

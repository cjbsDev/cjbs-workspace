import React from "react";
import { NumericFormat } from "react-number-format";
import { InputPriceType } from "cjbsDSTM";
import { Controller, useFormContext } from "react-hook-form";

const InputDpstPrice = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name="dpstPrice"
      control={control}
      rules={{ required: "입금액을 입력하세요." }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <NumericFormat
          defaultValue={0}
          value={value}
          thousandSeparator={true}
          onValueChange={(values) => {
            onChange(values.floatValue); // 또는 `values.value`를 사용하여 문자열로 처리
          }}
          customInput={InputPriceType}
        />
      )}
    />
  );
};

export default InputDpstPrice;

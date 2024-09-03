import React from "react";
import { NumericFormat } from "react-number-format";
import { InputEAType, InputPriceType } from "cjbsDSTM";
import { Controller, useFormContext } from "react-hook-form";

interface InputPriceProps {
  inputName: string;
  unit?: string;
}

const InputPrice = ({ inputName, unit = "EA" }: InputPriceProps) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const getPymtInfoCc = watch("pymtInfoCc");
  return (
    <Controller
      name={inputName}
      control={control}
      rules={{ required: "필수값 입니다." }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <NumericFormat
          disabled={getPymtInfoCc === "BS_1914002"}
          defaultValue={0}
          value={value}
          thousandSeparator={true}
          onValueChange={(values) => {
            onChange(values.floatValue); // 또는 `values.value`를 사용하여 문자열로 처리
          }}
          customInput={unit === "EA" ? InputEAType : InputPriceType}
        />
      )}
    />
  );
};

export default InputPrice;

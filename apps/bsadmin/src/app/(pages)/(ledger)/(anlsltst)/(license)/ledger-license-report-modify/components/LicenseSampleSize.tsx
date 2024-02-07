import React, { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { cjbsTheme, InputEAType } from "cjbsDSTM";
import { Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";

const LicenseSampleSize = (props:any) => {

  const { index, errors } = props;
  const { getValues, control, watch } = useFormContext();

  return (
    <>
      <Controller
        name={`sample.[${index}].sampleSize`}
        control={control}
        rules={{ required: "수량을 입력해야 합니다." }}
        render={({
                   field: { onChange, value },
                   fieldState: { error },
                 }) => (
          <NumericFormat
            defaultValue={0}
            value={value}
            thousandSeparator={true}
            onValueChange={(values) => {
              onChange(values.floatValue); // 또는 `values.value`를 사용하여 문자열로 처리
            }}
            customInput={InputEAType}
          />
        )}
      />
      {errors.sample?.[index]?.sampleSize && (
        <Typography
          variant="body2"
          color={cjbsTheme.palette.warning.main}
        >
          수량을 입력 해주세요
        </Typography>
      )}
    </>
  );
};

export default LicenseSampleSize;

import React, {useEffect, useState} from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {cjbsTheme, InputEAType, InputPriceType} from "cjbsDSTM";
import { Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";

const LicenseVat = (props:any) => {

  const { index, errors } = props;
  const { setValue, getValues, control, watch } = useFormContext();
  const sampleValue = useWatch({
    name: "sample",
    control,
  });

  const supplyPrice = watch(`sample[${index}].supplyPrice`);

  useEffect(() => {
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$11111111',  supplyPrice);
    setValue(`sample.[${index}].vat`, (supplyPrice * 0.1).toFixed(0));
  }, [supplyPrice]);


  return (
    <>
      <Controller
        name={`sample.[${index}].vat`}
        control={control}
        rules={{ required: "부가세을 입력해야 합니다." }}
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
            customInput={InputPriceType}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              "&.MuiTextField-root" : {
                backgroundColor : "#F1F3F5",
              },
            }}
          />
        )}
      />
      {errors.sample?.[index]?.vat && (
        <Typography
          variant="body2"
          color={cjbsTheme.palette.warning.main}
        >
          부가세을 입력 해주세요.
        </Typography>
      )}
    </>
  );
};

export default LicenseVat;

import React, {useEffect, useState} from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {cjbsTheme, InputEAType, InputPriceType, InputValidation} from "cjbsDSTM";
import { Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";
import {toast} from "react-toastify";

const LicenseSupplyPrice = (props:any) => {

  const { index, errors } = props;
  const { setValue, getValues, control, watch } = useFormContext();
  const sampleValue = useWatch({
    name: "sample",
    control,
  });

  const chkSupplyPrice = watch(`sample.[${index}].unitPrice`) * watch(`sample.[${index}].sampleSize`);
  const supplyPrice = watch(`sample.[${index}].supplyPrice`);

  const handleOnFocus =  (event: any) => {
    event.target.select();
  }

  const handleOnBlurSupplyPrice =  () => {
    console.log("supplyPrice", supplyPrice);
    console.log("chkSupplyPrice", chkSupplyPrice);
    if((supplyPrice - chkSupplyPrice) > 10) {
      toast(
        <>
          <Typography variant="body2">금액이 10원 이상 변경 되었습니다.</Typography>
          <Typography variant="body2">공급금액을 다시 입력해주세요.</Typography>
        </>
      );
      // setValue(`sample.[${index}].supplyPrice`, stndSupplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      setValue(`sample.[${index}].supplyPrice`, chkSupplyPrice);
    } else if ((supplyPrice - chkSupplyPrice) < -10) {
      toast(
        <>
          <Typography variant="body2">금액이 10원 이상 변경 되었습니다.</Typography>
          <Typography variant="body2">공급금액을 다시 입력해주세요.</Typography>
        </>
      );
      // setValue(`sample.[${index}].supplyPrice`, stndSupplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      setValue(`sample.[${index}].supplyPrice`, chkSupplyPrice);
    }
  }

  return (
    <>
      <Controller
        name={`sample.[${index}].supplyPrice`}
        control={control}
        rules={{ required: "공급가액을 입력해야 합니다." }}
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
            onBlur={handleOnBlurSupplyPrice}
            onFocus={handleOnFocus}
            customInput={InputPriceType}
          />
        )}
      />
      {errors.sample?.[index]?.supplyPrice && (
        <Typography
          variant="body2"
          color={cjbsTheme.palette.warning.main}
        >
          공급가액을 입력 해주세요.
        </Typography>
      )}
    </>
  );
};

export default LicenseSupplyPrice;

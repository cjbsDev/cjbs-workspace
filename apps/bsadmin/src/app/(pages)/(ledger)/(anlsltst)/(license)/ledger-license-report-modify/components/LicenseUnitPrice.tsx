import React, {useEffect, useState} from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {cjbsTheme, InputEAType, InputPriceType} from "cjbsDSTM";
import { Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";

const LicenseUnitPrice = (props:any) => {

  const { index, errors } = props;
  const { setValue, getValues, control, watch } = useFormContext();
  const sampleValue = useWatch({
    name: "sample",
    control,
  });

  const stndPriceVal = watch(`sample[${index}].stndPrice`);
  const chkStndPrice = watch(`sample[${index}].chkStndPrice`);
  // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$',  stndPriceVal);
  // setValue(`sample.[${index}].unitPrice`, 0);

  // useEffect(() => {
  //   console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$11111111',  stndPriceVal);
  //   setValue(`sample.[${index}].unitPrice`, 0);
  // }, []);

  // const [stndSupplyPrice, setStndSupplyPrice] = useState<number>(0);
  // const [disCountChk, setDisCountChk] = useState<boolean>(false);

  const handleOnFocus =  (event: any) => {
    event.target.select();
  }

  // 단가 포커스 아웃시 이벤트
  const handleOnBlurUnitPrice =  () => {
    const unitPrice = getValues(`sample.[${index}].unitPrice`);
    const sampleSize = getValues(`sample.[${index}].sampleSize`);
    const stndPrice = Number(getValues(`sample.[${index}].stndPrice`).replaceAll(",", ""));
    const stndDscntPctg = Number(getValues(`sample.[${index}].stndDscntPctg`));
    console.log("unitPrice", unitPrice);
    console.log("sampleSize", sampleSize);
    console.log("stndPrice", stndPrice);
    console.log("stndPricestndDscntPctg", stndDscntPctg);
    if(sampleSize > 0) {
      setValue(`sample.[${index}].supplyPrice`, (unitPrice * sampleSize));
      setValue(`sample.[${index}].vat`, ((unitPrice * sampleSize) * 0.1).toFixed(0));
      // setStndSupplyPrice((unitPrice * sampleSize));
      let disCountPercent: number = 0;
      if (unitPrice >= 0 ) {
        if (isNaN(stndPrice) || stndPrice === 0) {
          disCountPercent = 0;
          setValue(`sample.[${index}].dscntPctg`, "N/A");
        } else {
          if (stndPrice > unitPrice) {
            disCountPercent = Math.round((((stndPrice - unitPrice) / stndPrice) * 100) * 100) / 100.0;
            setValue(`sample.[${index}].dscntPctg`, disCountPercent);
          } else if (stndPrice < unitPrice) {
            disCountPercent = Math.round(((((unitPrice - stndPrice) / stndPrice) * 100) + 100) * 100) / 100.0
            setValue(`sample.[${index}].dscntPctg`, disCountPercent);
          } else if (stndPrice == unitPrice) {
            disCountPercent = 0;
            setValue(`sample.[${index}].dscntPctg`, "0");
          }
        }

      } else {
        setValue(`sample.[${index}].dscntPctg`, "-");
        setValue(`sample.[${index}].isExc`, "N");
      }

      if(disCountPercent > stndDscntPctg) {
        if(disCountPercent > 100) {
          setValue(`sample.[${index}].isExc`, "N");
          // setDisCountChk(false);
        } else {
          setValue(`sample.[${index}].isExc`, "Y");
          // setDisCountChk(true);
        }
      } else {
        setValue(`sample.[${index}].isExc`, "N");
        // setDisCountChk(false);
      }

    }
    // 모든계산이 끝나면 단가에 콤마추가
    // setValue(`sample.[${index}].unitPrice`, unitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    setValue(`sample.[${index}].unitPrice`, unitPrice);
  }

  return (
    <>
      <Controller
        name={`sample.[${index}].unitPrice`}
        control={control}
        rules={{ required: "단가를 입력해야 합니다." }}
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
            onBlur={handleOnBlurUnitPrice}
            onFocus={handleOnFocus}
            customInput={InputPriceType}
          />
        )}
      />
      {errors.sample?.[index]?.unitPrice && (
        <Typography
          variant="body2"
          color={cjbsTheme.palette.warning.main}
        >
          단가를 입력 해주세요.
        </Typography>
      )}
    </>
  );
};

export default LicenseUnitPrice;

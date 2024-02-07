import React, { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { cjbsTheme, InputEAType, InputPriceType } from "cjbsDSTM";
import { Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";

const DTUnitPrice = (props: any) => {
  const { index, errors } = props;
  const { setValue, getValues, control, watch } = useFormContext();
  const sampleValue = useWatch({
    name: "productDetailList",
    control,
  });

  const handleOnFocus = (event: any) => {
    event.target.select();
  };

  // 단가 포커스 아웃시 이벤트
  const handleOnBlurUnitPrice = () => {
    const unitPrice = getValues(`productDetailList.[${index}].unitPrice`);
    const sampleSize = getValues(`productDetailList.[${index}].sampleSize`);
    const stndPriceValue = getValues(`productDetailList.[${index}].stndPrice`);
    const stndPrice = stndPriceValue
      ? Number(stndPriceValue.replaceAll(",", ""))
      : 0;
    const stndDscntPctg = Number(
      getValues(`productDetailList.[${index}].stndDscntPctg`)
    );
    if (sampleSize > 0) {
      setValue(
        `productDetailList.[${index}].supplyPrice`,
        unitPrice * sampleSize
      );
      setValue(
        `productDetailList.[${index}].vat`,
        (unitPrice * sampleSize * 0.1).toFixed(0)
      );
      // setStndSupplyPrice((unitPrice * sampleSize));
      let disCountPercent: number = 0;
      if (unitPrice >= 0) {
        if (isNaN(stndPrice) || stndPrice === 0) {
          disCountPercent = 0;
          setValue(`productDetailList.[${index}].dscntPctg`, "N/A");
        } else {
          if (stndPrice > unitPrice) {
            disCountPercent =
              Math.round(((stndPrice - unitPrice) / stndPrice) * 100 * 100) /
              100.0;
            setValue(`productDetailList.[${index}].dscntPctg`, disCountPercent);
          } else if (stndPrice < unitPrice) {
            disCountPercent =
              Math.round(
                (((unitPrice - stndPrice) / stndPrice) * 100 + 100) * 100
              ) / 100.0;
            setValue(`productDetailList.[${index}].dscntPctg`, disCountPercent);
          } else if (stndPrice == unitPrice) {
            disCountPercent = 0;
            setValue(`productDetailList.[${index}].dscntPctg`, "0");
          }
        }
      } else {
        setValue(`productDetailList.[${index}].dscntPctg`, "-");
        setValue(`productDetailList.[${index}].isExc`, "N");
      }

      if (disCountPercent > stndDscntPctg) {
        if (disCountPercent > 100) {
          setValue(`productDetailList.[${index}].isExc`, "N");
        } else {
          setValue(`productDetailList.[${index}].isExc`, "Y");
        }
      } else {
        setValue(`productDetailList.[${index}].isExc`, "N");
      }
    }
    setValue(`productDetailList.[${index}].unitPrice`, unitPrice);
  };

  return (
    <>
      <Controller
        name={`productDetailList.[${index}].unitPrice`}
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
            onBlur={handleOnBlurUnitPrice}
            onFocus={handleOnFocus}
            customInput={InputPriceType}
          />
        )}
      />
      {errors.sample?.[index]?.unitPrice && (
        <Typography variant="body2" color={cjbsTheme.palette.warning.main}>
          단가를 입력 해주세요.
        </Typography>
      )}
    </>
  );
};

export default DTUnitPrice;

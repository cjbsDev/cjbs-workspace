import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Stack, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { InputPriceType } from "cjbsDSTM";

const VatValue2 = () => {
  const {
    setValue,
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const getSupplyTotalValue = watch("totalSupplyPrice2");
  // const getPymtInfoCc = watch("pymtInfoCc");
  // console.log("getPymtInfoCc&&&&&&&", getPymtInfoCc);
  // const wtchVat = watch("vat2");
  // console.log("LLLLLLL", wtchVat);
  const vatValue = getSupplyTotalValue * 0.1;

  // useEffect(() => {
  //   setValue("vat2", 0);
  // }, [setValue, vatValue]);

  return (
    <>
      {/*<Stack direction="row" spacing={0.5} justifyContent="flex-end">*/}
      {/*  <Typography variant="body2">*/}
      {/*    {getSupplyTotalValue !== undefined ? (*/}
      {/*      <NumericFormat*/}
      {/*        value={vatValue}*/}
      {/*        // decimalScale={1}*/}
      {/*        thousandSeparator*/}
      {/*        fixedDecimalScale*/}
      {/*        // displayType="text"*/}
      {/*      />*/}
      {/*    ) : (*/}
      {/*      0*/}
      {/*    )}*/}
      {/*  </Typography>*/}
      {/*  <Typography variant="body2">원</Typography>*/}
      {/*</Stack>*/}

      <Controller
        name="vat2"
        control={control}
        rules={{ required: "입금액을 입력하세요." }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <NumericFormat
            defaultValue={0}
            value={vatValue}
            thousandSeparator={true}
            onValueChange={(values) => {
              onChange(values.floatValue); // 또는 `values.value`를 사용하여 문자열로 처리
            }}
            customInput={InputPriceType}
          />
        )}
      />
    </>
  );
};

export default VatValue2;

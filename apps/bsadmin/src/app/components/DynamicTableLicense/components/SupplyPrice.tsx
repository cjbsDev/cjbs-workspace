import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { IconButton, Stack, Typography } from "@mui/material";
import {
  cjbsTheme,
  ContainedButton,
  formatNumberWithCommas,
  InputPriceType,
} from "cjbsDSTM";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";
import MyIcon from "icon/MyIcon";

interface SupplyPriceProps {
  inputName: string;
  fieldName: string;
  index: number;
}

const SupplyPrice = ({ fieldName, index, inputName }: SupplyPriceProps) => {
  const [stndSupplyPrice, setStndSupplyPrice] = useState<number>(0);
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  const productValue = useWatch({ name: fieldName, control });
  console.log("ProductValue {}{} ==>>", productValue);
  const sampleSize =
    productValue[index]?.sampleSize === undefined
      ? 0
      : productValue[index]?.sampleSize;
  const unitPrice =
    productValue[index]?.unitPrice === undefined
      ? 0
      : productValue[index]?.unitPrice;

  const watchSupplyPrice = productValue[index].supplyPrice;

  const supplyPrice = sampleSize * unitPrice;

  useEffect(() => {
    console.log("RERERERE~~!!");
    if (unitPrice > 0 && sampleSize > 0) {
      setValue(inputName, supplyPrice);
    }

    if (unitPrice === 0 && sampleSize === 0) {
      setValue(inputName, 0);
    }
    if (unitPrice === 0 && sampleSize > 0) {
      setValue(inputName, 0);
    }
    if (unitPrice > 0 && sampleSize === 0) {
      setValue(inputName, 0);
    }
  }, [sampleSize, unitPrice, setValue]);

  const handleSupplyPriceChange = useCallback(() => {
    // 기준이 되는 공급가액
    const newProductValue = [...productValue];
    const newSupplyPrice = newProductValue[index].supplyPrice;

    // 변경되는 공급가액
    const currentValue = getValues(inputName);
    console.log("변경가, 기준가 ==>>", currentValue, newSupplyPrice);
  }, []);

  // const incrementSupplyPrice = useCallback(() => {
  //   const currentValue = getValues(inputName);
  //   setValue(inputName, currentValue + 10);
  // }, [getValues, inputName, setValue]);
  //
  // const decrementSupplyPrice = useCallback(() => {
  //   const currentValue = getValues(inputName);
  //   setValue(inputName, Math.max(0, currentValue - 10)); // Ensures value does not go below 0
  // }, [getValues, inputName, setValue]);

  // const incrementSupplyPrice = useCallback(() => {
  //   const currentValue = getValues(inputName);
  //   if (currentValue % 10 !== 0) return; // Ensures modification only for exact 10 increments
  //   setValue(inputName, currentValue + 10);
  // }, [getValues, inputName, setValue]);

  // const incrementSupplyPrice = useCallback(() => {
  //   const currentValue = getValues(inputName);
  //   const maxIncrement = 10; // Maximum increment value
  //   const newValue = currentValue + 10;
  //
  //   if (currentValue % 10 !== 0) return; // Ensures modification only for exact 10 increments
  //   if (newValue - currentValue > maxIncrement) return; // Ensures the increment does not exceed the maximum
  //
  //   setValue(inputName, newValue);
  // }, [getValues, inputName, setValue]);

  const incrementSupplyPrice = useCallback(() => {
    const currentValue = getValues(inputName);
    const incrementedValue = currentValue + 10;
    if (incrementedValue <= 100) {
      setValue(inputName, incrementedValue);
    } else {
      console.log("Cannot increment beyond 100");
    }
  }, [getValues, inputName, setValue]);

  const decrementSupplyPrice = useCallback(() => {
    const currentValue = getValues(inputName);
    if (currentValue % 10 !== 0) return; // Ensures modification only for exact 10 increments
    setValue(inputName, Math.max(0, currentValue - 10)); // Ensures value does not go below 0
  }, [getValues, inputName, setValue]);

  return (
    <>
      <Controller
        name={`${fieldName}[${index}].supplyPrice`}
        control={control}
        rules={{ required: "공급가액을 입력하세요." }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Stack direction="row">
            <NumericFormat
              defaultValue={0}
              value={value}
              thousandSeparator={true}
              onValueChange={(values) => {
                onChange(values.floatValue); // 또는 `values.value`를 사용하여 문자열로 처리
              }}
              // onBlur={handleSupplyPriceChange}
              customInput={InputPriceType}
            />
            {/*<Stack direction="row">*/}
            {/*  <IconButton onClick={incrementSupplyPrice} size="small">*/}
            {/*    <MyIcon icon="arrow-up" size={18} />*/}
            {/*  </IconButton>*/}
            {/*  <IconButton onClick={decrementSupplyPrice} size="small">*/}
            {/*    <MyIcon icon="arrow-down" size={18} />*/}
            {/*  </IconButton>*/}
            {/*</Stack>*/}
          </Stack>
        )}
      />
      {errors.costList?.[index]?.supplyPrice && (
        <Typography variant="body2" color={cjbsTheme.palette.warning.main}>
          공급가액을 입력해 주세요.
        </Typography>
      )}

      {/*<Stack direction="row" spacing={0.5} justifyContent="flex-end">*/}
      {/*  <Typography variant="body2">*/}
      {/*    {formatNumberWithCommas(supplyPrice)}*/}
      {/*  </Typography>*/}
      {/*  <Typography variant="body2">원</Typography>*/}
      {/*</Stack>*/}
    </>
  );
};

export default SupplyPrice;

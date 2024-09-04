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
  const [count, setCount] = useState<number>(0);

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

  // const handleSupplyPriceChange = useCallback(() => {
  //   // 기준이 되는 공급가액
  //   const newProductValue = [...productValue];
  //   const newSupplyPrice = newProductValue[index].supplyPrice;
  //
  //   // 변경되는 공급가액
  //   const currentValue = getValues(inputName);
  //   console.log("변경가, 기준가 ==>>", currentValue, newSupplyPrice);
  // }, []);

  const incrementSupplyPrice = useCallback(() => {
    const currentValue = getValues(inputName);
    setCount(count + 1);
    setValue(inputName, currentValue + 1);
  }, [getValues, inputName, setValue, count]);

  const decrementSupplyPrice = useCallback(() => {
    const currentValue = getValues(inputName);
    setCount(count - 1);
    setValue(inputName, currentValue - 1);
  }, [getValues, inputName, setValue, count]);

  return (
    <>
      {/*<Controller*/}
      {/*  name={`${fieldName}[${index}].supplyPrice`}*/}
      {/*  control={control}*/}
      {/*  rules={{ required: "공급가액을 입력하세요." }}*/}
      {/*  render={({ field: { onChange, value }, fieldState: { error } }) => (*/}
      {/*    <Stack direction="row">*/}
      {/*      <NumericFormat*/}
      {/*        defaultValue={0}*/}
      {/*        value={value}*/}
      {/*        thousandSeparator={true}*/}
      {/*        onValueChange={(values) => {*/}
      {/*          onChange(values.floatValue); // 또는 `values.value`를 사용하여 문자열로 처리*/}
      {/*        }}*/}
      {/*        // onBlur={handleSupplyPriceChange}*/}
      {/*        customInput={InputPriceType}*/}
      {/*      />*/}
      {/*      <Stack direction="row">*/}
      {/*        <IconButton*/}
      {/*          onClick={incrementSupplyPrice}*/}
      {/*          size="small"*/}
      {/*          disabled={count === 10 ? true : false}*/}
      {/*        >*/}
      {/*          <MyIcon icon="arrow-up" size={18} />*/}
      {/*        </IconButton>*/}
      {/*        <IconButton*/}
      {/*          onClick={decrementSupplyPrice}*/}
      {/*          size="small"*/}
      {/*          disabled={count === -10 ? true : false}*/}
      {/*        >*/}
      {/*          <MyIcon icon="arrow-down" size={18} />*/}
      {/*        </IconButton>*/}
      {/*      </Stack>*/}
      {/*    </Stack>*/}
      {/*  )}*/}
      {/*/>*/}
      {/*{errors.costList?.[index]?.supplyPrice && (*/}
      {/*  <Typography variant="body2" color={cjbsTheme.palette.warning.main}>*/}
      {/*    공급가액을 입력해 주세요.*/}
      {/*  </Typography>*/}
      {/*)}*/}

      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
          <Typography variant="body2">
            {formatNumberWithCommas(watchSupplyPrice)}
          </Typography>
          <Typography variant="body2">원</Typography>
        </Stack>

        <Stack direction="row">
          <IconButton
            color="primary"
            onClick={incrementSupplyPrice}
            size="small"
            disabled={watchSupplyPrice === 0 || count === 10}
          >
            <MyIcon icon="plus" size={18} />
          </IconButton>
          <IconButton
            color="primary"
            onClick={decrementSupplyPrice}
            size="small"
            disabled={watchSupplyPrice === 0 || count === -10}
          >
            <MyIcon icon="minus" size={18} />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
};

export default SupplyPrice;

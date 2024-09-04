import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import {
  cjbsTheme,
  ContainedButton,
  formatNumberWithCommas,
  InputPriceType,
  InputValidation,
} from "cjbsDSTM";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";
import MyIcon from "icon/MyIcon";
import { useParams } from "next/navigation";

interface SupplyPriceProps {
  inputName: string;
  fieldName: string;
  index: number;
}

const SupplyPrice = ({ fieldName, index, inputName }: SupplyPriceProps) => {
  const [count, setCount] = useState<number>(0);

  const params = useParams<{ tag: string; item: string }>();
  // console.log("RRRRRRRRR", params.slug);
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  const productValue = useWatch({ name: fieldName, control });
  // console.log("ProductValue {}{} ==>>", productValue);
  const sampleSize =
    productValue[index]?.sampleSize === undefined
      ? 0
      : productValue[index]?.sampleSize;
  const unitPrice =
    productValue[index]?.unitPrice === undefined
      ? 0
      : productValue[index]?.unitPrice;

  // console.log("UNIT PRICE ==>>", unitPrice);

  // const anlsItstUkey = getValues("anlsItstUkey");

  // Number(productValue[index].supplyPrice.replaceAll(",", ""))

  // const getAddType = getValues(`${fieldName}[${index}].addType`);

  const getAddType = productValue[index].addType;
  // console.log("getAddType ==>>", getAddType);

  const getSupplyPrice =
    productValue[index].supplyPrice === undefined
      ? 0
      : productValue[index].supplyPrice;

  const minus = sampleSize * unitPrice - getSupplyPrice;

  // console.log("MINUS ==>>", minus);

  // const watchSupplyPrice = sampleSize * unitPrice;

  // useEffect(() => {
  //   console.log("공급가액 Render~~!!");
  //
  //   if (params.slug !== undefined) {
  //     setValue(inputName, getSupplyPrice);
  //   } else {
  //     if (unitPrice > 0 && sampleSize > 0) {
  //       setValue(inputName, watchSupplyPrice);
  //     }
  //     if (unitPrice === 0 && sampleSize > 0) {
  //       setValue(inputName, 0);
  //     }
  //     if (unitPrice > 0 && sampleSize === 0) {
  //       setValue(inputName, 0);
  //     }
  //   }
  // }, [sampleSize, unitPrice, minus, getSupplyPrice, setValue]);

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
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
          <Typography variant="body2">
            {formatNumberWithCommas(getSupplyPrice)}
          </Typography>
          <Typography variant="body2">원</Typography>
        </Stack>

        <Stack direction="row">
          <IconButton
            color="primary"
            onClick={incrementSupplyPrice}
            size="small"
            disabled={getSupplyPrice === 0 || count === 10}
          >
            <MyIcon icon="plus" size={18} />
          </IconButton>
          <IconButton
            color="primary"
            onClick={decrementSupplyPrice}
            size="small"
            disabled={getSupplyPrice === 0 || count === -10}
          >
            <MyIcon icon="minus" size={18} />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
};

export default SupplyPrice;

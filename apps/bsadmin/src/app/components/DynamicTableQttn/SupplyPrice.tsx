import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Stack, Typography } from "@mui/material";
import { formatNumberWithCommas } from "cjbsDSTM";

interface SupplyPriceProps {
  inputName: string;
  fieldName: string;
  index: number;
}

const SupplyPrice = ({ fieldName, inputName, index }: SupplyPriceProps) => {
  const { control, setValue } = useFormContext();
  const productValue = useWatch({ name: fieldName, control });
  const sampleSize =
    productValue[index]?.sampleSize === undefined
      ? 0
      : productValue[index]?.sampleSize;
  const unitPrice =
    productValue[index]?.unitPrice === undefined
      ? 0
      : productValue[index]?.unitPrice;

  const supplyPrice = sampleSize * unitPrice;

  useEffect(() => {
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

  return (
    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
      <Typography variant="body2">
        {formatNumberWithCommas(supplyPrice)}
      </Typography>
      <Typography variant="body2">원</Typography>
    </Stack>
  );
};

export default SupplyPrice;

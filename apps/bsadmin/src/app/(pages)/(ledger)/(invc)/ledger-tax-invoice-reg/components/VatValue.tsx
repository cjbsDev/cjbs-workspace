import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Stack, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";

const VatValue = () => {
  const { watch, setValue } = useFormContext();
  const getSupplyTotalValue = watch("totalSupplyPrice");
  const vatValue = getSupplyTotalValue * 0.1;

  useEffect(() => {
    setValue("vat", vatValue);
  }, [setValue, vatValue]);

  return (
    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
      <Typography variant="body2">
        {getSupplyTotalValue !== undefined ? (
          <NumericFormat
            value={vatValue}
            decimalScale={1}
            thousandSeparator
            fixedDecimalScale
            displayType="text"
          />
        ) : (
          0
        )}
      </Typography>
      <Typography variant="body2">원</Typography>
    </Stack>
  );
};

export default VatValue;

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Stack, Typography } from "@mui/material";
import { formatNumberWithCommas } from "cjbsDSTM";

const TotalPrice = () => {
  const { watch, setValue } = useFormContext();
  const getSupplyTotalValue = watch("totalSupplyPrice2");
  const getVat = watch("vat2");
  console.log("getVat^^^^", getVat);
  const supplyPlusVatTotalValue = getSupplyTotalValue + getVat;

  useEffect(() => {
    if (getVat === undefined) {
      setValue("vat2", 0);
    }
    setValue("totalPrice2", supplyPlusVatTotalValue);
  }, [setValue, supplyPlusVatTotalValue, getVat]);

  return (
    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
      <Typography variant="body2">
        {getSupplyTotalValue !== undefined
          ? formatNumberWithCommas(supplyPlusVatTotalValue)
          : 0}
      </Typography>
      <Typography variant="body2">원</Typography>
    </Stack>
  );
};

export default TotalPrice;

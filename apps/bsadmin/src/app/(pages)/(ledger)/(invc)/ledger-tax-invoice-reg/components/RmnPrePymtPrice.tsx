import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { cjbsTheme, formatNumberWithCommas, InputValidation } from "cjbsDSTM";
import { Stack, Typography } from "@mui/material";

const RmnPrePymtPrice = () => {
  const { getValues, control } = useFormContext();
  const productValue = useWatch({
    name: "invcProductDetailList",
    control,
  });

  const totalSupplyPrice = productValue.reduce(
    (sum, item) => sum + item.supplyPrice,
    0,
  );
  const vatValue = totalSupplyPrice * 0.1;
  const supplyPlusVatTotalValue = totalSupplyPrice + vatValue;

  const rmnPrePymtPrice = getValues("rmnPrePymtPrice");
  console.log("rmnPrePymtPrice", rmnPrePymtPrice);

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography sx={{ color: cjbsTheme.palette.warning.main }}>
        {rmnPrePymtPrice !== undefined &&
          formatNumberWithCommas(rmnPrePymtPrice)}
        원
      </Typography>

      {rmnPrePymtPrice < supplyPlusVatTotalValue && (
        <Typography
          variant="body2"
          sx={{ color: cjbsTheme.palette.warning.main }}
        >
          (합계금액이 더 많습니다. 다시 입력해 주세요.)
        </Typography>
      )}

      <InputValidation
        inputName="rmnPrePymtPrice"
        sx={{ display: "none" }}
        InputProps={{
          readOnly: true,
        }}
      />
    </Stack>
  );
};

export default RmnPrePymtPrice;

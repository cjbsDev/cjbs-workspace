import React from "react";
import { useFormContext } from "react-hook-form";
import { cjbsTheme, formatNumberWithCommas, InputValidation } from "cjbsDSTM";
import { Typography } from "@mui/material";

const RmnPrePymtPrice = () => {
  const { getValues } = useFormContext();
  const rmnPrePymtPrice = getValues("rmnPrePymtPrice");
  console.log("rmnPrePymtPrice", rmnPrePymtPrice);

  return (
    <>
      <Typography sx={{ color: cjbsTheme.palette.warning.main }}>
        {rmnPrePymtPrice !== undefined &&
          formatNumberWithCommas(rmnPrePymtPrice)}
        원
      </Typography>
      <InputValidation
        inputName="rmnPrePymtPrice"
        sx={{ display: "none" }}
        InputProps={{
          readOnly: true,
        }}
      />
    </>
  );
};

export default RmnPrePymtPrice;

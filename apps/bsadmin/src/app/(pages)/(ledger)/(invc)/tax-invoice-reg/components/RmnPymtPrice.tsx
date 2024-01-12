import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext } from "react-hook-form";
import { cjbsTheme, formatNumberWithCommas, InputValidation } from "cjbsDSTM";
import { Typography } from "@mui/material";

const RmnPymtPrice = () => {
  const { getValues } = useFormContext();
  const rmnPymtPrice = getValues("rmnPymtPrice") || getValues("rmnPrice");
  console.log("RMN Price", rmnPymtPrice);

  return (
    <>
      <Typography sx={{ color: cjbsTheme.palette.warning.main }}>
        {rmnPymtPrice !== undefined && formatNumberWithCommas(rmnPymtPrice)}원
      </Typography>
      <InputValidation
        inputName="rmnPymtPrice"
        sx={{ display: "none" }}
        InputProps={{
          readOnly: true,
        }}
      />
    </>
  );
};

export default RmnPymtPrice;

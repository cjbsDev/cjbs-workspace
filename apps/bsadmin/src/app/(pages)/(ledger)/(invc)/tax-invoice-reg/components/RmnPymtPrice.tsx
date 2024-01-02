import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext } from "react-hook-form";
import { cjbsTheme, formatNumberWithCommas, InputValidation } from "cjbsDSTM";
import { Typography } from "@mui/material";

const RmnPymtPrice = () => {
  const { getValues } = useFormContext();
  const rmnPrice = getValues("rmnPrice");
  console.log("RMN Price", rmnPrice);

  return (
    <>
      <Typography sx={{ color: cjbsTheme.palette.warning.main }}>
        {rmnPrice !== undefined && formatNumberWithCommas(rmnPrice)}원
      </Typography>
      <InputValidation
        inputName="rmnPrice"
        sx={{ display: "none" }}
        InputProps={{
          readOnly: true,
        }}
      />
    </>
  );
};

export default RmnPymtPrice;

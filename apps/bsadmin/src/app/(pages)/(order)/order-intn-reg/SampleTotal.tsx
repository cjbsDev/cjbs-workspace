"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Typography } from "@mui/material";
import { InputEAType, InputPriceNewType, InputValidEANewType } from "cjbsDSTM";

const SampleTotal = () => {
  const methods = useFormContext();
  const { setValue, getValues, watch } = methods;

  // sampleCnt
  // const sampleTotalValue =
  //   Number(watch("taxonBCnt")) +
  //   Number(watch("taxonECnt")) +
  //   Number(watch("taxonACnt"));
  return (
    <>
      {/*<InputEAType />*/}
      {/*<InputPriceNewType />*/}
      <InputValidEANewType name="sampleCnt" />
      {/*<Typography variant="body2">{sampleTotalValue} 개</Typography>*/}
    </>
  );
};

export default SampleTotal;

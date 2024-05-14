"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Typography } from "@mui/material";

const SampleTotal = () => {
  const methods = useFormContext();
  const { setValue, getValues, watch } = methods;
  const sampleTotalValue =
    Number(watch("taxonBCnt")) +
    Number(watch("taxonECnt")) +
    Number(watch("taxonACnt"));
  return <Typography variant="body2">{sampleTotalValue} 개</Typography>;
};

export default SampleTotal;

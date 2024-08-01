"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { InputEAType, InputPriceNewType, InputValidEANewType } from "cjbsDSTM";

const SampleTotal = ({ displayType }) => {
  const methods = useFormContext();
  const { setValue, getValues, watch } = methods;

  return <InputValidEANewType displayType={displayType} name="sampleCnt" />;
};

export default SampleTotal;

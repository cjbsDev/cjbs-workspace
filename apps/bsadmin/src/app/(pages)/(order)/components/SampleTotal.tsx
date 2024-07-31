"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { InputEAType, InputPriceNewType, InputValidEANewType } from "cjbsDSTM";

const SampleTotal = () => {
  const methods = useFormContext();
  const { setValue, getValues, watch } = methods;

  return <InputValidEANewType name="sampleCnt" />;
};

export default SampleTotal;

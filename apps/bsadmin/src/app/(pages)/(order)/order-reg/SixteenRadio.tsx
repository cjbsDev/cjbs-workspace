"use client";
import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function SixteenRadio() {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <Controller
      control={control}
      name="orderTypeCc"
      render={({ field }) => (
        <RadioGroup {...field}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      )}
    />
  );
}

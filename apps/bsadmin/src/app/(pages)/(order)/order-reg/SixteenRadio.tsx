"use client";
import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Checkbox,
  ContainedButton,
  LinkButton,
  OutlinedButton,
} from "cjbsDSTM";
import ToggleButton from "@mui/material/ToggleButton";
import MyIcon from "icon/MyIcon";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function SixteenRadio() {
  const [checked, setChecked] = React.useState(false);
  const methods = useFormContext();
  const { setValue, getValues, watch, clearErrors, control } = methods;

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

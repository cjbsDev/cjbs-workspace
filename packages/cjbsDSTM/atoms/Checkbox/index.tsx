import * as React from "react";
import { FormControlLabel, Input, Typography } from "@mui/material";
import { FormProps } from "react-hook-form";

interface CheckboxProps {
  register: any;
  inputName: string;
  labelText: string;
  defaultValue: string | boolean;
}

export const Checkbox = (props: CheckboxProps) => {
  const { register, inputName, labelText, defaultValue } = props;
  return (
    <FormControlLabel
      control={
        <Input
          {...register(inputName)}
          type="checkbox"
          defaultValue={defaultValue}
          disableUnderline={true}
          sx={{ width: 18, ml: 1.5 }}
        />
      }
      label={
        <Typography variant="body2" sx={{ ml: 1 }}>
          {labelText}
        </Typography>
      }
    />
  );
};

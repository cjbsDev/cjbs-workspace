import * as React from "react";
import { FormControlLabel, Input, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface CheckboxProps {
  inputName: string;
  labelText: string;
  value: string | boolean;
}

export const Checkbox = (props: CheckboxProps) => {
  const { inputName, labelText, value, ...rest } = props;
  const methods = useFormContext();
  return (
    <FormControlLabel
      control={
        <Input
          {...methods.register(inputName)}
          {...rest}
          type="checkbox"
          defaultValue={value}
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

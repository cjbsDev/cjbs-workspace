import * as React from "react";
import { FormControlLabel, Input, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface CheckboxProps {
  inputName: string;
  labelText: string;
  defaultValue: string | boolean;
}

export const Checkbox = (props: CheckboxProps) => {
  const { inputName, labelText, defaultValue, ...rest } = props;
  const methods = useFormContext();
  return (
    <FormControlLabel
      control={
        <Input
          {...methods.register(inputName)}
          {...rest}
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

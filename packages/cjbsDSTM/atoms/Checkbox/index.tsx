import * as React from "react";
import { FormControlLabel, Input, Typography, InputProps } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";

interface CheckboxProps extends InputProps {
  inputName: string;
  labelText: string;
  waringIs?: boolean;
  subMessage?: string;
  value: string | boolean;
}

export const Checkbox = ({
  inputName,
  labelText,
  value,
  waringIs,
  subMessage,
  ...props
}: CheckboxProps) => {
  const methods = useFormContext();
  return (
    <ThemeProvider theme={cjbsTheme}>
      <FormControlLabel
        sx={{
          color: waringIs
            ? cjbsTheme.palette.warning.main
            : cjbsTheme.palette.common.black,
        }}
        control={
          <Input
            {...methods.register(inputName, {
              onChange: (e) => console.log("Check Selected!", e.target.value),
            })}
            {...props}
            type="checkbox"
            defaultValue={value}
            disableUnderline={true}
            sx={{
              width: 16,
              ml: 1.5,
              mr: 1,
            }}
          />
        }
        label={labelText}
      />
      <Typography
        variant="body2"
        sx={{ ml: "-8px !important", display: "inline-block" }}
      >
        {subMessage}
      </Typography>
    </ThemeProvider>
  );
};

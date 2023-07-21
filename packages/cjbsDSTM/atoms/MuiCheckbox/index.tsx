import * as React from "react";
import {
  FormControlLabel,
  Checkbox as MuiCheckbox,
  Input,
  Typography,
  InputProps,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";

interface CheckboxProps extends InputProps {
  inputName: string;
  labelText: string;
  waringIs?: boolean;
  subMessage?: string;
  value?: string | boolean;
}

export const MCheckbox = ({
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
          <MuiCheckbox
            {...methods.register(inputName, {
              onChange: (e) => console.log("Check Selected!", e.target.checked),
            })}
            {...props}
            checked={value ?? false} // 이 부분은 수정된 부분입니다.
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

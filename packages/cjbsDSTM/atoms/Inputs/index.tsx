import * as React from "react";
import {
  TextField,
  TextFieldProps,
  IconButton,
  BaseTextFieldProps,
} from "@mui/material";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";
import { useWatch } from "react-hook-form-mui";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export const InputDefaultType = ({ ...props }: TextFieldProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <TextField {...props} size="small" />
    </ThemeProvider>
  );
};

interface RHFInputDefaultTypeProps extends BaseTextFieldProps {
  textFieldName: string;
}

export const RHFInputDefaultType = ({ ...props }: TextFieldProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <TextFieldElement
        {...props}
        size="small"
        sx={{
          ".MuiOutlinedInput-root": {
            padding: "4.5px 10px",
          },
        }}
      />
    </ThemeProvider>
  );
};

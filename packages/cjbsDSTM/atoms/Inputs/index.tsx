import * as React from "react";
import { TextField, TextFieldProps, IconButton } from "@mui/material";
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

export const RHFInputDefaultType = () => {
  return <TextFieldElement name="testName" size="small" />;
};

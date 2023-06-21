import * as React from "react";
import {
  TextField,
  TextFieldProps,
  IconButton,
  BaseTextFieldProps,
} from "@mui/material";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";

type InputValidationProps = TextFieldProps & {
  inputName: string;
  errorMessage: string | boolean;
  register: any;
  width?: number;
};
export const InputDefaultType = ({ ...props }: TextFieldProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <TextField
        {...props}
        size="small"
        variant="outlined"
        sx={{
          width: 380,
          ".MuiOutlinedInput-root": {
            height: 28,
          },
        }}
      />
    </ThemeProvider>
  );
};

export const InputValidation = ({
  register,
  inputName,
  errorMessage,
  width = 380,
  ...props
}: InputValidationProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      {/*<InputDefaultType*/}
      {/*  {...props}*/}
      {/*  {...register(inputName, {*/}
      {/*    required: errorMessage,*/}
      {/*  })}*/}
      {/*/>*/}
      <TextField
        {...props}
        variant="outlined"
        size="small"
        sx={{
          width: width,
          ".MuiOutlinedInput-root": {
            height: 28,
          },
        }}
        {...register(inputName, {
          required: errorMessage,
        })}
      />
    </ThemeProvider>
  );
};

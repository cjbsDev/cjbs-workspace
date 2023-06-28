import * as React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";

type InputValidationProps = TextFieldProps & {
  inputName: string;
  placeholder?: string;
  errorMessage: string | boolean;
  register: any;
};
export const InputDefaultType = ({ ...props }: TextFieldProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <TextField
        {...props}
        size="small"
        variant="outlined"
        sx={{
          ...props.sx,
          ".MuiOutlinedInput-input": {
            pt: "5px",
            pb: "5px",
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
  ...props
}: InputValidationProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <TextField
        {...props}
        variant="outlined"
        size="small"
        sx={{
          ...props.sx,
          ".MuiOutlinedInput-input": {
            pt: "5px",
            pb: "5px",
          },
        }}
        {...register(inputName, {
          required: errorMessage,
        })}
      />
    </ThemeProvider>
  );
};

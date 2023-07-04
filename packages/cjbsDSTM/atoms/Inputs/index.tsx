import * as React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";
import { useFormContext } from "react-hook-form";

type InputValidationProps = TextFieldProps & {
  inputName: string;
  placeholder?: string;
  errorMessage: string | boolean;
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
  inputName,
  errorMessage,
  ...props
}: InputValidationProps) => {
  const methods = useFormContext();
  return (
    <ThemeProvider theme={cjbsTheme}>
      <TextField
        {...props}
        error={methods.formState.errors[inputName] ? true : false}
        helperText={methods.formState.errors[inputName]?.message}
        variant="outlined"
        size="small"
        sx={{
          ...props.sx,
          ".MuiOutlinedInput-input": {
            pt: "5px",
            pb: "5px",
          },
        }}
        {...methods.register(inputName, {
          required: methods.formState.errors[inputName]
            ? errorMessage
            : errorMessage,
        })}
      ></TextField>
    </ThemeProvider>
  );
};

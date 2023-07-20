import * as React from "react";
import { Stack, TextField, TextFieldProps, Typography } from "@mui/material";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import warning = toast.warning;

type InputValidationProps = TextFieldProps & {
  required?: boolean;
  inputName: string;
  placeholder?: string;
  errorMessage: string;
  pattern?: RegExp;
  patternErrMsg?: string;
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
          // ".MuiOutlinedInput-input": {
          //   pt: "5px",
          //   pb: "5px",
          // },
        }}
      />
    </ThemeProvider>
  );
};

export const InputValidation = ({
  required = false,
  inputName,
  errorMessage,
  pattern,
  patternErrMsg,
  ...props
}: InputValidationProps) => {
  const methods = useFormContext();
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Stack>
        <TextField
          {...props}
          error={methods.formState.errors[inputName] ? true : false}
          variant="outlined"
          size="small"
          sx={{
            ...props.sx,
          }}
          {...methods.register(inputName, {
            pattern: {
              value: pattern,
              message: errorMessage,
            },
            required: required,
          })}
        ></TextField>
        {methods.formState.errors[inputName]?.type === "required" && (
          <Typography
            variant="body2"
            sx={{ color: cjbsTheme.palette.warning.main }}
          >
            {errorMessage}
          </Typography>
        )}
        {methods.formState.errors[inputName]?.type === "pattern" && (
          <Typography
            variant="body2"
            sx={{ color: cjbsTheme.palette.warning.main }}
          >
            {patternErrMsg}
          </Typography>
        )}
        {/*{methods.formState.errors[inputName]?.type === "maxLength" && (*/}
        {/*  <p>First name cannot exceed 20 characters</p>*/}
        {/*)}*/}
      </Stack>
    </ThemeProvider>
  );
};

import * as React from "react";
import {
  FormControlLabel,
  Input,
  Stack,
  Typography,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";

interface RadioM1Props {
  inputName: string;
  labelText: string;
  value: string | boolean;
  required?: boolean;
  errorMessage?: string;
}

export const RadioM1 = (props: RadioM1Props) => {
  const {
    inputName,
    labelText,
    value,
    required = false,
    errorMessage,
    ...rest
  } = props;
  const methods = useFormContext();
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Stack>
        <FormControlLabel
          control={
            <Input
              {...methods.register(inputName, {
                required: required,
              })}
              {...rest}
              type="radio"
              defaultValue={value}
              disableUnderline={true}
              sx={{ width: 18, ml: 1.5 }}
            />
          }
          label={
            <Typography
              variant="body2"
              sx={{
                ml: 1,
                color: cjbsTheme.palette.common.black,
              }}
            >
              {labelText}
            </Typography>
          }
        />
        {methods.formState.errors[inputName]?.type === "required" && (
          <Typography
            variant="body2"
            sx={{ color: cjbsTheme.palette.warning.main }}
          >
            {errorMessage}
          </Typography>
        )}
      </Stack>
    </ThemeProvider>
  );
};

interface RadioGVProps {
  data: object;
  inputName: string;
  required?: boolean;
  errorMessage?: string;
  rowIs?: boolean;
}
export const RadioGV = (props: RadioGVProps) => {
  const {
    data,
    inputName,
    required = false,
    errorMessage,
    rowIs = true,
    ...rest
  } = props;
  const methods = useFormContext();
  const { control } = methods;
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Stack>
        <Controller
          control={control}
          rules={{
            required: required,
          }}
          name={inputName}
          render={({ field }) => (
            <RadioGroup {...field} value={undefined} row={rowIs}>
              {data.map((item) => {
                const { value, optionName } = item;
                return (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio size="small" />}
                    label={optionName}
                  />
                );
              })}
            </RadioGroup>
          )}
        />
        {methods.formState.errors[inputName]?.type === "required" && (
          <Typography
            variant="body2"
            sx={{ color: cjbsTheme.palette.warning.main }}
          >
            {errorMessage}
          </Typography>
        )}
      </Stack>
    </ThemeProvider>
  );
};

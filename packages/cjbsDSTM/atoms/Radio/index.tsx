import * as React from "react";
import {
  FormControlLabel,
  Input,
  Stack,
  Typography,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";

interface CheckboxProps {
  inputName: string;
  labelText: string;
  value: string | boolean;
  required?: boolean;
  errorMessage?: string;
}

export const NewRadio = (props: CheckboxProps) => {
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
                validate: (value, formValues) => {
                  console.log("Radio Validate Value ==>>", value);
                  // if (value === null) alert("mmmmmmmmm");
                  return value;
                },
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
                color: methods.formState.errors[inputName]
                  ? cjbsTheme.palette.warning.main
                  : cjbsTheme.palette.common.black,
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

export const NewRadio2 = (props) => {
  const {
    data,
    inputName,
    // labelText,
    // value,
    required = false,
    // errorMessage,
    ...rest
  } = props;
  const methods = useFormContext();
  return (
    <ThemeProvider theme={cjbsTheme}>
      <RadioGroup
        {...methods.register(inputName, {
          required: required,
        })}
        {...rest}
      >
        {data.map((item) => {
          const { codeNm, uniqueCode } = item;
          return (
            <FormControlLabel
              key={uniqueCode}
              value={uniqueCode}
              control={<Radio />}
              label={codeNm}
            />
          );
        })}

        {/*<FormControlLabel value="male" control={<Radio />} label="Male" />*/}
      </RadioGroup>
    </ThemeProvider>
  );
};

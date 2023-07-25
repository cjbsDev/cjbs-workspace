import * as React from "react";
import {
  FormGroup,
  FormControlLabel,
  Input,
  Typography,
  InputProps,
  Stack,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";

interface CheckboxM5Props extends InputProps {
  inputName: string;
  labelText?: string;
  waringIs?: boolean;
  subMessage?: string;
  value?: string | boolean;
  required?: boolean;
}

export const CheckboxM5 = ({
  inputName,
  labelText,
  value,
  waringIs,
  subMessage,
  required = false,
  ...props
}: CheckboxM5Props) => {
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
              required: required,
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

interface CheckboxGVProps extends CheckboxM5Props {
  data: object;
  errorMessage?: string;
  direction?: "column-reverse" | "column" | "row-reverse" | "row";
}

export const CheckboxGV = (props: CheckboxGVProps) => {
  const { data, inputName, required, errorMessage, direction = "row" } = props;
  const methods = useFormContext();
  const { formState } = methods;
  const { errors } = formState;
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Stack>
        <FormGroup>
          <Stack direction={direction}>
            {data.map((item: any) => {
              return (
                <CheckboxM5
                  key={item.value}
                  required={required}
                  inputName={inputName}
                  labelText={item.optionName}
                  value={item.value}
                />
              );
            })}
          </Stack>
        </FormGroup>
        {errors[inputName]?.type === "required" && (
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

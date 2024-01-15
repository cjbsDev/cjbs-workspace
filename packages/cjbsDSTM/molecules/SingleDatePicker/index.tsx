import * as React from "react";
import { forwardRef, useCallback, useState } from "react";
import DatePicker, {
  ReactDatePickerProps,
  CalendarContainerProps,
} from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { useFormContext, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import "./new-react-datepicker.css";
import styles from "./datepicker.module.scss";
import { InputAdornment, TextField, Typography } from "@mui/material";
import MyIcon from "icon/MyIcon";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";

interface SingleDatePickerProps {
  inputName: string;
  errorMessage?: string;
  required?: boolean;
  width?: string; // 새로운 prop 추가
}

export const SingleDatePicker = (props: SingleDatePickerProps) => {
  const {
    inputName,
    required = false,
    errorMessage = "날짜를 선택해 주세요.",
    ...other
  } = props;
  const { control, formState, register } = useFormContext();
  const [dateRange, setDateRange] = useState(null);

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <ThemeProvider theme={cjbsTheme}>
      <TextField
        required
        error={formState.errors[inputName] ? true : false}
        size="small"
        value={value}
        onClick={onClick}
        ref={ref}
        inputProps={{ readOnly: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <MyIcon icon="calendar" size={20} />
            </InputAdornment>
          ),
        }}
        sx={{
          width: props.width || "100%", // 넓이 적용
          fontSize: 12,
          ".MuiOutlinedInput-input:read-only": {
            backgroundColor: "white",
            cursor: "pointer",
          },
        }}
      />
    </ThemeProvider>
  ));

  return (
    // <>
    //   <DatePicker
    //     name={inputName}
    //     ref={register(inputName, { required: "날짜를 선택하세요." })}
    //     dateFormat="yyyy-MM-dd"
    //   />
    //   {formState.errors[inputName] && (
    //     <p style={{ color: "red" }}>{formState.errors[inputName].message}</p>
    //   )}
    // </>

    // <DatePicker
    //   {...other}
    //   placeholderText="날짜를 선택해 주세요."
    //   className={styles.dateInput}
    //   dateFormat="yyyy-MM-dd"
    //   locale={ko}
    //   onChange={(e) => field.onChange(e)}
    //   selected={field.value}
    //   showPopperArrow={false}
    //   customInput={<CustomInput />}
    //   isClearable
    //   required={required}
    // />

    <>
      <Controller
        control={control}
        name={inputName}
        rules={{ required: required }}
        render={({ field }) => {
          return (
            <DatePicker
              {...other}
              placeholderText="날짜를 선택해 주세요."
              className={styles.dateInput}
              dateFormat="yyyy-MM-dd"
              locale={ko}
              onChange={(e) => field.onChange(e)}
              selected={field.value}
              showPopperArrow={false}
              customInput={<CustomInput />}
              isClearable
              required={required}
            />
          );
        }}
      />
      {formState.errors[inputName]?.type === "required" && (
        <Typography
          variant="body2"
          sx={{ color: cjbsTheme.palette.warning.main, mt: 0.5, ml: 1 }}
        >
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default SingleDatePicker;

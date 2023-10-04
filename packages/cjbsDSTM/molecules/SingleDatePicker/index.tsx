import React, { forwardRef, useCallback, useState } from "react";
import DatePicker, {
  ReactDatePickerProps,
  CalendarContainerProps,
} from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { useFormContext, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import "./new-react-datepicker.css";
import styles from "./datepicker.module.scss";
import { InputAdornment, TextField } from "@mui/material";
import MyIcon from "icon/MyIcon";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";

interface SingleDatePickerProps {
  inputName: string;
}

export const SingleDatePicker = (props: SingleDatePickerProps) => {
  const { inputName, ...other } = props;
  const { control } = useFormContext();
  const [dateRange, setDateRange] = useState(null);
  // const [startDate, endDate] = dateRange;

  // const CustomInput = forwardRef(({ value, onClick }, ref) => {
  //   return <TextField />;
  // };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <ThemeProvider theme={cjbsTheme}>
      <TextField
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
          width: "100%",
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
    <Controller
      control={control}
      name={inputName}
      render={({ field }) => {
        // console.log("FIELD VALUE ==>>", field.value);
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
          />
        );
      }}
    />
  );
};

export default SingleDatePicker;

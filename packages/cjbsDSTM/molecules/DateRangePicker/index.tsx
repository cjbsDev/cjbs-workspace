import React, { forwardRef, useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { useFormContext, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";
import { InputAdornment, TextField } from "@mui/material";
import MyIcon from "icon/MyIcon";
import { ThemeProvider } from "@mui/material/styles";
import { cjbsTheme } from "../../themes";

interface DateRangePickerProps {
  inputName: string;
}
export const DateRangePicker = ({ inputName }: DateRangePickerProps) => {
  const { control } = useFormContext();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

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
      render={({ field }) => (
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(e) => {
            setDateRange(e);
            field.onChange(e);
          }}
          monthsShown={2}
          className="date-input"
          dateFormat="yyyy-MM-dd"
          locale={ko}
          showPopperArrow={false}
          customInput={<CustomInput />}
        />
      )}
    />
  );
};

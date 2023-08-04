import React, { useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { useFormContext, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";

interface DateRangePickerProps {
  inputName: string;
}
export const DateRangePicker = ({ inputName }: DateRangePickerProps) => {
  const { control } = useFormContext();
  const [dateRange, setDateRange] = useState([new Date(), null]);
  const [startDate, endDate] = dateRange;

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
          dateFormat="yyyy/MM/dd"
          locale={ko}
        />
      )}
    />
  );
};

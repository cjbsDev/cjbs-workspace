import React, { useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { useFormContext, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import "./new-react-datepicker.css";
import styles from "./datepicker.module.scss";

interface SingleDatePickerProps {
  inputName: string;
}

export const SingleDatePicker = (props: SingleDatePickerProps) => {
  const { inputName } = props;
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={inputName}
      render={({ field }) => {
        // console.log("FIELD VALUE ==>>", field.value);
        return (
          <DatePicker
            placeholderText="날짜를 선택해 주세요."
            className={styles.dateInput}
            dateFormat="yyyy-MM-dd"
            locale={ko}
            onChange={(e) => field.onChange(e)}
            selected={field.value}
          />
        );
      }}
    />
  );
};

export default SingleDatePicker;

import React, { useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { useFormContext, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./datepicker.module.scss";
import "./new-react-datepicker.css";

const SingleDatePicker = () => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name="check16sAt"
      render={({ field }) => (
        <DatePicker
          placeholderText="날짜를 선택해 주세요."
          onChange={(e) => {
            field.onChange(e);
          }}
          selected={field.value}
          // className="date-input"
          className={styles.dateInput}
          dateFormat="yyyy-MM-dd"
          locale={ko}
        />
      )}
    />
  );
};

export default SingleDatePicker;

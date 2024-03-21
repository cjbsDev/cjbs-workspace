"use client";
import * as React from "react";
import {
  FormControl, Select, MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

const YearMonthSelectBox = (props: any) => {
  const {year, month, changeYear, changeMonth} = props;
  // const [year, setYear] = useState<string>("2024");
  // const [month, setMonth] = useState<string>("01");

  const handleChangeYear = (event: SelectChangeEvent) => {
    console.log('^^^^^^^^^^^^^^^^^', event.target.value);
    // setYear(event.target.value as string);
      changeYear(event.target.value as string);
  };
  const handleChangeMonth = (event: SelectChangeEvent) => {
    // console.log(event.target.value)
    // setMonth(event.target.value as string);
      changeMonth(event.target.value as string);
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        {/*<InputLabeltLabel id="demo-select-small-label">Age</InputLabeltLabel>*/}
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={year}
          // label="year"
          onChange={handleChangeYear}
          sx={{
            ".MuiOutlinedInput-input:read-only": {
              backgroundColor: "white",
              textFillColor: "#000000"
            },
          }}
        >
          <MenuItem value="2021">2021년</MenuItem>
          <MenuItem value="2022">2022년</MenuItem>
          <MenuItem value="2023">2023년</MenuItem>
          <MenuItem value="2024">2024년</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={month}
          // label="month"
          onChange={handleChangeMonth}
          sx={{
            ".MuiOutlinedInput-input:read-only": {
              backgroundColor: "white",
              textFillColor: "#000000"
            },
          }}
        >
          <MenuItem value="01">01월</MenuItem>
          <MenuItem value="02">02월</MenuItem>
          <MenuItem value="03">03월</MenuItem>
          <MenuItem value="04">04월</MenuItem>
          <MenuItem value="05">05월</MenuItem>
          <MenuItem value="06">06월</MenuItem>
          <MenuItem value="07">07월</MenuItem>
          <MenuItem value="08">08월</MenuItem>
          <MenuItem value="09">09월</MenuItem>
          <MenuItem value="10">10월</MenuItem>
          <MenuItem value="11">11월</MenuItem>
          <MenuItem value="12">12월</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default YearMonthSelectBox;

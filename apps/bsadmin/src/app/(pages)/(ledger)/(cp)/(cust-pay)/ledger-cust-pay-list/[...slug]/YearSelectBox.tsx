"use client";
import * as React from "react";
import { useMemo } from "react";
import {
    DataCountResultInfo,
    DataTableBase,
    Title1,
    ContainedButton,
    cjbsTheme,
    FileDownloadBtn, green, red, grey, TH, TD,
} from "cjbsDSTM";
import {
  blue,
} from "cjbsDSTM/themes/color";
import {
  Box,
  Stack,
  Grid,
  Typography,
  Collapse,
  TableContainer, Table, TableBody, TableCell, TableRow, Chip, FormControl, Select, MenuItem,
} from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import MyIcon from "icon/MyIcon";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR from "swr";
import { fetcher } from "api";
import { useSearchParams } from "next/navigation";
import KeywordSearch from "../../../../../../components/KeywordSearch";
import NoDataView from "../../../../../../components/NoDataView";
import dynamic from "next/dynamic";
import { ExpanderComponentProps } from "react-data-table-component";

const YearSelectBox = (props: any) => {
  const {changeYear} = props;
  const [year, setYear] = useState<string>("2024");

  const handleChangeYear = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
    setTimeout(() => {
      changeYear(event.target.value as string);
    }, 500);
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={year}
          onChange={handleChangeYear}
          sx={{
            ".MuiOutlinedInput-input:read-only": {
              backgroundColor: "white",
              textFillColor: "#000000"
            },
          }}
        >
          <MenuItem value="2020">2020년</MenuItem>
          <MenuItem value="2021">2021년</MenuItem>
          <MenuItem value="2022">2022년</MenuItem>
          <MenuItem value="2023">2023년</MenuItem>
          <MenuItem value="2024">2024년</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default YearSelectBox;

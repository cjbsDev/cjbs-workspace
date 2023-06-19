"use client";

import * as React from "react";
// import {
//   Box,
//   ThemeProvider,
//   Checkbox,
//   CheckboxProps,
//   Typography,
// } from "@mui/material";
import DataTable, { TableProps } from "react-data-table-component";
import {
  dataTableCustomStyles,
  dataTableCustomStyles2,
} from "./style/dataTableCustomStyle";

export function DataTableBase<T>(props: TableProps<T>) {
  return (
    <DataTable
      pagination
      dense
      selectableRowsVisibleOnly={true}
      selectableRows
      // selectableRowsComponent={Checkbox}
      fixedHeader
      paginationPerPage={15}
      {...props}
    />
  );
}

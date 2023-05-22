"use client"

import {Box, ThemeProvider} from '@mui/material';
import React from 'react';
import DataTable, {TableProps} from 'react-data-table-component'
import {dataTableCustomStyles} from "./style/dataTableCustomStyle";

function DataTableBase<T>(props: TableProps<T>): JSX.Element {
  return (
      <DataTable
        pagination
        dense
        selectableRowsVisibleOnly={true}
        customStyles={dataTableCustomStyles}
        {...props}
      />
  );
}

export default DataTableBase

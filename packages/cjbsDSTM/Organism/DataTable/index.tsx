import React from 'react';
import {Box, ThemeProvider} from '@mui/material';
import DataTable, {TableProps} from 'react-data-table-component'
import {dataTableCustomStyles} from "./style/dataTableCustomStyle";

export function DataTableBase<T>(props: TableProps<T>): JSX.Element {
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

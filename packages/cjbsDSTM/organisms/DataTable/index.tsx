'use client'

import * as React from 'react';
import {Box, ThemeProvider, Checkbox, CheckboxProps, Typography} from '@mui/material';
import DataTable, {TableProps, createTheme} from 'react-data-table-component'
import {dataTableCustomStyles} from "./style/dataTableCustomStyle";
// const selectprops = { indeterminate: (isIndeterminate: CheckboxProps) => isIndeterminate };

createTheme('mayTheme', {

})
export function DataTableBase<T>(props: TableProps<T>): JSX.Element {

  return (
      <DataTable
        pagination
        dense
        selectableRowsVisibleOnly={true}
        customStyles={dataTableCustomStyles}
        selectableRows
        selectableRowsComponent={Checkbox}
        fixedHeader
        paginationPerPage={15}
        {...props}
      />
  );
}

import * as React from 'react';
import {Box, ThemeProvider, Checkbox, CheckboxProps, Typography} from '@mui/material';
import DataTable, {TableProps, createTheme} from 'react-data-table-component'
import {dataTableCustomStyles} from "./style/dataTableCustomStyle";

const selectprops = { indeterminate: (isIndeterminate: CheckboxProps) => isIndeterminate };

createTheme('mayTheme', {

})
export function DataTableBase<T>(props: TableProps<T>): JSX.Element {



  return (
      <DataTable
        // title={() => <Typography variant='subtitle1'}>{props.title}</Typography>}
        pagination
        dense
        selectableRowsVisibleOnly={true}
        customStyles={dataTableCustomStyles}
        selectableRows
        selectableRowsComponent={Checkbox}
        // selectableRowsComponentProps={{ selectprops }}
        fixedHeader
        paginationPerPage={15}
        {...props}
      />
  );
}

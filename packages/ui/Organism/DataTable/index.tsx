"use client"

import { Box } from '@mui/material';
import React, {Suspense} from 'react';
import DataTable, {TableProps} from 'react-data-table-component'

function DataTableBase<T>(props: TableProps<T>): JSX.Element {
  return (
    // <Suspense fallback={<p>Loading feed...</p>}>
      <DataTable
        pagination
        dense
        selectableRowsVisibleOnly={true}
        {...props}
      />
    // </Suspense>
  );
}

export default DataTableBase

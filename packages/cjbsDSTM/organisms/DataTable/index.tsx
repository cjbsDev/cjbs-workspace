"use client";

import * as React from "react";
import DataTable, { TableProps } from "react-data-table-component";

export function DataTableBase<T>(props: TableProps<T>) {
  return (
    <DataTable
      pagination
      dense
      selectableRowsVisibleOnly={true}
      selectableRows
      fixedHeader
      paginationPerPage={50}
      paginationRowsPerPageOptions={[20, 50, 100]}
      {...props}
    />
  );
}

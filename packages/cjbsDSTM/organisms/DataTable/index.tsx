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
      paginationPerPage={15}
      paginationRowsPerPageOptions={[15, 20, 50, 100]}
      {...props}
    />
  );
}

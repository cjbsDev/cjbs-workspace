"use client";

import * as React from "react";
import DataTable, { TableProps } from "react-data-table-component";

export function DataTableBase<T>(props: TableProps<T>) {
  return (
    <DataTable
      dense
      // selectableRowsVisibleOnly={true}
      // selectableRows
      pagination
      paginationPerPage={15}
      paginationRowsPerPageOptions={[15, 20, 50, 100]}
      contextMessage={{
        singular: "item",
        plural: "items",
        message: "선택됨.",
      }}
      {...props}
    />
  );
}

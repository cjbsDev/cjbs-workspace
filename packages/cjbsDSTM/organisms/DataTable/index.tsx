"use client";

import { grey } from "@mui/material/colors";
import * as React from "react";
import {useMemo} from "react";
import DataTable, { TableProps } from "react-data-table-component";

export function DataTableBase<T>(props: TableProps<T>) {

  const conditionalRowStyles = useMemo(() => [
    {
      when: (row) => props.data?.indexOf(row) % 2 === 0, // 짝수 행
      style: {
        backgroundColor: 'white',
      },
    },
    {
      when: (row) => props.data?.indexOf(row) % 2 !== 0, // 짝수 행
      style: {
        backgroundColor: grey[50],
      },
    },
  ], [props.data])

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
      conditionalRowStyles={conditionalRowStyles}
      {...props}
    />
  );
}

"use client";
import Table, { TableProps } from "react-data-table-component";

function DataTable<T>(props: TableProps<T>): JSX.Element {
  return <Table pagination dense selectableRowsVisibleOnly={true} {...props} />;
}

export default DataTable;

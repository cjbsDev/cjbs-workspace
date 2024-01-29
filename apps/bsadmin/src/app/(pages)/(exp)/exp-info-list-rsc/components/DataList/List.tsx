"use client";
import React, { Suspense, useMemo } from "react";
import { DataTableBase } from "cjbsDSTM";
import { getColumns } from "./Columns";

const List = ({ data }) => {
  const columns = useMemo(() => getColumns(), []);
  return <DataTableBase columns={columns} data={data} />;
};

export default List;

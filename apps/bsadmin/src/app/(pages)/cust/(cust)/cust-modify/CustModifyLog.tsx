"use client";

import React from "react";
import { DataTableBase } from "cjbsDSTM";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const CustModifyLog = () => {
  const { data } = useSWR(`https://dummyjson.com/products`, fetcher, {
    suspense: true,
  });

  const columns = [
    {
      name: "변경일",
      selector: (row: { id: number }) => row.id,
      width: "20%",
    },
    {
      name: "관리자ID",
      selector: (row: { stock: any }) => row.stock,
      width: "20%",
    },
    {
      name: "이름",
      selector: (row: { brand: any }) => row.brand,
      width: "20%",
    },
    {
      name: "변경 전",
      selector: (row: { rating: any }) => row.rating,
      width: "20%",
    },
    {
      name: "변경 후",
      selector: (row: { rating: any }) => row.rating,
      width: "20%",
    },
  ];
  return (
    <DataTableBase
      data={data.products}
      columns={columns}
      selectableRows={false}
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 10, 15]}
    />
  );
};

export default CustModifyLog;

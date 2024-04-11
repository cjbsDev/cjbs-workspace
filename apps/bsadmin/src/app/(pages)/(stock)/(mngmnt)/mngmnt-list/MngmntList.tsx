"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "api";

const MngmntList = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(15);
  const { data } = useSWR(`/stock/list?page=${page}&size=${size}`, fetcher, {
    suspense: true,
  });

  const { stockList, pageInfo } = data;
  const { totalElements } = pageInfo;

  console.log("Stock Data List ==>>", stockList);

  return <div></div>;
};

export default MngmntList;

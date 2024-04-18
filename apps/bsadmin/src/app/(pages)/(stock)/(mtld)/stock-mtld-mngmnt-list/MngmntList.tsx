"use client";
import React from "react";
import useSWR from "swr";
import { fetcher } from "api";

const MngmntList = () => {
  const { data } = useSWR(`/stock/mtld/list?year=2024&month=3`, fetcher, {
    suspense: true,
  });
  console.log("MTLD", data);

  return <div>{JSON.stringify(data)}</div>;
};

export default MngmntList;

"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../SkeletonLoading";
import { Container } from "@mui/material";

const LazyListCust = dynamic(() => import("./ListCust"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

export default function ManagementPage() {
  return <LazyListCust />;
}

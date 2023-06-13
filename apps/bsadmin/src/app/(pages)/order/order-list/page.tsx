"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../components/SkeletonLoading";
import ListOrder from "./ListOrder";
import { Alert, AlertTitle } from "@mui/material";
import { ErrorContainer, Fallback } from "cjbsDSTM";

const LazyDataList = dynamic(() => import("./ListOrder"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});
const OrderPage = () => {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyDataList />
    </ErrorContainer>
  );
};

export default OrderPage;

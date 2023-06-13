"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../components/SkeletonLoading";
import ListOrder from "./ListOrder";
import ErrorBoundary from "cjbsDSTM/commonFunc/ErrorBoundary";

const LazyDataList = dynamic(() => import("./ListOrder"), {
  ssr: false,
  loading: () => <SkeletonLoading />
});

const OrderPage = () => {
  return (
    <ErrorBoundary>
      <LazyDataList />
    </ErrorBoundary>
  );
};

export default OrderPage;

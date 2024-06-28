"use client";
import React from "react";
import DrawerProvider from "./DrawerProvider";
import dynamic from "next/dynamic";
import { FullHeightLoading } from "cjbsDSTM";

const LazyDashboard = dynamic(() => import("./components/Dashboard"), {
  ssr: false,
  loading: () => <FullHeightLoading />,
});

export default function Page() {
  return (
    <DrawerProvider>
      <LazyDashboard />
    </DrawerProvider>
  );
}

"use client";
import React from "react";
import DrawerProvider from "./DrawerProvider";
import dynamic from "next/dynamic";
import { FullHeightLoading } from "cjbsDSTM";
import DashboardPage from "./(pages)/(dashboard)/dashboard/page";

const LazyDashboard = dynamic(() => import("./components/Dashboard"), {
  ssr: false,
  loading: () => <FullHeightLoading />,
});

export default function Page() {
  return (
    <div>Root Page!</div>
    // <DrawerProvider>
    // <LazyDashboard />
    // </DrawerProvider>
  );
}

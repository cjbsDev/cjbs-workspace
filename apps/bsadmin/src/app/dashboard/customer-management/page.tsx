"use client"

import React, {Suspense} from "react";
import { LinkButton } from "@components/index";
import dynamic from 'next/dynamic';
import SkeletonLoading from '../SkeletonLoading';

const LazyDataList = dynamic(() => import('./DataList'), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

export default function OrderPage() {
  return <>
    <LazyDataList />
  </>;
}

"use client"

import React, {Suspense} from "react";
import { LinkButton } from "@components/index";
import dynamic from 'next/dynamic';
import SkeletonLoading from '../SkeletonLoading';
import DataList from './DataList';
// import { useRouter } from 'next/navigation';

const LazyDataList = dynamic(() => import('./DataList'), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

export default function OrderPage() {
  return <>
    <LazyDataList />
  </>;
}

'use client';

import React, { useState, useEffect } from "react";
import { LinkButton } from "ui";
import dynamic from 'next/dynamic';
import SkeletonLoading from './SkeletonLoading';

const LazyDataList = dynamic(() => import('./DataList'), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

export default function OrderPage() {
  return <>
    <h1>Hello, OrderPage!</h1>
    <LinkButton buttonName='Go Main' pathName='/' />
    <LazyDataList />
  </>;
}

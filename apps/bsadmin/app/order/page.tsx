import React, {Suspense} from "react";
import { LinkButton } from "ui";
import dynamic from 'next/dynamic';
import SkeletonLoading from './SkeletonLoading';
import DataList from './DataList';

const LazyDataList = dynamic(() => import('./DataList'), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

// async function getData() {
//   const res = await fetch('https://dummyjson.com/products');
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
//
//   // Recommendation: handle errors
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data');
//   }
//
//   return res.json();
// }

export default async function OrderPage() {
  // const data = await getData();
  return <>
    <h1>Hello, OrderPage!</h1>
    <LinkButton buttonName='Go Main' pathName='/' />
    {/*<Suspense fallback={<SkeletonLoading />}>*/}
    {/*  <DataList />*/}
    {/*</Suspense>*/}
    <LazyDataList />
  </>;
}

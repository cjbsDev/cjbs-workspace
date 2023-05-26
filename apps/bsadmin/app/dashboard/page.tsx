"use client"

import React from "react";
import dynamic from 'next/dynamic';
import SkeletonLoading from './SkeletonLoading';
import {LinkButton} from "@components/atoms/Buttons";
import { useRouter } from 'next/navigation';

export default async function OrderPage() {
  const router = useRouter();
  return <>
    <div>Dashboard View Page.</div>
    <LinkButton buttonName='고객관리' onClick={() => router.push('dashboard/customerManagement')} />
    <LinkButton buttonName='주문' onClick={() => router.push('dashboard/order')} />
  </>
}

'use client'

import {LinkButton} from "@components/atoms/Buttons";
import { useRouter } from 'next/navigation';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

export default function Page({ params }) {
  console.log('params', params)
  const router = useRouter();
  return (
    <>
      <LinkButton startIcon={<ArrowBackIosRoundedIcon />} buttonName='prev' onClick={() => router.push('dashboard/customer-management')} />
      <div>My Post {JSON.stringify(params)}</div>
    </>
  );
}

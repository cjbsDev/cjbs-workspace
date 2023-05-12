"use client"

import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Stack spacing={1}>
      <Skeleton variant="text" width={250} sx={{ fontSize: '2rem' }} />
      <Skeleton variant="rounded" height={600} />
    </Stack>
  );
}

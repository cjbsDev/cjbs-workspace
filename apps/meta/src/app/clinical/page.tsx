'use client';
import React from 'react';
import { fetcher } from 'api';
import useSWR from 'swr';
import Skeleton from '@mui/material/Skeleton';
import { Box, Typography } from '@mui/material';
import ClinicalDashboard from '../../component/organisms/clinical/dashboard/clinicalDashboard';
const Dashboard = () => {
  //const { data: session, status } = useSession();
  const { data, mutate, isLoading } = useSWR(
    '/strain/dashboard/statistics',
    fetcher,
  );

  if (isLoading) {
    return <Skeleton variant="rectangular" width={100} height={100} />;
  } else {
    return (
      <Box>
        <ClinicalDashboard />
      </Box>
    );
  }

  return <></>;
};

export default Dashboard;

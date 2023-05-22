'use client';
import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { fetcher } from 'api';
import useSWR from 'swr';
import Skeleton from '@mui/material/Skeleton';
const Dashboard = () => {
  //const { data: session, status } = useSession();
  const { data, mutate, isLoading } = useSWR('/disease/dashboard', fetcher);

  return (
    <Box>
      {isLoading && <Skeleton variant="rectangular" width={100} height={100} />}
    </Box>
  );
};

export default Dashboard;

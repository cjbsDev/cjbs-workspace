'use client';
import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { fetcher } from 'api';
import useSWR from 'swr';

const Dashboard = () => {
  //const { data: session, status } = useSession();
  const { data, mutate, isLoading } = useSWR(
    '/strain/dashboard/statistics',
    fetcher,
    { suspense: true },
  );

  return (
    <>
      <Typography> GOOOD !! </Typography>
    </>

    // <BoardTempleate>
    //   <BoardTempleate.Side>
    //     <MyIcon icon="check" size={'20px'} color="gray" />
    //   </BoardTempleate.Side>
    //   <BoardTempleate.Contents>
    //     {<Typography>good</Typography>}
    //   </BoardTempleate.Contents>
    // </BoardTempleate>
  );
};

export default Dashboard;

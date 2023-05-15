'use client'
import React, {useState, useContext, useEffect} from 'react';
import { Button, Container, Skeleton, Typography } from '@mui/material';
import { GET, fetcher } from 'api';
import useSWR from 'swr';

const SignInPage = () => {
 //const { data: session, status } = useSession();
 const {data, mutate} = useSWR('/strain/dashboard/statistics', fetcher, {suspense:true})
  
 console.log("res > " , data);

 const handle = () => {
  mutate()
 }

  return (
    <Container>
      <Typography> Yahoo</Typography>
      {
        <Button
          onClick={handle}
        >
          Good
        </Button>
      }
    </Container>
  );
};

export default SignInPage;

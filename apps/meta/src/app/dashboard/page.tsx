'use client'
import React, {useState, useContext, useEffect} from 'react';
import { Button, Container, Skeleton, Typography } from '@mui/material';
import { GET, fetcher } from 'api';
import useSWR from 'swr';

const SignInPage = () => {
 //const { data: session, status } = useSession();
 const {data} = useSWR('/strain/dashboard/statistics', fetcher, {suspense:true})
  
 console.log("res > " , data);

  return (
    <Container>
      <Typography> Yahoo</Typography>
      {
        <Button
        >
          Good
        </Button>
      }
    </Container>
  );
};

export default SignInPage;

'use client'
import React, {useState, useContext, useEffect} from 'react';
import { Button, Container, Skeleton, Typography } from '@mui/material';
import { GET } from '../../util/api/utilAPI';

const SignInPage = () => {
 //const { data: session, status } = useSession();

 const handle = () => {
  GET('/strain/dashboard/statistics')
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

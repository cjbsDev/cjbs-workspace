import * as React from 'react';
import type { ReactElement } from 'react'
import {Avatar, Typography, Button, Container, Grid, Link}  from '@mui/material';
import { ContainedButton, OutlinedButton, LinkButton, getCommonLayout } from "ui";
import type { NextPageWithLayout } from './_app'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website

      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}


const Web: NextPageWithLayout = () => {
  return (
    <Container component="main" maxWidth="xl" sx={{backgroundColor: '#e8e8e8'}}>
      <Grid container>
        <Grid item>
          <Typography variant="h1">Web</Typography>
          <ContainedButton buttonName='TestName1' />
          <OutlinedButton buttonName='TestName2' />
          <LinkButton buttonName='Go to order' pathName='order' />
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

Web.getLayout = getCommonLayout;

export default Web;

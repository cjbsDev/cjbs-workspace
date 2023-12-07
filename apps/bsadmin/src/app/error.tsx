'use client';
import { NextPage, NextPageContext } from 'next';
import React from 'react';
import { Container, Typography } from '@mui/material';

interface Props {
  statusCode?: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <>
      <Container>
        <Typography>
          {statusCode
            ? `A server error has occurred. ${statusCode}`
            : 'A web page error has occurred.'}
        </Typography>
        <Typography>We will process it promptly.</Typography>
        <Typography>Please contact the moonpang@cj.net</Typography>
      </Container>
    </>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

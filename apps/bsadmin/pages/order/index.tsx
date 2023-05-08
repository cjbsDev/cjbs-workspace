import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { getNestedLayout, LinkButton } from "ui";
import { InputDefaultType} from "ui";
import type {NextPageWithLayout} from "../_app";

const OrderPage: NextPageWithLayout = () => {
  return (
    <Container>
     <Typography>Order Page!</Typography>
      {/*<dl>*/}
      {/*  <dt>ENV Var</dt>*/}
      {/*  <dd>{JSON.stringify(process.env.DATABASE_URL)}</dd>*/}
      {/*</dl>*/}
      <Stack  direction="row" spacing={2}>
        <LinkButton buttonName='Go to Main' pathName='./' />
        <InputDefaultType />
      </Stack>
    </Container>
  );
};

OrderPage.getLayout = getNestedLayout

export default OrderPage;

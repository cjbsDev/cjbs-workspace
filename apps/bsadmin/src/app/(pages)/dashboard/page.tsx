"use client";

import React from "react";
import dynamic from "next/dynamic";
import { LinkButton } from "cjbsDSTM";
import { useRouter } from "next/navigation";
import { Box, Stack, Typography } from "@mui/material";

export default async function OrderPage() {
  const router = useRouter();
  return (
    <Box>
      <Typography variant={"title1"}>Dashboard Page.</Typography>
      <Stack direction={"row"} spacing={1}>
        <LinkButton
          buttonName="고객관리"
          onClick={() => router.push("cust/cust-list")}
        />
        <LinkButton
          buttonName="주문"
          onClick={() => router.push("order/order-list")}
        />
        <LinkButton
          buttonName="거래처(PI) 등록"
          onClick={() => router.push("cust/agnc-pi-add")}
        />
      </Stack>
    </Box>
  );
}

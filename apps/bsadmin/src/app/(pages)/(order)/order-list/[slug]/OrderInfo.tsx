"use client";
import { useRouter } from "next-nprogress-bar";
import { ContainedButton, Title1 } from "cjbsDSTM";
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { fetcher } from "api";
import useSWR from "swr";
import { useParams } from "next/navigation";
import Link from "next/link";
export default function OrderInfo() {
  const params = useParams();
  const orderUkey = params.slug;
  const router = useRouter();
  const { data } = useSWR(`/order/detail/${orderUkey}`, fetcher, {
    suspense: true,
  });

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">오더 정보</Typography>
      </Box>

      <Box>
        <pre>{JSON.stringify(data.data, null, 2)}</pre>
      </Box>

      {/*<ContainedButton*/}
      {/*  buttonName="목록"*/}
      {/*  onClick={() => router.push("/order/order-list")}*/}
      {/*/>*/}
      <Link href="/order-list">
        <ContainedButton buttonName="목록" />
      </Link>
    </Container>
  );
}

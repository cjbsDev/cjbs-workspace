"use client";
import { useRouter } from "next-nprogress-bar";
import { ContainedButton, Title1 } from "cjbsDSTM";
import { Box, Container } from "@mui/material";
import React from "react";
export default function OrderInfoPage({ params }: string) {
  console.log("params", params);
  const router = useRouter();
  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="오더 정보" />
      </Box>
      <div>My Post {JSON.stringify(params)}</div>
      <ContainedButton
        buttonName="목록"
        onClick={() => router.push("/order/order-list")}
      />
    </Container>
  );
}

"use client";
import React from "react";
import { Stack, Typography } from "@mui/material";
import { formatNumberWithCommas } from "cjbsDSTM";

interface PriceProps {
  price: number | null;
}

const Index = ({ price }: PriceProps) => {
  return (
    <Stack direction="row" justifyContent="flex-end">
      <Typography variant="body2">{formatNumberWithCommas(price)}</Typography>
      <Typography variant="body2"> 원</Typography>
    </Stack>
  );
};

export default Index;

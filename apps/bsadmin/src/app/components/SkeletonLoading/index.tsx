"use client";
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { cjbsTheme } from "cjbsDSTM";

interface SkeletonLoadingProps {
  height?: number;
}

const SkeletonLoading = ({ height = 600 }: SkeletonLoadingProps) => {
  return (
    <Stack spacing={1} sx={{ mb: 3 }}>
      <Skeleton
        variant="rounded"
        animation="wave"
        height={height}
        sx={{ backgroundColor: cjbsTheme.palette.grey["50"] }}
      />
    </Stack>
  );
};

export default SkeletonLoading;

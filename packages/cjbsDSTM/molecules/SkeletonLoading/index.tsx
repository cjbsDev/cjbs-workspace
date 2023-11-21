"use client";
import React from "react";
import {
  Skeleton,
  Stack,
  Backdrop,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { cjbsTheme } from "../../themes";

interface SkeletonLoadingProps {
  height?: number;
}

export const SkeletonLoading = ({ height = 600 }: SkeletonLoadingProps) => {
  return (
    <Stack spacing={1}>
      <Skeleton
        variant="rounded"
        sx={{ backgroundColor: "#F4F5F7" }}
        height={height}
      />
    </Stack>
  );
};

export const SkeletonTableModalLoading = () => {
  return (
    <Stack spacing={2}>
      <Skeleton variant="text" width={100} sx={{ fontSize: "2rem" }} />

      <Skeleton variant="rounded" height={30} />
      <Skeleton variant="rounded" height={370} />
    </Stack>
  );
};

export const SkeletonPieChart = () => {
  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="space-between"
      sx={{ backgroundColor: "gold" }}
    >
      <Box>
        <Skeleton width={209} />
      </Box>

      <Box>
        <Skeleton variant="rounded" width={100} height={14} />
        <Skeleton variant="rounded" height={14} />
        <Skeleton variant="rounded" height={14} />
      </Box>

      {/*<Box>*/}
      {/*  <Stack direction="row">*/}
      {/*    <Skeleton variant="rounded" width={100} height={14} />*/}
      {/*    <Skeleton variant="rounded" height={14} />*/}
      {/*    <Skeleton variant="rounded" height={14} />*/}
      {/*  </Stack>*/}
      {/*</Box>*/}
    </Stack>
  );
};

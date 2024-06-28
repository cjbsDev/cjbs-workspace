"use client";
import React from "react";
import {
  Skeleton,
  Stack,
  Backdrop,
  Typography,
  Box,
  CircularProgress,
  Grid,
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
        // sx={{ backgroundColor: "#F4F5F7" }}
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
    <Box sx={{ height: "100%" }}>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Stack alignItems="center" justifyContent="center">
          <Skeleton variant="circular" width={250} height={250} />
        </Stack>

        <Stack spacing={2} width={"100%"}>
          <Skeleton variant="rounded" height={25} />
          <Skeleton variant="rounded" height={25} />
          <Skeleton variant="rounded" height={25} />
          <Skeleton variant="rounded" height={25} />
          <Skeleton variant="rounded" height={25} />
          <Skeleton variant="rounded" height={25} />
          <Skeleton variant="rounded" height={25} />
          <Skeleton variant="rounded" height={25} />
        </Stack>
      </Stack>
    </Box>
  );
};

export const SkeletonLineChart = () => {
  return (
    <Box>
      <Stack spacing={2}>
        <Stack direction="row" alignItems="flex-end" spacing={1.5}>
          <Skeleton variant="text" width={200} height={42} />
          <Skeleton variant="text" width={150} height={25} />
        </Stack>
        <Skeleton variant="rounded" height={380} />
      </Stack>
    </Box>
  );
};

export const FullHeightLoading = () => {
  return (
    <Box sx={{ height: "100%", backgroundColor: "white" }}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <CircularProgress />
      </Stack>
    </Box>
  );
};

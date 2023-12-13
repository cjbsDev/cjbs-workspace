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
    <Box sx={{ my: 4.5 }}>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack alignItems="center">
          <Skeleton variant="circular" width={200} height={200} />
        </Stack>

        <Stack spacing={2}>
          <Skeleton variant="rounded" width={300} height={16} />
          <Skeleton variant="rounded" height={16} />
          <Skeleton variant="rounded" height={16} />
          <Skeleton variant="rounded" height={16} />
          <Skeleton variant="rounded" height={16} />
        </Stack>
      </Stack>
    </Box>
  );
};

export const SkeletonLineChart = () => {
  return (
    <Box sx={{}}>
      <Grid container>
        <Grid item xs={2.5}>
          <Stack spacing={1.5}>
            <Skeleton variant="text" width={200} height={42} />
            <Skeleton variant="text" width={150} height={25} />
          </Stack>
        </Grid>
        <Grid item xs={9.5}>
          <Skeleton variant="rounded" height={280} />
        </Grid>
      </Grid>
    </Box>
  );
};

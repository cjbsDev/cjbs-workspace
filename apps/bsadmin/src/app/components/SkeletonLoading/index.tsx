"use client";
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { cjbsTheme, Title1 } from "cjbsDSTM";
import { Box } from "@mui/material";

interface SkeletonLoadingProps {
  height?: number | string;
}

const SkeletonLoading = ({ height = "100vh" }: SkeletonLoadingProps) => {
  return (
    <Stack spacing={1.2}>
      <Skeleton
        width={200}
        sx={{ backgroundColor: cjbsTheme.palette.grey["100"] }}
      >
        <Title1 titleName="." />
      </Skeleton>

      <Skeleton
        width="100%"
        sx={{ backgroundColor: cjbsTheme.palette.grey["100"] }}
      >
        <Box sx={{ height: 35 }} />
      </Skeleton>

      <Skeleton
        variant="rounded"
        animation="wave"
        height={height}
        sx={{ backgroundColor: cjbsTheme.palette.grey["100"] }}
      />
    </Stack>
  );
};

export default SkeletonLoading;

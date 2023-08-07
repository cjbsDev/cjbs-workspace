"use client";
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { cjbsTheme } from "../../themes";

interface SkeletonLoadingProps {
  height?: number;
}

export const SkeletonLoading = ({ height = 600 }: SkeletonLoadingProps) => {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      {/*<Skeleton variant="text" sx={{ fontSize: '1rem' }} />*/}

      {/* For other variants, adjust the size with `width` and `height` */}
      {/*<Skeleton variant="circular" width={40} height={40} />*/}
      {/*<Skeleton variant="rectangular" width={210} height={60} />*/}
      <Skeleton
        variant="rounded"
        sx={{ backgroundColor: cjbsTheme.palette.grey["100"] }}
        height={height}
      />
    </Stack>
  );
};

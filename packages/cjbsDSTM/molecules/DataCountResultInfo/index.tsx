"use client";

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

interface DataCountResiltInfoProps {
  totalCount: number;
  selectedCount?: number;
}

export const DataCountResultInfo = (props: DataCountResiltInfoProps) => {
  const theme = useTheme();
  const { totalCount, selectedCount } = props;
  return (
    <Box
      component="dl"
      sx={{ display: "flex", alignItems: "center", m: 0, mt: 0, p: 0 }}
    >
      {/*<Box component="dt" sx={{ m: 0, mr: 1.2, p: 0, pt: 0.5 }}>*/}
      {/*  /!* */}
      {/*  <Typography variant="subtitle2">*/}
      {/*    <b>검색 결과</b>*/}
      {/*  </Typography>*/}
      {/*  *!/*/}
      {/*</Box>*/}
      <Box
        component="dd"
        sx={{
          m: 0,
          p: 0,
          width: "70px",
        }}
      >
        <Typography variant="body2">
          총{" "}
          <Box
            component="b"
            sx={{
              fontSize: 18,
              color: theme.palette.primary.main,
            }}
          >
            {totalCount}
          </Box>{" "}
          건
        </Typography>
      </Box>

      {selectedCount !== undefined && (
        <Box
          component="dd"
          sx={{
            m: 0,
            p: 0,
            pl: "10px",
            ml: "6px",
            position: "relative",
            "::before": {
              content: '"/"',
              position: "absolute",
              top: "3px",
              left: 0,
            },
          }}
        >
          <Typography variant="body2">
            선택{" "}
            <Box
              component="b"
              sx={{ fontSize: 18, color: theme.palette.primary.main }}
            >
              {selectedCount}
            </Box>{" "}
            건
          </Typography>
        </Box>
      )}
    </Box>
  );
};

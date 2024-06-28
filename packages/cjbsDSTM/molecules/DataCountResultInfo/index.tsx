"use client";

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { formatNumberWithCommas } from "../../commonFunc";

interface DataCountResiltInfoProps {
  totalCount: number | undefined;
  selectedCount?: number;
}

export const DataCountResultInfo = ({
  totalCount,
  selectedCount,
}: DataCountResiltInfoProps) => {
  const theme = useTheme();
  return (
    <Box
      component="dl"
      sx={{ display: "flex", alignItems: "center", m: 0, mt: 0, p: 0 }}
    >
      <Box
        component="dd"
        sx={{
          m: 0,
          p: 0,
        }}
      >
        <Typography variant="body2" sx={{ width: "max-content" }}>
          총{" "}
          <Box
            component="b"
            sx={{
              fontSize: 18,
              color: theme.palette.primary.main,
            }}
          >
            {formatNumberWithCommas(totalCount)}
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

"use client";
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { cjbsTheme } from "cjbsDSTM";

const SampleBEA = (props) => {
  const { bcount, ecount, acount } = props;
  return (
    <Box>
      <Typography variant="subtitle1">
        샘플 {bcount + ecount + acount}개
      </Typography>
      <Stack direction="row" spacing={1}>
        <Box
          sx={{
            padding: "10px 20px",
            border: `1px solid ${cjbsTheme.palette.primary.light}`,
            borderRadius: 4,
            // width: "130px",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: cjbsTheme.palette.primary.main }}
          >
            B
          </Typography>

          <Typography variant="h3">
            {bcount}
            <small style={{ fontSize: 14, paddingLeft: 4 }}>개</small>
          </Typography>
        </Box>
        <Box
          sx={{
            padding: "10px 20px",
            border: `1px solid ${cjbsTheme.palette.success.light}`,
            borderRadius: 4,
            // width: "130px",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: cjbsTheme.palette.success.main }}
          >
            E
          </Typography>
          <Typography variant="h3">
            {ecount}
            <small style={{ fontSize: 14, paddingLeft: 4 }}>개</small>
          </Typography>
        </Box>
        <Box
          sx={{
            padding: "10px 20px",
            border: `1px solid ${cjbsTheme.palette.tertiary.light}`,
            borderRadius: 4,
            // width: "130px",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: cjbsTheme.palette.tertiary.main }}
          >
            A
          </Typography>
          <Typography variant="h3">
            {acount}
            <small style={{ fontSize: 14, paddingLeft: 4 }}>개</small>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default SampleBEA;

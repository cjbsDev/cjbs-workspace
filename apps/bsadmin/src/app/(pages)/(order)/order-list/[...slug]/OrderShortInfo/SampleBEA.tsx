"use client";
import React from "react";
import {
  Box,
  BoxProps,
  Stack,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import { cjbsTheme, grey } from "cjbsDSTM";

const SampleBEA = (props) => {
  const { bcount, ecount, acount, sampleCount } = props;
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
        샘플 {sampleCount}개
      </Typography>

      <Stack direction="row" spacing={1}>
        <SampleBox className="SampleBoxB">
          <SampleTitle variant="h4" className="SampleTitleB">
            B
          </SampleTitle>
          <Typography variant="h3" sx={{ fontSize: 22 }}>
            {bcount}
            <small style={{ fontSize: 14, paddingLeft: 4 }}>개</small>
          </Typography>
        </SampleBox>

        <SampleBox className="SampleBoxE">
          <SampleTitle variant="h4" className="SampleTitleE">
            E
          </SampleTitle>
          <Typography variant="h3" sx={{ fontSize: 22 }}>
            {ecount}
            <small style={{ fontSize: 14, paddingLeft: 4 }}>개</small>
          </Typography>
        </SampleBox>

        <SampleBox className="SampleBoxA">
          <SampleTitle variant="h4" className="SampleTitleA">
            A
          </SampleTitle>
          <Typography variant="h3" sx={{ fontSize: 22 }}>
            {acount}
            <small style={{ fontSize: 14, paddingLeft: 4 }}>개</small>
          </Typography>
        </SampleBox>
      </Stack>
    </Box>
  );
};

export default SampleBEA;

const SampleBox = styled(Box)<BoxProps>(({ className, theme }) => ({
  padding: "10px 10px",
  border: `1px solid ${
    className === "SampleBoxA"
      ? cjbsTheme.palette.tertiary.light
      : className === "SampleBoxB"
        ? cjbsTheme.palette.primary.light
        : cjbsTheme.palette.success.light
  }`,
  borderRadius: 8,
  textAlign: "center",
  minWidth: 90,
}));

const SampleTitle = styled(Typography)<TypographyProps>(
  ({ className, theme }) => ({
    color:
      className === "SampleTitleA"
        ? cjbsTheme.palette.tertiary.main
        : className === "SampleTitleB"
          ? cjbsTheme.palette.primary.main
          : cjbsTheme.palette.success.main,
  }),
);

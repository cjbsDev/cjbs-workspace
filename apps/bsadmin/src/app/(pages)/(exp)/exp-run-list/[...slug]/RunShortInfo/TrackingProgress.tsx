import React from "react";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import { cjbsTheme } from "cjbsDSTM";
import MyIcon from "icon/MyIcon";

const TrackingProgress = (props: {
  runId: number;
  runTypeVal: string;
  runDttm: string;
  machineVal: string;
  kitVal: string;
  seqAgncVal: string;
}) => {
  const { runId, runTypeVal, runDttm, machineVal, kitVal, seqAgncVal } = props;
  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
        <Typography
          variant="h4"
          sx={{
            backgroundColor: cjbsTheme.palette.primary.light,
            // orderStatusVal === "진행중"
            //   ? cjbsTheme.palette.primary.light
            //   : orderStatusVal === "완료"
            //   ? cjbsTheme.palette.success.light
            //   : orderStatusVal === "취소"
            //   ? cjbsTheme.palette.error.light
            //   : cjbsTheme.palette.grey["600"],
            color: "white",
            pl: "12px",
            pr: "12px",
            pt: "2px",
            borderRadius: 2,
          }}
        >
          No.{runId}
        </Typography>
      </Stack>
      <Box>
        <Stack spacing={2} direction="row">
          <Stack spacing={0.5}>
            <Box>
              <Grid container gap={1}>
                <Grid item>
                  <Typography variant="body2">RUN 타입</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    {runTypeVal === null ? "-" : runTypeVal}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container gap={1}>
                <Grid item>
                  <Typography variant="body2">진행업체</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    {seqAgncVal === null ? "-" : seqAgncVal}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container gap={1}>
                <Grid item>
                  <Typography variant="body2">RUN 날짜</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    {runDttm === null ? "-" : runDttm}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Stack>

          <Stack spacing={0.5}>
            <Box>
              <Grid container gap={1}>
                <Grid item>
                  <Typography variant="body2">장비</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    {machineVal === null ? "-" : machineVal}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container gap={1}>
                <Grid item>
                  <Typography variant="body2">Kit</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    {kitVal === null ? "-" : kitVal}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default TrackingProgress;

import React from "react";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import { cjbsTheme } from "cjbsDSTM";
import MyIcon from "icon/MyIcon";

const TrackingProgress = (props) => {
  const {
    orderId,
    isFastTrack,
    intnExtrClVal,
    anlsTypeVal,
    srvcTypeVal,
    pltfVal,
    orderStatusVal,
  } = props;
  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Typography
          variant="h4"
          sx={{
            backgroundColor:
              orderStatusVal === "진행중"
                ? cjbsTheme.palette.primary.light
                : orderStatusVal === "완료"
                ? cjbsTheme.palette.success.light
                : orderStatusVal === "취소"
                ? cjbsTheme.palette.error.light
                : cjbsTheme.palette.secondary.light,
            color: "white",
            pl: "12px",
            pr: "12px",
            pt: "2px",
            borderRadius: 2,
          }}
        >
          No.{orderId}
        </Typography>
        <Box>
          <Stack>
            {isFastTrack === "N" && (
              <Stack direction="row">
                <MyIcon icon="fast" size={18} />
                <Typography variant="caption">Fast Track</Typography>
              </Stack>
            )}
            <Chip label={intnExtrClVal} variant="outlined" size="small" />
          </Stack>
        </Box>
      </Stack>
      <Box>
        <Stack spacing={0.5}>
          <Box>
            <Grid container gap={1}>
              <Grid item>
                <Typography variant="body2">분석 종류</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">
                  {anlsTypeVal === null ? "-" : anlsTypeVal}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container gap={1}>
              <Grid item>
                <Typography variant="body2">서비스 타입</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">
                  {srvcTypeVal === null ? "-" : srvcTypeVal}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container gap={1}>
              <Grid item>
                <Typography variant="body2">분석 방법</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">
                  {pltfVal === null ? "-" : pltfVal}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default TrackingProgress;

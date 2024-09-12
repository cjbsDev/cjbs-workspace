import React from "react";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import { cjbsTheme } from "cjbsDSTM";
import MyIcon from "icon/MyIcon";

const getOrderStatusStyles = (status: string) => {
  const statusStyles = {
    진행중: cjbsTheme.palette.primary.light,
    완료: cjbsTheme.palette.success.light,
    취소: cjbsTheme.palette.error.light,
  };

  return {
    backgroundColor: statusStyles[status] || cjbsTheme.palette.grey["600"],
    color: "white",
    padding: "0 12px",
    borderRadius: 2,
  };
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Box>
    <Grid container gap={1}>
      <Grid item>
        <Typography variant="body2">{label}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2">{value ?? "-"}</Typography>
      </Grid>
    </Grid>
  </Box>
);

const TrackingProgress = ({
  orderId,
  isFastTrack,
  intnExtrClVal,
  anlsTypeVal,
  srvcTypeVal,
  pltfVal,
  orderStatusVal,
}) => {
  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Typography variant="h4" sx={getOrderStatusStyles(orderStatusVal)}>
          No.{orderId}
        </Typography>
        <Box>
          <Stack>
            {isFastTrack === "Y" && (
              <Stack direction="row" spacing={0.5}>
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
          <InfoRow label="진행 상황" value={orderStatusVal} />
          <InfoRow label="분석 종류" value={anlsTypeVal} />
          <InfoRow label="서비스 타입" value={srvcTypeVal} />
          <InfoRow label="분석 방법" value={pltfVal} />
        </Stack>
      </Box>
    </Box>
  );
};

export default TrackingProgress;

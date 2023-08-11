import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { grey } from "cjbsDSTM";

const AnalysisStatus = (props) => {
  const { pcrLibComp, seqComp, anlsComp } = props;
  return (
    <Box>
      <Typography variant="subtitle1">분석현황</Typography>
      <Stack direction="row" spacing={1}>
        <Box
          sx={{
            padding: "10px 20px",
            border: `1px solid ${grey["400"]}`,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            PCR/Lib 완료
          </Typography>

          <Typography variant="h3">
            {pcrLibComp}
            <small style={{ fontSize: 14, paddingLeft: 4 }}>개</small>
          </Typography>
        </Box>
        <Box
          sx={{
            padding: "10px 20px",
            border: `1px solid ${grey["400"]}`,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Seq 완료
          </Typography>
          <Typography variant="h3">
            {seqComp}
            <small style={{ fontSize: 14, paddingLeft: 4 }}>개</small>
          </Typography>
        </Box>
        <Box
          sx={{
            padding: "10px 20px",
            border: `1px solid ${grey["400"]}`,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            분석 완료
          </Typography>
          <Typography variant="h3">
            {anlsComp}
            <small style={{ fontSize: 14, paddingLeft: 4 }}>개</small>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default AnalysisStatus;

import React from "react";
import { Box, BoxProps, Stack, styled, Typography } from "@mui/material";
import { grey } from "cjbsDSTM";

const AnalysisStatus = (props) => {
  const { pcrLibComp, seqComp, anlsComp } = props;
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
        분석현황
      </Typography>
      <Stack direction="row" spacing={1}>
        <ItemBox>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            PCR/Lib 완료
          </Typography>

          <Typography variant="h3" sx={{ fontSize: 22 }}>
            {pcrLibComp}
            <small style={{ fontSize: 14, paddingLeft: 4 }}>개</small>
          </Typography>
        </ItemBox>
        <ItemBox>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Seq 완료
          </Typography>
          <Typography variant="h3" sx={{ fontSize: 22 }}>
            {seqComp}
            <small style={{ fontSize: 14, paddingLeft: 4 }}>개</small>
          </Typography>
        </ItemBox>
        <ItemBox>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            분석 완료
          </Typography>
          <Typography variant="h3" sx={{ fontSize: 22 }}>
            {anlsComp}
            <small style={{ fontSize: 14, paddingLeft: 4 }}>개</small>
          </Typography>
        </ItemBox>
      </Stack>
    </Box>
  );
};

export default AnalysisStatus;

const ItemBox = styled(Box)<BoxProps>(({ theme }) => ({
  padding: "10px 20px",
  border: `1px solid ${grey["400"]}`,
  borderRadius: 8,
  textAlign: "center",
  minWidth: 100,
}));

import React from "react";
import {
  Box,
  Chip,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TypographyProps,
} from "@mui/material";
import { TD, TH, transformedNullToHyphon } from "cjbsDSTM";

const SampleInfoTable2 = ({ sampleStatusRes }: any) => {
  const transformedsampleStatusRes = transformedNullToHyphon(sampleStatusRes);
  const {
    biCompDttm,
    biStatusCc,
    biStatusVal,
    libCompDttm,
    libStatusCc,
    libStatusVal,
    ntfcCompDttm,
    ntfcStatusCc,
    ntfcStatusVal,
    qcCompDttm,
    qcStatusCc,
    qcStatusVal,
    rcptDttm,
    rcptStatusCc,
    rcptStatusVal,
    seqCompDttm,
    seqStatusCc,
    seqStatusVal,
  }: any = transformedsampleStatusRes;

  return (
    <>
      <Typography variant="subtitle2">실험 진행 단계</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableHead sx={{ borderTop: "2px solid black" }}>
            <TableRow>
              <TH sx={{ textAlign: "center", borderLeft: "none" }}>접수</TH>
              <TH sx={{ textAlign: "center" }}>QC</TH>
              <TH sx={{ textAlign: "center" }}>LIB</TH>
              <TH sx={{ textAlign: "center" }}>Seq</TH>
              <TH sx={{ textAlign: "center" }}>BI</TH>
              <TH sx={{ textAlign: "center", borderRight: "none" }}>통보</TH>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TD sx={{ textAlign: "center", borderLeft: "none" }}>
                <Stack spacing={0.5}>
                  <Box>
                    <Chip
                      data-tag="allowRowEvents"
                      variant="outlined"
                      color="primary"
                      label={rcptStatusVal}
                      size="small"
                    />
                  </Box>
                  <Caption>{rcptDttm}</Caption>
                </Stack>
              </TD>
              <TD sx={{ textAlign: "center" }}>
                <Stack spacing={0.5}>
                  <Box>
                    <Chip
                      data-tag="allowRowEvents"
                      variant="outlined"
                      color="secondary"
                      label={qcStatusVal}
                      size="small"
                      sx={{ color: "black" }}
                    />
                  </Box>
                  <Caption>{qcCompDttm}</Caption>
                </Stack>
              </TD>
              <TD sx={{ textAlign: "center" }}>
                <Stack spacing={0.5}>
                  <Box>
                    <Chip
                      data-tag="allowRowEvents"
                      variant="outlined"
                      color="error"
                      label={libStatusVal}
                      size="small"
                    />
                  </Box>
                  <Caption>{libCompDttm}</Caption>
                </Stack>
              </TD>
              <TD sx={{ textAlign: "center" }}>
                <Stack spacing={0.5}>
                  <Box>
                    <Chip
                      data-tag="allowRowEvents"
                      variant="outlined"
                      color="secondary"
                      label={seqStatusVal}
                      size="small"
                      sx={{ color: "black" }}
                    />
                  </Box>
                  <Caption>{seqCompDttm}</Caption>
                </Stack>
              </TD>
              <TD sx={{ textAlign: "center" }}>
                <Stack spacing={0.5}>
                  <Box>
                    <Chip
                      data-tag="allowRowEvents"
                      variant="outlined"
                      color="secondary"
                      label={biStatusVal}
                      size="small"
                      sx={{ color: "black" }}
                    />
                  </Box>
                  <Caption>{biCompDttm}</Caption>
                </Stack>
              </TD>
              <TD sx={{ textAlign: "center", borderRight: "none" }}>
                <Stack spacing={0.5}>
                  <Box>
                    <Chip
                      data-tag="allowRowEvents"
                      variant="outlined"
                      color="secondary"
                      label={ntfcStatusVal}
                      size="small"
                      sx={{ color: "black" }}
                    />
                  </Box>
                  <Caption>{ntfcCompDttm}</Caption>
                </Stack>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SampleInfoTable2;

const Caption = styled(Typography)<TypographyProps>(({ className, theme }) => ({
  // marginTop: 4,
  lineHeight: 1,
  fontSize: 12,
}));

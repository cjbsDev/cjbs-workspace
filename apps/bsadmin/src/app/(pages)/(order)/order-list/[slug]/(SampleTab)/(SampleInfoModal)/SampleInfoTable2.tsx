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
import { cjbsTheme, TD, TH, transformedNullToHyphon } from "cjbsDSTM";

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
                      variant="outlined"
                      label={rcptStatusVal}
                      size="small"
                      sx={{
                        border: `1px solid ${
                          rcptStatusCc === "BS_0902003"
                            ? cjbsTheme.palette.primary.main
                            : rcptStatusCc === "BS_0902004"
                            ? cjbsTheme.palette.warning.main
                            : null
                        }`,
                        color: `${
                          rcptStatusCc === "BS_0902003"
                            ? cjbsTheme.palette.primary.main
                            : rcptStatusCc === "BS_0902004"
                            ? cjbsTheme.palette.warning.main
                            : null
                        }`,
                      }}
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
                      label={qcStatusVal}
                      size="small"
                      sx={{
                        border: `1px solid ${
                          qcStatusCc === "BS_0902003"
                            ? cjbsTheme.palette.primary.main
                            : qcStatusCc === "BS_0902004"
                            ? cjbsTheme.palette.warning.main
                            : null
                        }`,
                        color: `${
                          qcStatusCc === "BS_0902003"
                            ? cjbsTheme.palette.primary.main
                            : qcStatusCc === "BS_0902004"
                            ? cjbsTheme.palette.warning.main
                            : null
                        }`,
                      }}
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
                      label={libStatusVal}
                      size="small"
                      sx={{
                        border: `1px solid ${
                          libStatusCc === "BS_0902003"
                            ? cjbsTheme.palette.primary.main
                            : libStatusCc === "BS_0902004"
                            ? cjbsTheme.palette.warning.main
                            : null
                        }`,
                        color: `${
                          libStatusCc === "BS_0902003"
                            ? cjbsTheme.palette.primary.main
                            : libStatusCc === "BS_0902004"
                            ? cjbsTheme.palette.warning.main
                            : null
                        }`,
                      }}
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
                      label={seqStatusVal}
                      size="small"
                      sx={{
                        border: `1px solid ${
                          seqStatusCc === "BS_0902003"
                            ? cjbsTheme.palette.primary.main
                            : seqStatusCc === "BS_0902004"
                            ? cjbsTheme.palette.warning.main
                            : null
                        }`,
                        color: `${
                          seqStatusCc === "BS_0902003"
                            ? cjbsTheme.palette.primary.main
                            : seqStatusCc === "BS_0902004"
                            ? cjbsTheme.palette.warning.main
                            : null
                        }`,
                      }}
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
                      label={biStatusVal}
                      size="small"
                      sx={{
                        border: `1px solid ${
                          biStatusCc === "BS_0902003"
                            ? cjbsTheme.palette.primary.main
                            : biStatusCc === "BS_0902004"
                            ? cjbsTheme.palette.warning.main
                            : null
                        }`,
                        color: `${
                          biStatusCc === "BS_0902003"
                            ? cjbsTheme.palette.primary.main
                            : biStatusCc === "BS_0902004"
                            ? cjbsTheme.palette.warning.main
                            : null
                        }`,
                      }}
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
                      label={ntfcStatusVal}
                      size="small"
                      sx={{
                        border: `1px solid ${
                          ntfcStatusCc === "BS_0902003"
                            ? cjbsTheme.palette.primary.main
                            : ntfcStatusCc === "BS_0902004"
                            ? cjbsTheme.palette.warning.main
                            : null
                        }`,
                        color: `${
                          ntfcStatusCc === "BS_0902003"
                            ? cjbsTheme.palette.primary.main
                            : ntfcStatusCc === "BS_0902004"
                            ? cjbsTheme.palette.warning.main
                            : null
                        }`,
                      }}
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
  lineHeight: 1,
  fontSize: 12,
  textAlign: "center",
}));

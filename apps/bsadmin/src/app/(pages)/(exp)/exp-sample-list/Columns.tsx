import React from "react";
import {
  Tooltip,
  IconButton,
  Stack,
  Box,
  Typography,
  Chip,
  styled,
  TypographyProps,
} from "@mui/material";
import MyIcon from "icon/MyIcon";
import { cjbsTheme } from "cjbsDSTM";
import Link from "next/link";
import Ellipsis from "../../../components/Ellipsis";

export const getColumns = () => [
  {
    name: "샘플번호",
    width: "90px",
    center: true,
    allowOverflow: true,
    selector: (row) => row.sampleId,
  },
  {
    name: "Order번호",
    width: "100px",
    center: true,
    allowOverflow: true,
    selector: (row) => row.orderId,
  },
  {
    name: "거래처(기관)",
    width: "200px",
    allowOverflow: true,
    cell: (row) => {
      const { instNm, agncNm } = row;
      return (
        <Stack data-tag="allowRowEvents">
          <Box data-tag="allowRowEvents">
            <Stack direction="row" spacing={"2px"} alignItems="center">
              <Typography data-tag="allowRowEvents" variant="body2">
                {agncNm}
              </Typography>
            </Stack>
          </Box>
          <Typography data-tag="allowRowEvents" variant="body2">
            ({instNm})
          </Typography>
        </Stack>
      );
    },
  },
  {
    name: "샘플명",
    width: "200px",
    // allowOverflow: true,
    // sortable: true,
    selector: (row) => (row.sampleNm === null ? "-" : row.sampleNm),
    cell: (row) => {
      const { sampleNm } = row;
      return sampleNm === null ? "-" : <Ellipsis text={sampleNm} line={1} />;
    },
  },
  {
    name: "대체명",
    width: "200px",
    allowOverflow: true,
    // sortable: true,
    selector: (row) => (row.altrNm === null ? "-" : row.altrNm),
  },
  {
    name: "샘플상태",
    center: true,
    selector: (row) => row.sampleTypeVal,
  },
  {
    name: "샘플출처",
    width: "160px",
    center: true,
    allowOverflow: true,
    selector: (row) => row.source,
  },
  {
    name: "Depth",
    width: "100px",
    sortable: false,
    right: true,
    selector: (row) => (row.depthVal === null ? "-" : row.depthVal),
  },
  {
    name: "Taxon",
    width: "80px",
    // sortable: false,
    center: true,
    selector: (row) => (row.taxonVal === null ? "-" : row.taxonVal),
  },
  {
    name: "접수",
    width: "105px",
    sortable: false,
    center: true,
    selector: (row) => row.sampleStatusRes.rcptStatusVal,
    cell: (row) => {
      const { sampleStatusRes } = row;
      const { rcptStatusCc, rcptStatusVal, rcptDttm } = sampleStatusRes;
      return (
        <Stack spacing={0.5} data-tag="allowRowEvents">
          <Box sx={{ textAlign: "center" }} data-tag="allowRowEvents">
            <Chip
              data-tag="allowRowEvents"
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
          <Caption data-tag="allowRowEvents">
            {rcptDttm === null ? "-" : rcptDttm}
          </Caption>
        </Stack>
      );
    },
  },
  {
    name: "QC",
    width: "105px",
    sortable: false,
    center: true,
    selector: (row) => row.sampleStatusRes.qcStatusVal,
    cell: (row) => {
      const { sampleStatusRes } = row;
      const { qcStatusCc, qcStatusVal, qcCompDttm } = sampleStatusRes;
      return (
        <Stack spacing={0.5} data-tag="allowRowEvents">
          <Box sx={{ textAlign: "center" }} data-tag="allowRowEvents">
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
          <Caption data-tag="allowRowEvents">
            {qcCompDttm === null ? "-" : qcCompDttm}
          </Caption>
        </Stack>
      );
    },
  },
  {
    name: "LIB",
    width: "105px",
    sortable: false,
    center: true,
    selector: (row) => row.sampleStatusRes.libStatusVal,
    cell: (row) => {
      const { sampleStatusRes } = row;
      const { libStatusCc, libStatusVal, libCompDttm } = sampleStatusRes;
      return (
        <Stack spacing={0.5} data-tag="allowRowEvents">
          <Box sx={{ textAlign: "center" }} data-tag="allowRowEvents">
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
          <Caption data-tag="allowRowEvents">
            {libCompDttm === null ? "-" : libCompDttm}
          </Caption>
        </Stack>
      );
    },
  },
  {
    name: "Seq",
    width: "105px",
    sortable: false,
    center: true,
    selector: (row) => row.sampleStatusRes.seqStatusVal,
    cell: (row) => {
      const { sampleStatusRes } = row;
      const { seqStatusCc, seqStatusVal, seqCompDttm } = sampleStatusRes;
      return (
        <Stack spacing={0.5} data-tag="allowRowEvents">
          <Box sx={{ textAlign: "center" }} data-tag="allowRowEvents">
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
          <Caption data-tag="allowRowEvents">
            {seqCompDttm === null ? "-" : seqCompDttm}
          </Caption>
        </Stack>
      );
    },
  },
  {
    name: "BI",
    width: "105px",
    sortable: false,
    center: true,
    selector: (row) => row.sampleStatusRes.biStatusVal,
    cell: (row) => {
      const { sampleStatusRes } = row;
      const { biStatusCc, biStatusVal, biCompDttm } = sampleStatusRes;
      return (
        <Stack spacing={0.5} data-tag="allowRowEvents">
          <Box sx={{ textAlign: "center" }} data-tag="allowRowEvents">
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
          <Caption data-tag="allowRowEvents">
            {biCompDttm === null ? "-" : biCompDttm}
          </Caption>
        </Stack>
      );
    },
  },
  {
    name: "통보",
    width: "105px",
    sortable: false,
    center: true,
    selector: (row) => row.sampleStatusRes.ntfcStatusVal,
    cell: (row) => {
      const { sampleStatusRes } = row;
      const { ntfcStatusCc, ntfcStatusVal, ntfcCompDttm } = sampleStatusRes;
      return (
        <Stack spacing={0.5} data-tag="allowRowEvents">
          <Box sx={{ textAlign: "center" }} data-tag="allowRowEvents">
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
          <Caption data-tag="allowRowEvents">
            {ntfcCompDttm === null ? "-" : ntfcCompDttm}
          </Caption>
        </Stack>
      );
    },
  },
  {
    name: "RUN",
    width: "150px",
    sortable: false,
    center: true,
    // right: true,
    // allowOverflow: true,
    selector: (row) => (row.runList === null ? "-" : row.runList.join(", ")),
    cell: (row) => {
      const { runList } = row;
      return runList === null ? (
        "-"
      ) : (
        <Ellipsis text={runList.join(", ")} line={1} />
      );
    },
  },
  {
    name: "Project uid",
    width: "160px",
    center: true,
    selector: (row) => (row.projectUid === null ? "-" : row.projectUid),
    cell: (row) => {
      const { projectUid, projectUidLink, orderUkey } = row;
      return projectUidLink !== null ? (
        <Link
          href={projectUidLink}
          target="_blank"
          style={{
            textDecoration: "underline",
            color: cjbsTheme.palette.primary.main,
          }}
        >
          {projectUid}
        </Link>
      ) : (
        // <Link
        //   href={`/order-list/${orderUkey}?from=/exp-sample-list&tabIndex=3`}
        //   style={{
        //     textDecoration: "underline",
        //     color: cjbsTheme.palette.primary.main,
        //   }}
        // >
        //   {projectUid}
        // </Link>
        "-"
      );
    },
  },
  {
    name: "메모",
    width: "80px",
    button: true,
    center: true,
    cell: (row: { memo: string }) => {
      const { memo } = row;
      return (
        memo !== null &&
        memo !== "" && (
          <Tooltip title={memo} arrow>
            <IconButton size="small">
              <MyIcon icon="memo" size={24} />
            </IconButton>
          </Tooltip>
        )
      );
    },
  },
];

const Caption = styled(Typography)<TypographyProps>(({ className, theme }) => ({
  lineHeight: 1,
  fontSize: 12,
  textAlign: "center",
}));

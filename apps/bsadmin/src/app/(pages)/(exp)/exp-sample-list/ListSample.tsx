"use client";

import React, { useCallback, useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  Title1,
  ContainedButton,
  cjbsTheme,
  FileDownloadBtn,
} from "cjbsDSTM";
import {
  Box,
  Stack,
  Grid,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  styled,
  TypographyProps,
} from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import MyIcon from "icon/MyIcon";
import IconDescBar from "../../../components/IconDescBar";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { useList } from "../../../hooks/useList";
import Link from "next/link";
import { blue, red, grey, green } from "cjbsDSTM/themes/color";
import useSWR from "swr";
import { fetcher } from "api";
import { usePathname, useSearchParams } from "next/navigation";
import KeywordSearch from "../../../components/KeywordSearch";
import NoDataView from "../../../components/NoDataView";

const ListSample = () => {
  const [showRunAddModal, setShowRunAddModal] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const resultObject = {};

  for (const [key, value] of searchParams.entries()) {
    resultObject[key] = value;
  }
  console.log(">>>>>>>>>", resultObject);

  const result = "?" + new URLSearchParams(resultObject).toString();
  console.log("RESULT@#@#@#", JSON.stringify(result));

  const { data } = useSWR(
    JSON.stringify(resultObject) === "{}"
      ? `/sample/list?page=${page}&size=${size}`
      : `/sample/list${result}&page=${page}&size=${size}`,
    fetcher,
    {
      suspense: true,
    }
  );
  console.log("SAMPLE LIST DATA", data);
  const runListData = data.sampleList;
  const totalElements = data.pageInfo.totalElements;
  const [filterText, setFilterText] = useState("");
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const columns = useMemo(
    () => [
      {
        name: "샘플번호",
        width: "120px",
        sortable: true,
        selector: (row) => row.sampleId,
      },
      {
        name: "Order번호",
        width: "120px",
        sortable: true,
        selector: (row) => row.orderId,
      },
      {
        name: "거래처(기관)",
        width: "170px",
        // selector: (row) => "외부 (무료)",
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
        sortable: true,
        selector: (row) => (row.sampleNm === null ? "-" : row.sampleNm),
      },
      {
        name: "대체명",
        sortable: true,
        selector: (row) => (row.altrNm === null ? "-" : row.altrNm),
      },
      {
        name: "샘플상태",
        selector: (row) => row.sampleTypeVal,
      },
      {
        name: "샘플출처",
        selector: (row) => row.source,
      },
      {
        name: "Depth",
        width: "100px",
        sortable: false,
        center: true,
        selector: (row) => (row.depthVal === null ? "-" : row.depthVal),
      },
      {
        name: "Taxon",
        width: "80px",
        sortable: false,
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
        // width: "120px",
        sortable: false,
        center: true,
        wrap: true,
        selector: (row) =>
          row.runList === null ? "-" : row.runList.join(", "),
      },
      {
        name: "Project uid",
        selector: (row) => (row.projectUid === null ? "-" : row.projectUid),
        cell: (row) => {
          const { projectUid, projectUidLink, orderUkey } = row;
          return projectUidLink !== null ? (
            // /order-list/yiIVCM
            // <Link
            //   href={projectUidLink}
            //   target="_blank"
            //   style={{
            //     textDecoration: "underline",
            //     color: cjbsTheme.palette.primary.main,
            //   }}
            // >
            //   {projectUid}
            // </Link>

            <Link
              href={`/order-list/${orderUkey}?from=sampleListPage&tabIndex=3`}
              style={{
                textDecoration: "underline",
                color: cjbsTheme.palette.primary.main,
              }}
            >
              {projectUid}
            </Link>
          ) : (
            "-"
          );
        },
      },
      {
        name: "메모",
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
        width: "80px",
      },
    ],
    []
  );

  const goDetailPage = useCallback(
    (row: any) => {
      const path = row.orderUkey;
      router.push("/order-list/" + path + `?prevPageUrl=${pathname}`);
    },
    [pathname, router]
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <Grid container>
        <Grid item xs={5} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <DataCountResultInfo totalCount={totalElements} />
          </Stack>
        </Grid>
        <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1.5 }}
            alignItems="center"
          >
            <FileDownloadBtn
              exportUrl={`/sample/list/download${result}`}
              iconName="xls3"
            />

            <KeywordSearch />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [result, totalElements]);

  const handlePageChange = (page: number) => {
    console.log("Page", page);
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    console.log("Row change.....", newPerPage, page);
    setPage(page);
    setSize(newPerPage);
  };

  return (
    <>
      <DataTableBase
        title={<Title1 titleName="All Samples" />}
        data={runListData}
        columns={columns}
        onRowClicked={goDetailPage}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        paginationResetDefaultPage={resetPaginationToggle}
        selectableRows={false}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        noDataComponent={<NoDataView />}
      />
    </>
  );
};

export default ListSample;

const Caption = styled(Typography)<TypographyProps>(({ className, theme }) => ({
  lineHeight: 1,
  fontSize: 12,
  textAlign: "center",
}));

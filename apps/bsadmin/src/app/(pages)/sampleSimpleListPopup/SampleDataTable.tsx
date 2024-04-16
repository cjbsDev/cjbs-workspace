import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  cjbsTheme,
  DataCountResultInfo,
  DataTableBase,
  Title1,
} from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../components/NoDataView";
// import NoDataView from "../../../../../components/NoDataView";
import {
  Box,
  Chip,
  Grid,
  Stack,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import KeywordSearch from "../../components/KeywordSearch";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import useSWR from "swr";
import { fetcher } from "api";
import { useRecoilState, useSetRecoilState } from "recoil";
import { sampleUkeyAtom } from "../../recoil/atoms/sampleUkeyAtom";
import SampleActionBtns from "./SampleActionBtns";
import { toggledClearRowsAtom } from "../../recoil/atoms/toggled-clear-rows-atom";

const SampleDataTable = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  // const [filterText, setFilterText] = useState("");
  // const [checked, setChecked] = useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  // const [isClear, setIsClear] = useState<boolean>(false);
  const [toggledClearRows, setToggleClearRows] =
    useRecoilState(toggledClearRowsAtom);

  // useEffect(() => {
  //   // isClear 상태 변경 이슈
  //   setToggleClearRows(!toggledClearRows);
  // }, [toggledClearRows]);

  const router = useRouter();
  const params = useParams();
  const ukey = params.slug;
  const setSampleUkeyList = useSetRecoilState(sampleUkeyAtom);

  const searchParams = useSearchParams();

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
      // keepPreviousData: true,
    },
  );

  const sampleListData = data.sampleList;
  console.log("Sample Search List ==>>", sampleListData);
  const totalElements = data.pageInfo.totalElements;

  const formatValue = (value: string) => (value === null ? "-" : value);

  const columns = useMemo(
    () => [
      {
        name: "오더 번호",
        center: true,
        allowOverflow: true,
        // width: "80px",
        // sortable: true,
        selector: (row, index) => row.orderId,
      },
      {
        name: "서비스 타입",
        width: "120px",
        // sortable: true,
        allowOverflow: true,
        selector: (row, index) => formatValue(row.srvcTypeVal),
      },
      {
        name: "샘플번호",
        center: true,
        allowOverflow: true,
        // width: "80px",
        // sortable: true,
        selector: (row, index) => row.sampleId,
      },
      {
        name: "샘플명",
        width: "160px",
        allowOverflow: true,
        // sortable: true,
        selector: (row) => formatValue(row.sampleNm),
      },
      {
        name: "샘플종류",
        center: true,
        // sortable: true,
        selector: (row) => formatValue(row.sampleTypeVal),
      },
      {
        name: "Source",
        center: true,
        allowOverflow: true,
        selector: (row) => row.source,
      },
      {
        name: "Depth",
        right: true,
        selector: (row) => row.depthVal,
      },
      {
        name: "Taxon",
        center: true,
        selector: (row) => (row.taxonVal === null ? "-" : row.taxonVal),
      },
      {
        name: "RUN",
        // width: "120px",
        allowOverflow: true,
        selector: (row) => row.runList,
      },
      // {
      //   name: "접수",
      //   width: "105px",
      //   sortable: false,
      //   center: true,
      //   selector: (row) => row.sampleStatusRes.rcptStatusVal,
      //   cell: (row) => {
      //     const { sampleStatusRes } = row;
      //     const { rcptStatusCc, rcptStatusVal, rcptDttm } = sampleStatusRes;
      //     return (
      //       <Stack spacing={0.5} data-tag="allowRowEvents">
      //         <Box sx={{ textAlign: "center" }} data-tag="allowRowEvents">
      //           <Chip
      //             data-tag="allowRowEvents"
      //             variant="outlined"
      //             label={rcptStatusVal}
      //             size="small"
      //             sx={{
      //               border: `1px solid ${
      //                 rcptStatusCc === "BS_0902003"
      //                   ? cjbsTheme.palette.primary.main
      //                   : rcptStatusCc === "BS_0902004"
      //                     ? cjbsTheme.palette.warning.main
      //                     : null
      //               }`,
      //               color: `${
      //                 rcptStatusCc === "BS_0902003"
      //                   ? cjbsTheme.palette.primary.main
      //                   : rcptStatusCc === "BS_0902004"
      //                     ? cjbsTheme.palette.warning.main
      //                     : null
      //               }`,
      //             }}
      //           />
      //         </Box>
      //         <Caption data-tag="allowRowEvents">
      //           {rcptDttm === null ? "-" : rcptDttm}
      //         </Caption>
      //       </Stack>
      //     );
      //   },
      // },
      // {
      //   name: "QC",
      //   width: "105px",
      //   sortable: false,
      //   center: true,
      //   selector: (row) => row.sampleStatusRes.qcStatusVal,
      //   cell: (row) => {
      //     const { sampleStatusRes } = row;
      //     const { qcStatusCc, qcStatusVal, qcCompDttm } = sampleStatusRes;
      //     return (
      //       <Stack spacing={0.5} data-tag="allowRowEvents">
      //         <Box sx={{ textAlign: "center" }} data-tag="allowRowEvents">
      //           <Chip
      //             data-tag="allowRowEvents"
      //             variant="outlined"
      //             label={qcStatusVal}
      //             size="small"
      //             sx={{
      //               border: `1px solid ${
      //                 qcStatusCc === "BS_0902003"
      //                   ? cjbsTheme.palette.primary.main
      //                   : qcStatusCc === "BS_0902004"
      //                     ? cjbsTheme.palette.warning.main
      //                     : null
      //               }`,
      //               color: `${
      //                 qcStatusCc === "BS_0902003"
      //                   ? cjbsTheme.palette.primary.main
      //                   : qcStatusCc === "BS_0902004"
      //                     ? cjbsTheme.palette.warning.main
      //                     : null
      //               }`,
      //             }}
      //           />
      //         </Box>
      //         <Caption data-tag="allowRowEvents">
      //           {qcCompDttm === null ? "-" : qcCompDttm}
      //         </Caption>
      //       </Stack>
      //     );
      //   },
      // },
      // {
      //   name: "LIB",
      //   width: "105px",
      //   sortable: false,
      //   center: true,
      //   selector: (row) => row.sampleStatusRes.libStatusVal,
      //   cell: (row) => {
      //     const { sampleStatusRes } = row;
      //     const { libStatusCc, libStatusVal, libCompDttm } = sampleStatusRes;
      //     return (
      //       <Stack spacing={0.5} data-tag="allowRowEvents">
      //         <Box sx={{ textAlign: "center" }} data-tag="allowRowEvents">
      //           <Chip
      //             data-tag="allowRowEvents"
      //             variant="outlined"
      //             label={libStatusVal}
      //             size="small"
      //             sx={{
      //               border: `1px solid ${
      //                 libStatusCc === "BS_0902003"
      //                   ? cjbsTheme.palette.primary.main
      //                   : libStatusCc === "BS_0902004"
      //                     ? cjbsTheme.palette.warning.main
      //                     : null
      //               }`,
      //               color: `${
      //                 libStatusCc === "BS_0902003"
      //                   ? cjbsTheme.palette.primary.main
      //                   : libStatusCc === "BS_0902004"
      //                     ? cjbsTheme.palette.warning.main
      //                     : null
      //               }`,
      //             }}
      //           />
      //         </Box>
      //         <Caption data-tag="allowRowEvents">
      //           {libCompDttm === null ? "-" : libCompDttm}
      //         </Caption>
      //       </Stack>
      //     );
      //   },
      // },
      // {
      //   name: "Seq",
      //   width: "105px",
      //   sortable: false,
      //   center: true,
      //   selector: (row) => row.sampleStatusRes.seqStatusVal,
      //   cell: (row) => {
      //     const { sampleStatusRes } = row;
      //     const { seqStatusCc, seqStatusVal, seqCompDttm } = sampleStatusRes;
      //     return (
      //       <Stack spacing={0.5} data-tag="allowRowEvents">
      //         <Box sx={{ textAlign: "center" }} data-tag="allowRowEvents">
      //           <Chip
      //             data-tag="allowRowEvents"
      //             variant="outlined"
      //             label={seqStatusVal}
      //             size="small"
      //             sx={{
      //               border: `1px solid ${
      //                 seqStatusCc === "BS_0902003"
      //                   ? cjbsTheme.palette.primary.main
      //                   : seqStatusCc === "BS_0902004"
      //                     ? cjbsTheme.palette.warning.main
      //                     : null
      //               }`,
      //               color: `${
      //                 seqStatusCc === "BS_0902003"
      //                   ? cjbsTheme.palette.primary.main
      //                   : seqStatusCc === "BS_0902004"
      //                     ? cjbsTheme.palette.warning.main
      //                     : null
      //               }`,
      //             }}
      //           />
      //         </Box>
      //         <Caption data-tag="allowRowEvents">
      //           {seqCompDttm === null ? "-" : seqCompDttm}
      //         </Caption>
      //       </Stack>
      //     );
      //   },
      // },
      // {
      //   name: "BI",
      //   width: "105px",
      //   sortable: false,
      //   center: true,
      //   selector: (row) => row.sampleStatusRes.biStatusVal,
      //   cell: (row) => {
      //     const { sampleStatusRes } = row;
      //     const { biStatusCc, biStatusVal, biCompDttm } = sampleStatusRes;
      //     return (
      //       <Stack spacing={0.5} data-tag="allowRowEvents">
      //         <Box sx={{ textAlign: "center" }} data-tag="allowRowEvents">
      //           <Chip
      //             data-tag="allowRowEvents"
      //             variant="outlined"
      //             label={biStatusVal}
      //             size="small"
      //             sx={{
      //               border: `1px solid ${
      //                 biStatusCc === "BS_0902003"
      //                   ? cjbsTheme.palette.primary.main
      //                   : biStatusCc === "BS_0902004"
      //                     ? cjbsTheme.palette.warning.main
      //                     : null
      //               }`,
      //               color: `${
      //                 biStatusCc === "BS_0902003"
      //                   ? cjbsTheme.palette.primary.main
      //                   : biStatusCc === "BS_0902004"
      //                     ? cjbsTheme.palette.warning.main
      //                     : null
      //               }`,
      //             }}
      //           />
      //         </Box>
      //         <Caption data-tag="allowRowEvents">
      //           {biCompDttm === null ? "-" : biCompDttm}
      //         </Caption>
      //       </Stack>
      //     );
      //   },
      // },
      // {
      //   name: "통보",
      //   width: "105px",
      //   sortable: false,
      //   center: true,
      //   selector: (row) => row.sampleStatusRes.ntfcStatusVal,
      //   cell: (row) => {
      //     const { sampleStatusRes } = row;
      //     const { ntfcStatusCc, ntfcStatusVal, ntfcCompDttm } = sampleStatusRes;
      //     return (
      //       <Stack spacing={0.5} data-tag="allowRowEvents">
      //         <Box sx={{ textAlign: "center" }} data-tag="allowRowEvents">
      //           <Chip
      //             data-tag="allowRowEvents"
      //             variant="outlined"
      //             label={ntfcStatusVal}
      //             size="small"
      //             sx={{
      //               border: `1px solid ${
      //                 ntfcStatusCc === "BS_0902003"
      //                   ? cjbsTheme.palette.primary.main
      //                   : ntfcStatusCc === "BS_0902004"
      //                     ? cjbsTheme.palette.warning.main
      //                     : null
      //               }`,
      //               color: `${
      //                 ntfcStatusCc === "BS_0902003"
      //                   ? cjbsTheme.palette.primary.main
      //                   : ntfcStatusCc === "BS_0902004"
      //                     ? cjbsTheme.palette.warning.main
      //                     : null
      //               }`,
      //             }}
      //           />
      //         </Box>
      //         <Caption data-tag="allowRowEvents">
      //           {ntfcCompDttm === null ? "-" : ntfcCompDttm}
      //         </Caption>
      //       </Stack>
      //     );
      //   },
      // },
      {
        name: "분석내역서",
        width: "100px",
        sortable: false,
        center: true,
        selector: (row) => (row.isAnlsItst === "Y" ? "생성" : "-"),
      },
    ],
    [],
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
            <KeywordSearch />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [totalElements]);

  const handleSelectedRowChange = useCallback(
    ({ selectedRows }: any) => {
      console.log("%%%%%%%%%", selectedRows);
      // const getSampleUkeyList = selectedRows.map((row) => row.sampleUkey);
      // console.log("selectedSampleUkeyList ==>>", getSampleUkeyList);
      setSampleUkeyList(selectedRows);
      // console.log("selectedSampleIdList ==>>", getSampleIDList);
    },
    [setSampleUkeyList],
  );

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
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        title={<Title1 titleName="샘플 검색" />}
        data={sampleListData}
        columns={columns}
        // onRowClicked={goDetailPage}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        paginationResetDefaultPage={resetPaginationToggle}
        selectableRows
        onSelectedRowsChange={handleSelectedRowChange}
        clearSelectedRows={toggledClearRows}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        noDataComponent={<NoDataView />}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15]}
      />
      <SampleActionBtns />
    </Box>
  );
};

export default SampleDataTable;

const Caption = styled(Typography)<TypographyProps>(({ className, theme }) => ({
  lineHeight: 1,
  fontSize: 12,
  textAlign: "center",
}));

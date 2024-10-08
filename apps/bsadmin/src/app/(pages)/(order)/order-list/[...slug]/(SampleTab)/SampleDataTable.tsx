import React, { useMemo } from "react";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { cjbsTheme, DataTableBase } from "cjbsDSTM";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "api";
import {
  Box,
  Chip,
  Checkbox,
  Stack,
  styled,
  Tooltip,
  Typography,
  TypographyProps,
} from "@mui/material";
import Ellipsis from "../../../../../components/Ellipsis";
import useCalculatedHeight from "../../../../../hooks/useCalculatedHeight";
import NoDataView from "../../../../../components/NoDataView";

const SampleDataTable = (props) => {
  const {
    subHeaderComponentMemo,
    goDetailModal,
    handleSelectedRowChange,
    isClear,
    filterText,
  } = props;
  const height = useCalculatedHeight(128);
  const params = useParams();
  const orderUkey = params.slug;
  const { data } = useSWR(`/order/${orderUkey}/sample/list`, fetcher, {
    suspense: true,
  });
  const sampleList = Array.from(data);

  console.log(data);

  const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

  const filteredItems = sampleList.filter((item) => {
    const filterPattern = new RegExp(
      filterText.toLowerCase().normalize("NFC"),
      "i",
    );

    return (
      (item.sampleId && filterPattern.test(item.sampleId)) ||
      (item.sampleNm &&
        filterPattern.test(item.sampleNm.toLowerCase().normalize("NFC"))) ||
      (item.altrNm &&
        filterPattern.test(item.altrNm.toLowerCase().normalize("NFC"))) ||
      (item.sampleTypeVal &&
        filterPattern.test(
          item.sampleTypeVal.toLowerCase().normalize("NFC"),
        )) ||
      (item.source &&
        filterPattern.test(item.source.toLowerCase().normalize("NFC"))) ||
      (item.depthVal &&
        filterPattern.test(item.depthVal.toLowerCase().normalize("NFC"))) ||
      (item.taxonVal &&
        filterPattern.test(item.taxonVal.toLowerCase().normalize("NFC"))) ||
      (item.runList.join() &&
        filterPattern.test(
          item.runList.join().toLowerCase().normalize("NFC"),
        )) ||
      (item.sampleStatusRes.rcptStatusVal &&
        filterPattern.test(
          item.sampleStatusRes.rcptStatusVal.toLowerCase().normalize("NFC"),
        )) ||
      (item.isAnlsItst &&
        filterPattern.test(item.isAnlsItst.toLowerCase().normalize("NFC")))
    );
  });

  const columns = useMemo(
    () => [
      {
        name: "샘플번호",
        sortable: false,
        center: true,
        selector: (row) => row.sampleId,
      },
      {
        name: "번호",
        width: "90px",
        sortable: false,
        center: true,
        selector: (row, index) => index + 1,
      },
      {
        name: "샘플명",
        minWidth: "250px",
        wrap: true,
        sortable: false,
        // center: true,
        // allowOverflow: true,
        // grow: 2,
        selector: (row) => (row.sampleNm === null ? "-" : row.sampleNm),
        cell: (row) => {
          return <Ellipsis text={row.sampleNm} line={1} />;
        },
      },
      {
        name: "대체명",
        minWidth: "250px",
        wrap: true,
        // allowOverflow: true,
        // sortable: true,
        selector: (row) => (row.altrNm === null ? "-" : row.altrNm),
        cell: (row) => {
          return <Ellipsis text={row.altrNm} line={1} />;
        },
      },
      {
        name: "샘플종류",
        sortable: false,
        center: true,
        selector: (row) =>
          row.sampleTypeVal === null ? "-" : row.sampleTypeVal,
      },
      {
        name: "Source",
        sortable: false,
        // center: true,
        wrap: true,
        minWidth: "250px",
        // grow: 3,
        selector: (row) => (row.source === null ? "-" : row.source),
      },
      {
        name: "Depth",
        // width: "80px",
        sortable: false,
        center: true,
        selector: (row) => (row.depthMc === null ? "-" : row.depthVal),
      },
      {
        name: "Taxon",
        // width: "80px",
        sortable: false,
        center: true,
        selector: (row) => (row.taxonVal === null ? "-" : row.taxonVal),
      },
      {
        name: "검증",
        // width: "100px",
        sortable: false,
        center: true,
        selector: (row) => row.isVrfc ?? "-",
      },
      {
        name: "메모",
        width: "150px",
        sortable: false,
        center: true,
        selector: (row) => row.memo ?? "-",
      },
      {
        name: "RUN",
        minWidth: "250px",
        // maxWidth: "200px",
        // minWidth: "300px",
        sortable: false,
        center: true,
        // allowOverflow: true,
        // glow: 10,
        wrap: true,
        selector: (row) =>
          row.runList.length === 0 ? "-" : row.runList.join(),
      },
      {
        name: "접수",
        // width: "105px",
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
        // width: "105px",
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
        // width: "105px",
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
        // width: "105px",
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
        // width: "105px",
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
        // width: "105px",
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
        name: "분석내역서",
        // width: "100px",
        sortable: false,
        center: true,
        selector: (row) => (row.isAnlsItst === "Y" ? "생성" : "-"),
      },
    ],
    [],
  );

  return (
    <Box sx={{ mt: -5, display: "grid" }}>
      <DataTableBase
        title={<Typography variant="subtitle1">목록</Typography>}
        data={filteredItems}
        columns={columns}
        onRowClicked={goDetailModal}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles3}
        fixedHeader
        fixedHeaderScrollHeight={`${height}px`}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        // paginationResetDefaultPage={resetPaginationToggle}
        selectableRows
        selectableRowsComponent={Checkbox}
        selectableRowsComponentProps={selectProps}
        onSelectedRowsChange={handleSelectedRowChange}
        clearSelectedRows={isClear}
        // selectableRowsVisibleOnly={true}
        noDataComponent={<NoDataView />}
        pagination
        paginationPerPage={100}
        paginationRowsPerPageOptions={[100, 200, 300, 400]}
      />
    </Box>
  );
};

export default SampleDataTable;

const Caption = styled(Typography)<TypographyProps>(({ className, theme }) => ({
  lineHeight: 1,
  fontSize: 12,
  textAlign: "center",
}));

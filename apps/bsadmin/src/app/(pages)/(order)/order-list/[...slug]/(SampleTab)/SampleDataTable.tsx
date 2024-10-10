import React, { useEffect, useMemo } from "react";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { cjbsTheme, DataTableBase, EzTable } from "cjbsDSTM";
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
import { Badge } from "cjbsDSTM/atoms/shadcn/badge";
import { cn } from "cjbsDSTM/atoms/shadcn/mergeStyle";

const SampleDataTable = (props) => {
  const {
    subHeaderComponentMemo,
    goDetailModal,
    handleSelectedRowChange,
    isClear,
    filterText,
    rowSelection,
    setRowSelection,
    handleRowSelection
  } = props;
  const height = useCalculatedHeight(128);
  const params = useParams();
  const orderUkey = params.slug;
  const fetched = useSWR(`/order/${orderUkey}/sample/list`, fetcher, {
    suspense: true,
  });

  const sampleList = Array.from(fetched.data);

  console.log(fetched.data);

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

  const cols:any = useMemo(()=>[
    {
      accessorKey: "sampleId",
      id:"sampleId",
      header: "샘플번호",
      enableMultiSort: true,
      filterFn: "includesString",
      meta: {
        dataType: "number"
      }
    },
    {
      id: "rowIndex",
      header: "번호",
      accessorFn: (row, rowIndex) => rowIndex+1,
      enableMultiSort: true,
      filterFn: "includesString",
      meta: {
        dataType: "string"
      }
    },
    {
      accessorKey: "sampleNm",
      id: "sampleNm",
      header: "샘플명",
      enableMultiSort: true,
      filterFn: "includesString",
      meta: {
        dataType: "string"
      }
    },
    {
      accessorKey: "altrNm",
      id: "altrNm",
      header: "대체명",
      enableMultiSort: true,
      filterFn: "includesString",
      meta: {
        dataType: "string"
      }
    },
    {
      accessorKey: "sampleTypeVal",
      id: "sampleTypeVal",
      header: "샘플종류",
      enableMultiSort: true,
      filterFn: "includesString",
      meta: {
        dataType: "string"
      }
    },
    {
      accessorKey: "source",
      id: "source",
      header: "Source",
      enableMultiSort: true,
      filterFn: "includesString",
      meta: {
        dataType: "string"
      }
    },
    {
      accessorKey: "depthVal",
      id: "depthVal",
      header: "Depth",
      enableMultiSort: true,
      filterFn: "includesString",
      meta: {
        dataType: "string"
      }
    },
    {
      accessorKey: "taxonVal",
      id: "taxonVal",
      header: "Taxon",
      enableMultiSort: true,
      filterFn: "includesString",
      meta: {
        dataType: "string"
      }
    },
    {
      accessorKey: "isVrfc",
      id: "isVrfc",
      header: "검증",
      enableMultiSort: true,
      filterFn: "includesString",
      meta: {
        dataType: "string"
      }
    },
    {
      accessorKey: "memo",
      id: "memo",
      header: "메모",
      enableMultiSort: true,
      accessorFn:(row) => row.memo ?? "-",
      filterFn: "includesString",
      meta: {
        dataType: "string"
      }
    },
    {
      accessorKey: "runList",
      id: "runList",
      header: "RUN",
      accessorFn: (row) => row.runList.length===0 ? "-" : row.runList.join(),
      enableMultiSort: true,
      filterFn: "includesString",
      meta: {
        dataType: "number"
      }
    },
    {
      accessorKey: "sampleStatusRes.rcptStatusVal",
      id: "sampleStatusRes.rcptStatusVal",
      header: "접수",
      enableMultiSort: true,
      filterFn: "includesString",
      cell: ({cell, row}) => {
        const val = cell.getValue() as string;
        const code = row.original.sampleStatusRes.rcptStatusCc;
        return(
          <div
            className="flex flex-col items-center gap-1"
          >
            <Badge
              shape="ellipse"
              variant="outline"
              className={cn(
                // "text-theme-box border-theme-box",
                ["BS_0902007"].includes(code)&&"text-theme-warning border-theme-warning",
                code==="BS_0902005"&&"text-theme-primary border-theme-primary",
                code==="BS_0902003"&&"text-theme-secondary border-theme-secondary",
                ["BS_0902004","BS_0902006"].includes(code)&&"text-theme-danger border-theme-danger",
              )}
            >
              {val}
            </Badge>
            <span className="text-[.8rem]">
              {row.original.sampleStatusRes.rcptDttm}
            </span>
          </div>
        )
      },
      meta: {
        dataType: "string"
      }
    },
    {
      accessorKey: "sampleStatusRes.qcStatusVal",
      id: "sampleStatusRes.qcStatusVal",
      header: "QC",
      enableMultiSort: true,
      filterFn: "includesString",
      meta: {
        dataType: "string"
      },
      cell: ({cell, row}) => {
        const val = cell.getValue() as string;
        const code = row.original.sampleStatusRes.qcStatusCc;
        return(
          <div
            className="flex flex-col justify-center items-center gap-1"
          >
            <Badge
              shape="ellipse"
              variant="outline"
              className={cn(
                // "text-theme-box border-theme-box",
                ["BS_0902007"].includes(code)&&"text-theme-warning border-theme-warning",
                code==="BS_0902005"&&"text-theme-primary border-theme-primary",
                code==="BS_0902003"&&"text-theme-secondary border-theme-secondary",
                ["BS_0902004","BS_0902006"].includes(code)&&"text-theme-danger border-theme-danger",
              )}
            >
              {val}
            </Badge>
            <span className="text-[.8rem]">
              {row.original.sampleStatusRes.qcCompDttm}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "sampleStatusRes.libStatusVal",
      id: "sampleStatusRes.libStatusVal",
      header: "LIB",
      enableMultiSort: true,
      filterFn: "includesString",
      meta: {
        dataType: "string"
      },
      cell: ({cell, row}) => {
        const val = cell.getValue() as string;
        const code = row.original.sampleStatusRes.libStatusCc;
        return(
          <div
            className="flex flex-col justify-center items-center gap-1"
          >
            <Badge
              shape="ellipse"
              variant="outline"
              className={cn(
                // "text-theme-box border-theme-box",
                ["BS_0902007"].includes(code)&&"text-theme-warning border-theme-warning",
                code==="BS_0902005"&&"text-theme-primary border-theme-primary",
                code==="BS_0902003"&&"text-theme-secondary border-theme-secondary",
                ["BS_0902004","BS_0902006"].includes(code)&&"text-theme-danger border-theme-danger",
              )}
            >
              {val}
            </Badge>
            <span className="text-[.8rem]">
              {row.original.sampleStatusRes.libCompDttm}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "sampleStatusRes.seqStatusVal",
      id: "sampleStatusRes.seqStatusVal",
      header: "Seq",
      enableMultiSort: true,
      filterFn: "includesString",
      meta: {
        dataType: "string"
      },
      cell: ({cell, row}) => {
        const val = cell.getValue() as string;
        const code = row.original.sampleStatusRes.seqStatusCc;
        return(
          <div
            className="flex flex-col justify-center items-center gap-1"
          >
            <Badge
              shape="ellipse"
              variant="outline"
              className={cn(
                // "text-theme-box border-theme-box",
                ["BS_0902007"].includes(code)&&"text-theme-warning border-theme-warning",
                code==="BS_0902005"&&"text-theme-primary border-theme-primary",
                code==="BS_0902003"&&"text-theme-secondary border-theme-secondary",
                ["BS_0902004","BS_0902006"].includes(code)&&"text-theme-danger border-theme-danger",
              )}
            >
              {val}
            </Badge>
            <span className="text-[.8rem]">
              {row.original.sampleStatusRes.seqCompDttm}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "sampleStatusRes.biStatusVal",
      id: "sampleStatusRes.biStatusVal",
      header: "BI",
      enableMultiSort: true,
      filterFn: "includesString",
      meta: {
        dataType: "string"
      },
      cell: ({cell, row}) => {
        const val = cell.getValue() as string;
        const code = row.original.sampleStatusRes.biStatusCc;
        return(
          <div
            className="flex flex-col justify-center items-center gap-1"
          >
            <Badge
              shape="ellipse"
              variant="outline"
              className={cn(
                // "text-theme-box border-theme-box",
                ["BS_0902007"].includes(code)&&"text-theme-warning border-theme-warning",
                code==="BS_0902005"&&"text-theme-primary border-theme-primary",
                code==="BS_0902003"&&"text-theme-secondary border-theme-secondary",
                ["BS_0902004","BS_0902006"].includes(code)&&"text-theme-danger border-theme-danger",
              )}
            >
              {val}
            </Badge>
            <span className="text-[.8rem]">
              {row.original.sampleStatusRes.biCompDttm}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "sampleStatusRes.ntfcStatusVal",
      id: "sampleStatusRes.ntfcStatusVal",
      header: "통보",
      enableMultiSort: true,
      filterFn: "includesString",
      meta: {
        dataType: "string"
      },
      cell: ({cell, row}) => {
        const val = cell.getValue() as string;
        const code = row.original.sampleStatusRes.ntfcStatusCc;
        return(
          <div
            className="flex flex-col justify-center items-center gap-1"
          >
            <Badge
              shape="ellipse"
              variant="outline"
              className={cn(
                // "text-theme-box border-theme-box",
                ["BS_0902007"].includes(code)&&"text-theme-warning border-theme-warning",
                code==="BS_0902005"&&"text-theme-primary border-theme-primary",
                code==="BS_0902003"&&"text-theme-secondary border-theme-secondary",
                ["BS_0902004","BS_0902006"].includes(code)&&"text-theme-danger border-theme-danger",
              )}
            >
              {val}
            </Badge>
            <span className="text-[.8rem]">
              {row.original.sampleStatusRes.ntfcCompDttm}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "isAnlsItst",
      id: "isAnlsItst",
      header: "분석내역서",
      enableMultiSort: true,
      accessorFn: (row) => row.isAnlsItst==="Y" ? "생성" : "-",
      filterFn: "includesString",
      meta: {
        dataType: "string"
      }
    }
  ],[])

  useEffect(()=>{
    handleRowSelection(filteredItems);
    console.log("useEffect")
  },[rowSelection])
  return (
    <Box sx={{ mt: -5, display: "grid",position:"relative" }}>
      {/* <DataTableBase
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
        paginationRowsPerPageOptions={[100, 200, 300, 400]}  max-w-[calc(100vw-307px)] 
      /> */}
      <div className="relative w-full h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]">
        <div className="absolute left-0 top-0 w-full h-full max-h-full">
        <EzTable
          idKey="sampleId"
          data={filteredItems ?? []}
          columns={cols}
          isLoading={fetched.isLoading}
          enableSelect
          enableTableOption
          customTopBar={subHeaderComponentMemo}
          highlightOdd
          options={{
            useMultiFilter: true,
            useColumnVisibility: true,
            usePinning: true,
          }}
          rowSelectionState={rowSelection}
          setRowSelectionState={setRowSelection}
        />
        </div>
      </div>
    </Box>
  );
};

export default SampleDataTable;

const Caption = styled(Typography)<TypographyProps>(({ className, theme }) => ({
  lineHeight: 1,
  fontSize: 12,
  textAlign: "center",
}));

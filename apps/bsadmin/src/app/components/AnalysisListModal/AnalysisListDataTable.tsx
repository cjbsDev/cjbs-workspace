import * as React from "react";
import { useCallback, useMemo, useState } from "react";

import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext } from "react-hook-form";
import {
  Box,
  Chip,
  Grid,
  Stack,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import {
  cjbsTheme,
  ContainedButton,
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  OutlinedButton,
} from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState } from "recoil";

const AnalysisListDataTable = (props: {
  selectSampleList: any;
  onClose: any;
  getOrderUkey: string;
  // handleSelectedRowChange: any;
  handleAddSampleList: any;
}) => {
  const {
    selectSampleList,
    onClose,
    getOrderUkey,
    handleAddSampleList,
    viewType,
  } = props;
  const APIPATH = `/anls/itst/${getOrderUkey}/sample/list`;
  // console.log("!@#!@#!@#!@#!@#!@#!@#!@#", getOrderUkey)
  // console.log("!@#!@#!@#!@#!@#!@#!@#!@#", APIPATH)
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [selectSampleIdArray, setSelectSampleIdArray] = useState<any>([]);
  // const setSelectedSampleList = useSetRecoilState(analysisAtom);

  const { data } = useSWR(APIPATH, fetcher, {
    suspense: true,
  });
  const totCnt = data.length;
  // console.log("!@#!@#!@#!@#!@#!@#!@#!@#", data);
  const { setValue, clearErrors, resetField } = useFormContext();

  const columns = useMemo(
    () => [
      {
        name: "샘플번호",
        sortable: false,
        center: true,
        selector: (row) => row.sampleId,
      },
      // {
      //   name: "sampleUkey",
      //   sortable: false,
      //   center: true,
      //   selector: (row) => row.sampleUkey,
      // },
      {
        name: "샘플명",
        sortable: false,
        center: true,
        selector: (row) => (row.sampleNm === null ? "-" : row.sampleNm),
      },
      {
        name: "서비스 타입",
        sortable: false,
        center: true,
        selector: (row) => (row.srvcTypeVal === null ? "-" : row.srvcTypeVal),
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
              {/*<Caption data-tag="allowRowEvents">*/}
              {/*  {rcptDttm === null ? "-" : rcptDttm}*/}
              {/*</Caption>*/}
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
              {/*<Caption data-tag="allowRowEvents">*/}
              {/*  {qcCompDttm === null ? "-" : qcCompDttm}*/}
              {/*</Caption>*/}
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
              {/*<Caption data-tag="allowRowEvents">*/}
              {/*  {libCompDttm === null ? "-" : libCompDttm}*/}
              {/*</Caption>*/}
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
              {/*<Caption data-tag="allowRowEvents">*/}
              {/*  {seqCompDttm === null ? "-" : seqCompDttm}*/}
              {/*</Caption>*/}
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
              {/*<Caption data-tag="allowRowEvents">*/}
              {/*  {biCompDttm === null ? "-" : biCompDttm}*/}
              {/*</Caption>*/}
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
              {/*<Caption data-tag="allowRowEvents">*/}
              {/*  {ntfcCompDttm === null ? "-" : ntfcCompDttm}*/}
              {/*</Caption>*/}
            </Stack>
          );
        },
      },
      {
        name: "등록여부",
        width: "100px",
        sortable: false,
        center: true,
        selector: (row) =>
          row.isAnlsItst === "N" ? (
            <Typography variant="body2" color={cjbsTheme.palette.primary.main}>
              등록가능
            </Typography>
          ) : (
            "-"
          ),
      },
    ],
    [],
  );

  const rowSelectCritera = useCallback((row) => {
    //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%123123123123", selectSampleList)
    if (selectSampleList != undefined && selectSampleList.length > 0) {
      setSelectSampleIdArray(selectSampleList);
      // console.log("!!selectSampleList : ", selectSampleList);
      // console.log("!!row data : ", row);
      // console.log("!!row.sampleId : ", row.sampleId);
      // console.log("!! : ", selectSampleList.find(list => list.sampleUkeyList.includes(row.sampleUkey)));
      // 배열안에 값이 row에 sampleId 와 같다면 true
      // if(selectSampleList.includes(row)) return true;
      if (
        selectSampleList.find((list) =>
          Object.keys(list).includes("sampleUkeyList"),
        )
      ) {
        if (
          selectSampleList.find((list) =>
            list.sampleUkeyList.includes(row.sampleUkey),
          )
        )
          return true;
      } else {
        if (
          selectSampleList.find((list) =>
            list.sampleUkey.includes(row.sampleUkey),
          )
        )
          return true;
      }
    }
  }, []);

  const rowSelectDisabled = useCallback((row) => {
    // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%123123123123", row.isAnlsItst)
    // console.log("!!selectSampleList : ", selectSampleList);
    // 수정화면에선 기존에 선택했던 항목에 대해서도 재수정이 될수있기 때문에 disable처리 하지않는다.
    if (viewType === "update") {
      if (
        selectSampleList.find((list) =>
          Object.keys(list).includes("sampleUkeyList"),
        )
      ) {
        if (
          selectSampleList.find((list) =>
            list.sampleUkeyList.includes(row.sampleUkey),
          )
        )
          return false;
      } else {
        if (
          selectSampleList.find((list) =>
            list.sampleUkey.includes(row.sampleUkey),
          )
        )
          return false;
      }
      if (row.isAnlsItst === "Y") {
        // console.log("!!row data : ", row);
        // row에 isAnlsItst 값이 Y면 true
        return true;
      }
    } else {
      if (row.isAnlsItst === "Y") {
        // console.log("!!row data : ", row);
        // row에 isAnlsItst 값이 Y면 true
        return true;
      }
    }
  }, []);

  const handleSelectedRowChange1 = ({ selectedRows }: any) => {
    // const getSampleIdList = selectedRows.map((row) => row.sampleId);
    // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^", getSampleIdList)
    console.log("선택된 분석내열 row ==>>", selectedRows);
    setSelectSampleIdArray(selectedRows);
  };

  const setSampleData = () => {
    handleAddSampleList(selectSampleIdArray);
    onClose();
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <Grid container>
        <Grid item xs={5} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <DataCountResultInfo totalCount={totCnt} />
          </Stack>
        </Grid>
        <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1.5 }}
            alignItems="center"
          >
            <DataTableFilter
              onFilter={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setFilterText(e.target.value)}
              onClear={handleClear}
              filterText={filterText}
            />
          </Stack>
        </Grid>
      </Grid>
    );
    // }, [filterText, resetPaginationToggle, data.pageInfo.totalElements]);
  }, [filterText, resetPaginationToggle]);

  return (
    <>
      <DataTableBase
        data={data}
        columns={columns}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        // paginationResetDefaultPage={resetPaginationToggle}
        selectableRows
        selectableRowsVisibleOnly={false}
        selectableRowSelected={rowSelectCritera}
        selectableRowDisabled={rowSelectDisabled}
        onSelectedRowsChange={handleSelectedRowChange1}
        pagination={false}
      />
      <Stack direction="row" spacing={0.5} justifyContent="center" mt={5}>
        <OutlinedButton size="small" buttonName="닫기" onClick={onClose} />

        <ContainedButton
          size="small"
          // type="submit"
          buttonName="등록"
          onClick={setSampleData}
        />
      </Stack>
    </>
  );
};

export default AnalysisListDataTable;

const Caption = styled(Typography)<TypographyProps>(({ className, theme }) => ({
  lineHeight: 1,
  fontSize: 12,
  textAlign: "center",
}));

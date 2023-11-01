import React, { useCallback, useEffect, useMemo, useState } from "react";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import {
  AlertModal,
  cjbsTheme,
  ContainedButton,
  DataCountResultInfo,
  DataTableBase,
  ErrorContainer,
  Fallback,
  FileDownloadBtn,
  OutlinedButton,
  Title1,
} from "cjbsDSTM";
import { useRouter } from "next-nprogress-bar";
import { useParams, useSearchParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import { DELETE, fetcher } from "api";
import {
  Backdrop,
  Box,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import { toast } from "react-toastify";
import MyIcon from "icon/MyIcon";
import KeywordSearch from "../../../../../components/KeywordSearch";
import dynamic from "next/dynamic";
import SampleAddSection from "./SampleAddSection";
import useCenteredPopup from "../../../../../hooks/useCenteredPopup";
import { useRecoilState } from "recoil";
import { toggledClearRowsAtom } from "../../../../../recoil/atoms/toggledClearRowsAtom";
import NoDataView from "../../../../../components/NoDataView";

const LazySampleAllListModal = dynamic(() => import("./SampleAllList"), {
  ssr: false,
  loading: () => (
    <Backdrop
      open={true}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ),
});

const LazyExperimentProgressChangeModal = dynamic(
  () =>
    import("./(ExperimentProgressChangeModal)/ExperimentProgressChangeModal"),
  {
    ssr: false,
  }
);

const SampleTabDataTable = (props) => {
  const {
    // isClear,
    // handleAlertOpen,
    // handleAlertClose,
    // handleExPrgsChngModalOpen,
    // handleSampleAddModalOpen,
  } = props;
  // const [isClear, setIsClear] = useState<boolean>(false);
  const [toggledClearRows, setToggleClearRows] =
    useRecoilState(toggledClearRowsAtom);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const ukey = params.slug;
  // const getSampleUkeyList = useRecoilValue(sampleUkeyAtom);
  const { mutate } = useSWRConfig();
  const { isOpen, openPopup, closePopup } = useCenteredPopup(
    `/sampleListPopup?uKey=${ukey}`,
    "샘플 검색",
    1602,
    557
  );

  const resultObject = {};

  for (const [key, value] of searchParams.entries()) {
    resultObject[key] = value;
  }
  console.log(">>>>>>>>>", resultObject);

  const result = "?" + new URLSearchParams(resultObject).toString();
  console.log("RESULT@#@#@#", JSON.stringify(result));

  const { data } = useSWR(
    JSON.stringify(resultObject) === "{}"
      ? `/run/sample/${ukey}?page=${page}&size=${size}`
      : `/run/sample/${ukey}${result}&page=${page}&size=${size}`,
    fetcher,
    {
      suspense: true,
    }
  );
  console.log("RUN LIST DATA", data);

  const runSampleListData = data.runSamplesList;
  const totalElements = data.pageInfo.totalElements;
  // const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [sampleUkeyList, setSampleUkeyList] = useState<string[]>([]);
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const [showExPrgsChngModal, setShowExPrgsChngModal] = useState(false);
  const [showSampleAddModal, setShowSampleAddModal] = useState(false);

  const columns = useMemo(
    () => [
      {
        name: "샘플번호",
        sortable: false,
        center: true,
        selector: (row) => row.sampleId,
      },
      {
        name: "샘플명",
        sortable: false,
        center: true,
        selector: (row) => (row.sampleNm === null ? "-" : row.sampleNm),
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
        center: true,
        selector: (row) => (row.source === null ? "-" : row.source),
      },
      {
        name: "Depth",
        width: "100px",
        sortable: false,
        center: true,
        selector: (row) => (row.depthMc === null ? "-" : row.depthVal),
      },
      {
        name: "Taxon",
        width: "80px",
        sortable: false,
        center: true,
        selector: (row) => (row.taxonVal === null ? "-" : row.taxonVal),
      },
      {
        name: "RUN",
        // width: "120px",
        sortable: false,
        center: true,
        wrap: true,
        selector: (row) =>
          row.runList.length === 0 ? "-" : row.runList.join(", "),
        cell: (row) => {
          return (
            // <Tooltip
            //   title={row.runList.length === 0 ? "-" : row.runList.join(", ")}
            //   followCursor
            // >
            <Typography variant="body2">
              {row.runList.length === 0 ? "-" : row.runList.join(", ")}
            </Typography>
            // </Tooltip>
          );
        },
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
        name: "분석내역서",
        width: "100px",
        sortable: false,
        center: true,
        selector: (row) => (row.isAnlsItst === "Y" ? "생성" : "-"),
      },
    ],
    []
  );

  const handleDelete = async () => {
    console.log("RRRRRRRRRRR", sampleUkeyList);
    if (sampleUkeyList.length === 0) toast("샘플을 선책해 주세요.");

    const body = {
      sampleUkeyList: sampleUkeyList,
    };
    try {
      const res = await DELETE(`/run/delete/${ukey}`, body);
      console.log("Delete 성공 여부", res.success);

      if (res.success) {
        mutate(`/run/sample/${ukey}?page=1&size=20`);
        handleAlertClose();
        toast("삭제 되었습니다.");
      } else {
        toast(res.message);
      }
    } catch (error: any) {
      console.error(
        "샘플 삭제 오류>>>>",
        error.response?.data?.data || error.message
      );
    } finally {
      setToggleClearRows(!toggledClearRows);
    }
  };

  const handleSampleAddModalOpen = () => {
    setShowSampleAddModal(true);
  };

  const handleAlertOpen = useCallback(() => {
    // setIsClear(false);
    setAlertModalOpen(true);
    setToggleClearRows(!toggledClearRows);
  }, [setToggleClearRows, toggledClearRows]);

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleExPrgrsPhsOpen = () => {
      // if (sampleUkeyList.length !== 0) setShowExPrgsChngModal(true);
      if (sampleUkeyList.length !== 0) handleExPrgsChngModalOpen();
      if (sampleUkeyList.length === 0) toast("샘플을 선책해 주세요.");
      // setIsClear(false);
      setToggleClearRows(!toggledClearRows);
    };

    return (
      <Grid container>
        <Grid item xs={5} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <DataCountResultInfo totalCount={totalElements} />
            <ContainedButton
              buttonName="샘플 추가"
              size="small"
              // onClick={handleSampleAddModalOpen}
              onClick={openPopup}
            />
            <OutlinedButton
              buttonName="삭제"
              size="small"
              color="error"
              startIcon={<MyIcon icon="trash" size={18} />}
              onClick={handleAlertOpen}
              disabled={sampleUkeyList.length === 0 ? true : false}
            />
            <OutlinedButton
              buttonName="실험 진행 단계 변경"
              size="small"
              color="secondary"
              sx={{ color: "black" }}
              onClick={handleExPrgrsPhsOpen}
              disabled={sampleUkeyList.length === 0 ? true : false}
            />
          </Stack>
        </Grid>
        <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1.5 }}
            alignItems="center"
          >
            {/* /run/list/download${result} */}
            <FileDownloadBtn
              exportUrl={`/run/${ukey}/list/download`}
              iconName="xls3"
            />

            <KeywordSearch />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [
    handleAlertOpen,
    openPopup,
    setToggleClearRows,
    toggledClearRows,
    ukey,
    totalElements,
    sampleUkeyList,
  ]);

  // const goDetailModal = useCallback((row: any) => {
  //   const sampleUkey = row.sampleUkey;
  //   setShowSampleInfoModal({
  //     ...showSampleInfoModal,
  //     sampleUkey: sampleUkey,
  //     isShow: true,
  //   });
  // }, []);

  const handleSelectedRowChange = useCallback(({ selectedRows }: any) => {
    const getSampleUkeyList = selectedRows.map((row) => row.sampleUkey);
    const getSampleIDList = selectedRows.map((row) => row.sampleId);
    console.log("selectedSampleUkeyList ==>>", getSampleUkeyList);
    // console.log("selectedSampleIdList ==>>", getSampleIDList);
    setSampleUkeyList(getSampleUkeyList);
    // setSampleIdList(getSampleIDList);
  }, []);

  const handlePageChange = (page: number) => {
    console.log("Page", page);
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    console.log("Row change.....", newPerPage, page);
    setPage(page);
    setSize(newPerPage);
  };

  const handleAlertClose = () => {
    setAlertModalOpen(false);
    setSampleUkeyList([]);
    // setIsClear(true);
    setToggleClearRows(!toggledClearRows);
  };

  const handleExPrgsChngModalOpen = () => {
    setShowExPrgsChngModal(true);
  };

  const handleExPrgsChngModalClose = () => {
    setShowExPrgsChngModal(false);
    setSampleUkeyList([]);
    // setIsClear(true);
    setToggleClearRows(!toggledClearRows);
  };

  const sampleAllListModalClose = () => {
    setShowSampleAddModal(false);
  };

  if (runSampleListData.length === 0) {
    return (
      <>
        <SampleAddSection />
      </>
    );
  }

  return (
    <>
      <DataTableBase
        title={"목록"}
        data={runSampleListData}
        columns={columns}
        // onRowClicked={goDetailModal}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles3}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        selectableRows
        onSelectedRowsChange={handleSelectedRowChange}
        clearSelectedRows={toggledClearRows}
        selectableRowsVisibleOnly={true}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        noDataComponent={<NoDataView />}
        // paginationResetDefaultPage={resetPaginationToggle}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
      {/*{runSampleListData.length === 0 ? (*/}
      {/*  <SampleAddSection />*/}
      {/*) : (*/}
      {/*  <DataTableBase*/}
      {/*    title={"목록"}*/}
      {/*    data={runSampleListData}*/}
      {/*    columns={columns}*/}
      {/*    // onRowClicked={goDetailModal}*/}
      {/*    pointerOnHover*/}
      {/*    highlightOnHover*/}
      {/*    customStyles={dataTableCustomStyles3}*/}
      {/*    subHeader*/}
      {/*    subHeaderComponent={subHeaderComponentMemo}*/}
      {/*    selectableRows*/}
      {/*    onSelectedRowsChange={handleSelectedRowChange}*/}
      {/*    clearSelectedRows={toggledClearRows}*/}
      {/*    selectableRowsVisibleOnly={true}*/}
      {/*    pagination*/}
      {/*    paginationServer*/}
      {/*    paginationTotalRows={totalElements}*/}
      {/*    noDataComponent={<NoDataView />}*/}
      {/*    // paginationResetDefaultPage={resetPaginationToggle}*/}
      {/*    onChangeRowsPerPage={handlePerRowsChange}*/}
      {/*    onChangePage={handlePageChange}*/}
      {/*  />*/}
      {/*)}*/}

      {/* 샘플 추가 */}
      {showSampleAddModal && (
        <ErrorContainer FallbackComponent={Fallback}>
          <LazySampleAllListModal
            onClose={sampleAllListModalClose}
            open={showSampleAddModal}
            modalWidth={1200}
          />
        </ErrorContainer>
      )}

      {/*/!* 실험 진행 단계 변경 *!/*/}
      {showExPrgsChngModal && (
        <LazyExperimentProgressChangeModal
          onClose={handleExPrgsChngModalClose}
          open={showExPrgsChngModal}
          modalWidth={600}
          sampleUkeyList={sampleUkeyList}
        />
      )}

      <AlertModal
        onClose={handleAlertClose}
        alertMainFunc={handleDelete}
        open={alertModalOpen}
        mainMessage="삭제를 진행하시겠습니까?"
        alertBtnName="삭제"
      />
    </>
  );
};

export default SampleTabDataTable;

const Caption = styled(Typography)<TypographyProps>(({ className, theme }) => ({
  lineHeight: 1,
  fontSize: 12,
  textAlign: "center",
}));

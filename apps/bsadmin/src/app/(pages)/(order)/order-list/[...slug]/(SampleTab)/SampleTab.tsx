import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import fetcher from "../../../../../func/fetcher";
import {
  cjbsTheme,
  ContainedButton,
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  ErrorContainer,
  Fallback,
  FileDownloadBtn,
  OutlinedButton,
} from "cjbsDSTM";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import {
  Box,
  Chip,
  Grid,
  Stack,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import Link from "next/link";
import MyIcon from "icon/myIcon";
import { useRouter } from "next-nprogress-bar";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import SubHeader from "./SubHeader";

const LazySampleInfoModal = dynamic(
  () => import("./(SampleInfoModal)/SampleInfoModal"),
  {
    ssr: false,
  }
);
const LazySampleAddModal = dynamic(
  () => import("./(SampleAddModal)/SampleAddModal"),
  {
    ssr: false,
  }
);
const LazyExperimentProgressChangeModal = dynamic(
  () =>
    import("./(ExperimentProgressChangeModal)/ExperimentProgressChangeModal"),
  {
    ssr: false,
  }
);
const LazySampleBatchChangeModal = dynamic(
  () => import("./(SampleBatchChangeModal)/SampleBatchChangeModal"),
  {
    ssr: false,
  }
);

const SampleTab = () => {
  const [filterText, setFilterText] = useState("");
  const [checked, setChecked] = useState(false);
  const [isClear, setIsClear] = useState<boolean>(false);
  const [sampleUkeyList, setSampleUkeyList] = useState<string[]>([]);
  const [sampleIdList, setSampleIdList] = useState<number[]>([]);
  const router = useRouter();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  // [샘플 정보] 모달
  const [showSampleInfoModal, setShowSampleInfoModal] = useState({
    isShow: false,
    sampleUkey: "",
  });
  // [샘플 추가] 모달
  const [showSampleAddModal, setShowSampleAddModal] = useState(false);
  // [샘플 정보 일괄 변경] 모달
  const [showSampleBatchChangeModal, setShowSampleBatchChangeModal] =
    useState(false);
  // [실험 진행 단계 변경] 모달
  const [showExPrgsChngModal, setShowExPrgsChngModal] = useState(false);

  const params = useParams();
  console.log("SAMPLE TAB PARAMS", params);
  const orderUkey = params.slug;
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/order/${orderUkey}/sample/list`,
    fetcher,
    {
      suspense: true,
    }
  );
  const sampleList = data.data;
  console.log("SAMPLE TAB LIST", sampleList);

  useEffect(() => {
    // isClear 상태 변경 이슈
    setIsClear(false);
  }, [isClear]);

  const columns = useMemo(
    () => [
      {
        name: "샘플번호",
        // width: "120px",
        sortable: false,
        center: true,
        selector: (row) => row.sampleId,
      },
      {
        name: "샘플명",
        // width: "120px",
        sortable: false,
        center: true,
        selector: (row) => (row.sampleNm === null ? "-" : row.sampleNm),
      },
      {
        name: "샘플종류",
        // width: "120px",
        sortable: false,
        center: true,
        selector: (row) =>
          row.sampleTypeVal === null ? "-" : row.sampleTypeVal,
      },
      {
        name: "Source",
        // width: "120px",
        sortable: false,
        center: true,
        selector: (row) => (row.source === null ? "-" : row.source),
      },
      {
        name: "Depth(GB)",
        // width: "120px",
        sortable: false,
        center: true,
        selector: (row) => (row.depthMc === null ? "-" : row.depthVal),
      },
      {
        name: "Taxon",
        // width: "120px",
        sortable: false,
        center: true,
        selector: (row) => (row.taxonVal === null ? "-" : row.taxonVal),
      },
      {
        name: "RUN",
        // width: "120px",
        sortable: false,
        center: true,
        selector: (row) =>
          row.runList.length === 0 ? "-" : row.runList.join(", "),
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
        selector: (row) => (row.isAnlsInst === "Y" ? "생성" : "-"),
      },
    ],
    []
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    const handleSampleAddModalOpen = () => {
      setShowSampleAddModal(true);
    };
    const handleExPrgrsPhsOpen = () => {
      if (sampleUkeyList.length !== 0) setShowExPrgsChngModal(true);
      if (sampleUkeyList.length === 0) toast("샘플을 선책해 주세요.");
      setIsClear(false);
    };

    const handleSampleBatchModalOpen = () => {
      if (sampleUkeyList.length !== 0) setShowSampleBatchChangeModal(true);
      if (sampleUkeyList.length === 0) toast("샘플을 선책해 주세요.");
      setIsClear(false);
    };

    return (
      <SubHeader
        exportUrl={`${process.env.NEXT_PUBLIC_API_URL}/order/list/download`}
        totalCount={sampleList.length}
        handleSampleAddModalOpen={handleSampleAddModalOpen}
        handleSampleBatchModalOpen={handleSampleBatchModalOpen}
        handleExPrgrsPhsOpen={handleExPrgrsPhsOpen}
      />
    );
  }, [filterText, resetPaginationToggle, checked, sampleUkeyList]);

  const goDetailModal = useCallback((row: any) => {
    const sampleUkey = row.sampleUkey;
    setShowSampleInfoModal({
      ...showSampleInfoModal,
      sampleUkey: sampleUkey,
      isShow: true,
    });
  }, []);

  const handleSelectedRowChange = useCallback(({ selectedRows }: any) => {
    const getSampleUkeyList = selectedRows.map((row) => row.sampleUkey);
    const getSampleIDList = selectedRows.map((row) => row.sampleId);
    // console.log("selectedSampleUkeyList ==>>", getSampleUkeyList);
    // console.log("selectedSampleIdList ==>>", getSampleIDList);
    setSampleUkeyList(getSampleUkeyList);
    setSampleIdList(getSampleIDList);
  }, []);

  const handleSampleInfoModalClose = () => {
    setShowSampleInfoModal({
      ...showSampleInfoModal,
      isShow: false,
    });
  };

  const handleSampleAddModalClose = () => {
    setShowSampleAddModal(false);
  };

  const handleExPrgsChngModalClose = () => {
    setShowExPrgsChngModal(false);
    setSampleUkeyList([]);
    setIsClear(true);
  };

  const handleSampleBatchChangeModalClose = () => {
    setShowSampleBatchChangeModal(false);
    setSampleUkeyList([]);
    setSampleIdList([]);
    setIsClear(true);
  };

  return (
    <>
      <DataTableBase
        data={sampleList}
        columns={columns}
        onRowClicked={goDetailModal}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles3}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        paginationResetDefaultPage={resetPaginationToggle}
        selectableRows
        onSelectedRowsChange={handleSelectedRowChange}
        clearSelectedRows={isClear}
        selectableRowsVisibleOnly={true}
        pagination={false}
      />

      {/* 샘플Info 모달 */}
      {showSampleInfoModal.isShow && (
        <LazySampleInfoModal
          onClose={handleSampleInfoModalClose}
          open={showSampleInfoModal.isShow}
          sampleUkey={showSampleInfoModal.sampleUkey}
          modalWidth={800}
        />
      )}

      {/* 샘플Add 모달 */}
      {showSampleAddModal && (
        <LazySampleAddModal
          onClose={handleSampleAddModalClose}
          open={showSampleAddModal}
          modalWidth={800}
        />
      )}

      {/* 샘플 정보 일괄 변경 */}
      {showSampleBatchChangeModal && (
        <LazySampleBatchChangeModal
          onClose={handleSampleBatchChangeModalClose}
          open={showSampleBatchChangeModal}
          modalWidth={800}
          sampleIdList={sampleIdList}
          sampleUkeyList={sampleUkeyList}
        />
      )}

      {/* 실험 진행 단계 변경 */}
      {showExPrgsChngModal && (
        <LazyExperimentProgressChangeModal
          onClose={handleExPrgsChngModalClose}
          open={showExPrgsChngModal}
          modalWidth={600}
          sampleUkeyList={sampleUkeyList}
        />
      )}
    </>
  );
};

export default SampleTab;

const Caption = styled(Typography)<TypographyProps>(({ className, theme }) => ({
  lineHeight: 1,
  fontSize: 12,
  textAlign: "center",
}));

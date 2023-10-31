import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import { DELETE, fetcher } from "api";
import {
  cjbsTheme,
  ContainedButton,
  DataCountResultInfo,
  DataTableBase,
  ErrorContainer,
  Fallback,
  FileDownloadBtn,
  OutlinedButton,
  AlertModal,
} from "cjbsDSTM";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
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
import { useRouter } from "next-nprogress-bar";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import KeywordSearch from "../../../../../components/KeywordSearch";
import MyIcon from "icon/MyIcon";
import SampleAddSection from "./SampleAddSection";

// const LazySampleAllListModal = dynamic(() => import("./SampleAllList"), {
//   ssr: false,
//   loading: () => (
//     <Backdrop
//       open={true}
//       sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//     >
//       <CircularProgress color="inherit" />
//     </Backdrop>
//   ),
// });
//
// const LazyExperimentProgressChangeModal = dynamic(
//   () =>
//     import("./(ExperimentProgressChangeModal)/ExperimentProgressChangeModal"),
//   {
//     ssr: false,
//   }
// );

const LazySampleTabDataTable = dynamic(() => import("./SampleTabDataTable"), {
  ssr: false,
});

const SampleTab = () => {
  // const [page, setPage] = useState<number>(1);
  // const [size, setSize] = useState<number>(20);
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const params = useParams();
  // const ukey = params.slug;
  // const getSampleUkeyList = useRecoilValue(sampleUkeyAtom);
  // const { mutate } = useSWRConfig();

  // const resultObject = {};
  //
  // for (const [key, value] of searchParams.entries()) {
  //   resultObject[key] = value;
  // }
  // console.log(">>>>>>>>>", resultObject);
  //
  // const result = "?" + new URLSearchParams(resultObject).toString();
  // console.log("RESULT@#@#@#", JSON.stringify(result));
  //
  // const { data } = useSWR(
  //   JSON.stringify(resultObject) === "{}"
  //     ? `/run/sample/${ukey}?page=${page}&size=${size}`
  //     : `/run/sample/${ukey}${result}&page=${page}&size=${size}`,
  //   fetcher,
  //   {
  //     suspense: true,
  //   }
  // );
  // console.log("RUN LIST DATA", data);

  // const runSampleListData = data.runSamplesList;
  // const totalElements = data.pageInfo.totalElements;
  // const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  // if (runSampleListData.length === 0) {
  //   return (
  //     <>
  //       <SampleAddSection />
  //     </>
  //   );
  // }

  return (
    <>
      {/*<DataTableBase*/}
      {/*  data={runSampleListData}*/}
      {/*  columns={columns}*/}
      {/*  onRowClicked={goDetailModal}*/}
      {/*  pointerOnHover*/}
      {/*  highlightOnHover*/}
      {/*  customStyles={dataTableCustomStyles3}*/}
      {/*  subHeader*/}
      {/*  subHeaderComponent={subHeaderComponentMemo}*/}
      {/*  selectableRows*/}
      {/*  onSelectedRowsChange={handleSelectedRowChange}*/}
      {/*  clearSelectedRows={isClear}*/}
      {/*  selectableRowsVisibleOnly={true}*/}
      {/*  pagination*/}
      {/*  paginationServer*/}
      {/*  paginationTotalRows={totalElements}*/}
      {/*  // paginationResetDefaultPage={resetPaginationToggle}*/}
      {/*  onChangeRowsPerPage={handlePerRowsChange}*/}
      {/*  onChangePage={handlePageChange}*/}
      {/*/>*/}

      <LazySampleTabDataTable
      // isClear={isClear}
      // handleAlertOpen={handleAlertOpen}
      // handleAlertClose={handleAlertClose}
      // handleExPrgsChngModalOpen={handleExPrgsChngModalOpen}
      // handleSampleAddModalOpen={handleSampleAddModalOpen}
      />

      {/*/!* 샘플 추가 *!/*/}
      {/*{showSampleAddModal && (*/}
      {/*  <ErrorContainer FallbackComponent={Fallback}>*/}
      {/*    <LazySampleAllListModal*/}
      {/*      onClose={sampleAllListModalClose}*/}
      {/*      open={showSampleAddModal}*/}
      {/*      modalWidth={1200}*/}
      {/*    />*/}
      {/*  </ErrorContainer>*/}
      {/*)}*/}

      {/*/!* 실험 진행 단계 변경 *!/*/}
      {/*{showExPrgsChngModal && (*/}
      {/*  <LazyExperimentProgressChangeModal*/}
      {/*    onClose={handleExPrgsChngModalClose}*/}
      {/*    open={showExPrgsChngModal}*/}
      {/*    modalWidth={600}*/}
      {/*    sampleUkeyList={sampleUkeyList}*/}
      {/*  />*/}
      {/*)}*/}

      {/*<AlertModal*/}
      {/*  onClose={handleAlertClose}*/}
      {/*  alertMainFunc={handleDelete}*/}
      {/*  open={alertModalOpen}*/}
      {/*  mainMessage="삭제를 진행하시겠습니까?"*/}
      {/*  alertBtnName="삭제"*/}
      {/*/>*/}
    </>
  );
};

export default SampleTab;

const Caption = styled(Typography)<TypographyProps>(({ className, theme }) => ({
  lineHeight: 1,
  fontSize: 12,
  textAlign: "center",
}));

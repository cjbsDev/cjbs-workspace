"use client";

import React, {useCallback, useMemo} from "react";
import {
    DataCountResultInfo,
    DataTableBase,
    DataTableFilter,
    Title1,
    LeaderCip,
    ContainedButton,
    SelectBox,
    Form,
    OutlinedButton,
    cjbsTheme,
    FileDownloadBtn,
    FullHeightLoading, AlertModal,
} from "cjbsDSTM";
import {
  Stack,
  Grid,
  Box,
  Container,
  Divider,
  Typography,
  TooltipProps,
  Tooltip,
  tooltipClasses,
  IconButton,
  Link,
} from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState, useRef, useEffect } from "react";
import MyIcon from "icon/MyIcon";
import Dayjs from "dayjs";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { useFiltersList } from "../../../hooks/useFiltersList";
import { useForm, FormProvider } from "react-hook-form";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import { toast } from "react-toastify";
import ServiceSelectModal from "./ServiceSelectModal";
import KeywordSearch from "../../../components/KeywordSearch";
import { usePathname, useSearchParams } from "next/navigation";
import {DELETE, fetcher} from "api";
import { styled } from "@mui/material/styles";
import NoDataView from "../../../components/NoDataView";
import OrderRegChckNgsAnalysis from "./components/OrderRegChckNgsAnalysis";
import dynamic from "next/dynamic";
import useCalculatedHeight from "../../../hooks/useCalculatedHeight";
import {useSession} from "next-auth/react";
import CancelBtn from "./components/CancelBtn";

const LazyOrderRegChckNgsAnalysis = dynamic(
  () => import("./components/OrderRegChckNgsAnalysis"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 1)",
    boxShadow: theme.shadows[10],
    fontSize: 11,
    border: "1px solid #000000",
    padding: "10px",
  },
}));

export default function ListOrshbs() {
  //const tableRef = React.useRef<any>(null);
  const table = useRef(null);
  const { data: session, status } = useSession();
  const userId = session?.uid;

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  const [filters, setFilters] = useState("");

  // ListAPI Call
  // const { data } = useFiltersList("orsh/bs/intn", filters);
  const currentPath = usePathname();
  const router = useRouter();
  const [selectedRowCnt, setSelectedRowCnt] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [serviceSelectModalOpen, setServiceSelectModalOpen] =
    useState<boolean>(false);
  const height = useCalculatedHeight(268);
  const searchParams = useSearchParams();
  const resultObject = {};

  for (const [key, value] of searchParams.entries()) {
    resultObject[key] = value;
  }

  const result = "?" + new URLSearchParams(resultObject).toString();
  // console.log("RESULT@#@#@#", JSON.stringify(result));

  const { data, mutate } = useSWR(
    JSON.stringify(resultObject) !== "{}"
      ? `/orsh/bs/intn/list${result}&page=${page}&size=${size}`
      : `/orsh/bs/intn/list?page=${page}&size=${size}`,
    fetcher,
    {
      suspense: true,
    },
  );
  // console.log("고객주문서 LIST DATA", data);

  // console.log("data >>>>>>> : ", data);
  const totalElements = data.pageInfo.totalElements;
  // console.log("totalElements >>>>>>> : ", totalElements);
  // const handleRowSelected = (rows: any) => {
  //   setSelectedOption(rows.selectedRows);
  //   setSelectedRowCnt(rows.selectedCount);
  // };

  const columns = useMemo(
    () => [
      {
        name: "주문번호",
        selector: (row: { orshNo: string }) => row.orshNo,
        width: "160px",
      },
      // {
      //   name: "orshUkey",
      //   selector: (row: { orshUkey: string }) => row.orshUkey,
      //   // width: "0px",
      // },
      {
        name: "분석 종류",
        selector: (row: { anlsTypeVal: string }) => row.anlsTypeVal,
        width: "100px",
        center: true,
      },
      {
        name: "서비스 타입",
        selector: (row: { srvcTypeVal: string }) => row.srvcTypeVal,
        width: "120px",
      },
      {
        name: "샘플수량",
        selector: (row: { sampleCount: string }) => row.sampleCount,
        width: "90px",
        center: true,
      },
      {
        name: "과제명",
        selector: (row: { prjtCodeNm: string }) => row.prjtCodeNm ?? "-",
        minWidth: "300px",
        wrap: true,
      },
      {
        name: "신청인",
        selector: (row: { ordrAplcNm: string }) => row.ordrAplcNm ?? "-",
        minWidth: "120px",
        wrap: true,
        center: true,
      },
      {
        name: "거래처(기관)",
        cell: (row: { agncNm: string; instNm: string }) => (
          <Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Box>{row.agncNm}</Box>
              <Box>({row.instNm})</Box>
            </Stack>
            {/*<Stack direction="row" spacing={0.5} alignItems="center">*/}
            {/*  <Box>({row.instNm})</Box>*/}
            {/*</Stack>*/}
          </Stack>
        ),
        width: "400px",
      },
      {
        name: "주문자(ID)",
        cell: (row: {
          rhpiNm: string;
          rhpiEbcEmail: string;
          isMastered: string;
        }) => (
          <Stack
            direction="row"
            // justifyContent="space-between"
            alignItems="center"
            spacing={2}
            width={"100%"}
          >
            <Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Box>{row.rhpiNm}</Box>
                <Box>({row.rhpiEbcEmail})</Box>
              </Stack>
              {/*<Stack direction="row" spacing={0.5} alignItems="center">*/}
              {/*  <Box>({row.rhpiEbcEmail})</Box>*/}
              {/*</Stack>*/}
            </Stack>
            {row.isMastered == "N" ? (
              <>
                <LightTooltip
                  placement="top"
                  title={
                    <React.Fragment>
                      <Typography variant="body2">
                        미등록 거래처(기관) 사용자입니다.
                      </Typography>
                      <Typography variant="body2">
                        거래처 및 연구원 등록 후 오더를 등록해주세요.
                      </Typography>
                    </React.Fragment>
                  }
                >
                  <IconButton>
                    <MyIcon
                      icon="exclamation-circle-fill"
                      size={26}
                      color={cjbsTheme.palette.warning.main}
                    />
                  </IconButton>
                </LightTooltip>
              </>
            ) : (
              ""
            )}
          </Stack>
        ),
        minWidth: "460px",
      },
      {
        name: "주문상태",
        cell: (row: { isOrderStatus: string; isMastered: string; isCancel: string; createdBy: number; orshUkey: string}) => {
            // isCancel이 'Y'인 경우 '주문취소' 표시
            if (row.isCancel === "Y") {
                return (
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="subtitle2">
                            주문취소
                        </Typography>
                    </Stack>
                );
            }
            // isOrderStatus가 'N'이고 isCancel이 'N'인 경우 '주문대기'와 버튼들 표시
            if (row.isOrderStatus === "N" && row.isCancel === "N") {
                return (
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="subtitle2" color={cjbsTheme.palette.info.main}>
                            주문대기
                        </Typography>
                        <Divider orientation="vertical" variant="middle" flexItem />

                        {/* 수정 버튼 */}
                        <OutlinedButton
                            buttonName="수정"
                            size="small"
                            onClick={() => goDetailPage(row)}
                        />

                        {/* userId와 createdBy가 일치할 때 취소 버튼 표시 */}
                        {userId === row.createdBy &&
                            <CancelBtn mutate={mutate} orshUkey={row.orshUkey}/>}

                        {/* isMastered가 'Y'일 때 LazyOrderRegChckNgsAnalysis 실행 */}
                        {row.isMastered === "Y" && (
                            <LazyOrderRegChckNgsAnalysis row={row} />
                        )}
                    </Stack>
                );
            }

            // isOrderStatus가 'Y'인 경우 '주문완료' 표시
            if (row.isOrderStatus === "Y") {
                return (
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="subtitle2">주문완료</Typography>
                    </Stack>
                );
            }
        },
        width: "260px",
      },

      {
        name: "주문일시",
        selector: (row: { orshDttm: any }) =>
          row.orshDttm && Dayjs(row.orshDttm).format("YYYY-MM-DD"),
        // width: "150px",
      },
    ],
    [],
  );

  const goDetailPage = (row: {
    orshUkey: string;
    srvcTypeAbb: string;
    isOrderStatus: string;
    anlsTypeAbb: string;
    isCancel: string;
  }) => {
    const orshUkey = row.orshUkey;
    const srvcTypeAbb = row.srvcTypeAbb;
    // const isOrderStatus = row.isOrderStatus;
    const isOrderStatus = row.isCancel === "Y" ? "Y" : row.isOrderStatus;
    const anlsTypeAbb = row.anlsTypeAbb;
    router.push(
      "/orshbs-list/" +
        orshUkey +
        "/" +
        srvcTypeAbb +
        "/" +
        isOrderStatus +
        "/" +
        anlsTypeAbb,
    );
  };

  // const goLinkOrderPage = (row: {
  //   orshUkey: string;
  //   srvcTypeAbb: string;
  //   isOrderStatus: string;
  //   anlsTypeAbb: string;
  // }) => {
  //   const orshUkey = row.orshUkey;
  //   const srvcTypeAbb = row.srvcTypeAbb;
  //   const isOrderStatus = row.isOrderStatus;
  //   const anlsTypeAbb = row.anlsTypeAbb;
  //   router.push(
  //     `/order-reg?orshUkey=${orshUkey}&orshType=intn&from=/orshbs-list&srvcTypeAbb=${srvcTypeAbb}&isOrderStatus=${isOrderStatus}&anlsTypeAbb=${anlsTypeAbb}`,
  //   );
  // };

  const subHeaderComponentMemo = React.useMemo(() => {
    // const handleClear = () => {
    //   if (filterText) {
    //     setResetPaginationToggle(!resetPaginationToggle);
    //     setFilterText("");
    //   }
    // };

    return (
      <Grid container>
        <Grid item xs={5} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <DataCountResultInfo totalCount={totalElements} />

            <ContainedButton
              buttonName="주문서 등록"
              size="small"
              onClick={() => handleServiceSelectOpen()}
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
            <FileDownloadBtn
              exportUrl={`/orsh/bs/intn/list/download${result}`}
              iconName="xls3"
            />
            <KeywordSearch />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [filterText, resetPaginationToggle, selectedRowCnt]);

  const handlePageChange = (page: number) => {
    // console.log("Page", page);
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    // console.log("Row change.....", newPerPage, page);
    setPage(page);
    setSize(newPerPage);
  };

  const handleServiceSelectOpen = () => {
    setServiceSelectModalOpen(true);
  };
  const handleServiceSelectModalClose = () => {
    setServiceSelectModalOpen(false);
  };

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        title={
          <Stack direction="row" spacing={1.5}>
            <Title1 titleName="내부 주문서 관리" />
          </Stack>
        }
        data={data.orshList}
        columns={columns}
        onRowClicked={goDetailPage}
        // onSelectedRowsChange={handleRowSelected}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        fixedHeader={true}
        fixedHeaderScrollHeight={`${height}px`}
        paginationResetDefaultPage={resetPaginationToggle}
        selectableRows={false}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        noDataComponent={<NoDataView resetPath={currentPath} />}
        paginationPerPage={100}
        paginationRowsPerPageOptions={[50, 100, 200, 300, 400]}
      />

      <ServiceSelectModal
        open={serviceSelectModalOpen}
        onClose={handleServiceSelectModalClose}
        modalWidth={500}
      />
    </Box>
  );
}

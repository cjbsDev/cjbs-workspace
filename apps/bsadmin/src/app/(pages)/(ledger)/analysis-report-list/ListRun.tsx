"use client";

import React, { useMemo } from "react";
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
  IconButton, Collapse,
} from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import MyIcon from "icon/MyIcon";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "api";
import { usePathname, useSearchParams } from "next/navigation";
import KeywordSearch from "../../../components/KeywordSearch";
import NoDataView from "../../../components/NoDataView";
import dynamic from "next/dynamic";

const LazyRunAddModal = dynamic(() => import("./RunAddModal"), {
  ssr: false,
});

const ListRun = () => {
  const [showRunAddModal, setShowRunAddModal] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const searchParams = useSearchParams();

  const resultObject = {};

  for (const [key, value] of searchParams.entries()) {
    resultObject[key] = value;
  }
  console.log(">>>>>>>>>", resultObject);

  const result = "?" + new URLSearchParams(resultObject).toString();
  console.log("RESULT@#@#@#", JSON.stringify(result));

  const { data } = useSWR(
      `/anls/itst/list?page=${page}&size=${size}`,
      fetcher,
    {
      suspense: true,
    }
  );
  console.log("RUN LIST DATA", data);
  const anlsItstList = data.anlsItstList;
  const totalElements = data.pageInfo.totalElements;
  const [filterText, setFilterText] = useState("");
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const handleRunAddModalOpen = () => {
    setShowRunAddModal(true);
  };
  const handleRunAddModalClose = () => {
    setShowRunAddModal(false);
  };

  const columns = useMemo(
    () => [
      {
        name: "No",
        width: "70px",
        sortable: true,
        selector: (row, index) => row.anlsItstId,
      },
      {
        name: "거래처(PI)",
        width: "170px",
        sortable: true,
        // selector: (row : {agncNm: string; instNm: string}) => row.agncNm,
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
        name: "연구책임자",
        width: "170px",
        sortable: true,
        // selector: (row) => row.custNm,
        cell: (row) => {
          const { custNm, custEmail } = row;
          return (
            <Stack data-tag="allowRowEvents">
              <Typography variant="body2" data-tag="allowRowEvents">
                {custNm}
              </Typography>
              <Typography variant="body2" data-tag="allowRowEvents">
                {custEmail}
              </Typography>
            </Stack>
          );
        },
      },
      {
        name: "영업 담당자",
        width: "160px",
        sortable: true,
        selector: (row) => row.bsnsMngrNm,
      },
      {
        name: "분류",
        selector: (row) => row.srvcCtgrVal,
      },
      {
        name: "분석종류",
        selector: (row) => row.anlsTypeVal,
      },
      {
        name: "플랫폼",
        width: "300px",
        selector: (row) => row.pltfVal,
      },
      {
        name: "분석일",
        width: "120px",
        selector: (row) => row.anlsDttm,
      },
      // {
      //   name: "Kit",
      //   width: "120px",
      //   selector: (row) => (row.kitVal === null ? "-" : row.kitVal),
      // },
      {
        name: "수량",
        width: "80px",
        selector: (row) => row.totalCnt,
      },
      {
        name: "총 공급가액",
        width: "140px",
        selector: (row) => row.totalSupplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      },
      {
        name: "부가세",
        width: "120px",
        selector: (row) => row.vat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      },
      {
        name: "합계금액",
        width: "150px",
        selector: (row) => row.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      },
      {
        name: "정산",
        selector: (row) => row.isSettled,
      },
      // {
      //   name: "메모",
      //   cell: (row: { memo: string }) => {
      //     const { memo } = row;
      //     return (
      //       memo !== null &&
      //       memo !== "" && (
      //         <Tooltip title={memo} arrow>
      //           <IconButton size="small">
      //             <MyIcon icon="memo" size={24} />
      //           </IconButton>
      //         </Tooltip>
      //       )
      //     );
      //   },
      //   width: "80px",
      // },
    ],
    []
  );

  const goDetailPage = (row: any) => {
    const path = row.runUkey;
    alert('준비중입니다.');
    // router.push("/exp-run-list/" + path);
  };

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <Grid container>
        <Grid item xs={5} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <DataCountResultInfo totalCount={totalElements} />
            <ContainedButton
              buttonName="분석 내역서 등록"
              size="small"
              onClick={handleRunAddModalOpen}
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
              exportUrl={`/anls/itst/list/download${result}`}
              iconName="xls3"
            />
            <KeywordSearch />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [totalElements, result]);

  const handlePageChange = (page: number) => {
    console.log("Page", page);
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    console.log("Row change.....", newPerPage, page);
    setPage(page);
    setSize(newPerPage);
  };

  const ExpandedComponent = () => <pre>{JSON.stringify(anlsItstList, null, 2)}</pre>;

  return (
    <>
      <DataTableBase
        title={<Title1 titleName="분석내역서" />}
        data={anlsItstList}
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
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        expandableIcon={{ collapsed: <MyIcon icon="plus" size={16} />, expanded: <MyIcon icon="minus" size={16} />}}
        // expandOnRowDoubleClicked={true}
      />

      {showRunAddModal && (
        <LazyRunAddModal
          onClose={handleRunAddModalClose}
          open={showRunAddModal}
          modalWidth={800}
        />
      )}
    </>
  );
};

export default ListRun;

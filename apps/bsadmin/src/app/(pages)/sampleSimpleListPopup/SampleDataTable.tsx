"use client";
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
  const samplePrevList = searchParams.get("samplePrevList");

  console.log("++++++samplePrevList ==>>", samplePrevList?.split(",")[0]);

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
      setSampleUkeyList(selectedRows);
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

  const rowSelectCritera = (row) => {
    const sampleKeys = samplePrevList?.split(",") || [];
    return sampleKeys.includes(row.sampleUkey);
  };

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        title={<Title1 titleName="샘플 검색" />}
        data={sampleListData}
        columns={columns}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        paginationResetDefaultPage={resetPaginationToggle}
        selectableRows
        // selectableRowSelected={rowSelectCritera}
        selectableRowDisabled={rowSelectCritera}
        onSelectedRowsChange={handleSelectedRowChange}
        clearSelectedRows={toggledClearRows}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        paginationServerOptions={{
          persistSelectedOnPageChange: false,
          persistSelectedOnSort: true,
        }}
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

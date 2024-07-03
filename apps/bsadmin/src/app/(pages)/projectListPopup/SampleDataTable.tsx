import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  cjbsTheme,
  DataCountResultInfo,
  DataTableBase,
  OutlinedButton,
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
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "api";
import { useRecoilState, useSetRecoilState } from "recoil";
import { sampleUkeyAtom } from "../../recoil/atoms/sampleUkeyAtom";
import SampleActionBtns from "./SampleActionBtns";
import { toggledClearRowsAtom } from "../../recoil/atoms/toggled-clear-rows-atom";
import { custUkeyAtom } from "../../recoil/atoms/custUkeyAtom";

const SampleDataTable = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
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
  const type = searchParams.get("type");

  const resultObject = {};

  for (const [key, value] of searchParams.entries()) {
    resultObject[key] = value;
  }
  console.log(">>>>>>>>>", resultObject);

  const result = "?" + new URLSearchParams(resultObject).toString();
  console.log("RESULT@#@#@#", JSON.stringify(result));

  const { data } = useSWR(
    JSON.stringify(resultObject) === "{}"
      ? `/code/orsh/prjt/list?page=${page}&size=${size}`
      : `/code/orsh/prjt/list${result}&page=${page}&size=${size}`,
    fetcher,
    {
      suspense: true,
      // keepPreviousData: true,
    },
  );

  const sampleListData = data.codeList;
  const totalElements = data.pageInfo.totalElements;

  console.log("STUDY LIST DATA ==>>", sampleListData);

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

  // const handleSampleBatchChangeModalClose = () => {
  //   setIsClear(true);
  // };

  const handleSelectedRowChange = useCallback(
    ({ selectedRows }: any) => {
      const getSampleUkeyList = selectedRows.map((row) => row.sampleUkey);
      // const getSampleIDList = selectedRows.map((row) => row.sampleId);
      console.log("selectedSampleUkeyList ==>>", getSampleUkeyList);
      setSampleUkeyList(getSampleUkeyList);
      // console.log("selectedSampleIdList ==>>", getSampleIDList);
    },
    [setSampleUkeyList],
  );

  const columns = useMemo(
    () => [
      {
        name: "코드",
        selector: (row: { douzoneCode: string }) => row.douzoneCode,
        width: "150px",
      },
      {
        name: "과제명",
        selector: (row: { optionName: string }) => row.optionName,
      },
      {
        name: "연구갯수",
        selector: (row: { prjtDetailCnt: string }) => row.prjtDetailCnt,
        width: "100px",
        right: true,
      },
      {
        name: "선택",
        center: true,
        cell: (row: {
          douzoneCode: string;
          value: string;
          optionName: string;
          prjtDetailCnt: number;
          isPrjtSelect: string;
        }) => {
          const {
            value,
            optionName,
            prjtDetailCnt,
            isPrjtSelect,
            douzoneCode,
          } = row;

          return (
            <OutlinedButton
              size="small"
              buttonName="선택"
              onClick={() => {
                const data = {
                  value: value,
                  optionName: optionName,
                  prjtDetailCnt: prjtDetailCnt,
                  isPrjtSelect: isPrjtSelect,
                  douzoneCode: douzoneCode,
                };
                const event = new CustomEvent("projectData", {
                  detail: data,
                });
                window.opener.dispatchEvent(event);
                window.close();
              }}
              // disabled={ row.isPrjtSelect === 'N' ? true : false }
            />
          );
        },
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    [],
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
    // <Box sx={{ display: "grid", width: 750 }}>
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        title={<Title1 titleName="과제 검색" />}
        data={sampleListData}
        columns={columns}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        paginationResetDefaultPage={resetPaginationToggle}
        selectableRows={false}
        onSelectedRowsChange={handleSelectedRowChange}
        clearSelectedRows={toggledClearRows}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        noDataComponent={<NoDataView />}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 15, 20]}
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

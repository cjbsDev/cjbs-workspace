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
import { useParams, usePathname, useSearchParams } from "next/navigation";
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
  const currentPath = usePathname();
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
      ? `/cust/list?page=${page}&size=${size}`
      : `/cust/list${result}&page=${page}&size=${size}`,
    fetcher,
    {
      suspense: true,
      // keepPreviousData: true,
    },
  );

  const sampleListData = data.custList;
  const totalElements = data.pageInfo.totalElements;

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
        name: "고객 번호",
        selector: (row: { ebcUid: number }) => row.ebcUid,
        width: "100px",
        center: true,
      },
      {
        name: "아이디",
        selector: (row: { ebcEmail: string }) => row.ebcEmail,
        allowOverflow: true,
      },
      {
        name: "이름",
        selector: (row: { custNm: string }) => row.custNm,
        width: "100px",
        center: true,
        allowOverflow: true,
      },

      {
        name: "소속 거래처(PI)",
        allowOverflow: true,
        cell: (row: { agncNm: any; instNm: any }) => (
          <>
            <Stack
              direction="row"
              spacing={0.4}
              alignItems="center"
              useFlexGap
              flexWrap="wrap"
            >
              <Box>{row.agncNm ?? "-"}</Box>
              {row.instNm && <Box>({row.instNm})</Box>}
            </Stack>
          </>
        ),
      },
      {
        name: "선택",
        width: "80px",
        cell: (row: {
          custUkey: string;
          custNm: string;
          ebcEmail: string;
          telList: string;
          agncUkey: string;
          agncNm: string;
          instNm: string;
          isAgncIncl: string;
          rhpiNm: string;
          rhpiTel: string;
        }) => {
          const {
            agncUkey,
            custUkey,
            custNm,
            ebcEmail,
            telList,
            instNm,
            agncNm,
            isAgncIncl,
            rhpiNm,
            rhpiTel,
          } = row;
          const agncInstNm = `${row.agncNm}(${row.instNm})`;

          if (agncUkey && type === "agnc") {
            return null; // 거래처가 있는 고객은 선택 버튼 있으면 안됨.
          }

          if (isAgncIncl === "N" && type === "agnc-order") {
            return null; // 거래처가 있는 고객은 선택 버튼 있으면 안됨.
          }

          return (
            <OutlinedButton
              size="small"
              buttonName="선택"
              onClick={() => {
                const data = {
                  custUkey: custUkey,
                  custNm: custNm,
                  ebcEmail: ebcEmail,
                  telList: telList,
                  agncNm: agncNm,
                  agncUkey: agncUkey,
                  rhpiNm: rhpiNm,
                  rhpiTel: rhpiTel,
                  instNm: instNm,
                  agncInstNm: agncInstNm,
                  type: "order",
                };
                const event = new CustomEvent("myCustData", {
                  detail: data,
                });
                window.opener.dispatchEvent(event);
                window.close();
              }}
            />
          );
        },
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
        title={<Title1 titleName="고객 검색" />}
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
        noDataComponent={<NoDataView resetPath={currentPath} />}
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

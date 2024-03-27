import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  cjbsTheme,
  DataCountResultInfo,
  DataTableBase,
  formatNumberWithCommas,
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
  const paymentInfoValue = searchParams.get("paymentInfoValue");

  const resultObject = {};

  for (const [key, value] of searchParams.entries()) {
    resultObject[key] = value;
  }
  console.log(">>>>>>>>>", resultObject);

  const result = "?" + new URLSearchParams(resultObject).toString();
  console.log("RESULT@#@#@#", JSON.stringify(result));

  const { data } = useSWR(
    JSON.stringify(resultObject) === "{}"
      ? `/agnc/list?isRmnPrePymtPriceExist=false&page=${page}&size=${size}`
      : `/agnc/list${result}&isRmnPrePymtPriceExist=false&page=${page}&size=${size}`,
    fetcher,
    {
      suspense: true,
      // keepPreviousData: true,
    },
  );

  const sampleListData = data.agncList;
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
        name: "거래처번호",
        center: true,
        width: "100px",
        selector: (row) => row.agncId,
      },
      {
        name: "거래처",
        selector: (row) => row.agncNm,
      },
      {
        name: "기관",
        selector: (row) => row.instNm,
      },
      {
        name: "선결제금액",
        right: true,
        // omit: true,
        selector: (row) => formatNumberWithCommas(row.rmnPrePymtPrice),
      },
      {
        name: "남은금액",
        right: true,
        selector: (row) => formatNumberWithCommas(row.rmnPrice),
      },
      {
        name: "선택",
        width: "80px",
        center: true,
        cell: (row: {
          agncUkey: string;
          agncNm: string;
          instUkey: string;
          instNm: string;
          brno: string;
          rprsNm: string;
          rmnPrice: number;
          rmnPrePymtPrice: number;
        }) => {
          const {
            agncUkey,
            agncNm,
            rmnPrePymtPrice,
            rmnPrice,
            instUkey,
            instNm,
            brno,
            rprsNm,
          } = row;
          const agncInstNm = `${agncNm}(${instNm})`;

          return (
            <OutlinedButton
              size="small"
              buttonName="선택"
              onClick={() => {
                // if (paymentInfoValue === "BS_1914004") {
                //   setValue("tnsfTargetAgncNm", agncNm);
                //   setValue("tnsfTargetAgncUkey", agncUkey);
                // } else {
                //   setValue("agncUkey", agncUkey);
                //   setValue("agncNm", agncNm);
                //   setValue("instFakeNm", instNm);
                //   setValue("rmnPrePymtPrice", rmnPrePymtPrice);
                //   setValue("rmnPrice", rmnPrice);
                //   setValue("agncInstNm", agncInstNm);
                // }

                const data = {
                  // agncUkey: agncUkey,
                  // agncNm: agncNm,
                  // instFakeNm: instNm,
                  // rmnPrePymtPrice: rmnPrePymtPrice,
                  // rmnPrice: rmnPrice,
                  // agncInstNm: agncInstNm,
                  tnsfTargetAgncNm: agncNm,
                  tnsfTargetAgncUkey: agncUkey,
                  // paymentInfoValue: paymentInfoValue,
                };
                const event = new CustomEvent("myTnsfAgncData", {
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
    <Box sx={{ display: "grid", width: 750 }}>
      <DataTableBase
        title={<Title1 titleName="거래처 검색" />}
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

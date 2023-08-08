"use client";

import React, { useMemo, useEffect } from "react";
import useSWR from "swr";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  Title1,
  ExcelDownloadButton,
  ContainedButton,
} from "cjbsDSTM";
import { Box, Stack, Grid, useTheme } from "@mui/material";
import axios from "axios";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface InstData {
  instId?: any;
  brno?: number;
  ftr?: string;
  instNm?: string;
  instUkey?: string;
  region1Gc?: any;
  region2Gc?: any;
  rprsNm?: string;
  instTypeCc?: any;
  lctnTypeCc?: any;
  statusCodeCc?: any;
  instTypeCcNm?: any;
  lctnTypeCcNm?: any;
  statusCodeCcNm?: any;
  region1GcNm?: any;
  region2GcNm?: any;
}

const tempUrl = `${process.env.NEXT_PUBLIC_API_URL}/inst/list?page.page=0&page.size=50`;

const ListInst = () => {
  // init
  const theme = useTheme();
  const [instList, setInstList] = useState<InstData[]>([]);

  const router = useRouter();

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowCnt, setSelectedRowCnt] = useState(0);
  const { data } = useSWR(tempUrl, fetcher, {
    suspense: true,
  });

  const handleRowSelected = (rows: any) => {
    console.log("rows", rows);
    setSelectedRowCnt(rows.selectedCount);
    //setSelectedRows(rows.map((row) => row.id));
  };

  // 위치, 기관명, 사업자 등록번호, 대표자, 지역(나라), 분류, 특성, 상태
  // region1Gc, instNm, brno, rprsNm, region2Gc, lctnTypeCc, ftr, statusCodeCc
  const columns = useMemo(
    () => [
      {
        name: "",
        selector: (row: { instId: string }) => row.instId,
        width: "50px",
      },
      {
        name: "위치",
        selector: (row: { lctnTypeVal: string }) => row.lctnTypeVal,
        width: "70px",
      },
      {
        name: "기관명",
        selector: (row: { instNm: string }) => row.instNm,
      },
      {
        name: "사업자 등록번호",
        selector: (row: { brno: string }) => row.brno,
      },
      {
        name: "대표자",
        selector: (row: { rprsNm: string }) => row.rprsNm,
      },
      {
        name: "지역(나라)",
        cell: (row: { region1Val: any; region2Val: any }) => (
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            // useFlexGap
            // flexWrap="wrap"
          >
            <Box data-tag="allowRowEvents">
              {row.region1Val ?? ""} {row.region2Val ?? ""}{" "}
            </Box>
          </Stack>
        ),
        minWidth: "150px",
      },

      {
        name: "분류",
        selector: (row: { instTypeVal: string }) => row.instTypeVal,
        width: "70px",
      },
      {
        name: "특성",
        selector: (row: { ftr: string }) => row.ftr,
      },
      {
        name: "상태",
        selector: (row: { statusCodeVal: string }) => row.statusCodeVal,
        width: "70px",
      },
    ],
    []
  );
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  /*
  useEffect(() => {
    if (data.data) {
      const filteredData: InstData[] = data.data.instList;
      const updatedInstList: InstData[] = filteredData.map((item: InstData) => {
        const instTypeCcNm = getCodeNm(item.instTypeCc);
        const region1GcNm = getCodeNm(item.region1Gc);
        const region2GcNm = getCodeNm(item.region2Gc);
        const lctnTypeCcNm = getCodeNm(item.lctnTypeCc);
        const statusCodeCcNm = getCodeNm(item.statusCodeCc);

        return {
          ...item,
          instTypeCcNm,
          lctnTypeCcNm,
          statusCodeCcNm,
          region1GcNm,
          region2GcNm,
        };
      });

      console.log("updatedInstList", updatedInstList);
      setInstList(updatedInstList);
    }
  }, [data.data]);

  const getCodeNm = (uniqueCode: string): string | null => {
    const foundData = getCodeList.data.find(
      (item: any) => item.uniqueCode === uniqueCode
      );
      return foundData ? foundData.codeNm : null;
    };
    */

  const goDetailPage = (row: { instUkey: string }) => {
    const path = row.instUkey;
    router.push("/inst-info-list/" + path);
  };

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <Grid container>
        <Grid item xs={6} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <DataCountResultInfo
              totalCount={data.data.pageInfo.totalElements}
            />
            <ContainedButton
              buttonName="기관 정보 등록"
              size="small"
              onClick={() => router.push("/inst-info-add")}
            />
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1.5 }}
            alignItems="center"
          >
            <ExcelDownloadButton downloadUrl="" />
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
  }, [filterText, resetPaginationToggle, selectedRowCnt]);

  return (
    <DataTableBase
      title={<Title1 titleName="기관 관리" />}
      //data={instList}
      data={data.data.instList}
      columns={columns}
      onRowClicked={goDetailPage}
      // onSelectedRowsChange={handleRowSelected}
      pointerOnHover
      highlightOnHover
      customStyles={dataTableCustomStyles}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      paginationResetDefaultPage={resetPaginationToggle}
      selectableRows={false}
    />
  );
};

export default ListInst;

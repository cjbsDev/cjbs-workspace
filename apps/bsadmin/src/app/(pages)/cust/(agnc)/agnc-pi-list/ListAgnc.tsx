"use client";

import * as React from "react";
import useSWR from "swr";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  Title1,
  ExcelDownloadButton,
  exportCSVData,
  OutlinedButton,
} from "cjbsDSTM";
import { Box, Stack, Grid, Chip, useTheme } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select from "react-select";
import MyIcon from "icon/myIcon";
import Dayjs from "dayjs";

const options = [
  { value: "able", label: "사용" },
  { value: "disable", label: "차단" },
];
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ListAgnc = () => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowCnt, setSelectedRowCnt] = useState(0);

  const handleRowSelected = (rows: any) => {
    console.log("rows", rows);
    setSelectedRowCnt(rows.selectedCount);
    //setSelectedRows(rows.map((row) => row.id));
  };

  /*
  {
    "agncId": 12,
    "agncUkey": "hfOocujKGf",
    "isSpecialMng": "N",
    "agncNm": "연세입니다.",
    "instNm": "연세대학교",
    "leaderNm": "김정현",
    "leaderEmail": "test@test.edu",
    "memberCount": 2,
    "pymnPrice": 100000,
    "bsnsNm": "영업팀관리자이름",
    "memo": "memo"
  }
  */

  // 거래처 번호, 거래처(PI), 리더, 맴버, 선결제 금액, 영업 담당자, 메모
  const columns = [
    {
      name: "거래처 번호",
      selector: (row: { agncId: number }) => row.agncId,
      width: "100px",
    },
    {
      name: "거래처(PI)",
      cell: (row: { agncNm: any; instNm: any }) => (
        <>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            useFlexGap
            flexWrap="wrap"
          >
            <Box>{row.agncNm} </Box>
            <Box>({row.instNm})</Box>
          </Stack>
        </>
      ),
      minWidth: "150px",
    },
    {
      name: "리더",
      cell: (row: { leaderNm: any; leaderEmail: any }) => (
        <>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            useFlexGap
            flexWrap="wrap"
          >
            <Box>{row.leaderNm ?? "-"} </Box>
            <Box>{row.leaderEmail ? "(" + row.leaderEmail + ")" : ""}</Box>
          </Stack>
        </>
      ),
      minWidth: "150px",
    },

    {
      name: "멤버",
      selector: (row: { memberCount: number }) => row.memberCount,
      width: "100px",
    },
    {
      name: "선결제 금액",
      selector: (row: { pymnPrice: number }) =>
        row.pymnPrice ? row.pymnPrice + " 원" : "금액",
    },

    {
      name: "영업 담당자",
      selector: (row: { bsnsNm: any }) => row.bsnsNm,
    },

    {
      name: "메모",
      cell: (row: { memo: any }) => (
        <>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            useFlexGap
            flexWrap="wrap"
          >
            <Box>{row.memo && "Open"}</Box>
          </Stack>
        </>
      ),
      width: "80px",
    },
  ];
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  let tempUrl =
    "http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/agnc/list?page.page=0&page.size=50";
  const { data } = useSWR(tempUrl, fetcher, {
    suspense: true,
  });

  const filteredData = data.data.custList;

  console.log("data", data);
  console.log(
    "data.data.pageInfo.totalElements",
    data.data.pageInfo.totalElements
  );

  const goDetailPage = (row: { agncUkey: string }) => {
    const path = row.agncUkey;
    router.push("/cust/agnc-pi-list/" + path);
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <Grid container>
        <Grid item xs={6} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={2}>
            <DataCountResultInfo
              totalCount={data.data.pageInfo.totalElements}
              selectedCount={selectedRowCnt}
            />
            <Select
              placeholder="상태변경"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  // borderColor: state.isFocused ? "grey" : "red",
                }),
              }}
              menuPortalTarget={document.body}
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
            <ExcelDownloadButton
              buttonName="Excel"
              onClick={() => exportCSVData({ exportUrl: "apiUrl" })}
              //style={{ height: '34px', width: '80px' }}
            />
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
      title={<Title1 titleName="거래처(PI) 관리" />}
      data={filteredData}
      columns={columns}
      onRowClicked={goDetailPage}
      onSelectedRowsChange={handleRowSelected}
      pointerOnHover
      highlightOnHover
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      paginationResetDefaultPage={resetPaginationToggle}
    />
  );
};

export default ListAgnc;

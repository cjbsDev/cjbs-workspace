"use client";

import React, { useMemo } from "react";
import useSWR from "swr";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  Title1,
  ExcelDownloadButton,
  exportCSVData,
  OutlinedButton,
  ContainedButton,
} from "cjbsDSTM";
import {
  Box,
  Stack,
  Grid,
  Chip,
  useTheme,
  Tooltip,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select from "react-select";
import MyIcon from "icon/myIcon";
import Dayjs from "dayjs";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import IconDescBar from "../../../../components/IconDescBar";

const options = [
  { value: "able", label: "사용" },
  { value: "disable", label: "차단" },
];
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ListAgnc = () => {
  // init
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

  // 거래처 번호, 거래처(PI), 리더, 멤버, 선결제 금액, 영업 담당자, 메모
  const columns = useMemo(
    () => [
      {
        name: "거래처 번호",
        selector: (row: { agncId: number }) => row.agncId,
        width: "100px",
      },
      {
        name: "거래처(PI)",
        cell: (row: { agncNm: any; instNm: any; isSpecialMng: string }) => (
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            // useFlexGap
            // flexWrap="wrap"
          >
            {row.isSpecialMng === "Y" && (
              <MyIcon
                data-tag="allowRowEvents"
                icon="vip-fill"
                size={20}
                color="#FFAB33"
              />
            )}
            <Box data-tag="allowRowEvents">{row.agncNm} </Box>
            <Box data-tag="allowRowEvents">({row.instNm})</Box>
          </Stack>
        ),
        minWidth: "150px",
      },
      {
        name: "리더",
        cell: (row: { custNm: any; ebcEmail: any }) => (
          <Stack
            direction="row"
            spacing={0.5}
            // alignItems="center"
            // useFlexGap
            // flexWrap="wrap"
          >
            <Box data-tag="allowRowEvents">{row.custNm ?? "-"} </Box>
            <Box data-tag="allowRowEvents">
              {row.ebcEmail ? "(" + row.ebcEmail + ")" : ""}
            </Box>
          </Stack>
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
        cell: (row: { memo: string }) => {
          return (
            row.memo !== null && (
              <Tooltip title={row.memo} arrow>
                <IconButton>
                  <MyIcon icon="memo" size={24} />
                </IconButton>
              </Tooltip>
            )
          );
        },
        width: "80px",
      },
    ],
    []
  );
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  let tempUrl =
    "http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/agnc/list?page.page=0&page.size=50";
  const { data } = useSWR(tempUrl, fetcher, {
    suspense: true,
  });

  const filteredData = data.data.agncList;

  console.log("filteredData", filteredData);
  console.log(
    "data.data.pageInfo.totalElements",
    data.data.pageInfo.totalElements
  );

  const goDetailPage = (row: { agncUkey: string }) => {
    const path = row.agncUkey;
    router.push("/cust/agnc-pi-list/" + path);
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
              selectedCount={selectedRowCnt}
            />
            <ContainedButton
              buttonName="거래처(PI)등록"
              size="small"
              onClick={() => router.push("/cust/agnc-pi-add")}
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
            <IconDescBar reOrder={true} fastTrack={true} freeDisabled={true} />
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
      title={<Title1 titleName="거래처(PI) 관리" />}
      data={filteredData}
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

export default ListAgnc;

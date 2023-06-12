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

const ListCust = () => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();

  // 고객 번호, 이름, 거래처(PI), 가입일, 마지막 수정일, 상태, 메모
  const columns = [
    {
      name: "고객 번호",
      selector: (row: { ebcUid: number }) => row.ebcUid,
      width: "100px",
    },
    {
      name: "이름",
      cell: (row: { nm: any; ebcEmail: any }) => (
        <>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            useFlexGap
            flexWrap="wrap"
          >
            <Box>{row.nm}</Box>
            <Box>
              <Chip
                icon={<MyIcon icon="customer" size={25} color="red" />}
                label={"Leader"}
                size="small"
                sx={{
                  // backgroundColor: theme.palette.primary.light,
                  backgroundColor: "#E6F0FA",
                  color: "#006ECD",
                }}
              />
            </Box>
            <Box>{row.ebcEmail}</Box>
          </Stack>
        </>
      ),
      minWidth: "150px",
    },

    {
      name: "거래처(PI)",
      cell: (row: { inst: any; agnc: any }) => (
        <>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            useFlexGap
            flexWrap="wrap"
          >
            <Box>{row.agnc}</Box>
            <Box>({row.inst})</Box>
          </Stack>
        </>
      ),
      minWidth: "300px",
    },

    {
      name: "가입일",
      selector: (row: { ebcJoinedAt: any }) =>
        row.ebcJoinedAt && Dayjs(row.ebcJoinedAt).format("YYYY-MM-DD"),
    },
    {
      name: "마지막 수정",
      selector: (row: { modifiedAt: any }) =>
        row.modifiedAt && Dayjs(row.modifiedAt).format("YYYY-MM-DD"),
    },
    {
      name: "상태",
      selector: (row: { id: any }) => row.id,
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
    "http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list?page=1&size=50";
  const { data } = useSWR(tempUrl, fetcher, {
    suspense: true,
  });

  const filteredData = data.data.custList;

  const goDetailPage = (row: { ukey: string }) => {
    const path = row.ukey;
    router.push("/cust/cust-list/" + path);
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
            <DataCountResultInfo totalCount={20} selectedCount={3} />
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
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTableBase
      title={<Title1 titleName="고객 관리 89" />}
      data={filteredData}
      columns={columns}
      onRowClicked={goDetailPage}
      pointerOnHover
      highlightOnHover
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      paginationResetDefaultPage={resetPaginationToggle}
    />
  );
};

export default ListCust;

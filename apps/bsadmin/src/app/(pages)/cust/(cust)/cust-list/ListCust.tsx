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

const options = [
  { value: "able", label: "사용" },
  { value: "disable", label: "차단" },
];
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ListCust = () => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();
  // 여기서 부터 개발 진행 필요
  // 고객 번호, 이름, 거래처(PI), 가입일, 마지막 수정일, 상태, 메모
  const columns = [
    {
      name: "순번",
      selector: (row: { id: number }) => row.id,
      width: "70px",
    },
    {
      name: "고객 번호",
      selector: (row: { stock: any }) => row.stock,
    },

    {
      name: "이름",
      // selector: (row: { title: any }) => row.title,
      cell: (row: { title: any }) => (
        <>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            useFlexGap
            flexWrap="wrap"
          >
            <Box>{row.title}</Box>
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
            <Box>mason@cj.net</Box>
          </Stack>
        </>
      ),
      minWidth: "150px",
    },
    {
      name: "거래처(PI)",
      selector: (row: { brand: any }) => row.brand,
      minWidth: "300px",
    },
    {
      name: "가입일",
      selector: (row: { rating: any }) => row.rating,
    },
    {
      name: "마지막 수정",
      selector: (row: { id: any }) => row.id,
    },
    {
      name: "상태",
      selector: (row: { id: any }) => row.id,
    },
    {
      name: "메모",
      // selector: (row: { stock: any }) => row.stock,
      cell: () => <Box>Memo</Box>,
      ignoreRowClick: true,
      allowOverflow: true,
      width: "80px",
    },
  ];
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { data } = useSWR("https://dummyjson.com/products", fetcher, {
    suspense: true,
  });

  const filteredData = data.products.filter(
    (item: { title: string }) =>
      item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const goDetailPage = (row: { id: number }) => {
    const path = row.id;
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
      title={<Title1 titleName="고객 관리" />}
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

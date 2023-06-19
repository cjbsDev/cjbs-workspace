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
import { grey } from "@mui/material/colors";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";

const options = [
  { value: "able", label: "사용" },
  { value: "disable", label: "차단" },
];
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ListCust = () => {
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

  // 고객 번호, 이름, 거래처(PI), 가입일, 마지막 수정일, 상태, 메모
  const columns = [
    {
      name: "고객 번호",
      selector: (row: { ebcUid: number }) => row.ebcUid,
      width: "100px",
    },
    {
      name: "이름",
      cell: (row: { custNm: any; ebcEmail: any }) => (
        <>
          <Stack
            direction="row"
            spacing={0.4}
            alignItems="center"
            useFlexGap
            flexWrap="wrap"
          >
            <Box>{row.custNm}</Box>
            <Box>
              <Chip
                icon={
                  <MyIcon
                    icon="profile-circle-fill"
                    size={16}
                    color={theme.palette.primary.main}
                  />
                }
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
      cell: (row: { instNm: any; agncNm: any }) => (
        <>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            useFlexGap
            flexWrap="wrap"
          >
            <Box>{row.agncNm}</Box>
            <Box>({row.instNm})</Box>
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
      name: "선결제 금액",
      selector: (row: { pymnPrice: number }) =>
        row.pymnPrice ? row.pymnPrice + " 원" : "금액",
    },
    {
      name: "상태",
      selector: (row: { isAcs: any }) => (row.isAcs ? "사용" : "차단"),
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
  ];
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  let tempUrl =
    "http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list?page=0&size=50";
  const { data } = useSWR(tempUrl, fetcher, {
    suspense: true,
  });

  const filteredData = data.data.custList;

  console.log("data", data);
  console.log(
    "data.data.pageInfo.totalElements",
    data.data.pageInfo.totalElements
  );

  const goDetailPage = (row: { custUkey: string }) => {
    const path = row.custUkey;
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
      title={<Title1 titleName="고객 관리" />}
      data={filteredData}
      columns={columns}
      onRowClicked={goDetailPage}
      onSelectedRowsChange={handleRowSelected}
      pointerOnHover
      highlightOnHover
      customStyles={dataTableCustomStyles}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      paginationResetDefaultPage={resetPaginationToggle}
    />
  );
};

export default ListCust;

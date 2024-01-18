"use client";

import React, { useEffect, useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  ContainedButton,
  Title1,
} from "cjbsDSTM";

import {
  Box,
  Stack,
  Grid,
  Tooltip,
  IconButton,
  Link,
  Chip,
} from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import MyIcon from "icon/MyIcon";
import Dayjs from "dayjs";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { useList } from "../../../hooks/useList";
import { toast } from "react-toastify";
import { blue, red, grey, green } from "cjbsDSTM/themes/color";
import { cjbsTheme } from "cjbsDSTM";

const ListCust = () => {
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(20);
  // ListAPI Call
  const { data } = useList("qttn", page, perPage);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedRowCnt, setSelectedRowCnt] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredData = data.qttnList;

  const totalElements = data.pageInfo.totalElements;
  const handleRowSelected = (rows: any) => {
    //console.log("rows", rows);
    setSelectedRowCnt(rows.selectedCount);
    //setSelectedRows(rows.map((row) => row.id));
  };
  const formatNumber = (number) => {
    return number.toLocaleString();
  };

  const columns = useMemo(
    () => [
      {
        name: "견적 번호",
        center: true,
        cell: (row: { qttnNo: number; qttnUkey: string }) => (
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            // useFlexGap
            // flexWrap="wrap"
          >
            <Box data-tag="allowRowEvents">{row.qttnNo} </Box>
            {row.qttnUkey == null && (
              <MyIcon
                data-tag="allowRowEvents"
                icon="exclamation-triangle-fill"
                size={20}
                color="#FFAB33"
              />
            )}
          </Stack>
        ),
        width: "200px",
      },
      {
        name: "유형",
        width: "100px",
        center: true,
        selector: (row: { qttnTypeVal: string }) => row.qttnTypeVal,
        cell: (row: { qttnTypeVal: string }) => {
          const { qttnTypeVal } = row;
          return (
            <Chip
              label={qttnTypeVal}
              size="small"
              color={qttnTypeVal === "견적용" ? "success" : "primary"}
            />
          );
        },
      },

      {
        name: "거래처(PI)",
        cell: (row: { agncInstNm: any }) => (
          <>
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              useFlexGap
              flexWrap="wrap"
              data-tag="allowRowEvents"
            >
              <Box data-tag="allowRowEvents">{row.agncInstNm}</Box>
            </Stack>
          </>
        ),
        minWidth: "250px",
      },
      {
        name: "견적금액",
        selector: (row: { totalPrice: string }) => row.totalPrice,
        width: "200px",
        right: true,
        cell: (row) => formatNumber(row.totalPrice),
      },
      {
        name: "견적일",
        width: "150px",
        right: true,
        selector: (row: { qttnDate: any }) =>
          row.qttnDate && Dayjs(row.qttnDate).format("YYYY-MM-DD"),
      },
      {
        name: "견적담당",
        center: true,
        selector: (row: { bsnsMngrNm: string }) => row.bsnsMngrNm,
        width: "100px",
      },
      {
        name: "작성자",
        center: true,
        selector: (row: { writer: string }) => row.writer,
        width: "100px",
      },

      {
        name: "할인율",
        width: "100px",
        center: true,
        selector: (row: { isExc: string }) => row.isExc,
        cell: (row: { isExc: string }) => {
          const { isExc } = row;
          return isExc == "Y" ? (
            <Chip label={"초과"} size="small" color={"error"} />
          ) : (
            "-"
          );
        },
      },

      {
        name: "발송",
        center: true,
        selector: (row: { sendStatusVal: string }) => row.sendStatusVal,
        width: "150px",
      },
      {
        name: "발송일자",
        width: "150px",
        center: true,
        selector: (row: { sendDate: any }) =>
          row.sendDate ? Dayjs(row.sendDate).format("YYYY-MM-DD") : "-",
      },
    ],
    []
  );

  const goDetailPage = (row: { tdstUkey: string }) => {
    const path = row.tdstUkey;
    console.log("path", path);
    if (!row.tdstUkey) {
      toast("잘못된 접근입니다.");
    } else {
      router.push("/ledger-ts-list/" + path);
    }
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
              totalCount={totalElements}
              //selectedCount={selectedRowCnt}
            />

            <Link href="/ledger-ts-add">
              <ContainedButton buttonName="견적서 등록" size="small" />
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
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
  }, [filterText, resetPaginationToggle, totalElements]);

  const handlePageChange = (page: number) => {
    // console.log("Page", page);
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    // console.log("Row change.....", newPerPage, page);
    setPage(page);
    setPerPage(newPerPage);
  };

  return (
    <DataTableBase
      title={<Title1 titleName="견적서 관리" />}
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
      pagination
      paginationServer
      paginationTotalRows={totalElements}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
    />
  );
};

export default ListCust;

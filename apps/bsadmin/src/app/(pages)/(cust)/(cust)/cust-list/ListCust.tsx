"use client";

import React, {useCallback, useEffect, useMemo} from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  Title1,
} from "cjbsDSTM";
import { Box, Stack, Grid, Tooltip, IconButton } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import MyIcon from "icon/MyIcon";
import Dayjs from "dayjs";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { toast } from "react-toastify";
import {useResultObject} from "../../../../components/KeywordSearch/useResultObject";
import useSWR from "swr";
import {fetcher} from "api";
import SubHeader from "./SubHeader";
import { getColumns } from "./Columns";

const ListCust = () => {
  const router = useRouter();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(15);
  const [sort, setSort] = useState<string>("orderId,DESC");
  const [hideDirector, setHideDirector] = useState<boolean>(true);
  const [resultObject, result] = useResultObject();

  const url = useMemo(() => {
    const base = "/cust/list";
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}&sort=${sort}`
        : `?page=${page}&size=${size}&sort=${sort}`;
    return `${base}${params}`;
  }, [resultObject, result, page, size, sort]);

  const { data } = useSWR(url, fetcher, { suspense: true });
  console.log("ORDER LIST DATA", data);

  const custListData = data.custList;
  const totalElements = data.pageInfo.totalElements;

  // const handleRowSelected = (rows: any) => {
  //   //console.log("rows", rows);
  //   setSelectedRowCnt(rows.selectedCount);
  //   //setSelectedRows(rows.map((row) => row.id));
  // };

  const goDetailPage = (row: { custUkey: string; ebcUid: string }) => {
    const {custUkey, ebcUid} = row;
    if (!ebcUid) {
      toast("EzBioCloud 가입 정보가 없는 고객입니다.");
    } else {
      router.push("/cust-list/" + custUkey);
    }
  };

  const columns = useMemo(
    () => getColumns(hideDirector, totalElements),
    [hideDirector, totalElements],
  );

  const subHeaderComponentMemo = useMemo(
    () => <SubHeader totalElements={totalElements} result={result} />,
    [totalElements, result],
  );

  // const subHeaderComponentMemo = React.useMemo(() => {
  //   const handleClear = () => {
  //     if (filterText) {
  //       setResetPaginationToggle(!resetPaginationToggle);
  //       setFilterText("");
  //     }
  //   };
  //
  //   return (
  //     <Grid container>
  //       <Grid item xs={6} sx={{ pt: 0 }}>
  //         <Stack direction="row" spacing={2}>
  //           <DataCountResultInfo
  //             totalCount={totalElements}
  //             //selectedCount={selectedRowCnt}
  //           />
  //         </Stack>
  //       </Grid>
  //       <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
  //         <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
  //           <DataTableFilter
  //             onFilter={(e: {
  //               target: { value: React.SetStateAction<string> };
  //             }) => setFilterText(e.target.value)}
  //             onClear={handleClear}
  //             filterText={filterText}
  //           />
  //         </Stack>
  //       </Grid>
  //     </Grid>
  //   );
  // }, [filterText, resetPaginationToggle, totalElements]);

  const handlePageChange = useCallback((page: React.SetStateAction<number>) => {
    setPage(page);
  }, []);

  const handlePerRowsChange = useCallback(
    (newPerPage: React.SetStateAction<number>, page: any) => {
      setSize(newPerPage);
    },
    [],
  );

  return (
    <DataTableBase
      title={<Title1 titleName="고객 관리" />}
      data={custListData}
      columns={columns}
      onRowClicked={goDetailPage}
      selectableRows={false}
      // onSelectedRowsChange={handleRowSelected}
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

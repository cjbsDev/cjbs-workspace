"use client";

import React, { useCallback, useMemo } from "react";
import useSWR from "swr";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { Box, useTheme } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { fetcher } from "api";
import NoDataView from "../../../../components/NoDataView";
import { useResultObject } from "../../../../components/KeywordSearch/useResultObject";
import SubHeader from "./SubHeader";
import { getColumns } from "./Columns";

const ListAgnc = () => {
  // init
  const theme = useTheme();
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(15);
  const [sort, setSort] = useState<string>("orderId,DESC");
  const [hideDirector, setHideDirector] = useState<boolean>(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowCnt, setSelectedRowCnt] = useState(0);
  const [resultObject, result] = useResultObject();

  const url = useMemo(() => {
    const base = "/agnc/list";
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}&sort=${sort}`
        : `?page=${page}&size=${size}&sort=${sort}`;
    return `${base}${params}`;
  }, [resultObject, result, page, size, sort]);

  const { data } = useSWR(url, fetcher, { suspense: true });
  console.log("PI LIST DATA", data);

  const agncListData = data.agncList;
  const totalElements = data.pageInfo.totalElements;

  const handleRowSelected = (rows: any) => {
    setSelectedRowCnt(rows.selectedCount);
    //setSelectedRows(rows.map((row) => row.id));
  };

  // 거래처 번호, 거래처(PI), 리더, 멤버, 선결제 금액, 영업 담당자, 메모
  const columns = useMemo(
    () => getColumns(hideDirector, totalElements),
    [hideDirector, totalElements],
  );

  const goDetailPage = (row: { agncUkey: string; instUkey: string }) => {
    const { agncUkey, instUkey } = row;
    // const path = row.agncUkey;
    router.push(`/agnc-pi-list/` + agncUkey + `/?instUkey=${instUkey}`);
  };

  const subHeaderComponentMemo = useMemo(
    () => <SubHeader totalElements={totalElements} result={result} />,
    [totalElements, result],
  );

  // const subHeaderComponentMemo = useMemo(() => {
  //
  //
  //   return (
  //     <Grid container>
  //       <Grid item xs={6} sx={{ pt: 0 }}>
  //         <Stack direction="row" spacing={2} alignItems="center">
  //           <DataCountResultInfo
  //             totalCount={data.pageInfo.totalElements}
  //             //selectedCount={selectedRowCnt}
  //           />
  //           <ContainedButton
  //             buttonName="거래처(PI)등록"
  //             size="small"
  //             onClick={() => router.push("/agnc-pi-add")}
  //           />
  //         </Stack>
  //       </Grid>
  //       <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
  //         <Stack
  //           direction="row"
  //           spacing={1}
  //           sx={{ mb: 1.5 }}
  //           alignItems="center"
  //         >
  //           <IconDescBar reOrder={true} fastTrack={true} freeDisabled={true} />
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
  // }, [filterText, resetPaginationToggle, data.pageInfo.totalElements, router]);

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
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        title={<Title1 titleName="거래처(PI) 관리" />}
        data={agncListData}
        columns={columns}
        onRowClicked={goDetailPage}
        // onSelectedRowsChange={handleRowSelected}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        // paginationResetDefaultPage={resetPaginationToggle}
        selectableRows={false}
        noDataComponent={<NoDataView />}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </Box>
  );
};

export default ListAgnc;

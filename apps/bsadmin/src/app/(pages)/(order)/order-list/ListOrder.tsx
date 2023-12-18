"use client";

import React, { useCallback, useMemo } from "react";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { Box } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR from "swr";
import { fetcher } from "api";
import NoDataView from "../../../components/NoDataView";
import { useResultObject } from "../../../components/KeywordSearch/useResultObject";
import { getColumns } from "./Columns";
import SubHeaderComponent from "./SubHeaderComponent";

const ListOrder = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(15);
  const [sort, setSort] = useState<string>("orderId,DESC");
  const [hideDirector, setHideDirector] = useState<boolean>(true);
  const [resultObject, result] = useResultObject();

  const url = useMemo(() => {
    const base = "/order/list";
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}&sort=${sort}`
        : `?page=${page}&size=${size}&sort=${sort}`;
    return `${base}${params}`;
  }, [resultObject, result, page, size, sort]);

  const { data } = useSWR(url, fetcher, { suspense: true });

  console.log("ORDER LIST DATA", data);
  const orderListData = data.orderList;
  const totalElements = data.pageInfo.totalElements;
  const router = useRouter();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const columns = useMemo(
    () => getColumns(hideDirector, totalElements),
    [hideDirector, totalElements],
  );

  const subHeaderComponentMemo = useMemo(
    () => <SubHeaderComponent totalElements={totalElements} result={result} />,
    [totalElements, result],
  );

  const goDetailPage = useCallback((row: any) => {
    const path = row.orderUkey;
    router.push("/order-list/" + path + result);
  }, []);

  const handlePageChange = useCallback((page: React.SetStateAction<number>) => {
    setPage(page);
  }, []);

  const handlePerRowsChange = useCallback(
    (newPerPage: React.SetStateAction<number>, page: any) => {
      setSize(newPerPage);
    },
    [],
  );
  const handleSort = useCallback(
    (selectedColumn: { sortField: any }, sortDirection: string) => {
      // const sortValue = selectedColumn.sortField
      //   ? `${selectedColumn.sortField},${sortDirection.toUpperCase()}`
      //   : "";
      // setSort(sortValue);
      // console.log("SortDirection", sortDirection);

      const sortValue = `${
        selectedColumn.sortField
      },${sortDirection.toUpperCase()}`;
      setSort(sortValue);
      setResetPaginationToggle(!resetPaginationToggle);
    },
    [],
  );

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        title={<Title1 titleName="오더 관리" />}
        data={orderListData}
        columns={columns}
        onRowClicked={goDetailPage}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        paginationResetDefaultPage={resetPaginationToggle}
        selectableRows={false}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        noDataComponent={<NoDataView resetPath={"/order-list"} />}
        sortServer
        onSort={handleSort}
        defaultSortFieldId={1}
        defaultSortAsc={false}
      />
    </Box>
  );
};

export default ListOrder;

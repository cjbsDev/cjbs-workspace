"use client";

import React, { useCallback, useMemo } from "react";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR, { preload } from "swr";
import { fetcher } from "api";
import NoDataView from "../../../components/NoDataView";
import { useResultObject } from "../../../components/KeywordSearch/useResultObject";
import { getColumns } from "./Columns";
import SubHeader from "./SubHeader";
import useCalculatedHeight from "../../../hooks/useCalculatedHeight";

const base = "/order/list";

const ListOrder = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  const [sort, setSort] = useState<string>("orderId,DESC");
  const [hideDirector, setHideDirector] = useState<boolean>(true);
  const [resultObject, result] = useResultObject();
  const height = useCalculatedHeight(268);
  const router = useRouter();

  const url = useMemo(() => {
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}&sort=${sort}`
        : `?page=${page}&size=${size}&sort=${sort}`;
    return `${base}${params}`;
  }, [resultObject, result, page, size, sort]);

  const { data, isLoading } = useSWR(url, fetcher, { keepPreviousData: true });

  const orderListData = data?.orderList;
  console.log("ORDER LIST DATA", orderListData);
  const totalElements = data?.pageInfo.totalElements;

  const columns = useMemo(() => getColumns(hideDirector), [hideDirector]);

  const goDetailPage = useCallback(
    (row: any) => {
      const { orderUkey } = row;
      // console.log("Go To Detail ===>>>>", orderUkey, result);
      // console.log("/order-list/" + orderUkey + result);
      router.push(`/order-list/${orderUkey}${result}`);
    },
    [result, router],
  );

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
      const sortValue = `${
        selectedColumn.sortField
      },${sortDirection.toUpperCase()}`;
      setSort(sortValue);
    },
    [],
  );

  return (
    <Box sx={{ display: "grid" }}>
      {isLoading && (
        <CircularProgress
          color="success"
          size={30}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        />
      )}
      <DataTableBase
        title={<Title1 titleName="오더 관리" />}
        data={orderListData}
        columns={columns}
        onRowClicked={goDetailPage}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={
          <SubHeader totalElements={totalElements} result={result} />
        }
        fixedHeader={true}
        fixedHeaderScrollHeight={`${height}px`}
        selectableRows={false}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        noDataComponent={
          data === undefined ? null : <NoDataView resetPath="/order-list" />
        }
        sortServer
        onSort={handleSort}
        defaultSortFieldId={1}
        defaultSortAsc={false}
        paginationPerPage={100}
        paginationRowsPerPageOptions={[100, 200, 300, 400, 600, 800, 1000]}
      />
    </Box>
  );
};

export default ListOrder;

"use client";

import React, { useCallback, useMemo } from "react";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { Box, CircularProgress, Typography } from "@mui/material";
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

// preload(base, fetcher).then((r) => console.log("RRRRRRRR ==>>", r));

const ListOrder = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  const [sort, setSort] = useState<string>("orderId,DESC");
  const [hideDirector, setHideDirector] = useState<boolean>(true);
  const [resultObject, result] = useResultObject();
  const height = useCalculatedHeight(268);
  const router = useRouter();

  const url = useMemo(() => {
    // const base = "/order/list";
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}&sort=${sort}`
        : `?page=${page}&size=${size}&sort=${sort}`;
    return `${base}${params}`;
  }, [resultObject, result, page, size, sort]);

  const { data, isLoading } = useSWR(url, fetcher, { keepPreviousData: true });

  // console.log("ORDER LIST DATA", data);
  const orderListData = data?.orderList;
  const totalElements = data?.pageInfo.totalElements;
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const columns = useMemo(
    () => getColumns(hideDirector, totalElements),
    [hideDirector, totalElements],
  );

  const subHeaderComponentMemo = useMemo(
    () => <SubHeader totalElements={totalElements} result={result} />,
    [totalElements, result],
  );

  const goDetailPage = useCallback(
    (row: any) => {
      const { orderUkey } = row;
      console.log("Go To Detail ===>>>>", orderUkey, result);
      console.log("/order-list/" + orderUkey + result);
      router.push("/order-list/" + orderUkey + result);
    },
    [result],
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
      setResetPaginationToggle(!resetPaginationToggle);
    },
    [],
  );

  return (
    <Box sx={{ display: "grid", position: "relative" }}>
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
        // <Backdrop
        //   sx={{
        //     color: "#fff",
        //     zIndex: (theme) => theme.zIndex.drawer + 1,
        //     position: "absolute",
        //   }}
        //   open={isLoading}
        // >
        //   <CircularProgress color="inherit" size={30} />
        // </Backdrop>
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
        subHeaderComponent={subHeaderComponentMemo}
        fixedHeader={true}
        fixedHeaderScrollHeight={`${height}px`}
        paginationResetDefaultPage={resetPaginationToggle}
        selectableRows={false}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        // progressPending={!orderListData}
        // progressComponent={<p>Loading...</p>}
        onChangePage={handlePageChange}
        // onChangePage={(page) => setPage(page)}
        onChangeRowsPerPage={handlePerRowsChange}
        // onChangeRowsPerPage={(currentRowsPerPage) =>
        //   setSize(currentRowsPerPage)
        // }
        noDataComponent={
          data === undefined ? (
            <Typography variant="body1">Loading...</Typography>
          ) : (
            <NoDataView resetPath={"/order-list"} />
          )
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
